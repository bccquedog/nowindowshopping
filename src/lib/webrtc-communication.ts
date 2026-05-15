/**
 * WebRTC Communication Manager
 * Adapted from LoveQuest videochat implementation for improved video/audio call performance.
 * - Peer-to-peer for lower latency vs Daily.co
 * - ICE candidate queue (before remoteDescription)
 * - Reconnect grace period on transient disconnect
 * - ICE restart on failure
 * - TURN support for restrictive networks
 */

import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { getWebRTCIceServers } from '../config/videoConfig';

export type CallKind = 'voice' | 'video';

export interface WebRTCConfig {
  db: Firestore;
  /** Base path for signaling, e.g. 'gameRoomCalls' or 'webrtc_connections' */
  collectionName: string;
  getIceServers?: () => RTCIceServer[];
}

const DEFAULT_ICE_SERVERS = getWebRTCIceServers;

export class WebRTCCommunicationManager {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private connectionId: string | null = null;
  private userId: string | null = null;
  private partnerId: string | null = null;
  private connectionType: CallKind | null = null;
  private startTime: Date | null = null;
  private onConnectionStateChange?: (state: string) => void;
  private onRemoteStream?: (stream: MediaStream) => void;
  private onConnectionEnd?: (duration: number) => void;
  private answerUnsubscribe?: () => void;
  private signalingAnswerUnsubscribe?: () => void;
  private iceCandidatesUnsubscribe?: () => void;
  private pendingRemoteIceCandidates: RTCIceCandidateInit[] = [];
  private disconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isEndingCall = false;
  private config: WebRTCConfig;

  constructor(config: WebRTCConfig) {
    this.config = config;
    this.initializePeerConnection();
  }

  private getIceServers(): RTCIceServer[] {
    return (this.config.getIceServers ?? DEFAULT_ICE_SERVERS)();
  }

  private initializePeerConnection(): void {
    const iceServers = this.getIceServers();
    this.peerConnection = new RTCPeerConnection({
      iceServers,
      iceCandidatePoolSize: 10,
    });
    this.pendingRemoteIceCandidates = [];

    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection?.connectionState || 'unknown';
      this.onConnectionStateChange?.(state);
      this.handleConnectionStateChange(state);
    };

    this.peerConnection.ontrack = (event) => {
      const stream = event.streams[0];
      if (!stream) return;
      this.remoteStream = stream;
      this.onRemoteStream?.(stream);
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.connectionId) {
        this.sendIceCandidate(event.candidate);
      }
    };
  }

  private async flushPendingIceCandidates(): Promise<void> {
    if (!this.peerConnection?.remoteDescription || this.pendingRemoteIceCandidates.length === 0) {
      return;
    }
    const pending = [...this.pendingRemoteIceCandidates];
    this.pendingRemoteIceCandidates = [];
    for (const candidate of pending) {
      try {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.error('[WebRTC] Error adding queued ICE candidate:', err);
      }
    }
  }

  private normalizeAnswerPayload(raw: unknown): RTCSessionDescriptionInit | null {
    if (!raw || typeof raw !== 'object') return null;
    const obj = raw as Record<string, unknown>;
    if (typeof obj.sdp === 'string' && typeof obj.type === 'string') {
      return obj as unknown as RTCSessionDescriptionInit;
    }
    if (typeof obj.sdp === 'string') {
      return { type: 'answer', sdp: obj.sdp };
    }
    return null;
  }

  private normalizeIceCandidatePayload(data: unknown): RTCIceCandidateInit | null {
    if (!data || typeof data !== 'object') return null;
    const obj = data as Record<string, unknown>;
    if (obj.candidate && typeof obj.candidate === 'object' && typeof (obj.candidate as Record<string, unknown>).candidate === 'string') {
      return (obj.candidate as Record<string, unknown>) as unknown as RTCIceCandidateInit;
    }
    if (typeof obj.candidate === 'string') {
      return {
        candidate: obj.candidate,
        sdpMLineIndex: typeof obj.sdpMLineIndex === 'number' ? obj.sdpMLineIndex : undefined,
        sdpMid: typeof obj.sdpMid === 'string' ? obj.sdpMid : undefined,
      };
    }
    return null;
  }

  private async applyRemoteAnswer(rawAnswer: unknown, connectionId: string): Promise<void> {
    const answer = this.normalizeAnswerPayload(rawAnswer);
    if (!answer || !this.peerConnection) return;
    if (this.peerConnection.currentRemoteDescription || this.peerConnection.remoteDescription) return;

    try {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      await this.flushPendingIceCandidates();
    } catch (err) {
      console.error('[WebRTC] Error setting remote description:', err);
    }
  }

  async startCall(
    userId: string,
    partnerId: string,
    connectionType: CallKind,
    connectionId: string
  ): Promise<boolean> {
    try {
      this.userId = userId;
      this.partnerId = partnerId;
      this.connectionType = connectionType;
      this.connectionId = connectionId;
      this.startTime = new Date();

      const constraints: MediaStreamConstraints = {
        audio: true,
        video: connectionType === 'video'
          ? { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }
          : false,
      };

      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });

      const offer = await this.peerConnection!.createOffer();
      await this.peerConnection!.setLocalDescription(offer);
      await this.sendOffer(offer);
      this.listenForAnswer(connectionId);
      this.listenForIceCandidates(connectionId);
      return true;
    } catch (err) {
      console.error('[WebRTC] Error starting call:', err);
      return false;
    }
  }

  async answerCall(
    userId: string,
    partnerId: string,
    connectionType: CallKind,
    connectionId: string,
    offer: RTCSessionDescriptionInit
  ): Promise<boolean> {
    try {
      this.userId = userId;
      this.partnerId = partnerId;
      this.connectionType = connectionType;
      this.connectionId = connectionId;
      this.startTime = new Date();

      const constraints: MediaStreamConstraints = {
        audio: true,
        video: connectionType === 'video'
          ? { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }
          : false,
      };

      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.localStream.getTracks().forEach((track) => {
        this.peerConnection?.addTrack(track, this.localStream!);
      });

      await this.peerConnection!.setRemoteDescription(offer);
      await this.flushPendingIceCandidates();

      const answer = await this.peerConnection!.createAnswer();
      await this.peerConnection!.setLocalDescription(answer);
      await this.sendAnswer(answer);
      this.listenForIceCandidates(connectionId);
      return true;
    } catch (err) {
      console.error('[WebRTC] Error answering call:', err);
      return false;
    }
  }

  async endCall(): Promise<void> {
    if (this.isEndingCall) return;
    this.isEndingCall = true;
    try {
      if (this.disconnectTimer) {
        clearTimeout(this.disconnectTimer);
        this.disconnectTimer = null;
      }
      this.answerUnsubscribe?.();
      this.signalingAnswerUnsubscribe?.();
      this.iceCandidatesUnsubscribe?.();
      this.answerUnsubscribe = this.signalingAnswerUnsubscribe = this.iceCandidatesUnsubscribe = undefined;

      if (this.peerConnection) this.peerConnection.close();
      if (this.localStream) this.localStream.getTracks().forEach((t) => t.stop());

      const duration = this.startTime ? (Date.now() - this.startTime.getTime()) / 1000 : 0;
      this.onConnectionEnd?.(duration);
      this.reset();
    } catch (err) {
      console.error('[WebRTC] Error ending call:', err);
    } finally {
      this.isEndingCall = false;
    }
  }

  private handleConnectionStateChange(state: string): void {
    switch (state) {
      case 'connected':
        if (this.disconnectTimer) {
          clearTimeout(this.disconnectTimer);
          this.disconnectTimer = null;
        }
        break;
      case 'disconnected':
        if (this.disconnectTimer) clearTimeout(this.disconnectTimer);
        this.disconnectTimer = setTimeout(() => {
          if (this.peerConnection?.connectionState === 'disconnected') {
            this.endCall();
          }
        }, 5000);
        break;
      case 'failed':
        this.restartIce().catch(() => this.endCall());
        break;
    }
  }

  private async restartIce(): Promise<void> {
    if (!this.peerConnection) return;
    try {
      const offer = await this.peerConnection.createOffer({ iceRestart: true });
      await this.peerConnection.setLocalDescription(offer);
      await this.sendOffer(offer);
    } catch (err) {
      console.error('[WebRTC] ICE restart failed:', err);
    }
  }

  private async sendOffer(offer: RTCSessionDescriptionInit): Promise<void> {
    if (!this.connectionId) return;
    const ref = doc(this.config.db, this.config.collectionName, this.connectionId);
    await setDoc(ref, {
      offer,
      userId: this.userId,
      partnerId: this.partnerId,
      callerId: this.userId,
      calleeId: this.partnerId,
      connectionType: this.connectionType,
      status: 'offering',
      timestamp: serverTimestamp(),
    }, { merge: true });

    const signalingRef = doc(this.config.db, this.config.collectionName, this.connectionId, 'signaling', 'offer');
    await setDoc(signalingRef, {
      type: 'offer',
      sdp: offer.sdp,
      fromUserId: this.userId,
      timestamp: serverTimestamp(),
    }, { merge: true });
  }

  private async sendAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    if (!this.connectionId) return;
    const ref = doc(this.config.db, this.config.collectionName, this.connectionId);
    await setDoc(ref, {
      answer,
      answererId: this.userId,
      status: 'answered',
      answerTimestamp: serverTimestamp(),
    }, { merge: true });

    const signalingRef = doc(this.config.db, this.config.collectionName, this.connectionId, 'signaling', 'answer');
    await setDoc(signalingRef, {
      type: 'answer',
      sdp: answer.sdp,
      fromUserId: this.userId,
      timestamp: serverTimestamp(),
    }, { merge: true });
  }

  private async sendIceCandidate(candidate: RTCIceCandidate): Promise<void> {
    if (!this.connectionId) return;
    const ref = doc(
      this.config.db,
      this.config.collectionName,
      this.connectionId,
      'iceCandidates',
      `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    );
    await setDoc(ref, {
      candidate: { candidate: candidate.candidate, sdpMLineIndex: candidate.sdpMLineIndex, sdpMid: candidate.sdpMid },
      senderId: this.userId,
      timestamp: serverTimestamp(),
    }, { merge: true });
  }

  private listenForAnswer(connectionId: string): void {
    this.answerUnsubscribe?.();
    this.signalingAnswerUnsubscribe?.();

    const connectionRef = doc(this.config.db, this.config.collectionName, connectionId);
    this.answerUnsubscribe = onSnapshot(connectionRef, async (snapshot) => {
      if (!snapshot.exists()) return;
      const data = snapshot.data();
      await this.applyRemoteAnswer(data.answer, connectionId);
      await this.applyRemoteAnswer(data, connectionId);
      await this.applyRemoteAnswer(data?.signaling?.answer, connectionId);
    });

    const signalingRef = doc(this.config.db, this.config.collectionName, connectionId, 'signaling', 'answer');
    this.signalingAnswerUnsubscribe = onSnapshot(signalingRef, async (snapshot) => {
      if (!snapshot.exists()) return;
      await this.applyRemoteAnswer(snapshot.data(), connectionId);
    });
  }

  private listenForIceCandidates(connectionId: string): void {
    this.iceCandidatesUnsubscribe?.();
    const candidatesRef = collection(this.config.db, this.config.collectionName, connectionId, 'iceCandidates');
    const q = query(candidatesRef, orderBy('timestamp', 'asc'));
    this.iceCandidatesUnsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type !== 'added' || !this.peerConnection) return;
        const data = change.doc.data();
        const senderId = data.senderId || data.fromUserId;
        if (senderId === this.userId) return;

        const candidate = this.normalizeIceCandidatePayload(data);
        if (!candidate) return;

        if (!this.peerConnection.remoteDescription) {
          this.pendingRemoteIceCandidates.push(candidate);
          return;
        }
        try {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error('[WebRTC] Error adding ICE candidate:', err);
        }
      });
    });
  }

  async fetchOffer(connectionId: string): Promise<RTCSessionDescriptionInit | null> {
    try {
      const ref = doc(this.config.db, this.config.collectionName, connectionId);
      const snap = await getDoc(ref);
      if (!snap.exists()) return null;
      const offer = snap.data().offer as RTCSessionDescriptionInit | undefined;
      return offer || null;
    } catch (err) {
      console.error('[WebRTC] Error fetching offer:', err);
      return null;
    }
  }

  private reset(): void {
    if (this.disconnectTimer) {
      clearTimeout(this.disconnectTimer);
      this.disconnectTimer = null;
    }
    this.answerUnsubscribe?.();
    this.signalingAnswerUnsubscribe?.();
    this.iceCandidatesUnsubscribe?.();
    this.answerUnsubscribe = this.signalingAnswerUnsubscribe = this.iceCandidatesUnsubscribe = undefined;
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
    this.connectionId = null;
    this.userId = null;
    this.partnerId = null;
    this.connectionType = null;
    this.startTime = null;
    this.isEndingCall = false;
    this.initializePeerConnection();
  }

  setOnConnectionStateChange(handler: (state: string) => void): void {
    this.onConnectionStateChange = handler;
  }
  setOnRemoteStream(handler: (stream: MediaStream) => void): void {
    this.onRemoteStream = handler;
  }
  setOnConnectionEnd(handler: (duration: number) => void): void {
    this.onConnectionEnd = handler;
  }
  getLocalStream(): MediaStream | null {
    return this.localStream;
  }
  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }
  getConnectionState(): string {
    return this.peerConnection?.connectionState || 'disconnected';
  }
}

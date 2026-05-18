import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AudiobookData, formatSeconds } from './booksData';

interface Props {
  bookTitle: string;
  bookSlug: string;
  audiobook: AudiobookData;
}

const STORAGE_KEY_PREFIX = 'mgcu-audiobook-position:';

const MGCUAudiobookPlayer: React.FC<Props> = ({ bookTitle, bookSlug, audiobook }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const storageKey = `${STORAGE_KEY_PREFIX}${bookSlug}`;

  const [chapterIndex, setChapterIndex] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const current = audiobook.chapters[chapterIndex];

  // Restore last position
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as { chapterIndex: number; position: number };
      if (typeof saved.chapterIndex === 'number' && saved.chapterIndex < audiobook.chapters.length) {
        setChapterIndex(saved.chapterIndex);
        // position is restored after metadata loads — see onLoadedMetadata
        if (audioRef.current) audioRef.current.dataset.resumeTo = String(saved.position ?? 0);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist current position
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ chapterIndex, position: currentTime }));
    } catch {
      /* ignore */
    }
  }, [chapterIndex, currentTime, storageKey]);

  // Reload when chapter changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    setCurrentTime(0);
    setDuration(current?.durationSeconds ?? 0);
    setError(null);
    if (playing) {
      a.play().catch((e) => setError(e?.message ?? 'Playback failed.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterIndex]);

  const handlePlayPause = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch((e) => setError(e?.message ?? 'Playback failed.'));
    } else {
      a.pause();
      setPlaying(false);
    }
  }, []);

  const skip = useCallback((secs: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min((a.duration || duration) - 0.1, a.currentTime + secs));
  }, [duration]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a) return;
    const t = Number(e.target.value);
    a.currentTime = t;
    setCurrentTime(t);
  };

  const onChapterEnd = () => {
    if (chapterIndex < audiobook.chapters.length - 1) {
      setChapterIndex(chapterIndex + 1);
    } else {
      setPlaying(false);
    }
  };

  const onLoadedMetadata = () => {
    const a = audioRef.current;
    if (!a) return;
    setDuration(a.duration);
    const resumeTo = a.dataset.resumeTo ? Number(a.dataset.resumeTo) : 0;
    if (resumeTo > 0 && resumeTo < a.duration) {
      a.currentTime = resumeTo;
    }
    delete a.dataset.resumeTo;
  };

  const totalElapsed = useMemo(() => {
    const before = audiobook.chapters
      .slice(0, chapterIndex)
      .reduce((s, c) => s + c.durationSeconds, 0);
    return before + currentTime;
  }, [audiobook.chapters, chapterIndex, currentTime]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-pink-200">
      <div className="flex flex-col md:flex-row">
        {/* Cover + transport */}
        <div className="md:w-1/2 p-6 bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 flex flex-col items-center">
          <img
            src={audiobook.coverUrl}
            alt={`${bookTitle} cover`}
            className="w-full max-w-sm aspect-square object-cover rounded-2xl shadow-xl mb-4 border-2 border-white"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="text-center mb-4">
            <h2 className="font-extrabold text-2xl text-gray-900">{bookTitle}</h2>
            <p className="text-sm text-gray-600 mt-1">{audiobook.narrators}</p>
            <p className="text-xs text-gray-500 mt-1">
              {audiobook.chapters.length} chapters · {formatSeconds(audiobook.totalSeconds)} total
            </p>
          </div>

          <div className="w-full">
            <p className="text-sm font-semibold text-gray-700 truncate text-center mb-2">
              {current?.title ?? '—'}
            </p>
            <input
              type="range"
              min={0}
              max={duration || current?.durationSeconds || 1}
              step={1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-pink-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>{formatSeconds(currentTime)}</span>
              <span>{formatSeconds(duration || current?.durationSeconds || 0)}</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => skip(-15)}
                className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold transition-colors"
                aria-label="Back 15 seconds"
              >
                « 15
              </button>
              <button
                onClick={() => setChapterIndex(Math.max(0, chapterIndex - 1))}
                disabled={chapterIndex === 0}
                className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-gray-800 text-sm font-semibold transition-colors"
                aria-label="Previous chapter"
              >
                ⏮
              </button>
              <button
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white text-3xl shadow-xl transition-all"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? '⏸' : '▶'}
              </button>
              <button
                onClick={() => setChapterIndex(Math.min(audiobook.chapters.length - 1, chapterIndex + 1))}
                disabled={chapterIndex === audiobook.chapters.length - 1}
                className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-gray-800 text-sm font-semibold transition-colors"
                aria-label="Next chapter"
              >
                ⏭
              </button>
              <button
                onClick={() => skip(30)}
                className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold transition-colors"
                aria-label="Forward 30 seconds"
              >
                30 »
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4 text-xs text-gray-600">
              <span>🔊</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVolume(v);
                  if (audioRef.current) audioRef.current.volume = v;
                }}
                className="flex-1 accent-pink-500"
                aria-label="Volume"
              />
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              Elapsed in book: {formatSeconds(totalElapsed)} / {formatSeconds(audiobook.totalSeconds)}
            </div>

            <div className="flex gap-2 mt-4">
              <a
                href={audiobook.fullMp3}
                download
                className="flex-1 text-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold py-2 px-3 rounded-full transition-colors"
              >
                ⬇ MP3
              </a>
              <a
                href={audiobook.fullM4b}
                download
                className="flex-1 text-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold py-2 px-3 rounded-full transition-colors"
              >
                ⬇ M4B
              </a>
            </div>

            {error && (
              <p className="text-xs text-red-600 mt-3 text-center">
                {error} — chapter file may not be uploaded yet.
              </p>
            )}
          </div>
        </div>

        {/* Chapter list */}
        <div className="md:w-1/2 max-h-[600px] overflow-y-auto p-6">
          <h3 className="font-bold text-lg text-gray-900 mb-3">Chapters</h3>
          <ul className="space-y-1">
            {audiobook.chapters.map((ch, i) => {
              const isCurrent = i === chapterIndex;
              return (
                <li key={ch.number}>
                  <button
                    onClick={() => setChapterIndex(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex justify-between items-center transition-colors ${
                      isCurrent
                        ? 'bg-gradient-to-r from-pink-100 to-yellow-100 border-l-4 border-pink-500'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span
                      className={`text-sm ${
                        isCurrent ? 'text-gray-900 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {ch.title}
                    </span>
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                      {formatSeconds(ch.durationSeconds)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={current?.file}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onChapterEnd}
        onError={() => setError('Could not load audio.')}
        preload="metadata"
      />
    </div>
  );
};

export default MGCUAudiobookPlayer;

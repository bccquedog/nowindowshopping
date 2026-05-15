import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  NotebookTabs,
  PlayCircle,
  ShieldCheck,
  Target,
  TrendingUp,
  UserRound,
  Video,
} from 'lucide-react';
import { useAuth, useSessions, useGoals, useNotes } from '../context';
import VideoChat from '../../components/VideoChat';

const formatDate = (value?: string) => {
  if (!value) return 'Not scheduled';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const clampProgress = (value: number) => Math.min(100, Math.max(0, value));

const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
    <p className="text-sm font-extrabold text-slate-900">{title}</p>
    <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
  </div>
);

export const ClientPortal: React.FC = () => {
  const { user, logout } = useAuth();
  const { sessions } = useSessions();
  const { goals } = useGoals();
  const { notes } = useNotes();
  const [showVideoChat, setShowVideoChat] = useState(false);

  const clientSessions = useMemo(
    () => sessions.filter((session) => session.clientId === user?.id),
    [sessions, user?.id]
  );
  const clientGoals = useMemo(
    () => goals.filter((goal) => goal.clientId === user?.id),
    [goals, user?.id]
  );
  const clientNotes = useMemo(
    () =>
      notes
        .filter((note) => note.clientId === user?.id && !note.isPrivate)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [notes, user?.id]
  );

  const upcomingSessions = useMemo(
    () =>
      clientSessions
        .filter((session) => session.status === 'scheduled')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [clientSessions]
  );
  const completedSessions = clientSessions.filter((session) => session.status === 'completed');
  const activeGoals = clientGoals.filter((goal) => goal.status === 'in-progress');
  const nextSession = upcomingSessions[0];
  const averageProgress = activeGoals.length
    ? Math.round(activeGoals.reduce((total, goal) => total + clampProgress(goal.progress), 0) / activeGoals.length)
    : 0;
  const actionItems = nextSession?.actionItems || activeGoals.flatMap((goal) => goal.milestones || []).filter((milestone) => !milestone.completed).map((milestone) => milestone.title);

  const metrics = [
    {
      label: 'Upcoming',
      value: upcomingSessions.length,
      helper: nextSession ? `${formatDate(nextSession.date)} at ${nextSession.startTime}` : 'No session scheduled',
      icon: CalendarDays,
    },
    {
      label: 'Completed',
      value: completedSessions.length,
      helper: 'coaching sessions logged',
      icon: CheckCircle2,
    },
    {
      label: 'Goals',
      value: activeGoals.length,
      helper: `${averageProgress}% average progress`,
      icon: Target,
    },
    {
      label: 'Notes',
      value: clientNotes.length,
      helper: 'shared notes available',
      icon: NotebookTabs,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/hub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              aria-label="Back to hub"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">CoachCare</p>
              <h1 className="text-lg font-extrabold tracking-normal text-slate-950 sm:text-xl">Client Portal</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 sm:flex">
              <UserRound className="h-4 w-4" />
              {user?.name || 'Client'}
            </div>
            <button
              onClick={logout}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-lg bg-slate-950 text-white">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.82fr] lg:p-10">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-bold text-amber-200">
                <ShieldCheck className="h-4 w-4" />
                Private coaching workspace
              </div>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-normal sm:text-4xl">
                Welcome back, {user?.name?.split(' ')[0] || 'there'}.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                Your portal now gathers the next session, active goals, shared notes, and support options in one place so you can keep moving between appointments.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/coachcare/booking"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-base font-bold text-slate-950 transition hover:bg-amber-300"
                >
                  <CalendarDays className="h-5 w-5" />
                  Schedule session
                </Link>
                <button
                  onClick={() => setShowVideoChat(true)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-base font-bold text-white transition hover:bg-white hover:text-slate-950"
                >
                  <Video className="h-5 w-5" />
                  Join video room
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-200">Next session</p>
              {nextSession ? (
                <div className="mt-4">
                  <h3 className="text-2xl font-extrabold tracking-normal">{nextSession.title}</h3>
                  <div className="mt-4 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-teal-300" />
                      {formatDate(nextSession.date)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-teal-300" />
                      {nextSession.startTime} to {nextSession.endTime}
                    </span>
                    <span className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-teal-300" />
                      {nextSession.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-teal-300" />
                      {nextSession.type.replace('-', ' ')}
                    </span>
                  </div>
                  {nextSession.notes && (
                    <p className="mt-5 rounded-md bg-white/10 p-4 text-sm leading-6 text-white/75">
                      {nextSession.notes}
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-white/70">
                  No upcoming session is scheduled. Book a consultation or send a message when you are ready.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => {
            const MetricIcon = metric.icon;

            return (
              <article key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{metric.label}</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-normal text-slate-950">{metric.value}</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-700 text-white">
                    <MetricIcon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{metric.helper}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Goals</p>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-slate-950">Current focus</h2>
                </div>
                <Target className="h-6 w-6 text-amber-600" />
              </div>

              <div className="mt-5 space-y-4">
                {activeGoals.length ? (
                  activeGoals.map((goal) => (
                    <div key={goal.id} className="rounded-lg border border-slate-200 bg-stone-50 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-extrabold text-slate-950">{goal.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{goal.description}</p>
                        </div>
                        <span className="rounded-md bg-white px-3 py-1 text-sm font-extrabold text-teal-700 shadow-sm">
                          {clampProgress(goal.progress)}%
                        </span>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-teal-700 transition-all"
                          style={{ width: `${clampProgress(goal.progress)}%` }}
                        />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        <span>{goal.category.replace('-', ' ')}</span>
                        <span>Target {formatDate(goal.targetDate)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No active goals yet"
                    description="Once goals are assigned, they will show progress, targets, and milestones here."
                  />
                )}
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Sessions</p>
                  <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-slate-950">Upcoming schedule</h2>
                </div>
                <CalendarDays className="h-6 w-6 text-amber-600" />
              </div>

              <div className="mt-5 space-y-3">
                {upcomingSessions.length ? (
                  upcomingSessions.slice(0, 5).map((session) => (
                    <div key={session.id} className="grid gap-3 rounded-lg border border-slate-200 bg-stone-50 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <h3 className="font-extrabold text-slate-950">{session.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {session.type.replace('-', ' ')} session, {session.duration} minutes
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-extrabold text-slate-950">{formatDate(session.date)}</p>
                        <p className="text-sm font-semibold text-slate-500">{session.startTime}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No upcoming sessions"
                    description="Use the schedule button to request a new time with your coach."
                  />
                )}
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Action items</p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-normal text-slate-950">Between now and next time</h2>
                </div>
                <PlayCircle className="h-6 w-6 text-amber-600" />
              </div>

              <div className="mt-5 space-y-3">
                {actionItems.length ? (
                  actionItems.slice(0, 5).map((item) => (
                    <div key={item} className="flex gap-3 rounded-lg bg-stone-50 p-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-teal-700" />
                      <p className="text-sm font-semibold leading-6 text-slate-700">{item}</p>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No action items"
                    description="Action steps from your coach will appear here after a session."
                  />
                )}
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Notes</p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-normal text-slate-950">Recent coach notes</h2>
                </div>
                <FileText className="h-6 w-6 text-amber-600" />
              </div>

              <div className="mt-5 space-y-3">
                {clientNotes.length ? (
                  clientNotes.slice(0, 3).map((note) => (
                    <div key={note.id} className="rounded-lg border border-slate-200 bg-stone-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-extrabold text-slate-950">{note.title}</h3>
                        <span className="rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-500">
                          {note.priority}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{note.content}</p>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                        {formatDate(note.createdAt)}
                      </p>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No shared notes"
                    description="Public session notes and resources will collect here."
                  />
                )}
              </div>
            </article>

            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Quick help</p>
              <div className="mt-4 grid gap-3">
                <a
                  href="mailto:NoWindowShoppingOnline@gmail.com"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  Email coach
                </a>
                <Link
                  to="/support"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
                >
                  <LifeBuoy className="h-4 w-4" />
                  Open support ticket
                </Link>
                <Link
                  to="/feedback"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send feedback
                </Link>
              </div>
            </article>
          </aside>
        </section>
      </main>

      {showVideoChat && (
        <VideoChat
          roomUrl="https://nowindowshopping.daily.co/client-session"
          roomName={nextSession?.title || 'Client Session'}
          sessionType="coaching"
          participants={[
            { id: '1', name: 'Coach', role: 'coach' },
            { id: '2', name: user?.name || 'Client', role: 'client' },
          ]}
          onClose={() => setShowVideoChat(false)}
          onSessionEnd={(duration) => {
            console.log(`Client session ended. Duration: ${duration}ms`);
            setShowVideoChat(false);
          }}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  LockKeyhole,
  MessageSquare,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';
import { LoginScreen } from './LoginScreen';

const accessPoints = [
  'Session schedule and video access',
  'Active goals and coaching milestones',
  'Shared notes, action items, and support links',
];

const audienceCards = [
  {
    title: 'Clients',
    description: 'See what is next, review progress, and keep action items visible between sessions.',
    icon: Target,
  },
  {
    title: 'Coaches',
    description: 'Manage relationships, sessions, notes, and follow-up rhythms from one workspace.',
    icon: Users,
  },
  {
    title: 'Administrators',
    description: 'Keep operations, requests, and client experience details organized behind the scenes.',
    icon: ClipboardCheck,
  },
];

export const CoachCareLanding: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <LoginScreen />;
  }

  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/hub"
            className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to hub
          </Link>
          <Link
            to="/support"
            className="hidden min-h-10 items-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-bold text-slate-700 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white sm:inline-flex"
          >
            <MessageSquare className="h-4 w-4" />
            Support
          </Link>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-bold text-amber-200">
              <LockKeyhole className="h-4 w-4" />
              CoachCare access
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">
              Coaching work should feel organized before and after the session.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
              CoachCare gives clients and coaches a cleaner place to track the relationship: schedule, goals, notes, and next steps.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setShowLogin(true)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-base font-bold text-slate-950 transition hover:bg-amber-300"
              >
                <ShieldCheck className="h-5 w-5" />
                Sign in
              </button>
              <Link
                to="/coachcare/booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-base font-bold text-white transition hover:bg-white hover:text-slate-950"
              >
                <CalendarDays className="h-5 w-5" />
                Book consultation
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-300">Inside the portal</p>
            <div className="mt-5 space-y-4">
              {accessPoints.map((point) => (
                <div key={point} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-amber-300" />
                  <p className="text-sm font-semibold leading-6 text-white/80">{point}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {audienceCards.map((card) => {
            const CardIcon = card.icon;

            return (
              <article key={card.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal-700 text-white">
                  <CardIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-xl font-extrabold tracking-normal text-slate-950">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">New client?</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950">Start with a consultation.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The best first step is a short conversation about goals, fit, and the right coaching path.
            </p>
          </div>
          <Link
            to="/coachcare/booking"
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-base font-bold text-white transition hover:bg-teal-800 sm:mt-0"
          >
            Schedule now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Code2,
  GraduationCap,
  Handshake,
  PenLine,
  Presentation,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react';

type IconType = React.ElementType<{ className?: string }>;

const serviceGroups = [
  {
    eyebrow: 'Coaching',
    title: 'Leadership and professional growth',
    description: 'Focused coaching for professionals who need clarity, confidence, and a practical rhythm for progress.',
    icon: GraduationCap,
    items: ['Executive coaching', 'Career strategy', 'Accountability planning', 'Communication development'],
  },
  {
    eyebrow: 'Training',
    title: 'Workshops and team development',
    description: 'Facilitated sessions that help teams align around behavior, expectations, and better daily execution.',
    icon: Presentation,
    items: ['Leadership workshops', 'Professional development', 'Team communication', 'New manager support'],
  },
  {
    eyebrow: 'Digital',
    title: 'Websites, portals, and support systems',
    description: 'Practical digital tools for small businesses and solo operators who need a cleaner client experience.',
    icon: Code2,
    items: ['Website refreshes', 'Client portals', 'Support intake', 'Lightweight business tools'],
  },
];

const processSteps = [
  {
    title: 'Diagnose',
    description: 'Clarify the current friction, audience, timeline, and what success needs to look like.',
    icon: ClipboardList,
  },
  {
    title: 'Design',
    description: 'Shape the coaching plan, workshop, site map, or portal flow before execution begins.',
    icon: Target,
  },
  {
    title: 'Deliver',
    description: 'Move from plan to finished work with useful checkpoints, clean communication, and next steps.',
    icon: BadgeCheck,
  },
];

const fitSignals = [
  'You want coaching that turns into visible action, not vague inspiration.',
  'You need a stronger digital front door for your business or personal brand.',
  'Your clients need a cleaner way to schedule, submit requests, and track progress.',
  'Your team needs practical training that connects to real workplace habits.',
];

const IconBlock = ({ icon: Icon, dark = false }: { icon: IconType; dark?: boolean }) => (
  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${dark ? 'bg-slate-950 text-white' : 'bg-amber-400 text-slate-950'}`}>
    <Icon className="h-5 w-5" />
  </span>
);

const Services: React.FC = () => {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.78fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">What we offer</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">
              Coaching, training, and digital systems that help people move.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              No Window Shopping blends professional development with practical execution, so the message, system, and client experience all support the same direction.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/coachcare/booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-base font-bold text-slate-950 transition hover:bg-amber-300"
              >
                <CalendarDays className="h-5 w-5" />
                Book a consultation
              </Link>
              <Link
                to="/support"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-base font-bold text-white transition hover:bg-white hover:text-slate-950"
              >
                <ShieldCheck className="h-5 w-5" />
                Ask a question
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
            <div className="flex items-start gap-4">
              <IconBlock icon={Handshake} />
              <div>
                <h2 className="text-xl font-extrabold tracking-normal">Best fit</h2>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Professionals, small businesses, teams, and creators who need both strategy and a polished way to serve people online.
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {fitSignals.map((signal) => (
                <div key={signal} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-teal-300" />
                  <p className="text-sm leading-6 text-white/80">{signal}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-3">
            {serviceGroups.map((group, index) => (
              <article key={group.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <IconBlock icon={group.icon} dark={index !== 1} />
                  <span className="rounded-md bg-stone-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                    {group.eyebrow}
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-extrabold tracking-normal text-slate-950">{group.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{group.description}</p>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="h-4 w-4 flex-none text-teal-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">How it works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-slate-950">
              A simple process with enough structure to keep the work moving.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The goal is not to make the process feel bigger than the outcome. The goal is clear decisions, clear deliverables, and a client experience that feels handled.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;

              return (
                <article key={step.title} className="rounded-lg border border-slate-200 bg-stone-50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-950 text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <StepIcon className="h-5 w-5 text-amber-600" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold tracking-normal text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
              <BriefcaseBusiness className="h-4 w-4" />
              Ready when you are
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-slate-950">
              Bring the next project, problem, or goal into focus.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Start with a consultation or send a support request if you already know what you need.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/coachcare/booking"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-base font-bold text-white transition hover:bg-teal-800"
            >
              <Users className="h-5 w-5" />
              Start with coaching
            </Link>
            <Link
              to="/tech-clients"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-3 text-base font-bold text-slate-900 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
            >
              <PenLine className="h-5 w-5" />
              Open client portal
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;

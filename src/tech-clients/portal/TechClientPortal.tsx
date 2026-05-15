import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CircleDollarSign,
  Clock3,
  Code2,
  ExternalLink,
  Github,
  Globe,
  LifeBuoy,
  LockKeyhole,
  LogOut,
  Mail,
  Plus,
  ShieldCheck,
  Sparkles,
  Ticket,
  TriangleAlert,
} from 'lucide-react';
import {
  getClientProjects,
  getClientTickets,
  createTechTicket,
  TechProject,
  TechTicket,
  TicketPriority,
} from '../techClientService';

const CLIENT_ID = 'client-1';

const fallbackProjects: TechProject[] = [
  {
    id: 'portal-refresh',
    clientId: CLIENT_ID,
    title: 'Client Portal Refresh',
    description: 'Upgrade the client-facing dashboard so project status, support, and next steps are easier to understand.',
    status: 'in-progress',
    startDate: new Date('2026-04-01'),
    budget: 4200,
    spent: 2600,
    liveUrl: 'https://nowindowshopping.com/tech-clients',
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-04-20'),
  },
  {
    id: 'support-workflow',
    clientId: CLIENT_ID,
    title: 'Support Workflow Setup',
    description: 'Create a cleaner intake and triage path for maintenance, bug reports, and small feature requests.',
    status: 'testing',
    startDate: new Date('2026-03-15'),
    budget: 1800,
    spent: 1450,
    createdAt: new Date('2026-03-15'),
    updatedAt: new Date('2026-04-18'),
  },
];

const fallbackTickets: TechTicket[] = [
  {
    id: 'ticket-1',
    clientId: CLIENT_ID,
    projectId: 'portal-refresh',
    title: 'Review homepage portal links',
    description: 'Confirm the updated portal links match the preferred client flow.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date('2026-04-21'),
    updatedAt: new Date('2026-04-22'),
  },
  {
    id: 'ticket-2',
    clientId: CLIENT_ID,
    projectId: 'support-workflow',
    title: 'Add billing category to support form',
    description: 'Support form should route billing questions separately from technical requests.',
    status: 'open',
    priority: 'low',
    createdAt: new Date('2026-04-17'),
    updatedAt: new Date('2026-04-17'),
  },
];

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'requests', label: 'Requests' },
] as const;

type PortalTab = (typeof tabs)[number]['id'];

const toDate = (value: unknown) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate?: unknown }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate();
  }
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value: unknown) => {
  const date = toDate(value);
  if (!date) return 'Not set';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const money = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

const budgetProgress = (project: TechProject) => {
  if (!project.budget) return 0;
  return Math.min(100, Math.round((project.spent / project.budget) * 100));
};

const statusClass = (status: string) => {
  const classes: Record<string, string> = {
    planning: 'bg-slate-100 text-slate-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    testing: 'bg-amber-100 text-amber-800',
    completed: 'bg-green-100 text-green-700',
    'on-hold': 'bg-rose-100 text-rose-700',
    open: 'bg-blue-100 text-blue-700',
    resolved: 'bg-green-100 text-green-700',
    closed: 'bg-slate-100 text-slate-700',
  };

  return classes[status] || 'bg-slate-100 text-slate-700';
};

const priorityClass = (priority: TicketPriority) => {
  const classes: Record<TicketPriority, string> = {
    low: 'bg-slate-100 text-slate-600',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-amber-100 text-amber-800',
    urgent: 'bg-rose-100 text-rose-700',
  };

  return classes[priority];
};

const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
    <p className="font-extrabold text-slate-950">{title}</p>
    <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
  </div>
);

const TechClientPortal: React.FC = () => {
  const [projects, setProjects] = useState<TechProject[]>([]);
  const [tickets, setTickets] = useState<TechTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<PortalTab>('overview');
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    priority: 'medium' as TicketPriority,
    projectId: '',
  });

  const navigate = useNavigate();

  const openTickets = tickets.filter((ticket) => ticket.status === 'open' || ticket.status === 'in-progress');
  const totalBudget = projects.reduce((total, project) => total + project.budget, 0);
  const totalSpent = projects.reduce((total, project) => total + project.spent, 0);
  const newestTicket = useMemo(
    () => [...tickets].sort((a, b) => (toDate(b.createdAt)?.getTime() || 0) - (toDate(a.createdAt)?.getTime() || 0))[0],
    [tickets]
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password === 'nws-client') {
      setIsAuthenticated(true);
      setError('');
      return;
    }

    setError('Please check your email and client access password.');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectsData, ticketsData] = await Promise.all([
        getClientProjects(CLIENT_ID),
        getClientTickets(CLIENT_ID),
      ]);
      setProjects(projectsData.length ? projectsData : fallbackProjects);
      setTickets(ticketsData.length ? ticketsData : fallbackTickets);
    } catch (err) {
      console.error('Failed to load portal data:', err);
      setProjects(fallbackProjects);
      setTickets(fallbackTickets);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextTicket: TechTicket = {
      id: `local-${Date.now()}`,
      clientId: CLIENT_ID,
      projectId: ticketData.projectId || undefined,
      title: ticketData.title,
      description: ticketData.description,
      priority: ticketData.priority,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTickets((current) => [nextTicket, ...current]);
    setShowTicketForm(false);
    setTicketData({ title: '', description: '', priority: 'medium', projectId: '' });
    setActiveTab('requests');

    try {
      await createTechTicket({
        clientId: CLIENT_ID,
        projectId: ticketData.projectId || undefined,
        title: ticketData.title,
        description: ticketData.description,
        priority: ticketData.priority,
        status: 'open',
      });
      await loadData();
    } catch (err) {
      console.error('Failed to sync ticket, keeping local copy:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <section>
            <button
              onClick={() => navigate('/hub')}
              className="mb-8 inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to hub
            </button>

            <div className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-bold text-amber-200">
              <LockKeyhole className="h-4 w-4" />
              Secure client access
            </div>
            <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-normal sm:text-5xl">
              Project clarity without chasing updates.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
              View active work, budget signals, open requests, and support history from one focused workspace.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Projects', value: fallbackProjects.length, icon: BriefcaseBusiness },
                { label: 'Open requests', value: fallbackTickets.length, icon: Ticket },
                { label: 'Response path', value: '24h', icon: LifeBuoy },
              ].map((item) => {
                const ItemIcon = item.icon;

                return (
                  <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                    <ItemIcon className="h-5 w-5 text-teal-300" />
                    <p className="mt-3 text-2xl font-extrabold">{item.value}</p>
                    <p className="mt-1 text-sm font-semibold text-white/60">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white p-6 text-slate-950 shadow-2xl sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Tech portal</p>
                <h2 className="text-2xl font-extrabold tracking-normal">Sign in</h2>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                  placeholder="you@company.com"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-base outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                  placeholder="Client access password"
                  required
                />
              </div>
              {error && (
                <p className="rounded-md bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-base font-bold text-white transition hover:bg-teal-800"
              >
                Sign in
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-6 rounded-lg bg-stone-50 p-4 text-sm leading-6 text-slate-600">
              Client portal access is managed by No Window Shopping. Contact support if you need a password reset or project access update.
            </div>
          </section>
        </div>
      </main>
    );
  }

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
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">No Window Shopping</p>
              <h1 className="text-lg font-extrabold tracking-normal text-slate-950 sm:text-xl">Tech Client Portal</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTicketForm(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-amber-400 px-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New request</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
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
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.86fr] lg:p-10">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-bold text-amber-200">
                <Sparkles className="h-4 w-4" />
                Client command center
              </div>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-normal sm:text-4xl">
                Active work, open requests, and budget signals in one place.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                The portal is shaped for quick scans: what is moving, what needs attention, and where to submit the next request.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-200">Snapshot</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Snapshot label="Active projects" value={projects.length} icon={BriefcaseBusiness} />
                <Snapshot label="Open requests" value={openTickets.length} icon={Ticket} />
                <Snapshot label="Budget spent" value={`${totalBudget ? Math.round((totalSpent / totalBudget) * 100) : 0}%`} icon={CircleDollarSign} />
                <Snapshot label="Latest ticket" value={newestTicket ? formatDate(newestTicket.createdAt) : 'None'} icon={Clock3} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-10 rounded-md px-4 text-sm font-bold transition ${
                activeTab === tab.id
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </section>

        {loading ? (
          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-44 animate-pulse rounded-lg border border-slate-200 bg-white" />
            ))}
          </section>
        ) : (
          <>
            {activeTab === 'overview' && (
              <section className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="space-y-6">
                  <ProjectList projects={projects.slice(0, 2)} compact />
                </div>
                <div className="space-y-6">
                  <TicketList tickets={openTickets.slice(0, 4)} projects={projects} />
                  <QuickContact />
                </div>
              </section>
            )}

            {activeTab === 'projects' && (
              <section className="mt-6">
                <ProjectList projects={projects} />
              </section>
            )}

            {activeTab === 'requests' && (
              <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.42fr]">
                <TicketList tickets={tickets} projects={projects} />
                <QuickContact />
              </section>
            )}
          </>
        )}
      </main>

      {showTicketForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-4 bg-slate-950 p-5 text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Support</p>
                <h2 className="text-xl font-extrabold tracking-normal">New request</h2>
              </div>
              <button
                onClick={() => setShowTicketForm(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close ticket form"
              >
                x
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Subject</label>
                <input
                  type="text"
                  required
                  value={ticketData.title}
                  onChange={(event) => setTicketData({ ...ticketData, title: event.target.value })}
                  className="min-h-12 w-full rounded-md border border-slate-300 px-4 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                  placeholder="What do you need help with?"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Project</label>
                <select
                  value={ticketData.projectId}
                  onChange={(event) => setTicketData({ ...ticketData, projectId: event.target.value })}
                  className="min-h-12 w-full rounded-md border border-slate-300 px-4 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                >
                  <option value="">General support</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Priority</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['low', 'medium', 'high', 'urgent'] as TicketPriority[]).map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setTicketData({ ...ticketData, priority })}
                      className={`min-h-10 rounded-md border px-2 text-xs font-bold uppercase transition ${
                        ticketData.priority === priority
                          ? 'border-slate-950 bg-slate-950 text-white'
                          : 'border-slate-300 bg-white text-slate-600 hover:border-slate-950'
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Details</label>
                <textarea
                  required
                  value={ticketData.description}
                  onChange={(event) => setTicketData({ ...ticketData, description: event.target.value })}
                  className="w-full rounded-md border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                  rows={5}
                  placeholder="Share the request, issue, URL, or expected outcome."
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-3 text-base font-bold text-white transition hover:bg-teal-800"
              >
                <Ticket className="h-5 w-5" />
                Submit request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Snapshot = ({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon: React.ElementType<{ className?: string }> }) => (
  <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
    <Icon className="h-5 w-5 text-teal-300" />
    <p className="mt-3 text-2xl font-extrabold tracking-normal">{value}</p>
    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/60">{label}</p>
  </div>
);

const ProjectList = ({ projects, compact = false }: { projects: TechProject[]; compact?: boolean }) => (
  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Projects</p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-slate-950">
          {compact ? 'Current work' : 'All active work'}
        </h2>
      </div>
      <Code2 className="h-6 w-6 text-amber-600" />
    </div>

    <div className="mt-5 space-y-4">
      {projects.length ? (
        projects.map((project) => (
          <div key={project.id} className="rounded-lg border border-slate-200 bg-stone-50 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className={`inline-flex rounded-md px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] ${statusClass(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </span>
                <h3 className="mt-3 text-xl font-extrabold tracking-normal text-slate-950">{project.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{project.description}</p>
              </div>
              <div className="flex gap-2">
                {project.githubRepo && (
                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm transition hover:bg-slate-950 hover:text-white"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm transition hover:bg-teal-700 hover:text-white"
                    aria-label={`${project.title} live site`}
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-4">
              <ProjectStat label="Started" value={formatDate(project.startDate)} />
              <ProjectStat label="Budget" value={money(project.budget)} />
              <ProjectStat label="Spent" value={money(project.spent)} />
              <ProjectStat label="Progress" value={`${budgetProgress(project)}%`} />
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-teal-700" style={{ width: `${budgetProgress(project)}%` }} />
            </div>
          </div>
        ))
      ) : (
        <EmptyState title="No projects yet" description="Projects assigned to this client account will appear here." />
      )}
    </div>
  </article>
);

const ProjectStat = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
    <p className="mt-1 font-extrabold text-slate-950">{value}</p>
  </div>
);

const TicketList = ({ tickets, projects }: { tickets: TechTicket[]; projects: TechProject[] }) => (
  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Requests</p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-slate-950">Support queue</h2>
      </div>
      <Ticket className="h-6 w-6 text-amber-600" />
    </div>

    <div className="mt-5 space-y-3">
      {tickets.length ? (
        tickets.map((ticket) => {
          const project = projects.find((item) => item.id === ticket.projectId);

          return (
            <div key={ticket.id} className="rounded-lg border border-slate-200 bg-stone-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-slate-950">{ticket.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{ticket.description}</p>
                </div>
                <TriangleAlert className={`h-5 w-5 flex-none ${ticket.priority === 'urgent' ? 'text-rose-600' : 'text-amber-600'}`} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`rounded-md px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] ${statusClass(ticket.status)}`}>
                  {ticket.status.replace('-', ' ')}
                </span>
                <span className={`rounded-md px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] ${priorityClass(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                {project && (
                  <span className="rounded-md bg-white px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                    {project.title}
                  </span>
                )}
                <span className="rounded-md bg-white px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  {formatDate(ticket.createdAt)}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <EmptyState title="No requests yet" description="When you submit support tickets, they will appear here with status and priority." />
      )}
    </div>
  </article>
);

const QuickContact = () => (
  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Quick contact</p>
    <div className="mt-4 grid gap-3">
      <a
        href="mailto:NoWindowShoppingOnline@gmail.com"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
      >
        <Mail className="h-4 w-4" />
        Email support
      </a>
      <Link
        to="/support"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
      >
        <LifeBuoy className="h-4 w-4" />
        Public support form
      </Link>
      <Link
        to="/softwarehub"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
      >
        <ExternalLink className="h-4 w-4" />
        Software hub
      </Link>
    </div>
  </article>
);

export default TechClientPortal;

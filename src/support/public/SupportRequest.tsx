import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Clock3,
  LifeBuoy,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  Tag,
  UserRound,
} from 'lucide-react';
import { createGlobalTicket, TicketCategory, TicketPriority } from '../supportService';

const categories: { value: TicketCategory; label: string }[] = [
  { value: 'technical', label: 'Technical Support' },
  { value: 'billing', label: 'Billing and Payments' },
  { value: 'coaching', label: 'Coaching Services' },
  { value: 'webstore', label: 'Web Store Order' },
  { value: 'raffle', label: 'Raffle Inquiry' },
  { value: 'other', label: 'Other' },
];

const priorities: { value: TicketPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const SupportRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'technical' as TicketCategory,
    priority: 'medium' as TicketPriority,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await createGlobalTicket(formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit support request:', err);
      setError('We could not submit the request yet. Please try again or email NoWindowShoppingOnline@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-10 text-slate-950 sm:px-6">
        <section className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-lg bg-teal-700 text-white">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Ticket received</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-normal text-slate-950">We have your request.</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              A response will be sent to <span className="font-bold text-slate-950">{formData.email}</span>. Keep an eye on your inbox for next steps.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => navigate('/hub')}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-base font-bold text-white transition hover:bg-teal-800"
              >
                Back to hub
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    category: 'technical',
                    priority: 'medium',
                  });
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-3 text-base font-bold text-slate-900 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                New request
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
              <h1 className="text-lg font-extrabold tracking-normal sm:text-xl">Support Center</h1>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <aside className="rounded-lg bg-slate-950 p-6 text-white sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-bold text-amber-200">
            <LifeBuoy className="h-4 w-4" />
            Help desk
          </div>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-normal">
            Tell us what needs attention.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/70">
            Use this form for tech issues, portal access, billing questions, coaching support, store orders, or general requests.
          </p>

          <div className="mt-8 space-y-4">
            <SupportPoint icon={Clock3} title="Typical response" description="Most support requests are reviewed within 24 to 48 hours." />
            <SupportPoint icon={ShieldCheck} title="Clear routing" description="Category and urgency help route the request to the right follow-up path." />
            <SupportPoint icon={Mail} title="Direct backup" description="For anything time-sensitive, email NoWindowShoppingOnline@gmail.com." />
          </div>
        </aside>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-700">Support intake</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-slate-950">Submit a request</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Share the context, the best contact email, and what outcome you need.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Full name"
                icon={UserRound}
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                placeholder="Your name"
                type="text"
              />
              <InputField
                label="Email address"
                icon={Mail}
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                placeholder="you@example.com"
                type="email"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Category</label>
                <div className="relative">
                  <Tag className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    value={formData.category}
                    onChange={(event) => setFormData({ ...formData, category: event.target.value as TicketCategory })}
                    className="min-h-12 w-full appearance-none rounded-md border border-slate-300 bg-white pl-11 pr-4 text-base font-semibold text-slate-800 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Urgency</label>
                <div className="grid grid-cols-4 gap-2">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority: priority.value })}
                      className={`min-h-12 rounded-md border px-2 text-xs font-bold uppercase transition ${
                        formData.priority === priority.value
                          ? 'border-slate-950 bg-slate-950 text-white'
                          : 'border-slate-300 bg-white text-slate-600 hover:border-slate-950'
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Subject</label>
              <div className="relative">
                <MessageSquare className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                  className="min-h-12 w-full rounded-md border border-slate-300 bg-white pl-11 pr-4 text-base outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                  placeholder="Brief summary"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                rows={7}
                placeholder="Add details, links, order numbers, screenshots to send later, or what you expected to happen."
              />
            </div>

            {error && (
              <div className="flex gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold leading-6 text-rose-700">
                <CircleAlert className="mt-0.5 h-4 w-4 flex-none" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-3 text-base font-bold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-5 w-5" />
              {isSubmitting ? 'Submitting request...' : 'Submit support ticket'}
            </button>
          </form>
        </section>
      </section>
    </main>
  );
};

const SupportPoint = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType<{ className?: string }>;
  title: string;
  description: string;
}) => (
  <div className="flex gap-3">
    <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/10 text-teal-300">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <p className="font-extrabold">{title}</p>
      <p className="mt-1 text-sm leading-6 text-white/70">{description}</p>
    </div>
  </div>
);

const InputField = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  icon: React.ElementType<{ className?: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: 'text' | 'email';
}) => (
  <div>
    <label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-md border border-slate-300 bg-white pl-11 pr-4 text-base outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default SupportRequest;

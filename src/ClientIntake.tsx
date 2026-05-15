import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Globe, Smartphone, Layout, ShoppingCart, Cpu, Zap } from 'lucide-react';
import { submitClientIntakeForm } from './clientIntakeService';

// ── Service options ──────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  { id: 'website',   label: 'Website',        icon: Globe,         desc: 'Marketing site, portfolio, or landing page' },
  { id: 'webapp',    label: 'Web App',         icon: Layout,        desc: 'Custom browser-based application' },
  { id: 'mobile',    label: 'Mobile App',      icon: Smartphone,    desc: 'iOS and/or Android application' },
  { id: 'ecomm',     label: 'E-Commerce',      icon: ShoppingCart,  desc: 'Online store or marketplace' },
  { id: 'automation',label: 'Automation',      icon: Cpu,           desc: 'Workflows, bots, or integrations' },
  { id: 'other',     label: 'Something Else',  icon: Zap,           desc: 'Not sure yet — let\'s figure it out' },
];

// ── Validation helpers ───────────────────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone  = (v: string) => /^\+?[\d\s\-().]{7,20}$/.test(v);

// ── Step types ───────────────────────────────────────────────────────────────
type Step = 'service' | 'name' | 'email' | 'phone' | 'done';
const STEP_ORDER: Step[] = ['service', 'name', 'email', 'phone', 'done'];

// ── Slide animation variants ─────────────────────────────────────────────────
const variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
  center:               ({ opacity: 1, y: 0 }),
  exit:  (dir: number) => ({ opacity: 0, y: dir > 0 ? -40 : 40 }),
};

export default function ClientIntake() {
  const [step,        setStep]        = useState<Step>('service');
  const [direction,   setDirection]   = useState(1);
  const [serviceType, setServiceType] = useState('');
  const [name,        setName]        = useState('');
  const [email,       setEmail]       = useState('');
  const [phone,       setPhone]       = useState('');
  const [error,       setError]       = useState('');
  const [submitting,  setSubmitting]  = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus text inputs when step changes
  useEffect(() => {
    if (['name', 'email', 'phone'].includes(step)) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [step]);

  const goTo = (next: Step, dir = 1) => {
    setError('');
    setDirection(dir);
    setStep(next);
  };

  const advance = () => {
    const idx = STEP_ORDER.indexOf(step);
    goTo(STEP_ORDER[idx + 1] as Step, 1);
  };

  // ── Per-step validation & advance ───────────────────────────────────────
  const handleNext = async () => {
    if (step === 'name') {
      if (!name.trim() || name.trim().length < 2) { setError('Please enter your full name.'); return; }
      advance();
    } else if (step === 'email') {
      if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return; }
      advance();
    } else if (step === 'phone') {
      if (!isValidPhone(phone)) { setError('Please enter a valid phone number.'); return; }
      setError('');
      setSubmitting(true);
      try {
        await submitClientIntakeForm({ name: name.trim(), email: email.trim(), phone: phone.trim(), serviceType });
        advance();
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNext();
  };

  const selectService = (id: string) => {
    setServiceType(id);
    setTimeout(() => advance(), 160); // brief pause so selection is visible
  };

  const stepIndex = STEP_ORDER.indexOf(step);
  const progress  = step === 'done' ? 100 : Math.round((stepIndex / (STEP_ORDER.length - 1)) * 100);

  // ── First name for personalization ───────────────────────────────────────
  const firstName = name.trim().split(' ')[0];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-0.5 bg-gray-800">
        <motion.div
          className="h-full bg-blue-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>

      {/* Brand bar */}
      <div className="px-8 py-5 flex items-center justify-between border-b border-gray-800/60">
        <a href="/" className="text-sm font-semibold tracking-wide text-gray-400 hover:text-white transition-colors">
          NWS
        </a>
        {step !== 'done' && step !== 'service' && (
          <span className="text-xs text-gray-600">
            {stepIndex} / {STEP_ORDER.length - 2}
          </span>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >

              {/* ── STEP: Service Selection ── */}
              {step === 'service' && (
                <div>
                  <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest uppercase">Let's build something</p>
                  <h1 className="text-3xl font-bold mb-2">What are you looking to create?</h1>
                  <p className="text-gray-400 mb-8">Select the service that best fits your project.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICE_OPTIONS.map(opt => {
                      const Icon = opt.icon;
                      const selected = serviceType === opt.id;
                      return (
                        <motion.button
                          key={opt.id}
                          onClick={() => selectService(opt.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                            selected
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-700 bg-gray-900 hover:border-gray-500'
                          }`}
                        >
                          <div className={`mt-0.5 p-1.5 rounded-lg ${selected ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-400'}`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-white">{opt.label}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
                          </div>
                          {selected && (
                            <div className="ml-auto">
                              <Check size={14} className="text-blue-400" />
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP: Name ── */}
              {step === 'name' && (
                <div>
                  <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest uppercase">Step 1 of 3</p>
                  <h1 className="text-3xl font-bold mb-2">What's your name?</h1>
                  <p className="text-gray-400 mb-8">We'd love to know who we're working with.</p>
                  <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value); setError(''); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Your full name"
                    className="w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 outline-none text-2xl pb-3 placeholder-gray-700 transition-colors"
                  />
                  {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                  <NextButton onClick={handleNext} disabled={!name.trim()} />
                </div>
              )}

              {/* ── STEP: Email ── */}
              {step === 'email' && (
                <div>
                  <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest uppercase">Step 2 of 3</p>
                  <h1 className="text-3xl font-bold mb-2">
                    {firstName ? `Nice to meet you, ${firstName}.` : 'Great!'} <br />
                    What's your email?
                  </h1>
                  <p className="text-gray-400 mb-8">We'll send project details and next steps here.</p>
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    onKeyDown={handleKeyDown}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 outline-none text-2xl pb-3 placeholder-gray-700 transition-colors"
                  />
                  {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                  <NextButton onClick={handleNext} disabled={!email.trim()} />
                </div>
              )}

              {/* ── STEP: Phone ── */}
              {step === 'phone' && (
                <div>
                  <p className="text-blue-400 text-sm font-mono mb-3 tracking-widest uppercase">Step 3 of 3</p>
                  <h1 className="text-3xl font-bold mb-2">And your phone number?</h1>
                  <p className="text-gray-400 mb-8">In case we need to reach you quickly about your project.</p>
                  <input
                    ref={inputRef}
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setError(''); }}
                    onKeyDown={e => { if (e.key === 'Enter' && !submitting) handleNext(); }}
                    placeholder="(555) 000-0000"
                    className="w-full bg-transparent border-b-2 border-gray-600 focus:border-blue-500 outline-none text-2xl pb-3 placeholder-gray-700 transition-colors"
                  />
                  {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                  <NextButton onClick={handleNext} disabled={!phone.trim() || submitting} loading={submitting} label="Submit" />
                </div>
              )}

              {/* ── STEP: Done ── */}
              {step === 'done' && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mx-auto mb-6"
                  >
                    <Check size={28} className="text-blue-400" />
                  </motion.div>
                  <h1 className="text-3xl font-bold mb-3">You're all set{firstName ? `, ${firstName}` : ''}!</h1>
                  <p className="text-gray-400 text-lg mb-2">
                    We've received your request and will be in touch within <span className="text-white font-medium">1–2 business days</span>.
                  </p>
                  <p className="text-gray-600 text-sm mb-10">
                    Keep an eye on <span className="text-gray-400">{email}</span> for next steps.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 rounded-lg px-5 py-2.5"
                  >
                    Back to Home
                  </a>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Back link (not on service or done) */}
          {step !== 'service' && step !== 'done' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                const idx = STEP_ORDER.indexOf(step);
                goTo(STEP_ORDER[idx - 1] as Step, -1);
              }}
              className="mt-8 text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              ← Back
            </motion.button>
          )}
        </div>
      </div>

      {/* Footer hint */}
      {['name', 'email', 'phone'].includes(step) && (
        <div className="text-center pb-6 text-xs text-gray-700">
          Press <kbd className="bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 font-mono text-gray-500">Enter ↵</kbd> to continue
        </div>
      )}
    </div>
  );
}

// ── Shared Next Button ────────────────────────────────────────────────────────
function NextButton({
  onClick,
  disabled,
  loading,
  label = 'Next',
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`mt-8 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
        disabled
          ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40'
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
          />
          Submitting...
        </span>
      ) : (
        <>
          {label} <ArrowRight size={15} />
        </>
      )}
    </motion.button>
  );
}

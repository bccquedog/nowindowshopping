import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db  = getFirestore(app);

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

type Step = 'name' | 'email' | 'rating' | 'message' | 'done';
const STEP_ORDER: Step[] = ['name', 'email', 'rating', 'message', 'done'];

const variants = {
  enter:  (dir: number) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
  center:               ({ opacity: 1, y: 0 }),
  exit:   (dir: number) => ({ opacity: 0, y: dir > 0 ? -40 : 40 }),
};

export default function FeedbackForm() {
  const [step,       setStep]       = useState<Step>('name');
  const [direction,  setDirection]  = useState(1);
  const [name,       setName]       = useState('');
  const [email,      setEmail]      = useState('');
  const [rating,     setRating]     = useState(0);
  const [hovered,    setHovered]    = useState(0);
  const [message,    setMessage]    = useState('');
  const [error,      setError]      = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef    = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (['name', 'email', 'message'].includes(step)) {
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

  const handleNext = async () => {
    if (step === 'name') {
      if (!name.trim() || name.trim().length < 2) { setError('Please enter your name.'); return; }
      advance();
    } else if (step === 'email') {
      if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return; }
      advance();
    } else if (step === 'rating') {
      if (!rating) { setError('Please select a rating.'); return; }
      advance();
    } else if (step === 'message') {
      if (!message.trim() || message.trim().length < 5) { setError('Please share a brief message.'); return; }
      setError('');
      setSubmitting(true);
      try {
        await addDoc(collection(db, 'feedback_forms'), {
          name: name.trim(),
          email: email.trim(),
          rating,
          message: message.trim(),
          status: 'new',
          createdAt: serverTimestamp(),
        });
        advance();
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const stepIndex = STEP_ORDER.indexOf(step);
  const progress  = step === 'done' ? 100 : Math.round((stepIndex / (STEP_ORDER.length - 1)) * 100);
  const firstName = name.trim().split(' ')[0];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-0.5 bg-gray-800">
        <motion.div
          className="h-full bg-yellow-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>

      {/* Brand bar */}
      <div className="px-8 py-5 flex items-center justify-between border-b border-gray-800/60">
        <a href="/" className="text-sm font-semibold tracking-wide text-gray-400 hover:text-white transition-colors">
          NWS
        </a>
        {step !== 'done' && (
          <span className="text-xs text-gray-600">{stepIndex} / {STEP_ORDER.length - 1}</span>
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

              {/* ── Name ── */}
              {step === 'name' && (
                <div>
                  <p className="text-yellow-400 text-sm font-mono mb-3 tracking-widest uppercase">Step 1 of 4</p>
                  <h1 className="text-3xl font-bold mb-2">What's your name?</h1>
                  <p className="text-gray-400 mb-8">We'd love to know who's sharing this feedback.</p>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value); setError(''); }}
                    onKeyDown={handleKey}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b-2 border-gray-600 focus:border-yellow-400 outline-none text-2xl pb-3 placeholder-gray-700 transition-colors"
                  />
                  {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                  <NextButton onClick={handleNext} disabled={!name.trim()} accent="yellow" />
                </div>
              )}

              {/* ── Email ── */}
              {step === 'email' && (
                <div>
                  <p className="text-yellow-400 text-sm font-mono mb-3 tracking-widest uppercase">Step 2 of 4</p>
                  <h1 className="text-3xl font-bold mb-2">
                    {firstName ? `Thanks, ${firstName}.` : 'Got it.'} <br />
                    What's your email?
                  </h1>
                  <p className="text-gray-400 mb-8">We may follow up if we have questions.</p>
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    onKeyDown={handleKey}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-b-2 border-gray-600 focus:border-yellow-400 outline-none text-2xl pb-3 placeholder-gray-700 transition-colors"
                  />
                  {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                  <NextButton onClick={handleNext} disabled={!email.trim()} accent="yellow" />
                </div>
              )}

              {/* ── Rating ── */}
              {step === 'rating' && (
                <div>
                  <p className="text-yellow-400 text-sm font-mono mb-3 tracking-widest uppercase">Step 3 of 4</p>
                  <h1 className="text-3xl font-bold mb-2">How was your experience?</h1>
                  <p className="text-gray-400 mb-8">Rate your overall experience with NWS.</p>
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map(n => (
                      <motion.button
                        key={n}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { setRating(n); setError(''); setTimeout(() => advance(), 200); }}
                        onMouseEnter={() => setHovered(n)}
                        onMouseLeave={() => setHovered(0)}
                        className="focus:outline-none"
                        aria-label={`${n} star`}
                      >
                        <Star
                          size={40}
                          className={`transition-colors ${
                            n <= (hovered || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-700'
                          }`}
                        />
                      </motion.button>
                    ))}
                    <AnimatePresence>
                      {(hovered || rating) > 0 && (
                        <motion.span
                          key={hovered || rating}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="ml-2 text-sm text-gray-400"
                        >
                          {RATING_LABELS[hovered || rating]}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                  {rating > 0 && (
                    <NextButton onClick={handleNext} disabled={!rating} accent="yellow" />
                  )}
                </div>
              )}

              {/* ── Message ── */}
              {step === 'message' && (
                <div>
                  <p className="text-yellow-400 text-sm font-mono mb-3 tracking-widest uppercase">Step 4 of 4</p>
                  <h1 className="text-3xl font-bold mb-2">Tell us more.</h1>
                  <p className="text-gray-400 mb-8">
                    What stood out? What could we improve?
                    {rating >= 4 ? " We'd love to hear what worked." : ' Your honesty helps us grow.'}
                  </p>
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={message}
                    onChange={e => { setMessage(e.target.value); setError(''); }}
                    onKeyDown={handleKey}
                    placeholder="Share your thoughts..."
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-gray-600 focus:border-yellow-400 outline-none text-lg pb-3 placeholder-gray-700 transition-colors resize-none"
                  />
                  {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
                  <NextButton onClick={handleNext} disabled={!message.trim() || submitting} loading={submitting} label="Submit" accent="yellow" />
                </div>
              )}

              {/* ── Done ── */}
              {step === 'done' && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center mx-auto mb-6"
                  >
                    <Check size={28} className="text-yellow-400" />
                  </motion.div>
                  <h1 className="text-3xl font-bold mb-3">
                    {firstName ? `Thank you, ${firstName}!` : 'Thank you!'}
                  </h1>
                  <p className="text-gray-400 text-lg mb-10">
                    Your feedback means a lot. We read every submission and use it to get better.
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

          {/* Back link */}
          {step !== 'name' && step !== 'done' && (
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

      {/* Keyboard hint */}
      {['name', 'email', 'message'].includes(step) && (
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
  accent = 'blue',
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  accent?: 'blue' | 'yellow';
}) {
  const colors = accent === 'yellow'
    ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-yellow-900/30'
    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40';

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`mt-8 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg ${
        disabled || loading ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : colors
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
            className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full inline-block"
          />
          Submitting...
        </span>
      ) : (
        <>{label} <ArrowRight size={15} /></>
      )}
    </motion.button>
  );
}

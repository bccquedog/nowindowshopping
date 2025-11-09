import React, { useState, useRef, useEffect } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { firebaseConfig } from './firebaseConfig';
import { 
  FormField, 
  FormContainer, 
  FormButton, 
  FormSection,
  FormProgress,
  validationRules 
} from './components/FormComponents';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const services = [
  { 
    name: 'Brand Design', 
    description: 'Create a powerful visual identity that tells your story and connects with your audience. From logos to complete brand systems, we craft designs that make lasting impressions.',
    details: 'Logo design, brand identity, visual storytelling, style guides, and brand collateral for your business.',
    price: 800,
    startingAt: true,
    icon: '🎨'
  },
  { 
    name: 'Business Strategy', 
    description: 'Navigate growth challenges with confidence. Our strategic consulting helps you identify opportunities, optimize operations, and build sustainable competitive advantages.',
    details: 'Growth planning, market analysis, operational consulting, competitive positioning, and strategic roadmaps.',
    price: 1200,
    startingAt: true,
    icon: '📊'
  },
  { 
    name: 'Coaching', 
    description: 'Break through barriers and unlock your potential with personalized coaching. Whether you\'re navigating career transitions, building leadership skills, or seeking personal growth, Brian provides the guidance you need.',
    details: '1:1 or group coaching for professional or personal development. Flexible packages available to fit your journey.',
    price: 100,
    startingAt: true,
    icon: '🎯'
  },
  { 
    name: 'Content Creation', 
    description: 'Engage your audience with compelling content that drives action. Our copywriting and multimedia content strategies help you connect, convert, and grow your business.',
    details: 'Copywriting, blog posts, social media content, email campaigns, and multimedia content creation.',
    price: 300,
    startingAt: true,
    icon: '✍️'
  },
  { 
    name: 'Professional Development', 
    description: 'Invest in your most valuable asset: yourself. These focused sessions help you develop the skills, mindset, and strategies needed to thrive in today\'s competitive landscape.',
    details: 'Career, leadership, or skills development sessions tailored to your specific needs and goals.',
    price: 100,
    startingAt: true,
    icon: '📈'
  },
  { 
    name: 'Project Management', 
    description: 'Keep your projects on track and deliver results on time. From kickoff to delivery, we provide the structure, oversight, and expertise to ensure project success.',
    details: 'Project planning, execution oversight, risk management, stakeholder communication, and delivery coordination.',
    price: 600,
    startingAt: true,
    icon: '📋'
  },
  { 
    name: 'Speaking Engagement', 
    description: 'Transform your event with a powerful keynote, engaging panel discussion, or interactive workshop. Brian brings his signature "No Window Shopping" energy to every stage, delivering actionable insights that inspire real change.',
    details: 'Includes prep call, custom content creation, and up to 60 minutes on stage. Perfect for conferences, corporate events, and leadership summits.',
    price: 2500,
    startingAt: true,
    icon: '🎤'
  },
  { 
    name: 'Speech Writing', 
    description: 'Words have power. Let Brian craft a compelling speech that captures your voice and moves your audience. From boardroom presentations to keynote addresses, your message will resonate.',
    details: 'Custom-written speech (up to 20 minutes). Includes consultation, research, and 1 revision to ensure perfection.',
    price: 500,
    startingAt: true,
    icon: '✍️'
  },
  { 
    name: 'Web Development', 
    description: 'Build a digital presence that converts visitors into customers. Modern, responsive websites designed for impact, performance, and user experience.',
    details: 'Custom website development, responsive design, e-commerce solutions, and ongoing maintenance.',
    price: 1500,
    startingAt: true,
    icon: '💻'
  },
  { 
    name: 'Workshops & Training', 
    description: 'Empower your team with the skills they need to succeed. Interactive workshops and training sessions that build capabilities and drive performance improvements.',
    details: 'Custom skill-building sessions for teams and individuals, leadership development, and specialized training programs.',
    price: 900,
    startingAt: true,
    icon: '👥'
  },
];

const steps = ['Service', 'Date/Time', 'Contact', 'Review', 'Done'];

const Booking: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [validationStates, setValidationStates] = useState<Record<string, any>>({});

  // Refs for keyboard navigation
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Auto-focus appropriate field when step changes
  useEffect(() => {
    const focusMap: Record<number, React.RefObject<HTMLInputElement | null>> = {
      1: dateRef,
      2: nameRef,
    };
    
    const refToFocus = focusMap[step];
    if (refToFocus?.current) {
      setTimeout(() => refToFocus.current?.focus(), 100);
    }
  }, [step]);

  // Handle form data changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear errors when user starts typing
    
    // Real-time validation for certain fields
    if (field === 'email' || field === 'phone') {
      const rules = field === 'email' ? validationRules.email : validationRules.phone;
      const validationResult = validateField(value, rules);
      setValidationStates(prev => ({
        ...prev,
        [field]: validationResult
      }));
    }
  };

  // Validation function
  const validateField = (value: string, rules: any) => {
    if (rules.required && !value.trim()) {
      return {
        isValid: false,
        message: 'This field is required',
        type: 'error'
      };
    }

    if (value.trim() && rules.pattern && !rules.pattern.test(value)) {
      return {
        isValid: false,
        message: 'Invalid format',
        type: 'error'
      };
    }

    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        return {
          isValid: false,
          message: customError,
          type: 'error'
        };
      }
    }

    return {
      isValid: true,
      message: '',
      type: 'success'
    };
  };

  // Calendar event generation
  const getEventTitle = () => `Booking: ${selectedService?.name}`;
  const getEventDescription = () => selectedService?.description || '';
  const getEventStart = () => {
    if (!formData.date || !formData.time) return '';
    return new Date(`${formData.date}T${formData.time}`);
  };
  const getEventEnd = () => {
    const start = getEventStart();
    if (!start) return '';
    return new Date(start.getTime() + 60 * 60 * 1000); // 1 hour
  };
  const getGoogleCalendarUrl = () => {
    const start = getEventStart();
    const end = getEventEnd();
    if (!start || !end) return '#';
    const format = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(getEventTitle())}&dates=${format(start)}/${format(end)}&details=${encodeURIComponent(getEventDescription())}&location=&sf=true&output=xml`;
  };
  const getICS = () => {
    const start = getEventStart();
    const end = getEventEnd();
    if (!start || !end) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    const format = (d: Date) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
    return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${getEventTitle()}\nDESCRIPTION:${getEventDescription()}\nDTSTART:${format(start)}\nDTEND:${format(end)}\nEND:VEVENT\nEND:VCALENDAR`;
  };
  const downloadICS = () => {
    const ics = getICS();
    const blob = new Blob([ics.replace(/\\n/g, '\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'booking.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      await addDoc(collection(db, 'bookings'), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: selectedService?.name,
        date: formData.date,
        time: formData.time,
        createdAt: serverTimestamp(),
      });
      setConfirmed(true);
      setStep(4);
    } catch (err) {
      setError('There was an error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Validation for current step
  const canProceed = () => {
    switch (step) {
      case 0: return selectedService;
      case 1: return formData.date && formData.time;
      case 2: return formData.name && formData.email && formData.phone;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <Link 
          to="/hub" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Hub
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Book a Service
            </motion.h1>
            <motion.p 
              className="text-center mt-2 text-blue-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Let's get started with your project
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <FormProgress
              currentStep={step}
              totalSteps={steps.length}
              steps={steps}
            />
          </div>
        
        {/* Pricing Notice */}
          <div className="px-8 py-4 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-700">
          <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
              All prices shown are <strong>starting rates</strong>. Final pricing depends on scope, duration, and customization requirements.
            </p>
          </div>
        </div>

          {/* Form Content */}
          <div className="p-8">
        <AnimatePresence mode="wait">
          {step === 0 && (
                <motion.div 
                  key="service" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Select a Service</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {services.map((svc) => (
                  <motion.button
                    key={svc.name}
                        className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                          selectedService?.name === svc.name 
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedService(svc)}
                        aria-pressed={selectedService?.name === svc.name}
                  >
                    <div className="flex items-start space-x-4">
                          <div className="text-4xl">{svc.icon}</div>
                      <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{svc.name}</h3>
                          <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${svc.price}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Starting at</div>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">{svc.description}</p>
                            <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                          {svc.details}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
                  <div className="flex justify-end">
                    <FormButton
                      variant="primary"
                      size="lg"
                      disabled={!selectedService}
                      onClick={nextStep}
                    >
                {selectedService ? `Continue with ${selectedService.name}` : 'Select a Service to Continue'}
                    </FormButton>
                  </div>
            </motion.div>
          )}

          {step === 1 && (
                <motion.div 
                  key="datetime" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Choose Date & Time</h2>
                  <FormSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Date</label>
                        <input 
                          ref={dateRef}
                          type="date" 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors" 
                          value={formData.date} 
                          onChange={e => handleInputChange('date', e.target.value)} 
                          required 
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Time</label>
                        <input 
                          ref={timeRef}
                          type="time" 
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-colors" 
                          value={formData.time} 
                          onChange={e => handleInputChange('time', e.target.value)} 
                          required 
                        />
              </div>
              </div>
                  </FormSection>
                  <div className="flex justify-between mt-8">
                    <FormButton variant="outline" onClick={prevStep}>
                      Back
                    </FormButton>
                    <FormButton variant="primary" disabled={!formData.date || !formData.time} onClick={nextStep}>
                      Next
                    </FormButton>
              </div>
            </motion.div>
          )}

          {step === 2 && (
                <motion.div 
                  key="contact" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Your Contact Information</h2>
                  <FormSection>
                    <FormField
                      ref={nameRef}
                      id="name"
                      name="name"
                      label="Full Name"
                      type="text"
                      value={formData.name}
                      onChange={(value) => handleInputChange('name', value)}
                      validation={validationRules.name}
                      validationState={validationStates.name}
                      autoComplete="name"
                      required
                      placeholder="Enter your full name"
                      nextFieldId="email"
                    />

                    <FormField
                      ref={emailRef}
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(value) => handleInputChange('email', value)}
                      validation={validationRules.email}
                      validationState={validationStates.email}
                      autoComplete="email"
                      required
                      placeholder="Enter your email address"
                      nextFieldId="phone"
                      prevFieldId="name"
                    />

                    <FormField
                      ref={phoneRef}
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(value) => handleInputChange('phone', value)}
                      validation={validationRules.phone}
                      validationState={validationStates.phone}
                      autoComplete="tel"
                      required
                      placeholder="Enter your phone number"
                      prevFieldId="email"
                    />
                  </FormSection>
                  <div className="flex justify-between mt-8">
                    <FormButton variant="outline" onClick={prevStep}>
                      Back
                    </FormButton>
                    <FormButton variant="primary" disabled={!formData.name || !formData.email || !formData.phone} onClick={nextStep}>
                      Next
                    </FormButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
                <motion.div 
                  key="review" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }} 
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Review & Confirm</h2>
                  <FormSection>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Service Details</h4>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <p className="font-medium text-gray-900 dark:text-white">{selectedService?.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedService?.description}</p>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">${selectedService?.price} starting</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Schedule</h4>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <p className="text-gray-900 dark:text-white">{formData.date}</p>
                            <p className="text-gray-600 dark:text-gray-400">{formData.time}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Information</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <p className="text-gray-900 dark:text-white">{formData.name}</p>
                          <p className="text-gray-600 dark:text-gray-400">{formData.email}</p>
                          <p className="text-gray-600 dark:text-gray-400">{formData.phone}</p>
                        </div>
                      </div>
              </div>
                  </FormSection>
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mt-4"
                    >
                      <p className="text-red-800 dark:text-red-200">{error}</p>
                    </motion.div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    <FormButton variant="outline" onClick={prevStep}>
                      Back
                    </FormButton>
                    <FormButton 
                      variant="primary" 
                      disabled={submitting} 
                      loading={submitting}
                      onClick={handleSubmit}
                    >
                      {submitting ? 'Booking...' : 'Confirm Booking'}
                    </FormButton>
              </div>
            </motion.div>
          )}

          {step === 4 && confirmed && (
                <motion.div 
                  key="done" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="mb-8">
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 dark:text-gray-400">Thank you for booking with us! We look forward to serving you.</p>
                  </div>

                  <FormSection>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Service</h4>
                          <p className="text-gray-600 dark:text-gray-400">{selectedService?.name}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Date & Time</h4>
                          <p className="text-gray-600 dark:text-gray-400">{formData.date} at {formData.time}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact</h4>
                          <p className="text-gray-600 dark:text-gray-400">{formData.name}</p>
                          <p className="text-gray-600 dark:text-gray-400">{formData.email}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Price</h4>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">${selectedService?.price} starting</p>
                        </div>
                      </div>
                    </div>
                  </FormSection>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <FormButton
                      variant="primary"
                      onClick={() => window.open(getGoogleCalendarUrl(), '_blank')}
                      className="flex-1"
                    >
                      Add to Google Calendar
                    </FormButton>
                    <FormButton
                      variant="outline"
                      onClick={downloadICS}
                      className="flex-1"
                    >
                      Add to Outlook
                    </FormButton>
              </div>

                  <div className="mt-8">
                    <Link to="/hub">
                      <FormButton variant="ghost">
                        Return to Hub
                      </FormButton>
                    </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking; 
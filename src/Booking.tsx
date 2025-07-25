import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const services = [
  { name: 'Speaking Engagement', description: 'Keynote, panel, or workshop. Includes prep call, custom content, and up to 60 minutes on stage.', price: 2500 },
  { name: 'Training/Workshop', description: 'Custom training or workshop for your team or organization. Includes materials and Q&A.', price: 1800 },
  { name: 'Speech Writing', description: 'Custom-written speech (up to 20 minutes). Includes consultation and 1 revision.', price: 500 },
  { name: 'Coaching', description: '1:1 or group coaching for professional or personal development. Packages available.', price: 300 },
  { name: 'Professional Development', description: 'Career, leadership, or skills development sessions tailored to your needs.', price: 350 },
];

const steps = ['Service', 'Date/Time', 'Contact', 'Review', 'Done'];

const Booking: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  // Calendar event generation
  const getEventTitle = () => `Booking: ${selectedService?.name}`;
  const getEventDescription = () => selectedService?.description || '';
  const getEventStart = () => {
    if (!date || !time) return '';
    return new Date(`${date}T${time}`);
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
        name,
        email,
        phone,
        service: selectedService?.name,
        date,
        time,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 dark:from-blue-900 dark:via-pink-900 dark:to-yellow-900 py-16 px-4 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-2xl mb-6">
        <Link 
          to="/hub" 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Hub
        </Link>
      </div>

      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <motion.h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-700 dark:text-blue-300" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Book a Service</motion.h1>
        <div className="flex justify-center mb-8 gap-2">
          {steps.map((s, i) => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-blue-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>{i + 1}</div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="service" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
              <div className="grid grid-cols-1 gap-4 mb-6">
                {services.map((svc) => (
                  <motion.button
                    key={svc.name}
                    className={`w-full p-5 rounded-lg border-2 transition-all duration-300 text-left ${selectedService?.name === svc.name ? 'border-blue-700 bg-blue-50 dark:bg-blue-900' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedService(svc)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-lg text-blue-700 dark:text-blue-300">{svc.name}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">{svc.description}</div>
                      </div>
                      <div className="text-xl font-bold text-blue-700 dark:text-blue-300">${svc.price}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold mt-2 w-full disabled:opacity-50" disabled={!selectedService} onClick={() => setStep(1)}>Next</button>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="datetime" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold mb-4">Choose Date & Time</h2>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Date</label>
                <input type="date" className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-medium">Time</label>
                <input type="time" className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" value={time} onChange={e => setTime(e.target.value)} required />
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded font-semibold" onClick={() => setStep(0)}>Back</button>
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold w-full disabled:opacity-50" disabled={!date || !time} onClick={() => setStep(2)}>Next</button>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="contact" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold mb-4">Your Contact Info</h2>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Name</label>
                <input type="text" className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Email</label>
                <input type="email" className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-medium">Phone</label>
                <input type="tel" className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white" value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded font-semibold" onClick={() => setStep(1)}>Back</button>
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold w-full disabled:opacity-50" disabled={!name || !email || !phone} onClick={() => setStep(3)}>Next</button>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="review" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
              <div className="mb-4 p-4 rounded bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700">
                <div><strong>Service:</strong> {selectedService?.name}</div>
                <div><strong>Date:</strong> {date}</div>
                <div><strong>Time:</strong> {time}</div>
                <div><strong>Name:</strong> {name}</div>
                <div><strong>Email:</strong> {email}</div>
                <div><strong>Phone:</strong> {phone}</div>
                <div><strong>Price:</strong> ${selectedService?.price}</div>
              </div>
              {error && <div className="text-red-600 dark:text-red-400 mb-2">{error}</div>}
              <div className="flex gap-2">
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded font-semibold" onClick={() => setStep(2)}>Back</button>
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold w-full disabled:opacity-50" disabled={submitting} onClick={handleSubmit}>{submitting ? 'Booking...' : 'Confirm Booking'}</button>
              </div>
            </motion.div>
          )}
          {step === 4 && confirmed && (
            <motion.div key="done" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-400">Booking Confirmed!</h2>
              <div className="mb-4 p-4 rounded bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700">
                <div><strong>Service:</strong> {selectedService?.name}</div>
                <div><strong>Date:</strong> {date}</div>
                <div><strong>Time:</strong> {time}</div>
                <div><strong>Name:</strong> {name}</div>
                <div><strong>Email:</strong> {email}</div>
                <div><strong>Phone:</strong> {phone}</div>
                <div><strong>Price:</strong> ${selectedService?.price}</div>
              </div>
              <div className="flex flex-col gap-3 items-center mt-6">
                <a href={getGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors w-full text-center">Add to Google Calendar</a>
                <button onClick={downloadICS} className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded font-semibold transition-colors w-full">Add to Outlook</button>
              </div>
              <div className="mt-8 text-center text-gray-600 dark:text-gray-400">Thank you for booking with us! We look forward to serving you.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Booking; 
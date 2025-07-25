import React from 'react';
import { motion } from 'framer-motion';

const serviceCategories = [
  {
    name: 'IT Solutions',
    icon: '💻',
    services: [
      { name: 'Tech Support', description: 'On-demand troubleshooting and device setup for home or business.' },
      { name: 'Cloud Migration', description: 'Seamless transition to cloud platforms with minimal downtime.' },
      { name: 'Cybersecurity', description: 'Protect your data and systems with modern security solutions.' },
    ],
  },
  {
    name: 'Creative Services',
    icon: '🎨',
    services: [
      { name: 'Brand Design', description: 'Logo, brand identity, and visual storytelling for your business.' },
      { name: 'Content Creation', description: 'Copywriting, blogs, and multimedia content that connects.' },
      { name: 'Web Development', description: 'Modern, responsive websites built for impact.' },
    ],
  },
  {
    name: 'Consulting',
    icon: '🧑‍💼',
    services: [
      { name: 'Business Strategy', description: 'Growth planning, market analysis, and operational consulting.' },
      { name: 'Workshops & Training', description: 'Skill-building sessions for teams and individuals.' },
      { name: 'Project Management', description: 'From kickoff to delivery, we keep your projects on track.' },
    ],
  },
];

const testimonial = {
  quote: 'No Window Shopping helped us modernize our business and stand out in a crowded market. Their team is creative, reliable, and truly invested in our success.',
  author: 'Jordan M., Small Business Owner',
};

const Services: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 dark:from-pink-900 dark:via-yellow-900 dark:to-blue-900 py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-blue-700 dark:text-blue-300 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        What We Offer
      </motion.h1>
      <div className="grid md:grid-cols-3 gap-10 mb-16">
        {serviceCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 flex flex-col items-center group hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            whileHover={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)', scale: 1.05 }}
          >
            <div className="text-5xl mb-4 group-hover:rotate-6 transition-transform duration-300">{cat.icon}</div>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">{cat.name}</h2>
            <ul className="space-y-4">
              {cat.services.map((svc) => (
                <li key={svc.name} className="">
                  <span className="font-semibold text-gray-800 dark:text-gray-100">{svc.name}</span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{svc.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex flex-col items-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-colors mb-4"
          onClick={() => window.location.href = '/booking'}
        >
          Book a Consultation
        </button>
        <span className="text-gray-500 dark:text-gray-400 text-sm">or <a href="/contact" className="underline hover:text-blue-700 dark:hover:text-blue-300">Contact Us</a></span>
      </motion.div>
      <motion.div
        className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <blockquote className="text-xl italic text-gray-700 dark:text-gray-200 mb-4">“{testimonial.quote}”</blockquote>
        <div className="text-gray-600 dark:text-gray-400 font-semibold">— {testimonial.author}</div>
      </motion.div>
    </div>
  </div>
);

export default Services; 
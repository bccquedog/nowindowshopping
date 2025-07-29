import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 py-12 px-4">
      {/* Back Button */}
      <div className="w-full max-w-6xl mx-auto mb-8">
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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About No Window Shopping
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Empowering individuals and organizations to stop window shopping and start claiming success through professional development, leadership coaching, and transformative growth strategies.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To inspire and equip professionals with the mindset, skills, and strategies needed to break through barriers, seize opportunities, and achieve their full potential. We believe success isn't on display—it's claimed through action, persistence, and strategic investment in oneself.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To be the leading platform for professional transformation, where individuals and organizations discover that their greatest potential lies not in what they see, but in what they're willing to pursue, develop, and achieve through dedicated effort and strategic action.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Action Over Observation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in doing rather than just watching. Success comes from taking calculated risks and making strategic moves.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Continuous Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Growth is a lifelong journey. We commit to constant improvement and helping others do the same.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Authentic Relationships</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We build genuine connections based on trust, transparency, and mutual respect.
              </p>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-3xl mb-4">🎤</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Speaking Engagements</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Transformative keynotes and workshops that inspire action and drive real change in organizations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Executive Coaching</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Personalized coaching for leaders and professionals seeking breakthrough performance and growth.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Professional Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive training programs designed to enhance skills, leadership, and career advancement.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-3xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Content Creation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Strategic content development including speech writing, copywriting, and thought leadership materials.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Brand Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete brand identity and design services to help businesses make lasting impressions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="text-3xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Digital Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Web development and digital presence solutions that convert visitors into customers.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src="/assets/founder.png"
              alt="Brian Proctor, Founder"
              className="w-40 h-40 rounded-full object-cover mb-6 md:mb-0 md:mr-8 border-4 border-blue-200 shadow-lg"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Brian Proctor</h2>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Founder, No Window Shopping</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Brian Proctor is a business leader, training expert, and executive coach dedicated to empowering individuals and organizations. A Bethune-Cookman University graduate (Class of 2005) and Omega Psi Phi member, he specializes in professional development, leadership coaching, workforce training, and organizational growth.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                With expertise in Human Resources, executive coaching, and after-market specialization, Brian has a proven track record of enhancing leadership, improving performance, and driving career success. His hands-on experience spans corporate and blue-collar industries, providing a unique perspective on adaptability, resilience, and skill development.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                As the founder of No Window Shopping Professional Services, Brian champions his "No Window Shopping" mantra, inspiring professionals to take action, invest in themselves, and seize every opportunity. Grounded in strong family and spiritual values, he is committed to helping others develop, lead, and succeed—because success isn't on display; it's claimed.
              </p>
              
              {/* Contact Information */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">Get in Touch</h4>
                <div className="flex flex-col gap-2 text-base">
                  <span className="text-gray-700 dark:text-gray-300">
                    Email: <a href="mailto:NoWindowShoppingOnline@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">NoWindowShoppingOnline@gmail.com</a>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Instagram: <a href="https://instagram.com/DrProctorKOPV" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">@DrProctorKOPV</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Stop Window Shopping?</h2>
            <p className="text-xl mb-6 opacity-90">
              Let's discuss how we can help you or your organization achieve breakthrough success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book a Consultation
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 
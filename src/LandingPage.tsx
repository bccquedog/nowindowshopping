import React from 'react';
import { Link } from 'react-router-dom';
  import { 
    FaUsers, 
    FaPenNib, 
    FaScroll,
    FaEnvelope,
    FaInstagram
  } from 'react-icons/fa6';

// Icon wrapper to fix TypeScript issues with React 19
const IconWrapper = ({ icon: Icon, className }: { icon: any; className?: string }) => {
  return <Icon className={className} />;
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6 sm:mb-8">
            <img 
              src="/assets/logosandicons/logo.png" 
              alt="No Window Shopping Logo" 
              className="h-16 sm:h-20 md:h-24 lg:h-32 object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Stop Window Shopping.<br />
            Start <span className="text-yellow-400">Claiming Success</span>.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Professional development, leadership coaching, and transformative growth strategies for individuals and organizations ready to take action.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              to="/hub" 
              className="bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center touch-manipulation"
            >
              Explore Our Platform
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center touch-manipulation"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 px-2">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <IconWrapper icon={FaUsers} className="text-xl sm:text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Professional Coaching</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Personalized coaching for leaders and professionals seeking breakthrough performance and growth.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <IconWrapper icon={FaPenNib} className="text-xl sm:text-2xl text-purple-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Content & Insights</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Expert insights, strategies, and stories on business, mindset, and personal development.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <IconWrapper icon={FaScroll} className="text-xl sm:text-2xl text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">Core Principles</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Proven philosophies and guiding principles for intentional living and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
            Ready to Transform Your Success?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join thousands of professionals who have stopped window shopping and started claiming their success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/hub" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              Get Started Today
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 hover:text-white transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/assets/logosandicons/logo.png" 
                  alt="No Window Shopping Logo" 
                  className="h-8 mr-3"
                />
                <h3 className="text-xl font-bold">NO WINDOW SHOPPING</h3>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Empowering individuals and organizations to stop window shopping and start claiming success through professional development and transformative growth strategies.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:NoWindowShoppingOnline@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  <IconWrapper icon={FaEnvelope} className="text-xl" />
                </a>
                <a href="https://instagram.com/DrProctorKOPV" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <IconWrapper icon={FaInstagram} className="text-xl" />
                </a>
              </div>
            </div>

                          <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/blog-hub" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                              <div className="space-y-2 text-gray-300">
                  <p>Ready to stop window shopping?</p>
                  <p>Let's discuss how we can help you achieve breakthrough success.</p>
                <div className="mt-4">
                  <a 
                    href="mailto:NoWindowShoppingOnline@gmail.com" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-block"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 No Window Shopping Professional Services. All rights reserved.</p>
            <p className="mt-2 text-sm">Success isn't on display—it's claimed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 
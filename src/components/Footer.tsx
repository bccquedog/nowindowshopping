import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaInstagram } from 'react-icons/fa6';

// Icon wrapper to fix TypeScript issues with React 19
const IconWrapper = ({ icon: Icon, className }: { icon: any; className?: string }) => {
  return <Icon className={className} />;
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">NO WINDOW SHOPPING</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                Empowering individuals and organizations to stop window shopping and start claiming success through professional development and transformative growth strategies.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:NoWindowShoppingOnline@gmail.com" className="text-gray-300 hover:text-white transition-colors touch-manipulation">
                  <IconWrapper icon={FaEnvelope} className="text-lg sm:text-xl" />
                </a>
                <a href="https://instagram.com/DrProctorKOPV" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors touch-manipulation">
                  <IconWrapper icon={FaInstagram} className="text-lg sm:text-xl" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors touch-manipulation">About</Link></li>
                <li><Link to="/privacy-policy" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors touch-manipulation">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors touch-manipulation">Terms and Conditions</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Get in Touch</h4>
              <div className="space-y-2 text-sm sm:text-base text-gray-300">
                <p>Ready to stop window shopping?</p>
                <p>Let's discuss how we can help you achieve breakthrough success.</p>
                <div className="mt-3 sm:mt-4">
                  <a 
                    href="mailto:NoWindowShoppingOnline@gmail.com" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors inline-block text-sm sm:text-base touch-manipulation"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2024 No Window Shopping Professional Services. All rights reserved.</p>
            <p className="mt-2 text-xs sm:text-sm">Success isn't on display—it's claimed.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
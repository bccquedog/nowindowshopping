import React from 'react';
import { Link } from 'react-router-dom';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 py-12 px-4">
      {/* Back Button */}
      <div className="w-full max-w-4xl mx-auto mb-8">
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

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Effective: July 28, 2025
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              These Terms and Conditions ("Terms") govern your use of the No Window Shopping Professional Services website and services ("Services") operated by No Window Shopping Professional Services ("we," "our," or "us").
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our Services.
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Definitions</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li><strong>"Services"</strong> refers to our website, coaching services, consulting, speaking engagements, and all related offerings</li>
              <li><strong>"User," "you," "your"</strong> refers to any individual or entity using our Services</li>
              <li><strong>"Content"</strong> refers to all text, images, videos, audio, and other materials on our website</li>
              <li><strong>"Account"</strong> refers to any user account created to access our Services</li>
            </ul>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. These Terms constitute a legally binding agreement between you and No Window Shopping Professional Services.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of our Services after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Services Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Services Description</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              No Window Shopping Professional Services provides:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Executive coaching and professional development</li>
              <li>Speaking engagements and workshops</li>
              <li>Business consulting and strategy</li>
              <li>Content creation and copywriting</li>
              <li>Brand development and design services</li>
              <li>Web development and digital solutions</li>
              <li>Educational content and resources</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. User Accounts</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              When creating an account with us, you must provide accurate, complete, and current information. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your account information remains accurate and up-to-date</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              We reserve the right to terminate accounts that violate these Terms or for any other reason at our sole discretion.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Payment Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Payment terms for our services are as follows:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>All prices are quoted in US dollars unless otherwise specified</li>
              <li>Payment is due upon booking or as specified in individual service agreements</li>
              <li>We accept payment through approved payment methods</li>
              <li>Refunds are subject to our refund policy and individual service agreements</li>
              <li>Late payments may result in service suspension or termination</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Intellectual Property Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All content on our website and services, including but not limited to text, graphics, logos, images, audio, video, and software, is the property of No Window Shopping Professional Services or its licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You may not:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Reproduce, distribute, or create derivative works without permission</li>
              <li>Use our content for commercial purposes without authorization</li>
              <li>Remove or modify any copyright or proprietary notices</li>
              <li>Attempt to reverse engineer or decompile our software</li>
            </ul>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. User Conduct</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You agree not to use our Services to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of our Services</li>
              <li>Use our Services for spam or unsolicited communications</li>
              <li>Impersonate another person or entity</li>
            </ul>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by reference, explains how we collect, use, and protect your personal information. By using our Services, you consent to the collection and use of information as described in our Privacy Policy.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Disclaimers</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our Services are provided "as is" and "as available" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Warranties of merchantability and fitness for a particular purpose</li>
              <li>Warranties that our Services will be uninterrupted or error-free</li>
              <li>Warranties regarding the accuracy or completeness of content</li>
              <li>Warranties that defects will be corrected</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Coaching and consulting services are not a substitute for professional medical, legal, or financial advice.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              In no event shall No Window Shopping Professional Services be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our Services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Indemnification</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              You agree to indemnify and hold harmless No Window Shopping Professional Services, its officers, directors, employees, and agents from and against any claims, damages, losses, and expenses arising out of or relating to your use of our Services or violation of these Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Termination</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may terminate or suspend your access to our Services immediately, without prior notice, for any reason, including breach of these Terms. Upon termination:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Your right to use our Services will cease immediately</li>
              <li>We may delete your account and related data</li>
              <li>Provisions of these Terms that should survive termination will remain in effect</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our Services shall be resolved in the courts of the United States.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Severability</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">16. Entire Agreement</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and No Window Shopping Professional Services regarding your use of our Services, superseding any prior agreements.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">17. Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Email:</strong> NoWindowShoppingOnline@gmail.com<br/>
                <strong>Instagram:</strong> @DrProctorKOPV<br/>
                <strong>Address:</strong> No Window Shopping Professional Services
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions; 
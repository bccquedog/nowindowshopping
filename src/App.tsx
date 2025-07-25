import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeatureStatusScreen from './FeatureStatusScreen';
import HealthcheckScreen from './HealthcheckScreen';
import BlogPost1 from './BlogPost1';
import BlogPost2 from './BlogPost2';
import BlogPost3 from './BlogPost3';
import BlogPostSideHustle from './BlogPostSideHustle';
import BlogPostExpectations from './BlogPostExpectations';
import BlogPostWorkLifeBalance from './BlogPostWorkLifeBalance';
import BlogPostSeatAtTable1 from './BlogPostSeatAtTable1';
import BlogPostSeatAtTable2 from './BlogPostSeatAtTable2';
import BlogPostSeatAtTable3 from './BlogPostSeatAtTable3';
import BlogPostSeatAtTable4 from './BlogPostSeatAtTable4';
import BlogPostConflicted from './BlogPostConflicted';
import BlogPostFriendship3 from './BlogPostFriendship3';
import BlogPostFriendship4 from './BlogPostFriendship4';
import BlogPostPeakedHS1 from './BlogPostPeakedHS1';
import BlogPostPeakedHS2 from './BlogPostPeakedHS2';
import BlogPostHaveNotNeed from './BlogPostHaveNotNeed';
import BlogPostFinancialLiteracy from './BlogPostFinancialLiteracy';
import UserGuide from './UserGuide';
import LQ from './LQ';
import AdminGuide from './AdminGuide';
import { CoachCareApp } from './coachcare/CoachCareApp';
import BlogPostNWSLaws from './BlogPostNWSLaws';
import ShoutOut from './ShoutOut';
import Booking from './Booking';
import ClientManagement from './ClientManagement';
import SessionManagement from './SessionManagement';
import BlogPostSayNo from './BlogPostSayNo';
import PrinciplesHub from './PrinciplesHub';
import PrinciplesInteractiveMantra from './PrinciplesInteractiveMantra';
import PrinciplesWeddingCrashing from './PrinciplesWeddingCrashing';
import PrinciplesParodyRules from './PrinciplesParodyRules';
import Principles29ThingsEveryManShouldKnow from './Principles29ThingsEveryManShouldKnow';
import BlogHub from './BlogHub';
import MGCUHub from './mgcu/MGCUHub';
import MGCULibrary from './mgcu/MGCULibrary';
import MGCUBook from './mgcu/MGCUBook';
import MGCUChapter from './mgcu/MGCUChapter';
import MGCUUniverse from './mgcu/MGCUUniverse';
import MGCUCharacters from './mgcu/MGCUCharacters';
import MGCUAbout from './mgcu/MGCUAbout';
import MGCUSettings from './mgcu/MGCUSettings';
import MGCUDiscord from './mgcu/MGCUDiscord';
import BlogPostImpulsivelyStrategic from './BlogPostImpulsivelyStrategic';
import BlogPostItGoesWhereItGoes from './BlogPostItGoesWhereItGoes';
import BlogPostSlipperySlopes1 from './BlogPostSlipperySlopes1';
import BlogPostSlipperySlopes2 from './BlogPostSlipperySlopes2';
import BlogPostStopFlaking from './BlogPostStopFlaking';
import ITServices from './ITServices';
import Services from './Services';
import Settings from './Settings';
import Software from './Software';
import EscapingToThe90sBlog from './components/EscapingToThe90sBlog';
import BlogPostEscaping90s1 from './BlogPostEscaping90s1';
import BlogPostEscaping90s2 from './BlogPostEscaping90s2';
import BlogPostEscaping90s3 from './BlogPostEscaping90s3';
import Brians42nd from './Brians42nd';
import SlipperySlopesHub from './SlipperySlopesHub';
import SeatAtTableHub from './SeatAtTableHub';
import PeakedHSHub from './PeakedHSHub';
import BlogPostFinessing101 from './BlogPostFinessing101';

const LandingPage = () => (
  <div className="min-h-screen font-sans">
    {/* Hero Section */}
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">No Window Shopping</h1>
        <h2 className="text-xl md:text-2xl mb-4 font-medium">Professional Development & Business Growth</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
          Transform your mindset, elevate your skills, and seize every opportunity with our comprehensive professional development platform.
        </p>
        <Link 
          to="/hub" 
          className="bg-white text-gray-900 px-8 py-3 rounded-full text-base md:text-lg font-semibold hover:bg-gray-100 transition-colors inline-block shadow"
        >
          Enter Interactive Hub
        </Link>
      </div>
    </section>

    {/* Overview Section */}
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">What We Offer</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">MGCU</h3>
              <p className="text-gray-700 text-base md:text-lg">
                Master Class Growth University - Our comprehensive learning platform for mindset transformation and business acumen development.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">CoachCare</h3>
              <p className="text-gray-700 text-base md:text-lg">
                Personalized one-on-one coaching sessions tailored to your specific needs and goals for sustainable success.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">Professional Services</h3>
              <p className="text-gray-700 text-base md:text-lg">
                Strategic guidance and customized solutions for business growth, leadership development, and personal transformation.
              </p>
            </div>
          </div>

          {/* Services Overview */}
          <div className="flex justify-center items-center mb-8">
            <div className="bg-gray-50 p-6 md:p-10 rounded-lg border border-gray-200 w-full max-w-5xl">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-900">Our Core Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <h4 className="text-base md:text-lg font-bold mb-2 text-gray-900">Business & Entrepreneurship</h4>
                  <ul className="space-y-1 text-gray-700 text-left inline-block text-sm md:text-base">
                    <li>• Business Consulting & Strategy</li>
                    <li>• Startup Coaching & Business Formation</li>
                    <li>• Contracting & Procurement Advisory</li>
                    <li>• Process Improvement & Business Scaling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-bold mb-2 text-gray-900">Leadership & Development</h4>
                  <ul className="space-y-1 text-gray-700 text-left inline-block text-sm md:text-base">
                    <li>• Executive & Leadership Coaching</li>
                    <li>• Career Development & Job Readiness</li>
                    <li>• Workplace Training & Corporate Workshops</li>
                    <li>• Public Speaking & Communication Training</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-bold mb-2 text-gray-900">Financial Literacy & Wealth Building</h4>
                  <ul className="space-y-1 text-gray-700 text-left inline-block text-sm md:text-base">
                    <li>• Personal Finance Coaching</li>
                    <li>• Wealth-Building & Investment Education</li>
                    <li>• Business Financial Planning</li>
                    <li>• Smart Money Habits & Passive Income</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-bold mb-2 text-gray-900">Personal Growth & Mindset</h4>
                  <ul className="space-y-1 text-gray-700 text-left inline-block text-sm md:text-base">
                    <li>• Mindset Coaching & Confidence Building</li>
                    <li>• Productivity & Work-Life Balance</li>
                    <li>• Networking & Relationship Building</li>
                    <li>• Stress Management & Self-Care</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gray-900 text-white p-6 md:p-8 rounded-lg mb-8">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to Transform Your Future?</h3>
            <p className="mb-4 text-base md:text-lg">
              Join thousands of professionals who have already taken action and achieved breakthrough results with No Window Shopping.
            </p>
            <Link 
              to="/hub" 
              className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block shadow"
            >
              Explore Our Interactive Hub
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const InteractiveHub = () => (
  <div className="min-h-screen font-sans">
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-12 pb-8 md:pt-16 md:pb-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">NO WINDOW SHOPPING</h1>
        <h2 className="text-xl md:text-2xl mb-4 font-medium">Interactive Hub</h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
          Welcome to your command center for professional development and business growth. Choose your path and take action.
        </p>
      </div>
    </section>

    {/* Card Grid Section */}
    <section className="py-8 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* CoachCare Card */}
            <HubCard
              title="CoachCare"
              description="Professional Development CRM - Manage your coaching relationships and track your growth journey."
              to="/coachcare"
              icon="👥"
            />
            {/* IT Services Card */}
            <HubCard
              title="IT Services"
              description="Technology solutions and digital transformation services for modern businesses."
              to="/it-services"
              icon="💻"
            />
            {/* MGCU Card */}
            <HubCard
              title="MGCU"
              description="Marcus Graham Connected Universe - Explore the literary world of your pen name."
              to="/mgcu"
              icon="📚"
            />
            {/* NWS Blog Card */}
            <HubCard
              title="NWS Blog"
              description="Insights, tips, and stories on business, mindset, and personal development."
              to="/blog-hub"
              icon="✍️"
            />
            {/* Principles of NoWindowShopping Card */}
            <HubCard
              title="Principles of NoWindowShopping"
              description="Core philosophies and guiding principles for intentional living and success."
              to="/principles"
              icon="📜"
            />
            {/* About Card */}
            <HubCard
              title="About the Founder"
              description="Learn more about Brian Proctor and the vision behind No Window Shopping."
              to="/about"
              icon="👨‍💼"
            />
            {/* Web Store Card */}
            <HubCard
              title="Web Store"
              description="Shop for resources, tools, and exclusive No Window Shopping merchandise."
              to="/webstore"
              icon="🛒"
            />
            {/* Contact Card */}
            <HubCard
              title="Contact"
              description="Get in touch with our team for personalized support and inquiries."
              to="/contact"
              icon="📞"
            />
            {/* Booking Card */}
            <HubCard
              title="Booking"
              description="Schedule your coaching sessions and professional development consultations."
              to="/booking"
              icon="📅"
            />
            {/* What We Offer Card */}
            <HubCard
              title="What We Offer"
              description="Comprehensive overview of all our services and professional development programs."
              to="/services"
              icon="🎯"
            />
            {/* Settings Card */}
            <HubCard
              title="Settings"
              description="Manage your app preferences and advanced settings."
              to="/settings"
              icon="⚙️"
            />
            {/* Software Card */}
            <HubCard
              title="Software"
              description="Explore our suite of professional software solutions for business, education, and personal development."
              to="/software"
              icon="🖥️"
            />
            {/* User Guide Card */}
            <HubCard
              title="User Guide"
              description="Interactive guide to master all features of the No Window Shopping platform."
              to="/guide"
              icon="📖"
            />
            {/* Luminère Qualité Card */}
            <HubCard
              title="Luminère Qualité"
              description="Time Redefined."
              to="/lq"
              icon="⌚"
            />
            {/* ShoutOut Card */}
            <HubCard
              title="ShoutOut"
              description="Live venue messaging platform for real-time audience engagement and venue monetization."
              to="/shoutout"
              icon="📢"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
);

// Card component for the hub
const HubCard = ({ title, description, to, icon }: { title: string; description: string; to: string; icon: string }) => {
  const isLQCard = title === "Luminère Qualité";
  
  return (
    <div className={`
      ${isLQCard 
        ? 'bg-black border-2 border-yellow-400 text-white hover:border-yellow-300 group hover:scale-105 hover:rotate-1 transition-all duration-500 shadow-2xl hover:shadow-yellow-400/20' 
        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:scale-105'
      } 
      rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col px-6 py-8 justify-between h-full group
    `}>
      <div>
        <div className={`text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300 ${
          isLQCard ? 'text-yellow-400' : ''
        }`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold mb-3 text-center ${
          isLQCard 
            ? 'text-yellow-400 font-serif' 
            : 'text-gray-900 dark:text-white'
        }`}>
          {title}
        </h3>
        <p className={`mb-6 text-sm leading-relaxed text-center ${
          isLQCard 
            ? 'text-gray-300 font-serif' 
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {description}
        </p>
      </div>
      <Link 
        to={to} 
        className={`
          ${isLQCard 
            ? 'bg-yellow-400 text-black hover:bg-yellow-300 font-serif font-semibold' 
            : 'bg-gray-900 text-white hover:bg-gray-800 group-hover:bg-blue-600'
          } 
          py-3 px-6 rounded-xl font-semibold transition-colors text-center
        `}
      >
        {isLQCard ? 'Discover' : 'Explore'}
      </Link>
    </div>
  );
};

const WebStoreMaintenance = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-pink-100 dark:from-gray-900 dark:to-pink-900 py-12 px-4">
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

    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2 text-pink-600 dark:text-pink-400">Web Store Under Maintenance</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg">Our store is getting a glow-up! Please check back soon for new merch and digital goodies.</p>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-100">
    <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
      <span className="text-5xl mb-4">📞</span>
      <h1 className="text-2xl font-bold mb-2 text-blue-600">Contact Us</h1>
      <p className="text-gray-700 text-lg mb-4">We’d love to hear from you! Reach out via email or Instagram:</p>
      <div className="flex flex-col gap-2 text-lg">
        <span className="font-semibold text-pink-600">Email:</span>
        <a href="mailto:NoWindowShoppingOnline@gmail.com" className="text-blue-700 underline">NoWindowShoppingOnline@gmail.com</a>
        <span className="font-semibold text-pink-600 mt-4">Instagram:</span>
        <a href="https://instagram.com/DrProctorKOPV" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">@DrProctorKOPV</a>
      </div>
    </div>
  </div>
);

const AboutTheFounder = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-100 dark:from-blue-900 dark:to-pink-900 py-12 px-4">
    {/* Back Button */}
    <div className="w-full max-w-4xl mb-6">
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

    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col md:flex-row items-center max-w-4xl w-full">
      <img
        src="/assets/founder.png"
        alt="Brian Proctor, Founder"
        className="w-40 h-40 rounded-full object-cover mb-6 md:mb-0 md:mr-10 border-4 border-pink-200 shadow-md"
      />
      <div className="flex-1">
        <h1 className="text-3xl font-extrabold mb-2 text-blue-700">Brian Proctor</h1>
        <h2 className="text-xl font-semibold mb-4 text-pink-600">Founder, No Window Shopping</h2>
        <p className="text-gray-700 mb-4">
          Brian Proctor is a business leader, training expert, and executive coach dedicated to empowering individuals and organizations. A Bethune-Cookman University graduate (Class of 2005) and Omega Psi Phi member, he specializes in professional development, leadership coaching, workforce training, and organizational growth.
        </p>
        <p className="text-gray-700 mb-4">
          With expertise in Human Resources, executive coaching, and after-market specialization, Brian has a proven track record of enhancing leadership, improving performance, and driving career success. His hands-on experience spans corporate and blue-collar industries, providing a unique perspective on adaptability, resilience, and skill development.
        </p>
        <p className="text-gray-700 mb-4">
          As the founder of No Window Shopping Professional Services, Brian champions his “No Window Shopping” mantra, inspiring professionals to take action, invest in themselves, and seize every opportunity. Grounded in strong family and spiritual values, he is committed to helping others develop, lead, and succeed—because success isn’t on display; it’s claimed.
        </p>
        <div className="mt-6">
          <h3 className="text-lg font-bold text-blue-600 mb-2">Get in Touch</h3>
          <div className="flex flex-col gap-1 text-base">
            <span className="text-gray-800">Phone: <a href="tel:4108718392" className="text-pink-600 hover:underline">(410) 871-8392</a></span>
            <span className="text-gray-800">Email: <a href="mailto:NoWindowShoppingOnline@gmail.com" className="text-pink-600 hover:underline">NoWindowShoppingOnline@gmail.com</a></span>
            <span className="text-gray-800">Instagram: <a href="https://instagram.com/DrProctorKOPV" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">@DrProctorKOPV</a></span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/hub" element={<InteractiveHub />} />
      <Route path="/healthcheck" element={<HealthcheckScreen />} />
      <Route path="/feature-status" element={<FeatureStatusScreen />} />
      <Route path="/blog/1" element={<BlogPost1 />} />
      <Route path="/blog/2" element={<BlogPost2 />} />
      <Route path="/blog/3" element={<BlogPost3 />} />
      <Route path="/blog/side-hustle" element={<BlogPostSideHustle />} />
      <Route path="/blog/expectations" element={<BlogPostExpectations />} />
      <Route path="/blog/work-life-balance" element={<BlogPostWorkLifeBalance />} />
      <Route path="/blog/seat-at-table-1" element={<BlogPostSeatAtTable1 />} />
      <Route path="/blog/seat-at-table-2" element={<BlogPostSeatAtTable2 />} />
      <Route path="/blog/seat-at-table-3" element={<BlogPostSeatAtTable3 />} />
      <Route path="/blog/seat-at-table-4" element={<BlogPostSeatAtTable4 />} />
      <Route path="/blog/conflicted" element={<BlogPostConflicted />} />
      <Route path="/blog/friendship-3" element={<BlogPostFriendship3 />} />
      <Route path="/blog/friendship-4" element={<BlogPostFriendship4 />} />
      <Route path="/blog/peaked-hs-1" element={<BlogPostPeakedHS1 />} />
      <Route path="/blog/peaked-hs-2" element={<BlogPostPeakedHS2 />} />
      <Route path="/blog/have-not-need" element={<BlogPostHaveNotNeed />} />
      <Route path="/blog/financial-literacy" element={<BlogPostFinancialLiteracy />} />
      <Route path="/blog/say-no" element={<BlogPostSayNo />} />
      <Route path="/blog/finessing-101" element={<BlogPostFinessing101 />} />
      <Route path="/blog" element={<BlogHub />} />
      <Route path="/blog/impulsively-strategic" element={<BlogPostImpulsivelyStrategic />} />
      <Route path="/blog/it-goes-where-it-goes" element={<BlogPostItGoesWhereItGoes />} />
      <Route path="/blog/slippery-slopes-1" element={<BlogPostSlipperySlopes1 />} />
      <Route path="/blog/slippery-slopes-2" element={<BlogPostSlipperySlopes2 />} />
      <Route path="/blog/stop-flaking" element={<BlogPostStopFlaking />} />
      <Route path="/blog/escaping-to-the-90s" element={<EscapingToThe90sBlog />} />
      <Route path="/blog/escaping-to-the-90s-1" element={<BlogPostEscaping90s1 />} />
      <Route path="/blog/escaping-to-the-90s-2" element={<BlogPostEscaping90s2 />} />
      <Route path="/blog/escaping-to-the-90s-3" element={<BlogPostEscaping90s3 />} />
      <Route path="/principles" element={<PrinciplesHub />} />
      <Route path="/principles/interactive-mantra" element={<PrinciplesInteractiveMantra />} />
      <Route path="/principles/wedding-crashing" element={<PrinciplesWeddingCrashing />} />
      <Route path="/principles/parody-rules" element={<PrinciplesParodyRules />} />
      <Route path="/principles/29-things-every-man-should-know" element={<Principles29ThingsEveryManShouldKnow />} />
      <Route path="/blog-hub" element={<BlogHub />} />
      <Route path="/guide" element={<UserGuide />} />
      <Route path="/lq" element={<LQ />} />
      <Route path="/admin/guide" element={<AdminGuide />} />
      <Route path="/coachcare/*" element={<CoachCareApp />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/blog/nws-laws" element={<BlogPostNWSLaws />} />
      <Route path="/shoutout" element={<ShoutOut />} />
      <Route path="/client-management" element={<ClientManagement />} />
      <Route path="/session-management" element={<SessionManagement />} />
      <Route path="/mgcu" element={<MGCUHub />} />
      <Route path="/mgcu/library" element={<MGCULibrary />} />
      <Route path="/mgcu/library/:book" element={<MGCUBook />} />
      <Route path="/mgcu/library/:book/:chapter" element={<MGCUChapter />} />
      <Route path="/mgcu/universe" element={<MGCUUniverse />} />
      <Route path="/mgcu/characters" element={<MGCUCharacters />} />
      <Route path="/mgcu/about" element={<MGCUAbout />} />
      <Route path="/mgcu/settings" element={<MGCUSettings />} />
      <Route path="/mgcu/discord" element={<MGCUDiscord />} />
      <Route path="/webstore" element={<WebStoreMaintenance />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutTheFounder />} />
      <Route path="/it-services" element={<ITServices />} />
      <Route path="/services" element={<Services />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/software" element={<Software />} />
      <Route path="/brians42nd" element={<Brians42nd />} />
      <Route path="/blog/slippery-slopes" element={<SlipperySlopesHub />} />
      <Route path="/blog/seat-at-table" element={<SeatAtTableHub />} />
      <Route path="/blog/peaked-hs" element={<PeakedHSHub />} />
      {/* Add other routes as needed */}
    </Routes>
  </Router>
);

export default App;

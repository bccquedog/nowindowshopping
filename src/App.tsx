import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { MultiplayerProvider } from './components/MultiplayerProvider';
import { 
  FaUsers, 
  FaPenNib, 
  FaUserTie, 
  FaCartShopping, 
  FaPhone, 
  FaBullseye, 
  FaGear, 
  FaDesktop, 
  FaCircleQuestion, 
  FaClock,
  FaBullhorn,
  FaEnvelope,
  FaInstagram, 
  FaLifeRing,
  FaGamepad
} from 'react-icons/fa6';

// Icon wrapper to fix TypeScript issues with React 19
const IconWrapper = ({ icon: Icon, className }: { icon: any; className?: string }) => {
  return <Icon className={className} />;
};

// Lazy load all components to reduce bundle size
const FeatureStatusScreen = React.lazy(() => import('./FeatureStatusScreen'));
const HealthcheckScreen = React.lazy(() => import('./HealthcheckScreen'));
const BlogPost1 = React.lazy(() => import('./BlogPost1'));
const BlogPost2 = React.lazy(() => import('./BlogPost2'));
const BlogPost3 = React.lazy(() => import('./BlogPost3'));
const BlogPostSideHustle = React.lazy(() => import('./BlogPostSideHustle'));
const BlogPostExpectations = React.lazy(() => import('./BlogPostExpectations'));
const BlogPostWorkLifeBalance = React.lazy(() => import('./BlogPostWorkLifeBalance'));
const BlogPostSeatAtTable1 = React.lazy(() => import('./BlogPostSeatAtTable1'));
const BlogPostSeatAtTable2 = React.lazy(() => import('./BlogPostSeatAtTable2'));
const BlogPostSeatAtTable3 = React.lazy(() => import('./BlogPostSeatAtTable3'));
const BlogPostSeatAtTable4 = React.lazy(() => import('./BlogPostSeatAtTable4'));
const BlogPostConflicted = React.lazy(() => import('./BlogPostConflicted'));
const FriendshipSeriesHub = React.lazy(() => import('./FriendshipSeriesHub'));
const BlogPostFriendship1 = React.lazy(() => import('./BlogPostFriendship1'));
const BlogPostFriendship2 = React.lazy(() => import('./BlogPostFriendship2'));
const BlogPostFriendship3 = React.lazy(() => import('./BlogPostFriendship3'));
const BlogPostFriendship4 = React.lazy(() => import('./BlogPostFriendship4'));
const BlogPostPeakedHS1 = React.lazy(() => import('./BlogPostPeakedHS1'));
const BlogPostPeakedHS2 = React.lazy(() => import('./BlogPostPeakedHS2'));
const BlogPostHaveNotNeed = React.lazy(() => import('./BlogPostHaveNotNeed'));
const BlogPostFinancialLiteracy = React.lazy(() => import('./BlogPostFinancialLiteracy'));
const UserGuide = React.lazy(() => import('./UserGuide'));
const LQ = React.lazy(() => import('./LQ'));
const AdminGuide = React.lazy(() => import('./AdminGuide'));
const AdminDashboard = React.lazy(() => import('./AdminDashboard'));
const CoachCareApp = React.lazy(() => import('./coachcare/CoachCareApp').then(module => ({ default: module.CoachCareApp })));
const BlogPostNWSLaws = React.lazy(() => import('./BlogPostNWSLaws'));
const ShoutOut = React.lazy(() => import('./ShoutOut'));
const Booking = React.lazy(() => import('./Booking'));
const ClientManagement = React.lazy(() => import('./ClientManagement'));
const SessionManagement = React.lazy(() => import('./SessionManagement'));
const BlogPostSayNo = React.lazy(() => import('./BlogPostSayNo'));
const PrinciplesInteractiveMantra = React.lazy(() => import('./PrinciplesInteractiveMantra'));
const PrinciplesWeddingCrashing = React.lazy(() => import('./PrinciplesWeddingCrashing'));
const PrinciplesParodyRules = React.lazy(() => import('./PrinciplesParodyRules'));
const Principles29ThingsEveryManShouldKnow = React.lazy(() => import('./Principles29ThingsEveryManShouldKnow'));
const BlogHub = React.lazy(() => import('./BlogHub'));
const MGCUHub = React.lazy(() => import('./mgcu/MGCUHub'));
const MGCULibrary = React.lazy(() => import('./mgcu/MGCULibrary'));
const MGCUBook = React.lazy(() => import('./mgcu/MGCUBook'));
const MGCUChapter = React.lazy(() => import('./mgcu/MGCUChapter'));
const MGCUUniverse = React.lazy(() => import('./mgcu/MGCUUniverse'));
const MGCUCharacters = React.lazy(() => import('./mgcu/MGCUCharacters'));
const MGCUAbout = React.lazy(() => import('./mgcu/MGCUAbout'));
const MGCUSettings = React.lazy(() => import('./mgcu/MGCUSettings'));
const MGCUDiscord = React.lazy(() => import('./mgcu/MGCUDiscord'));
const BlogPostImpulsivelyStrategic = React.lazy(() => import('./BlogPostImpulsivelyStrategic'));
const BlogPostItGoesWhereItGoes = React.lazy(() => import('./BlogPostItGoesWhereItGoes'));
const BlogPostSlipperySlopes1 = React.lazy(() => import('./BlogPostSlipperySlopes1'));
const BlogPostSlipperySlopes2 = React.lazy(() => import('./BlogPostSlipperySlopes2'));
const BlogPostStopFlaking = React.lazy(() => import('./BlogPostStopFlaking'));
const Services = React.lazy(() => import('./Services'));
const Settings = React.lazy(() => import('./Settings'));
const Applications = React.lazy(() => import('./Applications'));
const EscapingToThe90sBlog = React.lazy(() => import('./components/EscapingToThe90sBlog'));
const BlogPostEscaping90s1 = React.lazy(() => import('./BlogPostEscaping90s1'));
const BlogPostEscaping90s2 = React.lazy(() => import('./BlogPostEscaping90s2'));
const BlogPostEscaping90s3 = React.lazy(() => import('./BlogPostEscaping90s3'));
const Brians42nd = React.lazy(() => import('./Brians42nd'));
const VDaySurprise = React.lazy(() => import('./VDaySurprise'));
const SlipperySlopesHub = React.lazy(() => import('./SlipperySlopesHub'));
const SeatAtTableHub = React.lazy(() => import('./SeatAtTableHub'));
const PeakedHSHub = React.lazy(() => import('./PeakedHSHub'));
const BlogPostFinessing101 = React.lazy(() => import('./BlogPostFinessing101'));
const WeeklyBlogPost = React.lazy(() => import('./WeeklyBlogPost'));
const About = React.lazy(() => import('./About'));
const PrivacyPolicy = React.lazy(() => import('./PrivacyPolicy'));
const TermsConditions = React.lazy(() => import('./TermsConditions'));
const BlackjackLux = React.lazy(() => import('./BlackjackLux'));
const CheckersLux = React.lazy(() => import('./CheckersLux'));
const Tycoon = React.lazy(() => import('./Tycoon'));
const NWSSpades = React.lazy(() => import('./NWSSpades'));
const FiveThousandNWS = React.lazy(() => import('./FiveThousandNWS'));
const HoldemLux = React.lazy(() => import('./HoldemLux'));
const GameHub = React.lazy(() => import('./GameHub'));
const MultiplayerLobby = React.lazy(() => import('./components/MultiplayerLobby'));
const RaffleHub = React.lazy(() => import('./raffle/RaffleHub'));
const RaffleDetail = React.lazy(() => import('./raffle/RaffleDetail'));
const RaffleAdmin = React.lazy(() => import('./raffle/RaffleAdmin'));
const PageMonitorDownload = React.lazy(() => import('./PageMonitorDownload'));
const SoftwareHub = React.lazy(() => import('./SoftwareHub'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

const InteractiveHub = () => (
  <div className="min-h-screen font-sans">
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-8 sm:pt-12 pb-6 sm:pb-8 md:pt-16 md:pb-12">
      <div className="container mx-auto px-4 text-center">
                  <div className="flex justify-center mb-4 sm:mb-6">
            <img 
              src="/assets/logosandicons/logo.png" 
              alt="No Window Shopping Logo" 
              className="h-12 sm:h-16 md:h-20 object-contain"
            />
          </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">NO WINDOW SHOPPING</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-medium">Interactive Hub</h2>
        <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 px-2">
          Welcome to your command center for professional development and business growth. Choose your path and take action.
        </p>
      </div>
    </section>

    {/* Card Grid Section */}
    <section className="py-6 sm:py-8 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* CoachCare Card */}
            <HubCard
              title="CoachCare"
              description="Professional Development CRM - Manage your coaching relationships and track your growth journey."
              to="/coachcare"
              icon={<IconWrapper icon={FaUsers} className="text-4xl" />}
            />
            {/* About Card */}
            <HubCard
              title="About the Founder"
              description="Learn more about Brian Proctor and the vision behind No Window Shopping."
              to="/about"
              icon={<IconWrapper icon={FaUserTie} className="text-4xl" />}
            />
            {/* NWS Blog Card */}
            <HubCard
              title="NWS Blog"
              description="Insights, tips, and stories on business, mindset, and personal development."
              to="/blog-hub"
              icon={<IconWrapper icon={FaPenNib} className="text-4xl" />}
            />
            {/* Web Store Card */}
            <HubCard
              title="Web Store"
              description="Shop for resources, tools, and exclusive No Window Shopping merchandise."
              to="/webstore"
              icon={<IconWrapper icon={FaCartShopping} className="text-4xl" />}
            />
            {/* What We Offer Card */}
            <HubCard
              title="What We Offer"
              description="Comprehensive overview of all our services and professional development programs."
              to="/services"
              icon={<IconWrapper icon={FaBullseye} className="text-4xl" />}
            />
            {/* Applications Card */}
            <HubCard
              title="Applications"
              description="Explore our suite of professional software solutions for business, education, and personal development."
              to="/applications"
              icon={<IconWrapper icon={FaDesktop} className="text-4xl" />}
            />
            {/* Games Card */}
            <HubCard
              title="Games"
              description="Play the NWS arcade: cards, checkers, property strategy, and multiplayer rooms."
              to="/games"
              icon={<IconWrapper icon={FaGamepad} className="text-4xl" />}
            />
            {/* User Guide Card */}
            <HubCard
              title="User Guide"
              description="Interactive guide to master all features of the No Window Shopping platform."
              to="/guide"
              icon={<IconWrapper icon={FaCircleQuestion} className="text-4xl" />}
            />
            {/* Luminère Qualité Card */}
            <HubCard
              title="Luminère Qualité"
              description="Time Redefined."
              to="/lq"
              icon={<IconWrapper icon={FaClock} className="text-4xl" />}
            />
            {/* ShoutOut Card */}
            <HubCard
              title="ShoutOut"
              description="Live venue messaging platform for real-time audience engagement and venue monetization."
              to="/shoutout"
              icon={<IconWrapper icon={FaBullhorn} className="text-4xl" />}
            />
            {/* Support Card */}
            <HubCard
              title="Support"
              description="Need help? Submit a support ticket for technical issues, billing, or general inquiries."
              to="/support"
              icon={<IconWrapper icon={FaLifeRing} className="text-4xl" />}
            />
            {/* Raffles Card */}
            <HubCard
              title="Raffles"
              description="Enter for a chance to win exclusive items. Each raffle has a countdown—buy tickets before time runs out!"
              to="/raffle"
              icon={<IconWrapper icon={FaBullseye} className="text-4xl" />}
            />
          </div>
        </div>
      </div>
    </section>

    {/* Footer Section */}
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-3 sm:mb-4">
                <img 
                  src="/assets/logosandicons/logo.png" 
                  alt="No Window Shopping Logo" 
                  className="h-6 sm:h-8 mr-2 sm:mr-3"
                />
                <h3 className="text-lg sm:text-xl font-bold">NO WINDOW SHOPPING</h3>
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                Empowering individuals and organizations to stop window shopping and start claiming success through professional development and transformative growth strategies.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:NoWindowShoppingOnline@gmail.com" className="text-gray-300 hover:text-white transition-colors" title="Email">
                  <IconWrapper icon={FaEnvelope} className="text-lg sm:text-xl" />
                </a>
                <a href="https://instagram.com/DrProctorKOPV" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" title="Instagram">
                  <IconWrapper icon={FaInstagram} className="text-lg sm:text-xl" />
                </a>
                <Link to="/settings" className="text-gray-300 hover:text-white transition-colors" title="Settings">
                  <IconWrapper icon={FaGear} className="text-lg sm:text-xl" />
                </Link>
                <Link to="/admin" className="text-gray-300 hover:text-white transition-colors" title="Admin Dashboard">
                  <IconWrapper icon={FaUserTie} className="text-lg sm:text-xl" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">About</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base">Terms and Conditions</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Get in Touch</h4>
              <div className="space-y-2 text-gray-300">
                <p className="text-sm sm:text-base">Ready to stop window shopping?</p>
                <p className="text-sm sm:text-base">Let's discuss how we can help you achieve breakthrough success.</p>
                <div className="mt-3 sm:mt-4">
                  <a 
                    href="mailto:NoWindowShoppingOnline@gmail.com" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors inline-block text-sm sm:text-base"
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
  </div>
);

// Card component for the hub
const HubCard = ({ title, description, to, icon }: { title: string; description: string; to: string; icon: React.ReactNode }) => {
  const isLQCard = title === "Luminère Qualité";

  return (
    <Link
      to={to}
      className={`${
        isLQCard
          ? 'bg-black border-2 border-yellow-400 text-white hover:border-yellow-300 hover:shadow-yellow-400/20'
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
      } hover:scale-105 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col px-4 sm:px-6 py-4 sm:py-6 md:py-8 justify-between h-full group touch-manipulation no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
    >
      <div>
        <div className={`text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 text-center group-hover:scale-110 transition-transform duration-300 ${
          isLQCard ? 'text-yellow-400' : ''
        }`}>
          {icon}
        </div>
        <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-center leading-tight ${
          isLQCard ? 'text-yellow-400 font-serif' : 'text-gray-900 dark:text-white'
        }`}>
          {title}
        </h3>
        <p className={`mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm leading-relaxed text-center ${
          isLQCard ? 'text-gray-300 font-serif' : 'text-gray-700 dark:text-gray-300'
        }`}>
          {description}
        </p>
      </div>
      <span className={`py-3 sm:py-2 md:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors text-center text-sm sm:text-base touch-manipulation ${
        isLQCard
          ? 'bg-yellow-400 text-black group-hover:bg-yellow-300 font-serif'
          : 'bg-gray-900 text-white group-hover:bg-blue-600'
      }`}>
        {isLQCard ? 'Discover' : 'Explore'}
      </span>
    </Link>
  );
};

const ContactPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-100">
    <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
      <IconWrapper icon={FaPhone} className="text-5xl mb-4 text-blue-600" />
      <h1 className="text-2xl font-bold mb-2 text-blue-600">Contact Us</h1>
      <p className="text-gray-700 text-lg mb-4">We'd love to hear from you! Reach out via email or Instagram:</p>
      <div className="flex flex-col gap-2 text-lg">
        <span className="font-semibold text-pink-600">Email:</span>
        <a href="mailto:NoWindowShoppingOnline@gmail.com" className="text-blue-700 underline">NoWindowShoppingOnline@gmail.com</a>
        <span className="font-semibold text-pink-600 mt-4">Instagram:</span>
        <a href="https://instagram.com/DrProctorKOPV" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">@DrProctorKOPV</a>
      </div>
    </div>
  </div>
);

const WebStore = React.lazy(() => import('./webstore/WebStore'));
const ProductDetail = React.lazy(() => import('./webstore/ProductDetail'));
const WebstoreAdmin = React.lazy(() => import('./webstore/admin/WebstoreAdmin'));
const TechClientAdmin = React.lazy(() => import('./tech-clients/admin/TechClientAdmin'));
const TechClientPortal = React.lazy(() => import('./tech-clients/portal/TechClientPortal'));
const SupportRequest = React.lazy(() => import('./support/public/SupportRequest'));
const SupportAdmin = React.lazy(() => import('./support/admin/SupportAdmin'));
const ClientIntake = React.lazy(() => import('./ClientIntake'));
const FeedbackForm = React.lazy(() => import('./FeedbackForm'));

const App = () => (
  <Router>
    <MultiplayerProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
        <Route path="/" element={<InteractiveHub />} />
        <Route path="/love" element={<VDaySurprise />} />
        <Route path="/love/" element={<VDaySurprise />} />
        <Route path="/vdaysurprise" element={<VDaySurprise />} />
        <Route path="/vdaysurprise/" element={<VDaySurprise />} />
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
        <Route path="/blog/friendship-1" element={<BlogPostFriendship1 />} />
        <Route path="/blog/friendship-2" element={<BlogPostFriendship2 />} />
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
        <Route path="/blog/interactive-mantra" element={<PrinciplesInteractiveMantra />} />
        <Route path="/blog/wedding-crashing" element={<PrinciplesWeddingCrashing />} />
        <Route path="/blog/parody-rules" element={<PrinciplesParodyRules />} />
        <Route path="/blog/29-things-every-man-should-know" element={<Principles29ThingsEveryManShouldKnow />} />
        <Route path="/blog/weekly/:slug" element={<WeeklyBlogPost />} />
        <Route path="/blog-hub" element={<BlogHub />} />
        <Route path="/guide" element={<UserGuide />} />
        <Route path="/lq" element={<LQ />} />
        <Route path="/admin/guide" element={<AdminGuide />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/coachcare/booking" element={<Booking />} />
        <Route path="/coachcare/*" element={<CoachCareApp />} />
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
        <Route path="/webstore" element={<WebStore />} />
        <Route path="/webstore/:slug" element={<ProductDetail />} />
        <Route path="/webstore/admin" element={<WebstoreAdmin />} />
        <Route path="/admin/tech-clients" element={<TechClientAdmin />} />
        <Route path="/tech-clients" element={<TechClientPortal />} />
        <Route path="/support" element={<SupportRequest />} />
        <Route path="/admin/support" element={<SupportAdmin />} />
        <Route path="/clientintake" element={<ClientIntake />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/raffle" element={<RaffleHub />} />
        <Route path="/raffle/admin" element={<RaffleAdmin />} />
        <Route path="/raffle/:id" element={<RaffleDetail />} />
        <Route path="/pagemonitor" element={<PageMonitorDownload />} />
        <Route path="/pagemonitor/" element={<PageMonitorDownload />} />
        <Route path="/softwarehub" element={<SoftwareHub />} />
        <Route path="/softwarehub/" element={<SoftwareHub />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/brians42nd" element={<Brians42nd />} />
        <Route path="/blog/slippery-slopes" element={<SlipperySlopesHub />} />
        <Route path="/blog/seat-at-table" element={<SeatAtTableHub />} />
        <Route path="/blog/peaked-hs" element={<PeakedHSHub />} />
        <Route path="/blog/friendship" element={<FriendshipSeriesHub />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/blackjack" element={<BlackjackLux />} />
        <Route path="/checkers" element={<CheckersLux />} />
        <Route path="/tycoon" element={<Tycoon />} />
        <Route path="/spades" element={<NWSSpades />} />
        <Route path="/5000" element={<FiveThousandNWS />} />
        <Route path="/holdem" element={<HoldemLux />} />
        <Route path="/games" element={<GameHub />} />
        
        {/* Multiplayer Routes */}
        <Route path="/multiplayer/:gameType" element={
          <MultiplayerLobby 
            onStartGame={() => {}} 
            onBack={() => window.history.back()} 
          />
        } />
        
        {/* Add other routes as needed */}
      </Routes>
      <Analytics />
    </Suspense>
    </MultiplayerProvider>
  </Router>
);

export default App;

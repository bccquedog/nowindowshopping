import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GuideStep {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  completed: boolean;
}

const UserGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [showProgress, setShowProgress] = useState(false);
  const navigate = useNavigate();

  const markStepComplete = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepId);
    setCompletedSteps(newCompleted);
  };

  const goToNextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const guideSteps: GuideStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to No Window Shopping',
      description: 'Get started with your professional development journey',
      completed: completedSteps.has('welcome'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Success Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No Window Shopping is your comprehensive platform for professional development, 
              business growth, and personal transformation. This interactive guide will help 
              you master every feature and maximize your results.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">What You'll Learn</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Navigate the Interactive Hub and access all features</li>
              <li>• Master the MGCU (Marcus Graham Connected Universe)</li>
              <li>• Schedule and manage coaching sessions</li>
              <li>• Access professional services and resources</li>
              <li>• Use the ticketing system for support</li>
              <li>• Customize your experience with settings</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                markStepComplete('welcome');
                goToNextStep();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Your Journey
            </button>
            <button
              onClick={() => navigate('/hub')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Skip to Hub
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'navigation',
      title: 'Navigation & Interactive Hub',
      description: 'Learn how to navigate the platform and access all features',
      completed: completedSteps.has('navigation'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Master the Interactive Hub</h2>
            <p className="text-gray-600">
              The Interactive Hub is your command center for accessing all platform features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Navigation Areas</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>MGCU:</strong> Access the Marcus Graham Connected Universe</li>
                <li><strong>CoachCare:</strong> Schedule coaching sessions</li>
                <li><strong>Services:</strong> Browse professional services</li>
                <li><strong>Blog:</strong> Read latest insights and articles</li>
                <li><strong>Contact:</strong> Get in touch with our team</li>
                <li><strong>Settings:</strong> Customize your experience</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/hub')}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-lg text-left transition-colors"
                >
                  🎯 Explore Interactive Hub
                </button>
                <button
                  onClick={() => navigate('/services')}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-800 p-3 rounded-lg text-left transition-colors"
                >
                  🎯 Browse Services
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 p-3 rounded-lg text-left transition-colors"
                >
                  🎯 Contact Support
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              <strong>Pro Tip:</strong> Bookmark the Interactive Hub page for quick access to all features!
            </p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={goToPreviousStep}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => {
                markStepComplete('navigation');
                goToNextStep();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'mgcu',
      title: 'MGCU - Marcus Graham Connected Universe',
      description: 'Explore the interactive literary universe and storytelling platform',
      completed: completedSteps.has('mgcu'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Discover the MGCU</h2>
            <p className="text-gray-600">
              The Marcus Graham Connected Universe is an interactive storytelling platform 
              where every story connects and every choice matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📖 Library</h3>
              <p className="text-gray-700 mb-3">
                Access the complete collection of interconnected stories and novels.
              </p>
              <button
                onClick={() => navigate('/mgcu')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded transition-colors"
              >
                Enter Library
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🌌 Universe</h3>
              <p className="text-gray-700 mb-3">
                Explore the lore, timeline, and connections between all stories.
              </p>
              <button
                onClick={() => navigate('/mgcu')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
              >
                Explore Universe
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">👥 Characters</h3>
              <p className="text-gray-700 mb-3">
                Meet the characters and learn their backstories and motivations.
              </p>
              <button
                onClick={() => navigate('/mgcu')}
                className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors"
              >
                Meet Characters
              </button>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Interactive Features</h3>
            <ul className="text-purple-800 space-y-1">
              <li>• Save your progress and track your journey</li>
              <li>• Unlock achievements and rewards</li>
              <li>• Participate in community discussions</li>
              <li>• Access exclusive content and behind-the-scenes material</li>
            </ul>
          </div>

          <div className="flex justify-between">
            <button
              onClick={goToPreviousStep}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => {
                markStepComplete('mgcu');
                goToNextStep();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'coachcare',
      title: 'CoachCare - Personalized Coaching',
      description: 'Learn how to schedule and manage your coaching sessions',
      completed: completedSteps.has('coachcare'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">CoachCare - Your Personal Development Partner</h2>
            <p className="text-gray-600">
              Get personalized one-on-one coaching tailored to your specific needs and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Coaching Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Business Coaching:</strong> Strategy, scaling, and operations</li>
                <li>• <strong>Leadership Development:</strong> Executive and management skills</li>
                <li>• <strong>Career Guidance:</strong> Job readiness and advancement</li>
                <li>• <strong>Financial Literacy:</strong> Personal finance and wealth building</li>
                <li>• <strong>Mindset Transformation:</strong> Personal development and growth</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Get Started</h3>
              <ol className="space-y-2 text-gray-700">
                <li>1. Visit the CoachCare section</li>
                <li>2. Browse available coaching packages</li>
                <li>3. Select your preferred coach and time</li>
                <li>4. Complete your booking</li>
                <li>5. Prepare for your session</li>
              </ol>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Booking Tips</h3>
            <ul className="text-green-800 space-y-1">
              <li>• Book sessions at least 24 hours in advance</li>
              <li>• Come prepared with specific questions and goals</li>
              <li>• Be open to feedback and new perspectives</li>
              <li>• Follow up on action items between sessions</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/coachcare')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore CoachCare
            </button>
            <button
              onClick={() => navigate('/booking')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Book a Session
            </button>
          </div>

          <div className="flex justify-between">
            <button
              onClick={goToPreviousStep}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => {
                markStepComplete('coachcare');
                goToNextStep();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'services',
      title: 'Professional Services',
      description: 'Explore the comprehensive range of professional development services',
      completed: completedSteps.has('services'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Services Overview</h2>
            <p className="text-gray-600">
              Access a comprehensive suite of services designed to accelerate your professional growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💼 Business & Entrepreneurship</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Business Consulting</li>
                <li>• Startup Coaching</li>
                <li>• Contracting Advisory</li>
                <li>• Process Improvement</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">👑 Leadership & Development</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Executive Coaching</li>
                <li>• Career Development</li>
                <li>• Corporate Training</li>
                <li>• Public Speaking</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💰 Financial Literacy</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Personal Finance</li>
                <li>• Investment Education</li>
                <li>• Wealth Building</li>
                <li>• Passive Income</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🖥️ IT Services</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Software Development</li>
                <li>• System Integration</li>
                <li>• Digital Transformation</li>
                <li>• Technical Consulting</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Education & Training</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Professional Workshops</li>
                <li>• Skill Development</li>
                <li>• Certification Programs</li>
                <li>• Online Learning</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🎨 Creative Services</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Content Creation</li>
                <li>• Brand Development</li>
                <li>• Marketing Strategy</li>
                <li>• Creative Consulting</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started with Services</h3>
            <p className="text-blue-800">
              Visit the Services section to browse all available offerings, read detailed descriptions, 
              and connect with our team to discuss your specific needs and goals.
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/services')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore All Services
            </button>
          </div>

          <div className="flex justify-between">
            <button
              onClick={goToPreviousStep}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => {
                markStepComplete('services');
                goToNextStep();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'support',
      title: 'Support & Ticketing System',
      description: 'Learn how to get help and use the ticketing system',
      completed: completedSteps.has('support'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎫</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Support & Help System</h2>
            <p className="text-gray-600">
              Get the help you need through our comprehensive support system and ticketing platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Support Channels</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🎫</span>
                  <div>
                    <strong>Ticketing System:</strong> Submit detailed support requests
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <strong>Email Support:</strong> Direct communication with our team
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">💬</span>
                  <div>
                    <strong>Live Chat:</strong> Real-time assistance (when available)
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  <div>
                    <strong>Knowledge Base:</strong> Self-service help articles
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Creating a Support Ticket</h3>
              <ol className="space-y-2 text-gray-700">
                <li>1. Navigate to the Support section</li>
                <li>2. Click "Create New Ticket"</li>
                <li>3. Select the appropriate category</li>
                <li>4. Provide detailed description of your issue</li>
                <li>5. Attach any relevant files or screenshots</li>
                <li>6. Submit and track your ticket</li>
              </ol>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Before Submitting a Ticket</h3>
            <ul className="text-yellow-800 space-y-1">
              <li>• Check the FAQ section for common solutions</li>
              <li>• Search existing knowledge base articles</li>
              <li>• Include specific error messages or screenshots</li>
              <li>• Describe what you've already tried to resolve the issue</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/support')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Visit Support
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </button>
          </div>

          <div className="flex justify-between">
            <button
              onClick={goToPreviousStep}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => {
                markStepComplete('support');
                goToNextStep();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'settings',
      title: 'Settings & Customization',
      description: 'Learn how to customize your experience and manage settings',
      completed: completedSteps.has('settings'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings & Customization</h2>
            <p className="text-gray-600">
              Personalize your experience and manage your account settings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">General Settings</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Profile Management:</strong> Update your information</li>
                <li>• <strong>Preferences:</strong> Customize your experience</li>
                <li>• <strong>Notifications:</strong> Manage alert settings</li>
                <li>• <strong>Privacy:</strong> Control your data and visibility</li>
                <li>• <strong>Security:</strong> Password and account protection</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced Settings</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>System Health:</strong> Check platform status</li>
                <li>• <strong>Feature Status:</strong> View available features</li>
                <li>• <strong>Diagnostics:</strong> Troubleshoot issues</li>
                <li>• <strong>API Access:</strong> Developer tools (if applicable)</li>
                <li>• <strong>Data Export:</strong> Download your information</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Pro Tips for Settings</h3>
            <ul className="text-purple-800 space-y-1">
              <li>• Regularly review and update your notification preferences</li>
              <li>• Enable two-factor authentication for enhanced security</li>
              <li>• Use the advanced settings to troubleshoot any issues</li>
              <li>• Export your data periodically for backup purposes</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/settings')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Open Settings
            </button>
            <button
              onClick={() => navigate('/settings/advanced')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Advanced Settings
            </button>
          </div>

          <div className="flex justify-between">
            <button
              onClick={goToPreviousStep}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => {
                markStepComplete('settings');
                goToNextStep();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'completion',
      title: 'Congratulations!',
      description: 'You\'ve completed the user guide and are ready to succeed',
      completed: completedSteps.has('completion'),
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">You're Ready to Succeed!</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Congratulations! You've completed the No Window Shopping user guide. 
              You now have all the knowledge and tools you need to maximize your 
              professional development journey.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-900 mb-4">What You've Accomplished</h3>
            <div className="grid md:grid-cols-2 gap-4 text-green-800">
              <ul className="space-y-2">
                <li>✅ Mastered platform navigation</li>
                <li>✅ Learned about MGCU features</li>
                <li>✅ Understood CoachCare services</li>
                <li>✅ Explored professional services</li>
              </ul>
              <ul className="space-y-2">
                <li>✅ Learned support system usage</li>
                <li>✅ Customized your settings</li>
                <li>✅ Discovered advanced features</li>
                <li>✅ Prepared for success</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Next Steps</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold text-blue-900 mb-2">Start Your Journey</h4>
                <p className="text-blue-800 text-sm">Begin exploring the platform and set your first goals</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="font-semibold text-blue-900 mb-2">Dive into MGCU</h4>
                <p className="text-blue-800 text-sm">Explore the interactive storytelling universe</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">👥</div>
                <h4 className="font-semibold text-blue-900 mb-2">Book Coaching</h4>
                <p className="text-blue-800 text-sm">Schedule your first coaching session</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/hub')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Go to Interactive Hub
            </button>
            <button
              onClick={() => navigate('/services')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explore Services
            </button>
            <button
              onClick={() => navigate('/mgcu')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Enter MGCU
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Remember: <strong>No Window Shopping</strong> - Take action, not hesitation!
            </p>
          </div>
        </div>
      )
    }
  ];

  const progressPercentage = (completedSteps.size / guideSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Interactive User Guide</h1>
              <p className="text-gray-600">Master the No Window Shopping platform step by step</p>
            </div>
            <button
              onClick={() => setShowProgress(!showProgress)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {showProgress ? 'Hide Progress' : 'Show Progress'}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">
            {completedSteps.size} of {guideSteps.length} steps completed ({Math.round(progressPercentage)}%)
          </p>

          {/* Step Navigation */}
          {showProgress && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {guideSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`p-2 rounded text-xs font-medium transition-colors ${
                    index === currentStep
                      ? 'bg-blue-600 text-white'
                      : completedSteps.has(step.id)
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {guideSteps[currentStep].content}
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/hub')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Hub
            </button>
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {guideSteps.length}
            </div>
            <button
              onClick={() => navigate('/support')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Need Help? →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide; 
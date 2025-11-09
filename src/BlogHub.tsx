import React from 'react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    title: 'Escaping to the 90s: Blog Series',
    description: 'A 3-part journey into nostalgia, overstimulation, and rediscovering wonder. Read the full series!',
    to: '/blog/escaping-to-the-90s',
    icon: '📼',
    date: 'March 2025' // Updated to reflect reference to Malcolm-Jamal Warner's passing
  },
  {
    title: 'No More Excuses: Get Up and Get Moving',
    description: 'Stop procrastinating and start taking action. Winners act, losers make excuses.',
    to: '/blog/1',
    icon: '🔥',
    date: 'March 15, 2025'
  },
  {
    title: `You're a Window Shopper—And It's Your Own Damn Fault`,
    description: 'Why watching others succeed is not the same as building your own success.',
    to: '/blog/2',
    icon: '🛍️',
    date: 'March 9, 2025'
  },
  {
    title: 'Financial Literacy: The Key to Freedom and a Stress-Free Life',
    description: 'Master your money, master your life. Learn the basics of financial freedom.',
    to: '/blog/3',
    icon: '💸',
    date: 'March 8, 2025'
  },
  {
    title: 'Side Hustle Success: Building Your Empire One Gig at a Time',
    description: 'How to turn your skills into income streams and build financial freedom.',
    to: '/blog/side-hustle',
    icon: '💼',
    date: 'March 7, 2025'
  },
  {
    title: 'Managing Expectations: The Key to Sustainable Success',
    description: 'Set realistic goals and avoid burnout while achieving your dreams.',
    to: '/blog/expectations',
    icon: '🎯',
    date: 'March 6, 2025'
  },
  {
    title: 'Work-Life Balance: Myth or Achievable Reality?',
    description: 'How to maintain boundaries and find harmony between career and personal life.',
    to: '/blog/work-life-balance',
    icon: '⚖️',
    date: 'March 5, 2025'
  },
  {
    title: 'Stop Flaking, Start Living',
    description: 'Why keeping your word is the foundation of success and strong relationships.',
    to: '/blog/stop-flaking',
    icon: '🤝',
    date: 'March 4, 2025'
  },
  {
    title: 'Slippery Slopes Series',
    description: 'Ambition, temptation, and redemption in this 3-part series.',
    to: '/blog/slippery-slopes',
    icon: '🧗',
    date: 'February 2025'
  },
  {
    title: 'Seat at the Table Series',
    description: 'A 4-part series on access, authenticity, and building your own opportunities.',
    to: '/blog/seat-at-table',
    icon: '🍽️',
    date: 'January 2025'
  },
  {
    title: 'Peaked in High School Series',
    description: 'A 2-part series on growth, reinvention, and finding your next chapter.',
    to: '/blog/peaked-hs',
    icon: '🎓',
    date: 'December 2024'
  },
  {
    title: 'Friendship Series: What Is a True Friend… and What Does It Cost?',
    description: 'Explore the meaning, cost, and evolution of true friendship in this 4-part series by Brian Proctor.',
    to: '/blog/friendship',
    icon: '🫂',
    date: 'February 27, 2025'
  },
  {
    title: 'Have Not vs Need: Understanding True Priorities',
    description: 'Distinguishing between wants and needs for better decision making.',
    to: '/blog/have-not-need',
    icon: '📋',
    date: 'February 23, 2025'
  },
  {
    title: 'Financial Literacy: Building Wealth Through Knowledge',
    description: 'Essential financial skills for building long-term wealth and security.',
    to: '/blog/financial-literacy',
    icon: '💰',
    date: 'February 22, 2025'
  },
  {
    title: 'Learning to Say No: Setting Boundaries for Success',
    description: 'Why saying no is essential for achieving your most important goals.',
    to: '/blog/say-no',
    icon: '🚫',
    date: 'February 21, 2025'
  },
  {
    title: 'The NWS Laws: Principles for Success',
    description: 'Core principles and rules for achieving success in business and life.',
    to: '/blog/nws-laws',
    icon: '⚖️',
    date: 'February 20, 2025'
  },
  {
    title: 'A Seat at the Table: Part 1',
    description: 'Earning your place and making your voice heard in important discussions.',
    to: '/blog/seat-at-table-1',
    icon: '🪑',
    date: 'February 18, 2025'
  },
  {
    title: 'A Seat at the Table: Part 2',
    description: 'Contributing meaningfully when you have a seat at the table.',
    to: '/blog/seat-at-table-2',
    icon: '🪑',
    date: 'February 17, 2025'
  },
  {
    title: 'A Seat at the Table: Part 3',
    description: 'Building influence and creating opportunities for others.',
    to: '/blog/seat-at-table-3',
    icon: '🪑',
    date: 'February 16, 2025'
  },
  {
    title: 'A Seat at the Table: Part 4',
    description: 'Sustaining your position and continuing to add value.',
    to: '/blog/seat-at-table-4',
    icon: '🪑',
    date: 'February 15, 2025'
  },
  {
    title: 'Conflicted: Navigating Internal Struggles',
    description: 'How to handle internal conflicts and make aligned decisions.',
    to: '/blog/conflicted',
    icon: '🤔',
    date: 'February 14, 2025'
  },
  {
    title: 'NoWindowShopping Principles',
    description: 'Engage with the principles in a hands-on, interactive way.',
    to: '/blog/interactive-mantra',
    icon: '🛒',
    date: 'February 13, 2025'
  },
  {
    title: 'Rules to Wedding Crashing',
    description: 'All 110 rules of Wedding Crashing from the "Wedding Crashers" bonus feature.',
    to: '/blog/wedding-crashing',
    icon: '🎩',
    date: 'February 12, 2025'
  },
  {
    title: 'NoWindowShopping Parody Rules',
    description: 'A serious, professional, but comedic take on the rules of NoWindowShopping.',
    to: '/blog/parody-rules',
    icon: '🤡',
    date: 'February 11, 2025'
  },
  {
    title: '29 Things Every Man Should Know',
    description: 'Essential lessons for leadership, character, and legacy.',
    to: '/blog/29-things-every-man-should-know',
    icon: '🧑‍🔧',
    date: 'February 10, 2025'
  }
];

const BlogHub: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 py-8 sm:py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white px-2">NWS Blog</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
          Insights, tips, and stories on business, mindset, and personal development.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.title}
            to={blog.to}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
          >
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-center group-hover:scale-110 transition-transform duration-300">
              {blog.icon}
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
              {blog.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
              {blog.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {blog.date}
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium group-hover:underline">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default BlogHub; 
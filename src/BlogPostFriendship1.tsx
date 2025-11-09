import React from 'react';
import { Link } from 'react-router-dom';
import CommentsSection from './components/CommentsSection';

export default function BlogPostFriendship1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/blog/friendship" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Friendship Series
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Friendship Series – Part 1: What Is a True Friend… and What Does It Cost?</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">By Brian Proctor</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">January 15, 2024</p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              "A true friend is someone who knows the song in your heart and can sing it back to you when you've forgotten the words."
            </p>

            <p>
              We throw the word "friend" around like it's nothing. Someone we met once? Friend. Person we follow on social media? Friend. 
              Someone we've known for years but never really talked to? Friend.
            </p>

            <p>
              But what is a <strong>true</strong> friend? And more importantly, what does it cost to have one?
            </p>

            <h2>The Price of True Friendship</h2>

            <p>
              True friendship isn't free. It costs time, energy, vulnerability, and sometimes even your pride. 
              It requires showing up when you don't feel like it, listening when you want to talk, 
              and being honest when it's easier to lie.
            </p>

            <p>
              A true friend is someone who:
            </p>

            <ul>
              <li>Sees your flaws and loves you anyway</li>
              <li>Calls you out when you're wrong, but does it with love</li>
              <li>Celebrates your wins as if they were their own</li>
              <li>Shows up in the middle of the night when you need them</li>
              <li>Remembers the things you're too embarrassed to ask for help with</li>
              <li>Knows your story and doesn't judge you for it</li>
            </ul>

            <h2>The Investment Required</h2>

            <p>
              Building this kind of friendship takes years. It takes fights and make-ups, 
              misunderstandings and clarifications, growth and growing pains.
            </p>

            <p>
              It means being willing to be uncomfortable. To have hard conversations. 
              To admit when you're wrong. To forgive when you've been hurt.
            </p>

            <h2>Is It Worth It?</h2>

            <p>
              Only you can answer that question. But here's what I know:
            </p>

            <p>
              A true friend is worth more than gold. They're the person who knows you better than you know yourself, 
              who believes in you when you don't believe in yourself, who loves you unconditionally.
            </p>

            <p>
              But they're also rare. Most people aren't willing to pay the price. 
              They want the benefits of friendship without the work.
            </p>

            <h2>The Choice</h2>

            <p>
              So the question becomes: Are you willing to pay the price? 
              Are you willing to be the kind of friend you want to have?
            </p>

            <p>
              Because true friendship is a two-way street. You can't expect to receive what you're not willing to give.
            </p>

            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-8">
              The cost of true friendship is high. But the cost of not having it is higher.
            </p>
          </div>
        </article>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-left">
            <span className="text-sm text-gray-500 dark:text-gray-400">Previous</span>
            <p className="text-gray-900 dark:text-white">← Back to Series Hub</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500 dark:text-gray-400">Next</span>
            <Link to="/blog/friendship-2" className="text-blue-600 dark:text-blue-400 hover:underline">
              Part 2: How to Outgrow a Friendship Without Guilt →
            </Link>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection />
      </div>
    </div>
  );
} 
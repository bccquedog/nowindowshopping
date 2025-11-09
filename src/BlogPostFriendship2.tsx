import React from 'react';
import { Link } from 'react-router-dom';
import CommentsSection from './components/CommentsSection';

export default function BlogPostFriendship2() {
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
            <h1 className="text-4xl font-bold mb-2">Friendship Series – Part 2: How to Outgrow a Friendship Without Guilt</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">By Brian Proctor</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">January 20, 2024</p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong."
            </p>

            <p>
              You've been friends for years. Maybe decades. You've shared secrets, dreams, heartbreaks, and victories. 
              You thought this friendship would last forever.
            </p>

            <p>
              But something's changed. You've grown. They've grown. And now you're growing in different directions.
            </p>

            <h2>The Signs You've Outgrown a Friendship</h2>

            <p>
              It's not always obvious when a friendship has run its course. Here are the signs:
            </p>

            <ul>
              <li>You feel drained after spending time together</li>
              <li>Your values and priorities have diverged significantly</li>
              <li>You're no longer excited to share your wins with them</li>
              <li>Their problems feel like burdens you're obligated to carry</li>
              <li>You find yourself making excuses not to see them</li>
              <li>You've changed, but they still see you as the old version of yourself</li>
            </ul>

            <h2>Why We Feel Guilty</h2>

            <p>
              Guilt is the enemy of healthy growth. We feel guilty because:
            </p>

            <ul>
              <li>We think we're abandoning them</li>
              <li>We remember the good times and feel like we owe them</li>
              <li>We worry about what others will think</li>
              <li>We're afraid of being alone</li>
              <li>We don't want to hurt their feelings</li>
            </ul>

            <p>
              But here's the truth: You're not abandoning anyone. You're honoring the friendship by not forcing it to continue when it's no longer serving either of you.
            </p>

            <h2>How to Let Go Gracefully</h2>

            <p>
              <strong>1. Accept that it's okay to outgrow people</strong>
            </p>

            <p>
              Growth is natural. It's not a betrayal. It's evolution. The person you were when you met them 
              is not the person you are now, and that's beautiful.
            </p>

            <p>
              <strong>2. Be honest with yourself</strong>
            </p>

            <p>
              Stop making excuses. If you're not excited to see them, if you're not growing together, 
              if you're not supporting each other's dreams, it's okay to acknowledge that.
            </p>

            <p>
              <strong>3. Have the conversation (if appropriate)</strong>
            </p>

            <p>
              Not every friendship needs a dramatic breakup. Sometimes, you can simply:
            </p>

            <ul>
              <li>Gradually reduce contact</li>
              <li>Be honest about your changing priorities</li>
              <li>Wish them well and move on</li>
            </ul>

            <p>
              <strong>4. Honor what the friendship gave you</strong>
            </p>

            <p>
              Even if it's ending, that friendship served a purpose. It taught you something, 
              supported you through something, or helped you become who you are today.
            </p>

            <h2>Making Space for New Connections</h2>

            <p>
              When you let go of friendships that no longer serve you, you make space for new connections 
              that align with who you're becoming.
            </p>

            <p>
              These new friendships will:
            </p>

            <ul>
              <li>Support your current goals and values</li>
              <li>Challenge you to grow in new ways</li>
              <li>Bring fresh energy and perspectives</li>
              <li>Celebrate the person you are now, not who you used to be</li>
            </ul>

            <h2>Remember: It's Not About Them</h2>

            <p>
              Outgrowing a friendship isn't about the other person being bad or wrong. 
              It's about you growing into someone who needs different things from relationships.
            </p>

            <p>
              You can love someone and still need to let them go. You can appreciate what they gave you 
              and still move forward without them.
            </p>

            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-8">
              Growth requires letting go. And letting go requires courage. Be brave enough to honor your evolution.
            </p>
          </div>
        </article>

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="text-left">
            <span className="text-sm text-gray-500 dark:text-gray-400">Previous</span>
            <Link to="/blog/friendship-1" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Part 1: What Is a True Friend… and What Does It Cost?
            </Link>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500 dark:text-gray-400">Next</span>
            <Link to="/blog/friendship-3" className="text-blue-600 dark:text-blue-400 hover:underline">
              Part 3: When You're the One Who Was Left Behind →
            </Link>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection />
      </div>
    </div>
  );
} 
import React from 'react';
import CommentsSection from './components/CommentsSection';

const BlogPostSayNo: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200 dark:from-blue-900 dark:via-blue-800 dark:to-purple-900">
    <div className="max-w-2xl mx-auto py-12 px-4 prose prose-lg dark:prose-invert">
      <h1 className="text-4xl font-bold mb-2">It’s Okay to Say No (And Don’t Feel Bad Either)</h1>
      <p className="text-gray-500 mb-2">By Brian Proctor</p>
      <section>
        <p>We’ve been taught to be polite. To be agreeable.<br />
          To say yes, even when we’re exhausted.<br />
          To smile through the inconvenience.<br />
          To avoid “letting people down.”
        </p>
        <p>But here’s what no one tells you:<br />
          Every time you say yes to something that isn’t aligned, you say no to yourself.
        </p>
        <p><strong>So this post is your permission slip.</strong><br />
          To stop overexplaining.<br />
          To stop apologizing.<br />
          To stop shrinking just to make other people comfortable.
        </p>
        <p>Because “no” is a full sentence.<br />
          And it might be the most powerful word you can learn to use without guilt.
        </p>
      </section>
      <h2>1. “Yes” Isn’t Noble When It’s Forced</h2>
      <p>You know the script:<br />
        “Sure, I’ll make it.”<br />
        “No worries, I got it.”<br />
        “Yeah, I’ll take care of it.”
      </p>
      <p>And then you’re up late, behind on your own work, emotionally depleted — but smiling because you “showed up.”</p>
      <p><strong>Here’s the truth:</strong><br />
        A fake “yes” serves no one.<br />
        If your heart isn’t in it, your energy isn’t either — and people can feel that.<br />
        A clean, kind no is always better than a resentful yes.
      </p>
      <h2>2. You Don’t Owe People Unlimited Access</h2>
      <p>Just because they ask doesn’t mean you have to give.<br />
        Your time, energy, peace, money, attention — they all have value.<br />
        And just because someone is “used to” you saying yes doesn’t mean you’re obligated to keep saying it.
      </p>
      <p>You can love people deeply and still have boundaries.<br />
        You can care about their feelings and still protect your own.<br />
        That’s not being selfish.<br />
        That’s called being whole.
      </p>
      <h2>3. Guilt Is Not a Signal — It’s a Habit</h2>
      <p>That feeling you get after you say no? That heaviness in your chest?<br />
        That’s not your intuition. That’s conditioning.<br />
        You’ve been taught to believe that saying no makes you:</p>
      <ul>
        <li>Rude</li>
        <li>Cold</li>
        <li>Difficult</li>
        <li>Disloyal</li>
      </ul>
      <p><strong>But here’s the truth:</strong><br />
        The people who really love you will want your truth — not just your compliance.<br />
        And the ones who get offended by your “no” were often only comfortable with your lack of boundaries to begin with.
      </p>
      <h2>4. Practice Saying No Without the Fluff</h2>
      <p>You don’t owe long explanations or emotional padding.</p>
      <p>Try:</p>
      <ul>
        <li>“I can’t make that work this time.”</li>
        <li>“Thanks for thinking of me, but I’ll have to pass.”</li>
        <li>“No, that’s not something I can commit to right now.”</li>
      </ul>
      <p>Clear. Kind. Solid.<br />
        The more you use your no, the more powerful your yes becomes.
      </p>
      <h2>5. The NWS Way: Choose Alignment Over Obligation</h2>
      <p>At No Window Shopping, we believe in intentional living.<br />
        That means:</p>
      <ul>
        <li>Saying no to what drains you</li>
        <li>Saying no to what distracts you</li>
        <li>Saying no to what you’ve outgrown</li>
      </ul>
      <p>Because every time you say no to something that isn’t aligned,<br />
        you make room for something that is.
      </p>
      <h2>Final Thought</h2>
      <p>The power of “no” is not rejection.<br />
        It’s direction.</p>
      <p>It’s you saying:<br />
        I know what I need.<br />
        I know what I’m building.<br />
        And I don’t have to apologize for choosing what protects that.
      </p>
      <p>So next time the ask doesn’t feel right,<br />
        just say it — with confidence, not guilt:</p>
      <p className="text-2xl font-bold text-blue-900 text-center my-6">No.<br />And keep it moving.</p>
      <div className="mt-12">
        <CommentsSection />
      </div>
    </div>
  </div>
);

export default BlogPostSayNo; 
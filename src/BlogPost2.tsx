import React from 'react';
import { Clock, Eye, XCircle, CheckCircle, Zap } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPost2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-yellow-600">
      <div className="max-w-2xl mx-auto py-10 px-4 prose prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">You're a Window Shopper—And It's Your Own Damn Fault</h1>
          <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>March 9, 2025</span>
          </div>
        </div>
        <blockquote className="border-l-4 border-orange-500 pl-4 italic text-orange-200 bg-orange-900 bg-opacity-30 rounded mb-6">
          "Stop staring and go get it"
        </blockquote>
        <p>Yeah, I said it. You're watching instead of doing. You're admiring success instead of building it. You're standing outside the store of opportunity, nose pressed to the glass, too scared to walk in and take what's yours.</p>
        <p>Meanwhile, someone with half your talent, half your intelligence, and half your excuses is already inside, making moves.</p>
        <p>And guess what? They're winning.</p>
        <p>While you sit there overthinking, planning, and telling yourself "one day," they took action. They didn't wait to feel ready, they didn't need perfect conditions, and they sure as hell didn't spend their time window shopping for success instead of actually getting it.</p>
        <p>You're stuck, not because life is unfair, not because of bad luck, not because you don't have enough money or experience—but because you refuse to take the damn risk.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Eye className="w-6 h-6 text-blue-400" /> The Harsh Truth About the Window Shopper's Mentality</h2>
        <p>You love the idea of success. You dream about it, talk about it, maybe even research it. You probably have notebooks full of plans.</p>
        <p>But talking isn't doing. Planning isn't executing. Watching isn't winning.</p>
        <p>Let's be brutally honest:</p>
        <ul>
          <li><XCircle className="w-4 h-4 inline text-red-400 mr-1" /> You wait for the perfect moment. <b>Spoiler alert:</b> It doesn't exist.</li>
          <li><XCircle className="w-4 h-4 inline text-red-400 mr-1" /> You tell yourself you need more time. Meanwhile, others make time.</li>
          <li><XCircle className="w-4 h-4 inline text-red-400 mr-1" /> You're scared of failing. But you're already failing—by doing nothing.</li>
          <li><XCircle className="w-4 h-4 inline text-red-400 mr-1" /> You're addicted to overthinking. And that's why you never start.</li>
        </ul>
        <p>You see others launching businesses, getting promotions, making money, and growing—and instead of stepping up, you sit there making excuses for why it's not happening for you.</p>
        <p>Maybe you blame a lack of resources. Maybe you tell yourself you're "just not ready." Maybe you convince yourself that successful people have some secret advantage.</p>
        <p>They don't. The only difference is, they stopped standing outside the store and actually walked in.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Zap className="w-6 h-6 text-yellow-400" /> Success Doesn't Wait—And Neither Should You</h2>
        <p>While you hesitate, here's what's happening:</p>
        <ul>
          <li><CheckCircle className="w-4 h-4 inline text-green-400 mr-1" /> Less talented people are getting ahead of you.</li>
          <li><CheckCircle className="w-4 h-4 inline text-green-400 mr-1" /> The opportunities you want are being taken by people who showed up.</li>
          <li><CheckCircle className="w-4 h-4 inline text-green-400 mr-1" /> Your competition is growing while you're standing still.</li>
          <li><CheckCircle className="w-4 h-4 inline text-green-400 mr-1" /> The time you waste can never be recovered.</li>
        </ul>
        <p>You think success is this magical thing that happens when the timing is perfect, the fear disappears, and everything lines up just right.</p>
        <p><b>It's not.</b></p>
        <p>Success is messy. It's full of risks. It's uncomfortable. And the people who get it are the ones who go after it, despite all of that.</p>
        <p>You don't need more time, more knowledge, more confidence, or more resources.</p>
        <p className="font-bold">You need to stop window shopping through life and walk the hell in.</p>
        <p>Because life doesn't go on sale.</p>
        <p className="font-semibold">And every day you hesitate is another day wasted.</p>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
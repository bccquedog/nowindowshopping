import React from 'react';
import { Star, Smile, Heart, Zap, Clock } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPostSideHustle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-100 to-green-300 dark:from-yellow-900 dark:via-green-900 dark:to-green-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Do Something You Like (Not Love): The Real Side Hustle Game</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>7 min read</span>
          </div>
        </div>
        
        <p>Let me say something that might sound off-brand in a world obsessed with "passion projects" and "monetizing your gift":</p>
        <p><b>You don't have to love your side hustle.</b></p>
        <p>In fact, sometimes it's better if you don't.</p>
        
        <p>We live in an era where everyone's pushing the idea that your side hustle needs to be your life's calling, your soul's assignment, your everything. I disagree. Not just as a business coach—but as a human being who's watched too many people burn out trying to make money from something they once turned to for joy.</p>
        
        <p><b>Here's the truth:</b></p>
        <p>A side hustle just needs to be something you like.</p>
        <p>That's it. Something you can show up for consistently, without it draining your spirit or stealing your peace.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Star className="w-6 h-6 text-yellow-500" /> Passion is Sacred. Don't Sell All of It.</h2>
        <p>There's a certain pressure to turn everything we enjoy into income. But when you start selling the thing that used to refill your cup, it can lose its magic.</p>
        
        <p>The painter starts dreading commissions.</p>
        
        <p>The musician stops playing when its not billable.</p>
        
        <p>The writer stops writing unless there's a check attached.</p>
        
        <p><b>Sound familiar?</b></p>
        
        <p>Sometimes, the healthiest thing you can do is leave the thing you love untouched—and instead build income around something that's simply… tolerable. Practical. Liked enough.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Smile className="w-6 h-6 text-blue-500" /> The 'Like It Enough' Side Hustle Test</h2>
        <p>Here's what I tell my clients:</p>
        <p>You don't need to love your side hustle. You just need to:</p>
        
        <ul>
          <li>Respect the skill youre offering</li>
          <li>Like the process enough to keep doing it</li>
          <li>See progress over time</li>
        </ul>
        
        <p>It could be reselling, editing, tutoring, admin support, Canva design, audio cleanup, resume work—whatever. If it's something you're decent at and don't mind doing, that's the lane.</p>
        
        <p>And guess what? When the income starts flowing and the process doesn't feel like a grind, that's a win. That's freedom.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Heart className="w-6 h-6 text-pink-500" /> Protect Your Joy, Build With Intention</h2>
        <p>Some things should stay sacred.</p>
        <p>I don't want you to lose your love for cooking because now youre stressed about meal prep orders. I don't want you to stop dancing because itsall content now.</p>
        
        <p>Let your side hustle fuel your real passions—not replace them. That's the real balance.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Zap className="w-6 h-6 text-indigo-500" /> The NWS Philosophy: Move, But Move Smart</h2>
        <p>At No Window Shopping, we're not here to guilt you into grinding 24/7. We're not here to tell you to build five income streams by Friday. What we are about is movement—with purpose.</p>
        <p>Intentional action. Quiet discipline. And yes—joy that lasts.</p>
        
        <p>So no, you dont need to chase a side hustle that lights your soul on fire.</p>
        <p>You just need one that makes sense, feels doable, and funds the life you actually want.</p>
        
        <p className="font-semibold">That's the difference between window shopping and walking in.</p>
        
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-blue-900">Let's move.</p>
          <div className="text-xl text-gray-700 mt-2">— Brian Proctor, CEO, No Window Shopping</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
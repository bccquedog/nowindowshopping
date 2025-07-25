import React from 'react';
import { Clock, Briefcase, AlertTriangle, Shield, Layers } from 'lucide-react';

export default function BlogPostHaveNotNeed() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-slate-50 to-green-100 dark:from-gray-900 dark:via-yellow-900 dark:to-green-900">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">It’s Better to Have and Not Need Than to Need and Not Have</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>6 min read</span>
          </div>
        </div>
        <p>Preparation isn’t paranoia.<br />Planning ahead doesn’t mean you lack faith.<br />And having more than you need doesn’t make you greedy — it makes you wise.</p>
        <p>Some lessons you learn the hard way:<br />When the check doesn’t clear.<br />When the opportunity calls and you’re not ready.<br />When the car breaks down and your savings account says “nah.”<br />When the right door opens but you didn’t bring your key.</p>
        <p className="font-semibold">Let me remind you of something old-school that still hits today:<br />It’s better to have and not need, than to need and not have.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Briefcase className="w-6 h-6 text-yellow-600" /> 1. Having It Isn’t Extra — It’s Excellence</h2>
        <p>That emergency fund? That backup charger? That second stream of income?</p>
        <p>That’s not doing too much.<br />That’s refusing to be caught off guard.</p>
        <p>It’s not just about material preparation either:</p>
        <ul>
          <li>Emotional tools</li>
          <li>Boundaries you practiced before the conflict came</li>
          <li>Skills you sharpened when nobody was watching</li>
        </ul>
        <p>Being “overprepared” just means you respect the unexpected.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><AlertTriangle className="w-6 h-6 text-orange-500" /> 2. Needing Without Having = Regret in Real-Time</h2>
        <p>We’ve all been there:</p>
        <ul>
          <li>Wishing we would’ve saved more</li>
          <li>Wishing we would’ve studied harder</li>
          <li>Wishing we would’ve spoken up sooner</li>
        </ul>
        <p>The weight of “I wasn’t ready” hits different when the moment doesn’t wait.</p>
        <p>Life doesn’t care about convenience.<br />Opportunities show up on their schedule, not yours.<br />And crisis never calls ahead.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Shield className="w-6 h-6 text-green-700" /> 3. Stop Listening to People Who Think Preparation Is Weakness</h2>
        <p>Some people will make you feel “extra” for thinking ahead.<br />They’ll call you anxious, dramatic, uptight.</p>
        <p>But those same people will be in your inbox asking for help when the bottom falls out.</p>
        <p>Be kind. Be generous.<br />But don’t let anyone guilt you out of being ready.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Layers className="w-6 h-6 text-slate-700" /> 4. The NWS Way: Build for What’s Coming — Not Just What’s Comfortable</h2>
        <p>At No Window Shopping, we don’t live in fear — we live in readiness.<br />We:</p>
        <ul>
          <li>Stack skills early</li>
          <li>Learn before it’s urgent</li>
          <li>Build margin into our money, our mind, and our movement</li>
        </ul>
        <p>Because when the moment comes, we don’t panic — we pivot.</p>
        <p>So keep stacking. Keep preparing. Keep having.</p>
        <p className="font-semibold">Even if you don’t need it today —<br />one day, the version of you that did the work anyway will thank you.</p>
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-yellow-900">— Brian</p>
        </div>
      </div>
    </div>
  );
} 
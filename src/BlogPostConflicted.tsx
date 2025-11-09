import React from 'react';
import { Clock, Brain, Target, Pause, Zap } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPostConflicted() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-gray-100 to-gray-300 dark:from-purple-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto py-8 sm:py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight">When You're Conflicted, Wait Until You Have to Pee</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs sm:text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline" />
            <span>5 min read</span>
          </div>
        </div>
        
        <p>I know it sounds ridiculous. But hear me out.</p>
        
        <p>The next time you're stuck between two decisions—pulled in different directions, overthinking, spiraling—don't decide just yet.</p>
        
        <p><b>Wait until you have to pee.</b></p>
        
        <p>Seriously.</p>
        
        <p>Why? Because that moment, as odd as it may seem, teaches you something critical about urgency, clarity, and truth.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold mt-8"><Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" /> 1. The Body Doesn't Lie</h2>
        <p>When you have to use the bathroom, your body cuts through everything else—emails, notifications, overthinking, other people's opinions—and says:</p>
        <p><em>"This needs attention. Now."</em></p>
        
        <p>That same clarity is what we often lack when making big life or business decisions.</p>
        <p>We confuse movement with progress. We chase the loudest voice instead of the most grounded one. We act because we're uncomfortable—not because we're ready.</p>
        
        <p>But when your body speaks with urgency, you listen.</p>
        <p>What if you waited for that same felt sense before forcing your next move?</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold mt-8"><Target className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" /> 2. Decisions Made Under Pressure Often Prioritize Escape, Not Alignment</h2>
        <p>When we're overwhelmed or conflicted, we usually want to just get it over with.</p>
        <p>We:</p>
        
        <ul>
          <li>Default to the safe option</li>
          <li>People-please out of guilt</li>
          <li>Rush into certainty just to avoid the discomfort of the unknown</li>
        </ul>
        
        <p>But meaningful decisions—about your purpose, your path, your next season—deserve more than emotional urgency.</p>
        
        <p>They deserve embodied awareness.</p>
        
        <p>Waiting until you have to pee is a metaphor for:</p>
        <p><em>Wait until you feel the pull—not just the pressure.</em></p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold mt-8"><Pause className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" /> 3. Stillness Isn't Stalling</h2>
        <p>Sometimes clarity doesn't come through thinking. It comes through pausing. Through not reacting. Through letting your nervous system settle so your intuition can finally be heard again.</p>
        
        <p>At No Window Shopping, we teach movement with intention.</p>
        <p>We don't act just to escape tension.</p>
        <p>We act because the timing is right—and the vision is sharp.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold mt-8"><Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" /> 4. The NWS Way: Wait for the Internal Signal</h2>
        <p>The next time you're split between two choices, and the noise in your head is louder than your gut:</p>
        
        <ul>
          <li>Don't make the decision on the spot.</li>
          <li>Walk. Breathe. Disconnect.</li>
          <li>Wait for the moment when your body gives you a signal—a clear, quiet knowing.</li>
        </ul>
        
        <p>It might not literally be a bathroom break. But it will feel just as real, just as obvious, just as undeniable.</p>
        
        <p>That's when you move.</p>
        
        <p><b>Your most powerful decisions don't come from pressure. They come from presence.</b></p>
        
        <p>Wait until you have to pee.</p>
        <p><em>Translation: Wait until it's real. Then act.</em></p>
        
        <div className="mt-8 text-center">
          <p className="text-xl sm:text-2xl font-bold text-purple-900">— Brian</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
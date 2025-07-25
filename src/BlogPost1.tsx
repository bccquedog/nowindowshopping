import React from 'react';
import { Clock, Target, Zap, Users, AlertTriangle } from 'lucide-react';
import CommentsSection from './components/CommentsSection';

export default function BlogPost1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-yellow-400 dark:from-gray-900 dark:via-red-900 dark:to-orange-900">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">No More Excuses: Get Up and Get Moving</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>March 15, 2025</span>
          </div>
        </div>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-blue-800 bg-blue-50 rounded mb-6">
          Winners take action. Losers make excuses. Which one are you?
        </blockquote>
        <p>Let's cut the nonsense. You're not stuck. You're not waiting for the right moment. You're not too busy. <b>You're in your own way.</b></p>
        <p>How long have you been saying, <i>"I'll start soon"</i>? How many times have you told yourself, <i>"I just need a little more time"</i>? Be honest—how much of your so-called "planning" is just you stalling because you're scared of failure?</p>
        <p>Enough. <b>You either want it, or you don't.</b></p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Target className="w-6 h-6 text-blue-500" /> 1. Procrastination is a Disease—Cure It Now</h2>
        <p>You're not <i>too tired.</i> You're not <i>too busy.</i> You're not <i>too unprepared.</i> You're just avoiding the work because it's uncomfortable.</p>
        <p>Every time you say, "I'll do it tomorrow", you're making a conscious choice to push your goals further away. Think about that. You are actively choosing failure.</p>
        <p><b>Fix It:</b></p>
        <ul>
          <li><b>Do it NOW.</b> Not later. Not tomorrow. NOW.</li>
          <li><b>Set a deadline, and actually stick to it.</b> No exceptions.</li>
          <li><b>Stop romanticizing motivation.</b> Discipline wins, not feelings.</li>
        </ul>
        <p>The hard truth? Your future self is disgusted with how much time you're wasting.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Zap className="w-6 h-6 text-yellow-500" /> 2. Overthinking is Just Procrastination in a Suit</h2>
        <p>Let's be real—most of the time, when you say you're "thinking things through", you're really just stalling.</p>
        <p>You don't need more research. You don't need more time to prepare. You need to shut up and start.</p>
        <p><b>Reality Check:</b></p>
        <ul>
          <li>You're not waiting for the right time—you're waiting for an excuse to stay comfortable.</li>
          <li>You're not strategizing—you're avoiding action.</li>
          <li>You're not getting ready—you're wasting time.</li>
        </ul>
        <p><b>Fix It:</b></p>
        <ul>
          <li>Make a decision and act on it immediately.</li>
          <li>Accept that mistakes are part of the process.</li>
          <li>Understand that motion beats perfection every time.</li>
        </ul>
        <p>Stop hesitating. If you're wrong, you adjust. But at least you're moving.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><AlertTriangle className="w-6 h-6 text-red-500" /> 3. Get Comfortable Being Uncomfortable</h2>
        <p>Success isn't about doing what's easy—it's about pushing through what's hard.</p>
        <p>Your excuses don't matter. Your emotions don't matter. Your temporary discomfort? Completely irrelevant.</p>
        <p>The only thing that matters is results. And results don't come from sitting around, waiting for the perfect conditions. They come from grinding when you don't feel like it, showing up when it sucks, and pushing forward when everyone else quits.</p>
        <p><b>Fix It:</b></p>
        <ul>
          <li>Embrace discomfort. If it scares you, you're supposed to do it.</li>
          <li>Stop quitting when it gets tough. Push through.</li>
          <li>Make a habit of doing one uncomfortable thing every single day.</li>
        </ul>
        <p>Your comfort zone is a graveyard for ambition. Get out of it.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Clock className="w-6 h-6 text-indigo-500" /> 4. Your Distractions Are Ruining You</h2>
        <p>You have time. You just don't use it right.</p>
        <p>How much of your day is wasted scrolling social media? Watching pointless TV? Engaging in useless debates?</p>
        <p><b>Here's the ugly truth:</b> If you have time to check Instagram, you have time to chase your goals. If you have time to binge-watch Netflix, you have time to work on your future.</p>
        <p><b>Fix It:</b></p>
        <ul>
          <li>Audit your time—track every hour of your day for a week. You'll be shocked.</li>
          <li>Create non-negotiable focus hours. Zero distractions.</li>
          <li>Be ruthless with your environment. If it doesn't help you grow, cut it out.</li>
        </ul>
        <p>Success requires sacrifice. If you're not willing to give up distractions, you're not serious about winning.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Users className="w-6 h-6 text-green-500" /> 5. Surround Yourself with People Who Push You—Not Enable You</h2>
        <p>You are a reflection of the people around you. If your circle is full of excuse-makers, guess what you'll become?</p>
        <p><b>Who are you spending time with?</b></p>
        <ul>
          <li>Are your conversations about growth, or just complaints?</li>
          <li>Are you surrounded by doers, or excuse-makers?</li>
        </ul>
        <p><b>Fix It:</b></p>
        <ul>
          <li>Cut out people who keep you stagnant. No apologies.</li>
          <li>Find mentors, not "yes men."</li>
          <li>Get around people who make you feel uncomfortable about staying the same.</li>
        </ul>
        <p>If your friends aren't talking about goals, success, and leveling up, they're a liability.</p>
        <hr />
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Target className="w-6 h-6 text-red-500" /> Final Warning: No More Excuses—It's Go Time</h2>
        <p>This is it. The moment you decide if you're done playing around or if you're going to keep making excuses.</p>
        <ul>
          <li>No more procrastinating.</li>
          <li>No more waiting for motivation.</li>
          <li>No more wasting time.</li>
        </ul>
        <p>You say you want success? Prove it.</p>
        <p className="font-bold text-blue-700">You don't need more time—you need more action. Get up. Get moving. Right now.</p>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
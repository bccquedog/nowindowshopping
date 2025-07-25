import React from 'react';
import { ArrowDownRight, AlertTriangle, Eye, HelpCircle, TrendingDown, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommentsSection from './components/CommentsSection';

export default function BlogPostSlipperySlopes1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-orange-300 dark:from-yellow-900 dark:via-orange-900 dark:to-orange-800">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Slippery Slopes, Part 1: The Quiet Slide
          </h1>
          <div className="flex items-center justify-center text-gray-600 text-lg font-medium mb-2">
            <ArrowDownRight className="w-6 h-6 mr-2 text-blue-500" />
            We rarely fall in one big, dramatic crash. More often than not, we slide.
          </div>
        </div>

        {/* The Quiet Slide */}
        <div className="mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2 text-lg">
            <p>A little here. A little there.<br />And by the time we realize how far we’ve drifted…<br />we’re looking up from rock bottom, wondering how we got there.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            That’s the slippery slope.<br />It never feels like a fall — until it’s too late.
          </div>
        </div>

        {/* What Is a Slippery Slope? */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-semibold">
            <HelpCircle className="w-5 h-5" />
            What Is a Slippery Slope?
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>A slippery slope is a series of seemingly small decisions, compromises, or habits that quietly stack up — and lead us somewhere we swore we’d never go.</p>
            <ul className="list-disc pl-6 mt-2 text-base">
              <li>It's skipping one workout,</li>
              <li>responding to that text you shouldn’t,</li>
              <li>letting that disrespect slide,</li>
              <li>not checking your account this week,</li>
              <li>or telling yourself: <span className="italic">"It’s not that deep. Just this once."</span></li>
            </ul>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            But “just this once” is never just once.<br />And “not that deep” is how we end up in deep trouble.
          </div>
        </div>

        {/* It Doesn’t Always Look Dangerous */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            It Doesn’t Always Look Dangerous
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>The real danger of slippery slopes is that they’re smooth.<br />They’re comfortable.<br />They let you keep your routine — while slowly pulling you out of alignment.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            By the time you notice the damage, the rut is deep… and the climb back? Exhausting.
          </div>
        </div>

        {/* It Happens to All of Us */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300 font-semibold">
            <Eye className="w-5 h-5" />
            It Happens to All of Us
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>Let’s be real: no one is exempt.<br />Even the disciplined. Even the strong. Even the self-aware.<br /><br />Because life doesn’t just test your will — it tests your consistency.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            And if we’re not paying attention, life will convince us to compromise what we said we believe… just to keep the peace, keep the vibe, or keep the comfort.
          </div>
        </div>

        {/* The First Slip Feels Harmless */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-pink-700 dark:text-pink-300 font-semibold">
            <TrendingDown className="w-5 h-5" />
            The First Slip Feels Harmless
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>That’s the trap.<br />Slippery slopes don’t start with bad people or bad intentions.<br />They start with tired people. Lonely people. Frustrated people.<br />People who are trying to cope.</p>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg">
            And sometimes that first slip does help… temporarily.<br />It gives relief. It offers escape. It numbs the pressure.<br /><br />But anything that numbs you too well will also kill your clarity.
          </div>
        </div>

        {/* This Is Your Wake-Up Call */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-300 font-semibold">
            <CheckCircle className="w-5 h-5" />
            This Is Your Wake-Up Call
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-2">
            <p>If you’re reading this and thinking:<br /><span className="italic">“This might be me…”</span><br />You’re not alone — and you’re not too far gone.</p>
            <ul className="list-disc pl-6 mt-2 text-base">
              <li>The first step to reversing the slope is naming it.<br /><span className="text-gray-600 dark:text-gray-400">Where are you compromising? Where have your standards softened? Where are you sliding?</span></li>
              <li className="mt-2">The second step? <span className="font-semibold">Get honest. Get support. Get aligned.</span><br />Before the slope becomes a crash.</li>
            </ul>
          </div>
        </div>

        {/* Final Thought */}
        <div className="mt-16 text-center">
          <div className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">Here at No Window Shopping, we live with clarity, intention, and ownership.</div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">We don’t play with patterns that don’t serve us.<br />We don’t sugarcoat our self-destruction.<br />And we sure don’t call dysfunction “normal.”</div>
          <div className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4">This series isn’t about judgment — it’s about rescue.<br />Because some of us are on the slope right now…<br />and it’s time to pull each other back up.</div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">Stay tuned for Part 2 — where we talk about the people, patterns, and places that accelerate the slope… and how to spot them before they sink you.</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-6">— Brian</div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-12 px-4">
        <CommentsSection />
      </div>
    </div>
  );
} 
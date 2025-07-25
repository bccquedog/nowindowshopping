import React from 'react';
import { Clock, Users, Target, Zap, ShieldCheck } from 'lucide-react';

export default function BlogPostSeatAtTable1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Seat at the Table Etiquette – Part 1: Do You Really Want a Seat at the Table?</h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>By Brian Proctor</span>
            <span>•</span>
            <Clock className="w-4 h-4 inline" />
            <span>5 min read</span>
            <span>•</span>
            <span>Part 1 of 4</span>
            <span>•</span>
            <span>January 8, 2025</span>
          </div>
        </div>
        
        <p>Everyone's talking about getting a seat at the table.<br />
        The access. The influence. The visibility.</p>
        
        <p>But before we go printing place cards with your name on them, I've got to ask you something real:<br />
        <b>Do you actually want the seat? Or do you just like the idea of it?</b></p>
        
        <p>Because here's what they don't tell you about getting invited in:<br />
        The table comes with expectations. With pressure. With politics. With weight.</p>
        
        <p>You don't just sit — you show up, you contribute, and sometimes you carry.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Users className="w-6 h-6 text-blue-500" /> 1. The Seat Isn't a Selfie Moment</h2>
        <p>Let's be clear — the "seat" is not a branding opportunity.<br />
        It's not just something you post about once you get it.<br />
        It's work. Influence. Responsibility. Visibility when it's uncomfortable.</p>
        
        <p>When people say they want a seat at the table, I ask:</p>
        
        <ul>
          <li>Do you know the room you're walking into?</li>
          <li>Do you understand what's being served — and what you're expected to bring?</li>
          <li>Are you ready to stay when it's no longer glamorous?</li>
        </ul>
        
        <p>Because sometimes, you're not being handed power — you're being handed the bill.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Target className="w-6 h-6 text-green-500" /> 2. Wanting the Seat vs. Being Ready for the Seat</h2>
        <p>Wanting access doesn't mean you're prepared for what that access demands.</p>
        
        <ul>
          <li>Are your skills sharp enough to speak with authority?</li>
          <li>Is your confidence stable enough not to shrink when challenged?</li>
          <li>Can you advocate for others, not just yourself?</li>
        </ul>
        
        <p>This isn't gatekeeping — it's growth.<br />
        You don't need permission to lead. But you do need preparation to stay seated.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Zap className="w-6 h-6 text-yellow-500" /> 3. Sometimes, You're Meant to Build the Table Instead</h2>
        <p>Not every table is for you.<br />
        Some are too small. Some were never built with your values in mind. Some only want your presence, not your voice.</p>
        
        <p>And sometimes? You're being denied a seat because you're supposed to build the next damn table.</p>
        
        <p>You don't have to beg for access when you can design the architecture.</p>
        
        <hr />
        
        <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><ShieldCheck className="w-6 h-6 text-indigo-500" /> 4. The NWS Way: Don't Just Get in the Room — Change the Room</h2>
        <p>At No Window Shopping, we don't just chase seats — we question the table.<br />
        We ask:</p>
        
        <ul>
          <li>Is this aligned with who I am?</li>
          <li>Am I bringing value, not just vibing for the invite?</li>
          <li>Can I stay seated without losing myself?</li>
        </ul>
        
        <p>This isn't about access. It's about authenticity.<br />
        Because there's no point sitting at a table that leaves you starving.</p>
        
        <hr />
        
        <h3 className="text-xl font-bold mt-8 mb-4">Ask Yourself Before You Ask for the Seat:</h3>
        <ul>
          <li>Do I know why I want it?</li>
          <li>Am I ready to be challenged there?</li>
          <li>Can I hold the weight that comes with it?</li>
        </ul>
        
        <p>If not yet — that's okay. This series is going to get you there.</p>
        
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold text-blue-900">— Brian</p>
          <div className="text-sm text-gray-500 mt-2">Part 1 of 4 • January 8, 2025</div>
        </div>
      </div>
    </div>
  );
} 
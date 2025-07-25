import React from 'react';
import { Clock, Flame, ShieldCheck, Users, HelpCircle } from 'lucide-react';

export default function BlogPostSeatAtTable3() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Seat at the Table Etiquette – Part 3: You Got the Seat… Is It Too Hot?</h1>
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <span>By Brian Proctor</span>
          <span>•</span>
          <Clock className="w-4 h-4 inline" />
          <span>5 min read</span>
          <span>•</span>
          <span>Part 3 of 4</span>
          <span>•</span>
          <span>January 22, 2025</span>
        </div>
      </div>
      <p>Let’s talk about something nobody tells you when you’re fighting to get a seat:<br />
      Sometimes, the seat comes with heat.</p>
      <p>You finally get there—and suddenly, you’re sweating.<br />
      You feel watched. Measured. Out of place.<br />
      You start asking questions like:</p>
      <ul>
        <li>Am I really built for this?</li>
        <li>What if I mess it up?</li>
        <li>Why does this feel heavier than it looks?</li>
      </ul>
      <p>Let me remind you:<br />
      That doesn’t mean you don’t belong. It means you’re growing.</p>
      <hr />
      <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Flame className="w-6 h-6 text-red-500" /> 1. The Pressure Is Real — and Normal</h2>
      <p>The moment will test you.<br />
      Not because you're unqualified—but because leadership and visibility demand more of you.</p>
      <p>You’re now being asked to:</p>
      <ul>
        <li>Carry responsibility for others</li>
        <li>Represent your background, your people, your values</li>
        <li>Make decisions in spaces where you're still figuring out the rules</li>
      </ul>
      <p>It’s not just a seat. It’s a load.<br />
      But you're stronger than you think.</p>
      <hr />
      <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><HelpCircle className="w-6 h-6 text-yellow-500" /> 2. Don't Mistake Discomfort for Disqualification</h2>
      <p>The weight doesn’t mean you’re not ready.<br />
      It just means this is new muscle. New ground. New posture.</p>
      <p>You’re not broken. You’re being built.</p>
      <hr />
      <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Users className="w-6 h-6 text-blue-500" /> 3. You're Allowed to Say: “This Is Hard”</h2>
      <p>Too many leaders are suffering in silence, performing confidence while privately drowning.<br />
      You don’t have to pretend. You can ask for support. You can admit when the seat feels heavier than expected.</p>
      <p>And still… you can stay seated.</p>
      <hr />
      <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><ShieldCheck className="w-6 h-6 text-green-500" /> 4. The NWS Way: Build Endurance, Not Ego</h2>
      <p>At No Window Shopping, we don’t glamorize the grind.<br />
      We acknowledge the pressure—and we create systems that help us sustain the seat.</p>
      <p>Breathe. Adjust. Own your pace.<br />
      Because sometimes the heat just means you’re exactly where you’re supposed to be.</p>
      <div className="mt-8 text-center">
        <p className="text-2xl font-bold text-blue-900">— Brian</p>
      </div>
    </div>
  );
} 
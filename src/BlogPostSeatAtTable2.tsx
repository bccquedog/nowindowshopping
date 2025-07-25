import React from 'react';
import { Clock, Users, Mic, Lightbulb, CheckCircle } from 'lucide-react';

export default function BlogPostSeatAtTable2() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 prose dark:prose-invert">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Seat at the Table Etiquette – Part 2: When You’re in the Room, Be in the Room</h1>
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <span>By Brian Proctor</span>
          <span>•</span>
          <Clock className="w-4 h-4 inline" />
          <span>5 min read</span>
          <span>•</span>
          <span>Part 2 of 4</span>
          <span>•</span>
          <span>January 15, 2025</span>
        </div>
      </div>
      <p>So you’re in. You did the work, built the credibility, walked the walk—and now you’ve been invited into the space.</p>
      <p>Now the question is:<br />
      <b>Are you actually in the room… or just sitting there?</b></p>
      <p>This isn’t about showing up physically. It’s about being mentally locked in, emotionally grounded, and strategic with your presence.</p>
      <hr />
      <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Mic className="w-6 h-6 text-blue-500" /> 1. Presence Is a Skill — Not Just a Vibe</h2>
      <p>Being present isn’t about dominating the conversation.<br />
      It’s about listening deeply, reading the room, and knowing when your voice will move something.</p>
      <p>Start practicing:</p>
      <ul>
        <li>Asking clarifying questions instead of waiting to sound smart</li>
        <li>Offering insight when others are still dancing around the truth</li>
        <li>Making notes on follow-ups you’ll handle after the meeting</li>
      </ul>
      <hr />
      <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Lightbulb className="w-6 h-6 text-yellow-500" /> 2. Avoid “Fake It Til You Make It” Traps</h2>
      <p>If you’re spending more energy looking confident than contributing value, you’re not really in the room.</p>
      <p>Confidence isn’t about volume—it’s about clarity.<br />
      It’s knowing your lane, owning your perspective, and showing up like someone who belongs there (because you do).</p>
      <hr />
      <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><CheckCircle className="w-6 h-6 text-green-500" /> 3. The Table Needs More Than Just Your Silence</h2>
      <p>Too many of us finally get the invite, then go mute out of fear of saying the wrong thing.<br />
      But here’s the truth: the room doesn’t shift unless you speak.</p>
      <p>Your presence was earned. Your input is needed.<br />
      Your job now? Participate with purpose.</p>
      <hr />
      <h2 className="flex items-center gap-2 text-2xl font-bold mt-8"><Users className="w-6 h-6 text-indigo-500" /> 4. NWS Philosophy: Show Up With Substance</h2>
      <p>At No Window Shopping, we don’t chase rooms just to say we were there.<br />
      We contribute, challenge, and collaborate.<br />
      We make sure our seat has weight—not just presence.</p>
      <p>Because being in the room is one thing.<br />
      Being remembered in the room is another.</p>
      <div className="mt-8 text-center">
        <p className="text-2xl font-bold text-blue-900">— Brian</p>
      </div>
    </div>
  );
} 
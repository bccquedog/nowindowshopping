export interface WeeklyBlogPost {
  week: number;
  title: string;
  slug: string;
  publishDate: string;
  publishDateTime: string;
  displayDate: string;
  displayTime: string;
  description: string;
  theme: string;
  action: string;
  reflection: string;
  practice: string;
  quote: string;
  instagramCaption: string;
  tiktokCaption: string;
  socialHook: string;
  socialHashtags: string[];
}

const weeklyThemes = [
  ['Stop Browsing Your Own Life', 'Turn passive interest into a decision you can act on today.', 'Name the one thing you keep researching but not doing, then take the smallest visible step.', 'Where have I been watching instead of participating?', 'Set a 20-minute timer and move one real task forward.', 'Success is not a window display. It is a claim ticket.'],
  ['The Difference Between Interest and Commitment', 'Separate what sounds good from what you are willing to build.', 'Choose one goal and write the cost you are willing to pay for it.', 'What have I called a goal that is really just a wish?', 'Cancel or pause one low-value commitment this week.', 'Interest talks. Commitment rearranges the calendar.'],
  ['Your Calendar Is Telling the Truth', 'Use your schedule as evidence, not decoration.', 'Audit the last seven days and highlight where your time actually went.', 'Does my calendar reflect my priorities or my distractions?', 'Protect one non-negotiable work block every weekday.', 'A priority without time attached is just theater.'],
  ['Stop Waiting for the Perfect Version of You', 'Build while imperfect instead of waiting for a cleaner identity.', 'Publish, submit, ask, or start before you feel fully ready.', 'What am I demanding from myself before I allow myself to begin?', 'Do one useful thing at 70 percent ready.', 'Readiness is often earned after the first move.'],
  ['Make the First Move Boring', 'Reduce intimidation by making progress plain and repeatable.', 'Break one big goal into a boring first action you can finish today.', 'What part of this goal am I making dramatic so I can avoid it?', 'Create a two-step checklist for the next move.', 'Boring steps build serious lives.'],
  ['The Discipline of Following Through', 'Build trust with yourself by finishing what you said mattered.', 'Pick one unfinished task and close it before opening a new project.', 'Where has unfinished business been draining my confidence?', 'Complete one lingering item before Friday.', 'Follow-through is self-respect in motion.'],
  ['Stop Confusing Motion With Progress', 'Trade busy work for measurable movement.', 'Define the outcome before you start working.', 'What am I doing that feels productive but avoids the real work?', 'End each day by naming one concrete result.', 'Movement is not progress unless it changes the scoreboard.'],
  ['The Courage to Be Seen Trying', 'Normalize visible effort before visible success.', 'Let someone know what you are building and what support you need.', 'What am I afraid people will think if they see me learning?', 'Share one honest progress update.', 'Being seen trying is how invisible goals become real.'],
  ['Build a Better Default', 'Design habits that carry you when motivation drops.', 'Replace one weak default with a stronger automatic choice.', 'What do I do by default when I am tired or uncertain?', 'Prepare your workspace before bed for one week.', 'Your defaults are quiet votes for your future.'],
  ['Stop Negotiating With Distraction', 'Make focus easier by removing the argument.', 'Remove one recurring distraction from your first work hour.', 'Which distraction has too much voting power in my life?', 'Put your phone in another room for one focused block.', 'Focus grows when negotiation ends.'],
  ['The Price of Staying the Same', 'Make inaction visible enough to challenge it.', 'Write what your current pattern will cost in six months.', 'What am I paying to stay comfortable?', 'Have one honest conversation with yourself on paper.', 'Comfort has a bill, even when it arrives quietly.'],
  ['Use Friction as Feedback', 'Read resistance as information, not a stop sign.', 'Identify whether the friction is fear, confusion, fatigue, or lack of skill.', 'What is this resistance trying to tell me?', 'Solve one source of friction instead of quitting.', 'Friction is not always failure. Sometimes it is instruction.'],
  ['Your Circle Is Part of Your Strategy', 'Treat relationships as part of your growth environment.', 'Notice who energizes action and who normalizes delay.', 'Who helps me become more honest about my potential?', 'Schedule time with one growth-minded person.', 'The right people make discipline feel less lonely.'],
  ['Stop Performing Potential', 'Move from talking about ability to demonstrating it.', 'Choose one place where you can show the work instead of explaining the dream.', 'Where am I asking for credit before evidence?', 'Create a small proof of work this week.', 'Potential is only powerful when it becomes evidence.'],
  ['Make Accountability Practical', 'Build accountability that creates movement, not shame.', 'Ask someone to check one clear deliverable by a specific date.', 'What kind of accountability actually helps me act?', 'Send one accountability text before Monday ends.', 'Accountability works best when it has a receipt.'],
  ['The Power of a Clean No', 'Protect the yes that matters by declining what does not.', 'Say no to one request that would dilute your priorities.', 'What am I accepting because I want to avoid discomfort?', 'Use one clear, respectful no this week.', 'Every unclear no becomes an expensive yes.'],
  ['Reset Without Starting Over', 'Recover from drift without dramatizing the delay.', 'Identify the next useful step and take it without self-punishment.', 'Where have I turned a pause into a full surrender?', 'Restart one habit with a smaller version.', 'A reset is not a failure. It is a return.'],
  ['Stop Hiding Behind Research', 'Use learning as fuel, not shelter.', 'Set a research limit and act on what you already know.', 'What answer am I pretending I still need?', 'Take action after 30 minutes of research.', 'Information should sharpen action, not replace it.'],
  ['Build the Proof Before the Platform', 'Earn attention by creating substance first.', 'Improve the offer, result, or skill before chasing visibility.', 'What needs to be true before more people see this?', 'Upgrade one part of your work product.', 'Visibility magnifies what is already there.'],
  ['The Weekly Review That Actually Works', 'Create a simple rhythm for learning from your week.', 'Review wins, misses, lessons, and next moves every Friday.', 'What did this week teach me about my patterns?', 'Use a four-question review for the next month.', 'A reviewed week becomes a wiser week.'],
  ['Lead Yourself First', 'Practice personal leadership before asking others to trust you.', 'Keep one promise to yourself that no one else sees.', 'Where do I need to become easier to trust?', 'Choose one private standard and honor it daily.', 'Self-leadership is the first room of leadership.'],
  ['Turn Pressure Into Preparation', 'Use pressure as a cue to plan instead of panic.', 'List what you can prepare before the moment gets louder.', 'What would make this challenge feel less chaotic?', 'Prepare one document, script, or checklist ahead of time.', 'Pressure exposes the preparation you skipped.'],
  ['Small Wins Are Not Small', 'Respect the compounding power of completed actions.', 'Track small wins and connect them to the larger goal.', 'What progress am I dismissing because it is not dramatic?', 'Write down three wins every Friday.', 'Small wins are how momentum learns your name.'],
  ['Stop Outsourcing Your Confidence', 'Build confidence from evidence rather than applause.', 'Create one piece of proof that you can point to.', 'Whose approval have I made too important?', 'Let the work validate you before the crowd does.', 'Confidence built on evidence travels better.'],
  ['The Work Before the Reward', 'Reconnect reward to responsibility.', 'Do the unglamorous task before taking the easy reward.', 'Where am I rewarding intention instead of execution?', 'Complete the task before the treat three times this week.', 'Reward the finished work, not the fantasy.'],
  ['Claim the Room You Are In', 'Bring presence and contribution to your current opportunity.', 'Add value where you are before obsessing over the next room.', 'How can I show up stronger in the room I already have?', 'Make one meeting, call, or conversation more useful.', 'Opportunity often tests you before it promotes you.'],
  ['Stop Being Vague About Success', 'Define success in terms you can actually pursue.', 'Write a specific definition of success for one current season.', 'What would success look like if I had to measure it?', 'Create three measurable outcomes for the week.', 'Vague success creates vague effort.'],
  ['Repair Your Relationship With Effort', 'Stop treating hard work as proof something is wrong.', 'Choose a difficult task and approach it as training.', 'Where did I learn that effort means I am failing?', 'Do one hard thing without complaining about it.', 'Effort is not punishment. It is participation.'],
  ['Make Better Promises', 'Reduce overcommitment by making promises carefully.', 'Before agreeing, check time, capacity, and importance.', 'Which promises have I made from pressure instead of clarity?', 'Use "let me check and confirm" before saying yes.', 'A careful promise is easier to honor.'],
  ['The Habit of Finishing', 'Train completion as a core identity.', 'Pick smaller tasks so you can practice finishing consistently.', 'What do I keep starting because finishing would expose me?', 'Finish three small tasks before beginning a new one.', 'Finishers create trust in every room.'],
  ['Stop Romanticizing the Pivot', 'Change direction with evidence, not avoidance.', 'Before pivoting, name what you have genuinely tested.', 'Am I pivoting because I learned something or because it got hard?', 'Run one honest test before changing direction.', 'A pivot without evidence is often escape in a nicer outfit.'],
  ['Make Your Standards Visible', 'Let your standards show in your behavior and work product.', 'Choose one standard and define what it looks like in practice.', 'Would someone know my standards by watching my week?', 'Upgrade one recurring deliverable.', 'Standards are values with receipts.'],
  ['The Quiet Power of Preparation', 'Win more moments before they arrive.', 'Prepare questions, notes, and next steps before an important interaction.', 'What opportunity am I under-preparing for?', 'Prepare 15 minutes earlier than usual.', 'Preparation makes confidence less fragile.'],
  ['Stop Treating Rest Like Escape', 'Use rest to recover, not disappear.', 'Plan rest that restores you without stealing from tomorrow.', 'Does my rest help me return or make me harder to find?', 'Choose one restorative practice without a screen.', 'Real rest gives you back to yourself.'],
  ['Build a Life That Can Hold Success', 'Strengthen systems around the goal, not only the goal itself.', 'Identify what would break if the opportunity grew quickly.', 'What system needs to mature before success arrives?', 'Document one repeatable process.', 'Success needs somewhere to land.'],
  ['The Discipline of Asking Better Questions', 'Upgrade your thinking by upgrading your questions.', 'Replace "Can I?" with "What would make this possible?"', 'What question keeps me small?', 'Write three better questions before solving a problem.', 'Better questions open better doors.'],
  ['Let Your Work Become Easier to Find', 'Organize your efforts so opportunity can locate them.', 'Clean up one profile, page, offer, or portfolio item.', 'Can people understand what I do without me overexplaining?', 'Update one public-facing description.', 'Clarity is an invitation.'],
  ['Stop Calling Avoidance Peace', 'Tell the difference between calm and hiding.', 'Name one conversation or decision you have been avoiding.', 'What discomfort have I mislabeled as peace?', 'Take one respectful step toward resolution.', 'Avoidance is not peace. It is postponed pressure.'],
  ['Build Your Anti-Excuse Plan', 'Prepare for the excuses you already know are coming.', 'List your top three excuses and pre-decide the counter move.', 'Which excuse has been winning too often?', 'Write an if-then plan for each excuse.', 'Excuses weaken when they meet preparation.'],
  ['The Next Right Move', 'Reduce overwhelm by choosing the next useful action.', 'Ignore the entire staircase and take the next step.', 'What is the next right move, not the perfect one?', 'Begin every morning by naming one next move.', 'Momentum usually starts smaller than pride prefers.'],
  ['Stop Needing It to Look Impressive', 'Respect useful progress even when it is not flashy.', 'Do the necessary task without needing it to be admired.', 'What work am I avoiding because it does not look impressive?', 'Complete one invisible task that matters.', 'Not all important work announces itself.'],
  ['Make Your Word Heavier', 'Strengthen credibility by saying less and honoring more.', 'Commit to fewer things and deliver them more consistently.', 'Where has my word become too casual?', 'Use deadlines carefully and meet one early.', 'Your word gains weight through repetition.'],
  ['Turn Lessons Into Systems', 'Stop relearning the same lesson every month.', 'Convert a repeated lesson into a checklist, boundary, or routine.', 'What lesson keeps visiting because I have not built a system?', 'Create one system from one recent mistake.', 'A lesson becomes wisdom when it changes the process.'],
  ['Practice Before the Spotlight', 'Prepare privately for public opportunities.', 'Rehearse the skill before the room requires it.', 'What opportunity would expose my lack of practice?', 'Practice one skill for 30 minutes three times this week.', 'The spotlight rewards private repetition.'],
  ['Stop Asking for Easy', 'Ask for strength, clarity, and consistency instead.', 'Choose a challenge that aligns with the person you want to become.', 'Where am I asking life to get easier instead of getting stronger?', 'Do one hard aligned thing on purpose.', 'Easy is not the same as meaningful.'],
  ['The Gift of Honest Feedback', 'Use feedback as a tool instead of a threat.', 'Ask one trusted person for specific feedback on your work.', 'What feedback have I been avoiding because it might help?', 'Request feedback with one clear question.', 'Feedback is data with a pulse.'],
  ['Protect the Build Season', 'Honor seasons where construction matters more than display.', 'Say no to one visibility chase that distracts from building.', 'What am I trying to show before it is built?', 'Spend one week improving infrastructure.', 'Build seasons deserve protection.'],
  ['Your Future Needs Evidence', 'Give your future self proof that you did not quit.', 'Create a record of progress that future you can trust.', 'What proof am I leaving behind this week?', 'Save one progress note, file, or result every Friday.', 'Evidence is encouragement you can reuse.'],
  ['Stop Shrinking the Assignment', 'Stop reducing the goal to fit your fear.', 'Name the full assignment and one brave step toward it.', 'Where have I made the dream smaller to feel safer?', 'Take one action that matches the real size of the goal.', 'Fear edits dreams. Courage restores the draft.'],
  ['The Integrity of Repetition', 'Let repeated action shape identity.', 'Repeat the key behavior even after the emotion fades.', 'What would change if I repeated this for a year?', 'Repeat one core action every weekday.', 'Repetition is identity under construction.'],
  ['Become Easier to Bet On', 'Make your work, word, and systems trustworthy.', 'Identify what would make someone more confident investing in you.', 'Would I bet on my current habits?', 'Strengthen one signal of reliability.', 'People bet on patterns before promises.'],
  ['Claim It, Then Maintain It', 'Treat success as stewardship, not a finish line.', 'Define what maintenance looks like after the win.', 'What must I maintain after I claim the next level?', 'Create a maintenance checklist for one success.', 'Claiming success is only the beginning of keeping it.']
];

const firstMonday = new Date('2026-05-18T12:00:00');
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'America/New_York'
});

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/New_York',
  timeZoneName: 'short'
});

const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

const toEasternNineAmUtc = (weekIndex: number) => {
  const monday = new Date(firstMonday);
  monday.setDate(firstMonday.getDate() + weekIndex * 7);
  const year = monday.getFullYear();
  const dstStart = getNthSunday(year, 2, 2);
  const dstEnd = getNthSunday(year, 10, 1);
  const isEasternDaylightTime = monday >= dstStart && monday < dstEnd;
  const easternOffsetHours = isEasternDaylightTime ? 13 : 14;

  return new Date(Date.UTC(monday.getFullYear(), monday.getMonth(), monday.getDate(), easternOffsetHours, 0, 0));
};

const getNthSunday = (year: number, month: number, occurrence: number) => {
  const date = new Date(year, month, 1, 12, 0, 0);
  const dayOffset = (7 - date.getDay()) % 7;
  date.setDate(1 + dayOffset + (occurrence - 1) * 7);

  return date;
};

const buildSocialHashtags = (week: number) => [
  '#NoWindowShopping',
  '#NWSWeekly',
  '#MondayMotivation',
  '#PersonalDevelopment',
  `#Week${week}`
];

export const weeklyBlogPosts: WeeklyBlogPost[] = weeklyThemes.map((theme, index) => {
  const date = toEasternNineAmUtc(index);
  const [title, description, action, reflection, practice, quote] = theme;
  const socialHashtags = buildSocialHashtags(index + 1);

  return {
    week: index + 1,
    title,
    slug: slugify(title),
    publishDate: toIsoDate(date),
    publishDateTime: date.toISOString(),
    displayDate: dateFormatter.format(date),
    displayTime: timeFormatter.format(date),
    description,
    theme: 'No Window Shopping Weekly',
    action,
    reflection,
    practice,
    quote,
    socialHook: `${title}: ${description}`,
    instagramCaption: `${title}\n\n${description}\n\nThis week's NWS move: ${action}\n\nReflection: ${reflection}\n\nRead the full Monday post on No Window Shopping.\n\n${socialHashtags.join(' ')}`,
    tiktokCaption: `${title}. ${description} This week's move: ${action} ${socialHashtags.slice(0, 4).join(' ')}`,
    socialHashtags
  };
});

export const getPublishedWeeklyPosts = (today = new Date()) => {
  const currentTime = today.getTime();
  return weeklyBlogPosts.filter(post => new Date(post.publishDateTime).getTime() <= currentTime);
};

export const getNextWeeklyPost = (today = new Date()) => {
  const currentTime = today.getTime();
  return weeklyBlogPosts.find(post => new Date(post.publishDateTime).getTime() > currentTime);
};

export const getWeeklyPostBySlug = (slug: string | undefined) =>
  weeklyBlogPosts.find(post => post.slug === slug);

import React, { useState } from 'react';
import CommentsSection from './components/CommentsSection';

const rules = [
  { number: 1, text: 'Never leave a fellow Crasher behind. Crashers take care of their own.' },
  { number: 2, text: 'Never use your real name.' },
  { number: 3, text: 'Never confess.' },
  { number: 4, text: 'No one goes home alone.' },
  { number: 5, text: 'Never let a girl come between you and a fellow Crasher.' },
  { number: 6, text: 'Do not sit in the corner and sulk. It draws attention in a negative way. Draw attention to yourself, but on your own terms.' },
  { number: 7, text: 'Blend in by standing out.' },
  { number: 8, text: 'Be the life of the party.' },
  { number: 9, text: 'Whatever it takes to get in, get in.' },
  { number: 10, text: 'Invitations are for pussies.' },
  { number: 11, text: 'Sensitive is good.' },
  { number: 12, text: 'When it stops being fun, break something.' },
  { number: 13, text: 'Bridesmaids are desperate - console them.' },
  { number: 14, text: 'You\'re a distant relative of a dead cousin.' },
  { number: 15, text: 'Fight the urge to tell the truth.' },
  { number: 16, text: 'Always have an up-to-date family tree.' },
  { number: 17, text: 'Every female wedding guest deserves a wedding night.' },
  { number: 18, text: 'You love animals and children.' },
  { number: 19, text: 'Toast in the native language if you know the native language and have practiced the toast. Do not wing it.' },
  { number: 20, text: 'The older the better, the younger the better (See rule below)' },
  { number: 21, text: 'Definitely make sure she\'s 18.' },
  { number: 22, text: 'You have a wedding and a reception to seal the deal. Period. No overtime.' },
  { number: 23, text: 'There\'s nothing wrong with having seconds. Provided there\'s enough women to go around.' },
  { number: 24, text: 'If you get outted, leave calmly. Do not run.' },
  { number: 25, text: 'You understand she heard that, but that\'s not what you meant.' },
  { number: 26, text: 'Of course you love her.' },
  { number: 27, text: 'Don\'t over drink. The machinery must work in order to close.' },
  { number: 28, text: 'Make sure there\'s an open bar.' },
  { number: 29, text: 'Always be a team player. Everyone needs a little help now and again.' },
  { number: 30, text: 'Know the playbook so you can call an audible.' },
  { number: 31, text: 'If you call an audible, always make sure your fellow Crashers know.' },
  { number: 32, text: 'Don\'t commit to a relative unless you\'re absolutely sure that they have a pulse.' },
  { number: 33, text: 'Never go back to your place.' },
  { number: 34, text: 'Be gone by sunrise.' },
  { number: 35, text: 'Breakfast is for closers.' },
  { number: 36, text: 'Your favorite movie is "The English Patient".' },
  { number: 37, text: 'At the reception, one hard drink or two beers max. A drunk crasher is a sloppy crasher.' },
  { number: 38, text: 'Never hit on the bride! It\'s a one-way ticket to the pavement.' },
  { number: 39, text: 'The way to a woman\'s bed is through the dance floor.' },
  { number: 40, text: 'Dance with old folks and the kids. The girls will think you\'re "sweet."' },
  { number: 41, text: 'Try not to break anything, unless you\'re not having fun.' },
  { number: 42, text: 'At the service, sit in the fifth row. It\'s close enough to wedding party to seem like you\'re an invited guest. Never sit in the back. The back row just smells like crashing.' },
  { number: 43, text: 'Create an air of mystery that involves some painful experience when interacting with the girl you\'re after, but don\'t talk about it. Allude to it. Then walk away, She\'ll follow.' },
  { number: 44, text: 'Always remember your fake name!' },
  { number: 45, text: 'The Rules of Wedding Crashing are sacred. Don\'t sully them by "improvising."' },
  { number: 46, text: 'You forgot your invitation in your rush to get to the church.' },
  { number: 47, text: 'Make sure all the single women at the wedding know you\'re there because you\'ve just suffered either a terrible breakup or the death of your fiancée.' },
  { number: 48, text: 'Always work the following into a conversation: "Yeah, I have tons of money. But how does one buy happiness?"' },
  { number: 49, text: 'Be pensive! It draws out the "healer" in women.' },
  { number: 50, text: 'Always pull out in time.' },
  { number: 51, text: 'Tell any woman you\'re interested in that you\'d love to stay, but you promised to help out at the homeless shelter today.' },
  { number: 52, text: 'Get choked up during the service. The girls will think you\'re "sensitive". Bring a slice of onion or artificial tears if necessary.' },
  { number: 53, text: 'Avoid virgins. They\'re too clingy.' },
  { number: 54, text: 'If pressed, tell people you\'re related to Uncle Ned. Everyone has an Uncle Ned.' },
  { number: 55, text: 'Don\'t fixate on one woman. ALWAYS have a back-up.' },
  { number: 56, text: 'When seeing a rival crasher, do not interact. Merely acknowledge each other with a tug on the earlobe and gracefully move on.' },
  { number: 57, text: 'The Ferrari\'s in the shop.' },
  { number: 58, text: 'If two rival crashers pick the same girl, the crasher with the least seniority will respectfully yield.' },
  { number: 59, text: 'No "chicken dancing" - no exceptions.' },
  { number: 60, text: 'When crashing out of state, request permission from a local Wedding Crasher chapter.' },
  { number: 61, text: 'No more than two weddings a weekend. More and your game gets sloppy.' },
  { number: 62, text: 'Bring an extra umbrella when it rains. Courtesy opens more legs than charm.' },
  { number: 63, text: 'Always save room for cake.' },
  { number: 64, text: 'When your crash partner fails, you fail. No man is an island.' },
  { number: 65, text: 'Smile! You\'re having the time of your life.' },
  { number: 66, text: 'Mix it up a little. You can\'t always be the man with the haunted past.' },
  { number: 67, text: 'No sex on the altar. Confessionals, okay. Chair lofts, better.' },
  { number: 68, text: 'Two shut-outs in a row? It\'s time to take a week off. Ask yourself: what is getting in the way of my happiness?' },
  { number: 69, text: 'Research, research, research the wedding party. And when you are done researching, research some more.' },
  { number: 70, text: 'Studies show that women have a more developed sense of smell. Breath mints: small cost, big yield.' },
  { number: 71, text: 'No excuses. Play like a champion!' },
  { number: 72, text: 'In case of emergency, refer to the playbook.' },
  { number: 73, text: 'Gilrs in hats tend to be proper and rarely give it up.' },
  { number: 74, text: 'Keep interactions with the parents of the bride to a minimum.' },
  { number: 75, text: 'Carry extra protection.' },
  { number: 76, text: 'The unmarried female rabbi - is she fair game? Of course she is.' },
  { number: 77, text: 'The tables furthest from the kitchen always get served dinner first.' },
  { number: 78, text: 'Stop, look, listen. At weddings. In life.' },
  { number: 79, text: 'Occasionally bring a real gift. You\'re getting sex without having to buy dinner, so you can afford a blender.' },
  { number: 80, text: 'Always think ahead, but always stay in the moment. Reconcile this paradox and you\'ll not only get the girl, you might also get peace of mind.' },
  { number: 81, text: 'Don\'t let the ring bearer bum your smokes. His parents may start to ask questions.' },
  { number: 82, text: 'Stay clear of the wedding planner. They may recognize you and start to wonder.' },
  { number: 83, text: 'Don\'t use the "I have two months to live" bit - not cool, not effective.' },
  { number: 84, text: 'Shoes say a lot about a man.' },
  { number: 85, text: 'Always choose large weddings. More choice. Easier to blend.' },
  { number: 86, text: 'You\'re from out of town. ALWAYS.' },
  { number: 87, text: 'Know something about the place you say you are from. Texas is played out. For some reason, New Hampshire seems to work.' },
  { number: 88, text: 'Of course you dream of one day having children.' },
  { number: 89, text: 'Never dance to "What I Like About You." It\'s long past time to let that song go. Someone will request it at every wedding. Don\'t dance to it. No matter how hot she is.' },
  { number: 90, text: 'Tell the bride\'s friends and family that you are family of the groom and vice-versa.' },
  { number: 91, text: 'Only take one car. You never know when you\'ll need to make a fast escape.' },
  { number: 92, text: 'Deep down, most people hate themselves. This knowledge is the key to most bedroom doors.' },
  { number: 93, text: 'Try not to show off on the dance floor. That means you Jeremy.' },
  { number: 94, text: 'Etiquette isn\'t old-fashioned, it\'s sexy.' },
  { number: 95, text: 'Catholic weddings - the classic dilemma: painfully long ceremony, horny girls.' },
  { number: 96, text: 'The newspaper Wedding Announcements are your racing form. Choose carefully.' },
  { number: 97, text: 'Be judicious with cologne. Citrus tones are best.' },
  { number: 98, text: 'Save the tuxes for "the big show" only.' },
  { number: 99, text: 'Avoid women who were psychology majors in college.' },
  { number: 100, text: 'No periwinkle colored ties, please.' },
  { number: 101, text: 'Always have an early "appointment" the next morning.' },
  { number: 102, text: 'Be well groomed and well-mannered.' },
  { number: 103, text: 'Never cockblock a fellow crasher. Cockblocking an invited guest is okay.' },
  { number: 104, text: 'Eat plentiful, digest your food. You\'ll need the energy for later.' },
  { number: 105, text: 'Know when to abandon ship if it ain\'t floating.' },
  { number: 106, text: 'Know your swing and salsa dancing. Girls love to get twisted around.' },
  { number: 107, text: 'Always carry an assortment of placecards to match any wedding design.' },
  { number: 108, text: 'Make sure your magic trick and balloon animal skills are not rusty. If the kids love it, the girls will too.' },
  { number: 109, text: 'Never reveal your true identity.' },
  { number: 110, text: 'Never walk away from a crasher in a funny jacket. By decree of Chazz Reingold, Creator of the Rules of Wedding Crashing, revised from 1989 in October 2004, the following bits of slang are no longer acceptable: "it\'s all good," "hey, no worries," and any sentence that involves anyone getting "their freak on." -via imdb' },
];

const PrinciplesWeddingCrashing: React.FC = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<number | null>(null);

  const filtered = rules.filter(r =>
    r.text.toLowerCase().includes(search.toLowerCase()) ||
    r.number.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-100 dark:from-pink-900 dark:via-yellow-900 dark:to-blue-900 py-8 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-pink-800 dark:text-yellow-200 px-2">Rules to Wedding Crashing</h1>
        <p className="text-center text-base sm:text-lg mb-6 sm:mb-8 text-gray-700 dark:text-gray-300 px-2">All 110 rules from the "Wedding Crashers" bonus feature. Click a rule to expand. Search for keywords or rule numbers below.</p>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search rules..."
          className="w-full mb-6 px-4 py-3 rounded border border-pink-200 dark:border-yellow-900 focus:outline-none focus:ring-2 focus:ring-pink-400 text-base"
        />
        <div className="space-y-3 sm:space-y-4">
          {filtered.map((r, i) => (
            <div key={r.number} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 sm:p-6 border border-pink-100 dark:border-yellow-900">
              <button
                className="flex items-start sm:items-center w-full text-left focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-lg sm:text-xl font-bold text-pink-700 dark:text-yellow-200 mr-3 sm:mr-4 flex-shrink-0">Rule #{r.number}</span>
                <span className="text-gray-800 dark:text-gray-100 text-sm sm:text-base leading-relaxed flex-1 min-w-0">
                  {r.text.length > 60 ? `${r.text.slice(0, 60)}...` : r.text}
                </span>
                <span className="ml-2 sm:ml-auto text-gray-400 flex-shrink-0 text-lg">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className="mt-4 text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed animate-fade-in">
                  {r.text}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto mt-8 sm:mt-12 px-4">
          <CommentsSection />
        </div>
      </div>
    </div>
  );
};

export default PrinciplesWeddingCrashing; 
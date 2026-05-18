export interface AudiobookChapter {
  number: number;
  title: string;
  file: string;
  durationSeconds: number;
}

export interface AudiobookData {
  narrators: string;
  coverUrl: string;
  chapters: AudiobookChapter[];
  fullMp3: string;
  fullM4b: string;
  totalSeconds: number;
}

export interface MGCUBook {
  slug: string;
  title: string;
  genre: string;
  structure: string;
  chapters: number;
  coreThemes: string;
  uniqueAngle: string;
  mgcuTies: string;
  coverUrl?: string;
  description?: string;
  audiobook?: AudiobookData;
}

const AUDIOBOOK_BASE = (process.env.REACT_APP_AUDIOBOOK_BASE_URL ?? '').replace(/\/$/, '');

function audioFile(book: string, filename: string): string {
  if (AUDIOBOOK_BASE) return `${AUDIOBOOK_BASE}/${book}/${encodeURIComponent(filename)}`;
  const path = encodeURIComponent(`audiobooks/${book}/${filename}`);
  return `https://firebasestorage.googleapis.com/v0/b/nwspro-9044c.firebasestorage.app/o/${path}?alt=media`;
}

const NUMBER_WORDS: Record<number, string> = {
  0: 'Zero', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five',
  6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten',
  11: 'Eleven', 12: 'Twelve', 13: 'Thirteen', 14: 'Fourteen', 15: 'Fifteen',
  16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen', 19: 'Nineteen', 20: 'Twenty',
  21: 'Twenty-One', 22: 'Twenty-Two', 23: 'Twenty-Three', 24: 'Twenty-Four',
  25: 'Twenty-Five', 26: 'Twenty-Six', 27: 'Twenty-Seven', 28: 'Twenty-Eight',
  29: 'Twenty-Nine', 30: 'Thirty',
};

const cabo = 'thirty-minutes-in-cabo';

// [chapter, POV subtitle, duration seconds]
const caboChapterMeta: [number, string, number][] = [
  [0,  'Before the Bag',  275],
  [1,  'Zion',            436],
  [2,  'Nia',             468],
  [3,  'Zion',            473],
  [4,  'Nia',             586],
  [5,  'Zion',            899],
  [6,  'Nia',             697],
  [7,  'Zion',            646],
  [8,  'Nia',             746],
  [9,  'Zion',            689],
  [10, 'Nia',             779],
  [11, 'Zion',            799],
  [12, 'Nia',             893],
  [13, 'Zion',           1099],
  [14, 'Nia',             991],
  [15, 'Zion',            805],
  [16, 'Nia',             969],
  [17, 'Zion',            966],
  [18, 'Nia',             926],
  [19, 'Zion',            812],
  [20, 'Nia',            1006],
  [21, 'Zion',            909],
  [22, 'Nia',             880],
  [23, 'Zion',           1028],
  [24, 'Nia',            1037],
  [25, 'Zion',            890],
  [26, 'Nia',             905],
  [27, 'Zion',           1121],
  [28, 'Nia',             863],
  [29, 'Zion',            881],
  [30, 'Nia',            1474],
];

const caboAudiobookChapters: AudiobookChapter[] = caboChapterMeta.map(([n, subtitle, dur]) => ({
  number: n,
  title: `Chapter ${NUMBER_WORDS[n]}. ${subtitle}`,
  file: audioFile(cabo, `chapter_${String(n).padStart(2, '0')}.mp3`),
  durationSeconds: dur,
}));

const caboTotalSeconds = caboChapterMeta.reduce((s, [, , d]) => s + d, 0);

export const books: MGCUBook[] = [
  {
    slug: cabo,
    title: 'Thirty Minutes in Cabo',
    genre: 'Literary Romance / Contemporary Drama',
    structure: '31 Chapters (Prologue + alternating Zion/Nia POV)',
    chapters: 31,
    coreThemes: 'Identity, intimacy, the moment a vacation stops being one',
    uniqueAngle: 'A stolen bag in the first twelve minutes of a Cabo trip unspools everything the couple had agreed not to name. Told in alternating Zion/Nia POVs.',
    mgcuTies: 'Book One of the Cabo Series. Standalone entry point into the MGCU.',
    coverUrl: audioFile(cabo, 'cover.png'),
    description:
      'Before the bag, there was already baggage. Zion brought plans, receipts, a birthday, and a hope he had not fully admitted. Nia brought caution, a quick mouth, and a test she had not told him he was taking. Within thirty minutes, Cabo started unpacking them.',
    audiobook: {
      narrators: 'AI narration · Nova (Nia POV) + Onyx (Zion POV)',
      coverUrl: audioFile(cabo, 'cover.png'),
      chapters: caboAudiobookChapters,
      fullMp3: audioFile(cabo, 'Thirty Minutes in Cabo.mp3'),
      fullM4b: audioFile(cabo, 'Thirty Minutes In Cabo.m4b'),
      totalSeconds: caboTotalSeconds,
    },
  },
  {
    slug: 'loving-you-was-the-crime',
    title: 'Loving You Was the Crime',
    genre: 'Romantic Thriller / Noir',
    structure: '3 Parts (Betrayal, Exposure, Reckoning)',
    chapters: 45,
    coreThemes: 'Deception, power imbalance, emotional manipulation',
    uniqueAngle: 'Relationship unravels through a corporate heist narrative; overlapping law enforcement and organized crime storylines',
    mgcuTies: 'Donovan Black’s connections to Jaxon Cole; William Warren’s past linked to Griffin Group investigations',
  },
  {
    slug: 'ashes-and-aftermath',
    title: 'Ashes & Aftermath',
    genre: 'Legal/Medical Drama with Romance',
    structure: '3 Parts',
    chapters: 38,
    coreThemes: 'Grief recovery, justice, betrayal among friends',
    uniqueAngle: 'Protagonist uncovers malpractice and cover-ups tied to a powerful hospital board',
    mgcuTies: 'Layla Mercer (sister of Olivia Mercer); Camille Warren makes a cameo as a donor',
  },
  {
    slug: 'piece-of-my-love',
    title: 'Piece of My Love',
    genre: 'Romance with corporate ambition',
    structure: '3 Parts (Jaxon vs. Dorian, ???, Jaxon vs. Himself)',
    chapters: 38,
    coreThemes: 'Timing, missed connections, emotional intimacy',
    uniqueAngle: 'Emotional buildup driven by timing and proximity; rooted in design/architecture world',
    mgcuTies: 'Griffin Group expansion; cameo from Camille or Donovan; Ava’s sister owns a rival firm',
  },
  {
    slug: 'even-if-its-just-a-whisper',
    title: 'Even If It’s Just a Whisper',
    genre: 'Contemporary Romance / Mystery',
    structure: '3 Parts',
    chapters: 42,
    coreThemes: 'Healing, secrets, self-discovery',
    uniqueAngle: 'Whispers of a past trauma reemerge when the main character returns to her hometown',
    mgcuTies: 'Character ties to Malcolm Hayes (from Cross-Examination) and Griffin Group real estate arm',
  },
  {
    slug: 'cross-examination',
    title: 'Cross-Examination',
    genre: 'Legal Drama / Romance / Comedy',
    structure: '4 Years',
    chapters: 48,
    coreThemes: 'Ambition, integrity, double lives',
    uniqueAngle: 'First-year law student moonlights as bartender; courtroom and emotional stakes rise in tandem',
    mgcuTies: 'Cameos from Layla Mercer (hospital board) and Jaxon Cole (pro bono consulting)',
  },
  {
    slug: 'get-here',
    title: 'Get Here',
    genre: 'Emotional Slow-Burn Romance / Drama',
    structure: '3 Parts',
    chapters: 38,
    coreThemes: 'Distance, longing, emotional healing',
    uniqueAngle: 'Focus on two characters trying to “get here” emotionally and physically despite life hurdles',
    mgcuTies: 'Occasional references to Donovan’s media empire; Ava James appears as friend or counselor',
  },
  {
    slug: 'the-residue',
    title: 'The Residue',
    genre: 'Urban Suspense / Romance / Crime',
    structure: '3 Parts',
    chapters: 40,
    coreThemes: 'Trust, legacy, urban survival',
    uniqueAngle: 'A character inherits a block in D.C. and gets caught between gentrification and loyalty to their roots',
    mgcuTies: 'Simone Walker (Griffin Group outreach); Renée Carter leads local community legal defense',
  },
  {
    slug: 'ashes-to-assets',
    title: 'Ashes to Assets',
    genre: 'Financial Drama / Romance',
    structure: '3 Parts',
    chapters: 36,
    coreThemes: 'Reinvention, legacy, rebuilding',
    uniqueAngle: 'A character uses insurance payout from a tragedy to flip homes and uncover secrets in the process',
    mgcuTies: 'Ava James as the insurance adjuster; Camille Warren helps fund the rebuild project',
  },
  {
    slug: 'no-window-shopping',
    title: 'No Window Shopping (Fictional Adaptation)',
    genre: 'Inspirational Fiction / Self-Growth',
    structure: 'Episodic narrative',
    chapters: 12,
    coreThemes: 'Taking action, overcoming stagnation',
    uniqueAngle: 'Fictionalized composite of client stories from the NoWindowShopping program',
    mgcuTies: 'Light cameo/reference to past clients from Camille, Layla, or Ava',
  },
];

export function findBook(slug: string): MGCUBook | undefined {
  return books.find((b) => b.slug === slug);
}

export function formatSeconds(s: number): string {
  if (!isFinite(s) || s < 0) return '0:00';
  const total = Math.floor(s);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

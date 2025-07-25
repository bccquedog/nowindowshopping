export interface MGCUBook {
  slug: string;
  title: string;
  genre: string;
  structure: string;
  chapters: number;
  coreThemes: string;
  uniqueAngle: string;
  mgcuTies: string;
}

export const books: MGCUBook[] = [
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
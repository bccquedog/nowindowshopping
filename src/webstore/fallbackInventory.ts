import type { WebstoreItem } from './webstoreService';

const fallbackSneakerCsv = `"Sneaker","Size","Price"
"Nike Air Max Plus 'Doernbecher' 2026","US M 11.5","$285"
"Air Jordan 3 Retro 'El Vuelo'","US M 11.5","$185"
"Supreme x Nike Dunk Low OG SB QS 'Barkroot Brown'","US M 11","$467"
"Wmns Air Jordan 4 Retro 'Valentine's Day'","US W 13","$223"
"Zion Williamson x Air Jordan 1 Retro Low OG 'Voodoo'","US M 11","$169"
"Kyler Murray x Nike Dunk Low 'Be 1 of One'","US M 12","$213"
"Wmns Air Jordan 4 Retro 'Canyon Purple'","US W 12.5","$441"
"Nike Dunk Low SB 'Purple Suede'","US M 12","$223"
"Li-Ning Way of Wade 2 'Announcement'","US M 11","$82"
"Air Jordan 8 Retro 'Bugs Bunny' 2025","US M 11.5","$215"
"A Ma Maniére x Air Jordan 4 Retro 'Dark Mocha'","US M 11.5","$269"
"Supreme x Nike Air Max 1 '87 SP 'Varsity Purple'","US M 11.5","$189"
"Levi's x Air Jordan 3 Retro SP 'Denim Blue'","US M 11.5","$236"
"Air Jordan 6 Retro 'Reverse Infrared Salesman'","US M 11","$207"
"Stranger Things x Nike Air Foamposite One Premium","US M 12","$313"
"Nike Air Force 1 Low Premium 'Lebron James'","US M 11.5","$302"
"Kith x Nike Air Force 1 Low 'NYC Away'","US M 11.5","$59"
"Fragment Design x Union LA x Air Jordan 1 Retro High","US M 11.5","$282"
"Air Jordan 5 Retro 'Wolf Grey' 2026","US M 11.5","$315"
"Air Jordan 1 Retro High OG 'Pollen'","US M 11.5","$128"
"Air Jordan 1 Retro High OG 'UNC Reimagined'","US M 11.5","$137"
"Nike Wmns A'One 'Pink A'ura'","US W 13","$86"
"North Carolina A&T State x Nike Dunk Low 'Aggies'","US M 11.5","$204"
"Air Jordan 4 Retro 'Bred Reimagined'","US M 11.5","$264"
"Air Jordan 5 Retro 'Grape' 2025","US M 11.5","$204"
"Hayley Wilson x Nike Dunk Low SB 'Court Purple'","US M 11.5","$155"
"Air Jordan 12 Retro 'Melo' 2025","US M 11.5","$182"
"Travis Scott x Nike Zoom Field Jaxx 'Leche Blue'","US M 11.5","$124"
"Nike Kyrie 3 'Mamba Mentality'","US M 12","$650"
"Supreme x Nike Dunk Low SB 'Black'","US M 11","$355"
"Air Jordan 4 Retro 'White Thunder'","US M 11.5","$394"
"Union LA x Air Jordan 1 Retro High NRG 'Storm Blue'","US M 11","$1,527"
"Nigel Sylvester x Air Jordan 1 Low OG 'Better With Age'","US M 11.5","$303"
"Air Jordan 12 Retro 'Flu Game' 2025","US M 11.5","$280"
"Air Jordan 4 Retro 'Rare Air - Gold Lettering'","US M 11.5","$261"
"Nike Dunk Low Retro SP 'Kentucky'","US M 11.5","$125"
"Wmns Air Jordan 10 Retro 'Hydrangeas'","US W 13","$297"
"Air Jordan 4 Retro 'Lakers'","US M 11.5","$313"
"Supreme x SB x Nike Air Max 2 CB '94 Low 'White'","US M 11","$230"
"Supreme x SB x Nike Air Max 2 CB '94 Low 'Metallic'","US M 11.5","$259"
"Skate Like a Girl x Nike Dunk Low SB","US M 11.5","$221"
"Undefeated x Nike Dunk Low SP 'Canteen'","US M 11.5","$215"
"Union LA x Air Jordan 1 Retro High OG SP 'Chicago'","US M 11.5","$289"
"Air Jordan 5 Retro OG 'Black Metallic Reimagined'","US M 11.5","$530"
"Crushed D.C. x Nike Dunk Low SB 'Golden Hour'","Not Visible","$240"
"RIOT Skateshop x Nike Dunk Low Pro SB QS","Not Visible","$185"
"The Wizard of Oz x Nike Dunk Low SB 'Poppy Field'","US M 12","$280"
"Air Jordan 11 Retro 'Legend Blue / Columbia' 2024","US M 11.5","$260"
"Anta Kai 1 'Artist on Court'","US M 12","$231"
"Travis Scott x Nike Zoom Field Jaxx 'Light Chocolate'","US M 11.5","$168"
"Wu-Tang x Nike Dunk High Retro Premium 2024","US M 11.5","$254"
"Air Jordan 4 Retro MCS 'Gym Red'","US M 11.5","$160"
"Nike Dunk Low Premium 'Cider'","US M 11.5","$139"
"Verdy x Nike Dunk Low SB 'Visty'","US M 11.5","$247"
"Supreme x Nike Dunk Low OG SB QS 'Hyper Royal'","US M 11","$493"
"Travis Scott x Air Jordan 1 Retro Low OG SP 'Reverse Mocha'","US M 12","$607"
"Alexis Sablone x Nike Dunk Low SB 'Chameleon'","US M 11.5","$126"
"Cactus Plant Flea Market x Nike Blazer Mid 'Sponge'","US M 11.5","$500"
"Nike Zoom LeBron 4 'Fruity Pebbles' 2024","US M 11.5","$212"
"Nike Dunk Low Pro SB 'Electric Pack'","US M 11.5","$103"
"Nike Zoom KD 4 'Nerf' 2024","US M 11.5","$195"
"THERE Skateboards x Nike Dunk Low SB 'Ultra Humanite'","US M 12","$242"
"Nike Wmns Dunk Low 'Día De Muertos'","US W 13.5","$158"
"Nike Dunk Low SP 'Brazil' 2020","US M 12","$157"
"Air Jordan 1 Retro High '85 OG 'Metallic Burgundy'","US M 11.5","$164"
"Nike Blazer Mid CB 'White Black'","US 2","$69"
"Nike Force 1 CB 'Triple White'","US 1","$44"
"Air Jordan 11 Retro TD 'Cool Grey' 2021","US 2","$129"
"Air Jordan 1 Mid TD 'Banned'","US 4","$84"
"Air Jordan 1 Bootie TD 'White Varsity Red'","US 2","$124"
"A Ma Maniére x Wmns Air Jordan 12 Retro SP 'White'","US W 13","$149"
"Air Jordan 1 Retro High OG 'Yellow Toe'","US M 11.5","$123"
"Nike Dunk High 'Blue Chill'","US M 11.5","$86"
"Nike Dunk Low SE 'The Masters Back 9 Collection'","US M 12","$129"
"Rayssa Leal x Nike Dunk Low SB","US M 11.5","$193"
"Nike Dunk Low Retro Vol. 1 SP 'Plum' 2024","US M 11.5","$149"
"Nike Air Max 1 '86 OG 'Big Bubble - Jackie Robinson'","US M 12","$295"
"Air Jordan 4 Retro 'Military Blue' 2024","US M 11.5","$225"
"Air Jordan 1 Retro High OG CO.JP 'Tokyo'","US M 11.5","$135"
"Air Jordan 5 Retro 'Olive' 2024","US M 11.5","$347"
"Nike Zoom Kobe 6 Protro 'Reverse Grinch'","US M 12","$481"
"Air Jordan 1 Retro High OG Craft 'Celadon'","US M 11.5","$240"
"Air Jordan 4 Retro SE Craft 'Olive'","US M 11.5","$202"
"Nike Dunk Low Retro SP 'St. John's' 2020","US M 12","$129"
"Supreme x Nike Dunk Low SB 'Rammellzee'","US M 12","$528"
"Yuto Horigome x Nike Dunk Low SB","US M 12","$392"
"Nike Dunk Low SB 'Orange Emerald Rise'","US M 11.5","$109"
"Teyana Taylor x Wmns Air Jordan 1 High Zoom Comfort 2","US W 13","$274"
"Nike Dunk Low 'Clear Jade'","US M 12","$87"
"Nike Dunk High 'Black White'","US M 11.5","$243"
"Air Jordan 4 Retro 'Thunder' 2023","US M 11.5","$308"
"Run The Jewels x Nike Dunk Low SB '4/20'","US M 12","$250"
"Air Jordan 1 Retro High OG 'Lucky Green'","US M 11.5","$149"
"Nike Dunk Low Premium 'Setsubun'","US M 12","$192"
"Air Jordan 1 Retro High '85 OG 'Black White'","US M 11.5","$352"
"Air Jordan 3 Retro PS 'White Cement Reimagined'","US Y 11","$113"
"Air Jordan 11 Retro 'Bred' 2019","US M 11.5","$441"
"Air Jordan 11 Retro 'Cool Grey' 2021","US M 11.5","$397"
"Air Jordan 4 Retro 'Lightning' 2021","US M 11.5","$262"
"Air Jordan 4 Retro 'Taupe Haze'","US M 11","$370"
"Why So Sad? x Nike Dunk Low SB 'The Predatory Bird'","US M 11.5","$320"
"Air Jordan 1 Retro High OG 'Gorge Green'","US M 11.5","$139"
"Nike Dunk Low SB 'Sandy Bodecker'","US M 11.5","$196"
"Air Jordan 4 Golf 'Bred'","US M 11","$261"
"Nike Dunk Low SE 'Lottery Pack - Grey Fog'","US M 11.5","$269"
"HUF x Nike Dunk Low SB 'San Francisco'","US M 11.5","$189"
"Cactus Plant Flea Market x Nike CPFM Flea 1 'Overgrown'","US M 11.5","$550"
"Air Jordan 1 Retro High OG 'Chicago Lost & Found'","US M 11.5","$346"
"Nike Dunk Low SE 'Lottery Pack - Malachite'","US M 11.5","$164"
"Nike Dunk High 'Black White'","US M 11.5","$66"
"Nike Dunk Low Pro SB 'Bart Simpson'","US M 11","$275"
"Air Jordan 1 Retro High OG 'Bordeaux'","US M 11.5","$103"
"Wmns Air Jordan 1 High OG 'Newstalgia Chenille'","US W 10","$119"
"Air Jordan 4 Retro 'Military Black'","US M 11.5","$362"
"Nike Dunk Low 'Team Red'","US M 11.5","$79"
"Nike LeBron 9 'Watch The Throne' 2022","US M 12","$295"
"Air Jordan 1 High OG 'Hand Crafted'","Not Visible","$150"
"Nike LeBron 8 Retro 'South Beach' 2021","US M 12","$380"
"Air Jordan 1 Retro High OG 'Light Fusion Red'","US M 11","$140"
"Air Jordan 1 Retro High '85 OG 'Neutral Grey'","US M 11","$300"
"Sean Wotherspoon x Nike Air Max 1/97","US M 11","$1,137"
"Off-White x Nike Air Presto 'Black'","US M 12","$1,442"
"Off-White x Nike Air Presto 'White'","US M 11","$1,137"
"Air Jordan 1 Retro High SB 'LA To Chicago'","US M 11.5","$255"
"Air Jordan 4 Retro OG 'Bred' 2019","US M 11.5","$460"
"Levi's x Air Max 90 'Nike By You'","US M 12","$732"
"Air Jordan 1 Retro High '85 OG 'Varsity Red'","US M 11","$251"
"KITH x Disney x Converse Chuck 70 'Fleece Mickey...'","US M 11","$79"
"Air Jordan 1 Retro High OG 'Banned' 2016","US M 11.5","$415"
"Air Jordan 1 Retro High OG 'Smoke Grey'","US M 11","$149"
"Wmns Air Jordan 1 High OG 'NC to Chi'","US W 13","$149"
"Air Jordan 1 Retro High 'Tokyo Bio Hack'","US M 11.5","$274"
"Paris Saint-Germain x Air Jordan 4 Retro 'Bordeaux'","US M 11","$390"
"Air Jordan 4 Retro OG 'Fire Red' 2020","US M 11.5","$301"
"Air Jordan 1 Retro High OG 'Black Metallic Gold'","US M 11.5","$279"
"Air Jordan 1 Retro High OG 'Court Purple 2.0'","US M 11.5","$228"
"Air Jordan 5 Retro SE 'Oregon'","US M 11","$319"
"Nike Zoom Kobe 6 Protro 'Grinch' 2020","US M 12","$893"
"Air Jordan 1 Retro High OG 'Dark Mocha'","US M 11","$361"
"Union LA x Air Jordan 4 Retro 'Off Noir'","US M 11","$727"
"Kobe 8 Protro 'Multi-Color' (HM9621-900)","US M 12","$380"
"Air Jordan 1 Retro High OG 'Dk Powder Blue / UNC Toe' (DZ5485-402)","US M 11.5","$180"
"Air Jordan 11 Retro Low 'Black/Varsity Red-White' (FV5104-006)","US M 11.5","$160"
"Air Jordan 4 Retro 'Midnight Navy' (DH6927-140)","US M 11.5","$230"
"Union LA x Air Jordan 4 Retro SP 'Desert Moss' (DJ5718-300)","US M 11.5","$320"
"Supreme x Nike Air More Uptempo 'Metallic Gold' (902290-700)","US M 11.5","$310"
"Air Jordan 5 Retro 'Oreo / Moonlight' (CT4838-011)","US M 11.5","$340"
"A Ma Maniére x Air Jordan 5 Retro 'Dusk' (FD1330-001)","US M 11.5","$240"
"Air Jordan 3 Retro 'Dark Iris' (CT8532-105)","US M 11.5","$200"
"Air Jordan 3 Retro 'Pine Green' (CT8532-030)","US M 11.5","$250"
"Air Jordan 5 Retro 'UNC / University Blue' (DV1310-401)","US M 11.5","$220"
"Air Jordan 3 Retro 'White Cement Reimagined' (DN3707-100)","US M 11.5","$270"
"A Ma Maniére x Wmns Air Jordan 3 Retro OG SP 'Black' (FZ4811-001)","US W 13 / M 11.5","$170"
"Air Jordan 3 Retro 'Black Cement' (136064-010)","US M 11","$200"
"Air Jordan 5 Retro 'Varsity Red / Toro Bravo' (DD0587-600)","US M 11","$220"
"Air Jordan 4 Retro SP 'Summit White / Navy' (DR5415-100)","US M 11.5","$250"
"Air Jordan 4 Retro 'Summit White / Fire Red' (FV5029-100)","US M 11.5","$250"
"Air Jordan 3 Retro OG SP 'White / Sport Royal' (IB1482-100)","US M 11.5","$250"
"Nike Air Max 1 'Big Head Mode' (IB9898-001)","US M 11.5","$150"
"Air Jordan 5 Retro SE 'What The' (CZ5725-700)","US M 11.5","$250"
"Air Jordan 4 Retro 'Doernbecher' (308497-015)","US M 10.5","$1,500"
"Air Jordan 3 Retro 'Cool Grey' (CT8532-001)","US M 11.5","$200"
"Air Jordan 6 Retro 'Carmine' (384664-160)","US M 11.5","$250"
"Air Jordan 5 Retro 'Bel-Air' (621958-090)","US M 11.5","$350"
"Concepts x Nike Air Max 1 SP 'Heavy' (DN1803-300)","US M 12","$180"
"Nike Dunk Low Retro 'Cosmic Clay' (DV0833-114)","US M 12","$120"
"Nike LeBron 7 QS 'Media Day / Lakers' (CW2300-500)","US M 12","$150"
"Nike Zoom LeBron 3 QS 'Christ The King' (BQ2444-100)","US M 12","$130"
"Nike LeBron 8 QS 'Lakers' (DC8380-500)","US M 11.5","$150"
"Kith x Nike LeBron 15 Performance (AJ3936-002)","US M 11.5","$250"
"Nike LeBron 8 V/2 Low QS 'Miami Nights' (DJ4436-100)","US M 12","$180"
"Nike LeBron 16 'Watch The Throne' (CI1518-001)","US M 12","$200"
"Nike LeBron 16 'Martin / Court Purple' (CI1520-500)","US M 12","$180"
"Nike LeBron 8 QS 'Miami Heat' (DD8306-001)","US M 12","$150"
"Travis Scott x Nike Air Force 1 Low 'Cactus Jack' (CN2405-900)","US M 11.5","$650"`;

const priceToNumber = (value: string): number => {
  const cleaned = value.replace(/\$/g, '').replace(/,/g, '').trim();
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['".,()/]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const guessBrand = (title: string): string => {
  if (title.startsWith('Air Jordan')) return 'Air Jordan';
  if (title.startsWith('Nike')) return 'Nike';
  if (title.startsWith('Supreme')) return 'Supreme';
  if (title.startsWith('Union LA')) return 'Union LA';
  if (title.startsWith('Wmns Air Jordan')) return 'Air Jordan';
  return 'Sneaker';
};

const parseCsvLine = (line: string): string[] => {
  const matches = line.match(/"([^"]*)"/g) ?? [];
  return matches.map((part) => part.slice(1, -1));
};

const extractStyleId = (title: string): string | undefined => {
  const styleIdMatch = title.match(/\(([A-Z0-9]{2,}-[A-Z0-9]{2,})\)/);
  if (styleIdMatch?.[1]) return styleIdMatch[1];

  const inlineMatch = title.match(/\b([A-Z0-9]{2,}-[A-Z0-9]{2,})\b/);
  return inlineMatch?.[1];
};

const buildStockImageUrl = (styleId: string | undefined, title: string): string => {
  if (styleId) {
    return `https://images.stockx.com/images/${styleId}.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1`;
  }
  return `https://picsum.photos/seed/nws-${title.replace(/\s+/g, '-')}/900/900`;
};

export const fallbackListedItems: WebstoreItem[] = (() => {
  const lines = fallbackSneakerCsv
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .slice(1);

  const seenSlugs = new Map<string, number>();

  return lines.map((line, index) => {
    const [title, size, price] = parseCsvLine(line);
    const baseSlug = slugify(title || `item-${index + 1}`);
    const existingCount = seenSlugs.get(baseSlug) ?? 0;
    seenSlugs.set(baseSlug, existingCount + 1);
    const slug = existingCount === 0 ? baseSlug : `${baseSlug}-${existingCount + 1}`;
    const listPrice = priceToNumber(price || '0');
    const styleId = extractStyleId(title || '');

    return {
      id: `fallback-${index + 1}`,
      type: 'sneaker',
      title: title || `Sneaker ${index + 1}`,
      slug,
      brand: guessBrand(title || ''),
      styleId,
      size: size || 'Not Visible',
      condition: '10',
      box: true,
      tags: ['sneaker', 'fallback'],
      purchasePrice: Math.round(listPrice * 0.7),
      listPrice,
      status: 'LISTED',
      images: [buildStockImageUrl(styleId, title || '')],
      storageLocation: 'NWS-VAULT',
      notes: 'Live fallback inventory item. Contact support for image details and checkout assistance.',
      createdAt: new Date(0),
      updatedAt: new Date(0),
    };
  });
})();

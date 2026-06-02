// Complete static pack + card dataset — used for client-side demo and pack inventory display

export interface CardDef {
  id: string
  player: string
  team: string
  league: string
  nation: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  parallel?: string        // e.g. "Gold Prizm /10", "Atomic Refractor"
  number?: number          // print run number
  totalPrint?: number      // total print run
  cashValue: number
  pullOdds: string         // e.g. "1:24", "1:288"
  probability: number      // 0–1
  year?: number
}

export interface PackDef {
  id: string
  name: string
  series: string
  manufacturer: 'Panini' | 'Topps'
  edition: string
  description: string
  price: number
  solPrice: number
  rarity: 'standard' | 'premium' | 'elite'
  stock: number
  sold: number
  isFeatured: boolean
  isWorldCup: boolean
  xpReward: number
  cardsPerPack: number
  releaseYear: number
  cards: CardDef[]
}

export const PACK_CATALOG: PackDef[] = [
  // ─── PANINI PRIZM WORLD CUP 2026 ───────────────────────────────────────────
  {
    id: 'panini-prizm-wc-2026',
    name: 'Panini Prizm World Cup 2026',
    series: 'Panini Prizm',
    manufacturer: 'Panini',
    edition: 'World Cup 2026',
    description: 'The most sought-after World Cup trading card product of 2026. Chase Prizm parallels of the tournament\'s greatest stars — from Gold Prizm to the elusive Black Prizm #1/1.',
    price: 29.99,
    solPrice: 0.18,
    rarity: 'premium',
    stock: 500,
    sold: 187,
    isFeatured: true,
    isWorldCup: true,
    xpReward: 150,
    cardsPerPack: 5,
    releaseYear: 2026,
    cards: [
      { id: 'pw-1',  player: 'Kylian Mbappé',    team: 'Real Madrid',      league: 'La Liga',          nation: '🇫🇷', rarity: 'legendary', parallel: 'Gold Prizm',    number: 1,  totalPrint: 10,  cashValue: 299.99, pullOdds: '1:2400', probability: 0.004 },
      { id: 'pw-2',  player: 'Lamine Yamal',      team: 'Barcelona',        league: 'La Liga',          nation: '🇪🇸', rarity: 'legendary', parallel: 'Silver Prizm',  number: 7,  totalPrint: 25,  cashValue: 189.99, pullOdds: '1:960',  probability: 0.010 },
      { id: 'pw-3',  player: 'Erling Haaland',    team: 'Manchester City',  league: 'Premier League',   nation: '🇳🇴', rarity: 'legendary', parallel: 'Purple Prizm',  number: 9,  totalPrint: 49,  cashValue: 149.99, pullOdds: '1:480',  probability: 0.021 },
      { id: 'pw-4',  player: 'Vinicius Jr.',       team: 'Real Madrid',      league: 'La Liga',          nation: '🇧🇷', rarity: 'epic',      parallel: 'Blue Prizm',    number: 10, totalPrint: 99,  cashValue: 79.99,  pullOdds: '1:240',  probability: 0.042 },
      { id: 'pw-5',  player: 'Jude Bellingham',   team: 'Real Madrid',      league: 'La Liga',          nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'epic',      parallel: 'Red Prizm',     number: 8,  totalPrint: 149, cashValue: 59.99,  pullOdds: '1:120',  probability: 0.083 },
      { id: 'pw-6',  player: 'Pedri',              team: 'Barcelona',        league: 'La Liga',          nation: '🇪🇸', rarity: 'rare',      parallel: 'Prizm',                              cashValue: 24.99,  pullOdds: '1:48',   probability: 0.21  },
      { id: 'pw-7',  player: 'Bukayo Saka',        team: 'Arsenal',          league: 'Premier League',   nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'rare',      parallel: 'Prizm',                              cashValue: 19.99,  pullOdds: '1:48',   probability: 0.21  },
      { id: 'pw-8',  player: 'Federico Valverde',  team: 'Real Madrid',      league: 'La Liga',          nation: '🇺🇾', rarity: 'uncommon',  parallel: 'Base Prizm',                         cashValue: 8.99,   pullOdds: '1:12',   probability: 0.83  },
      { id: 'pw-9',  player: 'Gavi',               team: 'Barcelona',        league: 'La Liga',          nation: '🇪🇸', rarity: 'uncommon',  parallel: 'Base Prizm',                         cashValue: 7.99,   pullOdds: '1:12',   probability: 0.83  },
      { id: 'pw-10', player: 'Base Card',          team: 'Various',          league: 'International',    nation: '🌍',  rarity: 'common',                                                     cashValue: 1.99,   pullOdds: '4:5',    probability: 8.0   },
    ],
  },

  // ─── TOPPS CHROME UCL ──────────────────────────────────────────────────────
  {
    id: 'topps-chrome-ucl-2526',
    name: 'Topps Chrome UCL 2025-26',
    series: 'Topps Chrome',
    manufacturer: 'Topps',
    edition: 'UEFA Champions League 2025-26',
    description: 'Topps Chrome refractor technology meets Champions League glory. Find Atomic Refractors, Superfractors, and Gold Autographs of Europe\'s elite.',
    price: 24.99,
    solPrice: 0.15,
    rarity: 'premium',
    stock: 300,
    sold: 104,
    isFeatured: true,
    isWorldCup: false,
    xpReward: 120,
    cardsPerPack: 5,
    releaseYear: 2025,
    cards: [
      { id: 'tc-1', player: 'Erling Haaland',    team: 'Manchester City', league: 'Premier League',  nation: '🇳🇴', rarity: 'legendary', parallel: 'Superfractor', number: 1, totalPrint: 1,   cashValue: 999.99, pullOdds: '1:9600', probability: 0.001 },
      { id: 'tc-2', player: 'Kylian Mbappé',     team: 'Real Madrid',     league: 'La Liga',         nation: '🇫🇷', rarity: 'legendary', parallel: 'Gold Refractor', number: 2, totalPrint: 50, cashValue: 199.99, pullOdds: '1:1200', probability: 0.008 },
      { id: 'tc-3', player: 'Jude Bellingham',   team: 'Real Madrid',     league: 'La Liga',         nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'epic',      parallel: 'Atomic Refractor',   totalPrint: 99,  cashValue: 79.99,  pullOdds: '1:288',  probability: 0.035 },
      { id: 'tc-4', player: 'Phil Foden',         team: 'Manchester City', league: 'Premier League',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'epic',      parallel: 'Blue Refractor',     totalPrint: 150, cashValue: 44.99,  pullOdds: '1:120',  probability: 0.083 },
      { id: 'tc-5', player: 'Vinicius Jr.',        team: 'Real Madrid',     league: 'La Liga',         nation: '🇧🇷', rarity: 'rare',      parallel: 'Orange Refractor',   totalPrint: 250, cashValue: 29.99,  pullOdds: '1:48',   probability: 0.21  },
      { id: 'tc-6', player: 'Rodri',              team: 'Manchester City', league: 'Premier League',  nation: '🇪🇸', rarity: 'rare',      parallel: 'Green Refractor',    totalPrint: 299, cashValue: 19.99,  pullOdds: '1:48',   probability: 0.21  },
      { id: 'tc-7', player: 'Toni Kroos',         team: 'Real Madrid',     league: 'La Liga',         nation: '🇩🇪', rarity: 'uncommon',  parallel: 'Base Refractor',                      cashValue: 6.99,   pullOdds: '1:8',    probability: 1.25  },
      { id: 'tc-8', player: 'Base Card',          team: 'Various',         league: 'Champions League',nation: '🌍',  rarity: 'common',                                                      cashValue: 1.49,   pullOdds: '4:5',    probability: 8.0   },
    ],
  },

  // ─── PANINI MOSAIC PREMIER LEAGUE ──────────────────────────────────────────
  {
    id: 'panini-mosaic-pl-2526',
    name: 'Panini Mosaic Premier League',
    series: 'Panini Mosaic',
    manufacturer: 'Panini',
    edition: 'Premier League 2025-26',
    description: 'The iconic Mosaic design showcases the Premier League\'s finest. Chase Silver, Gold, and Reactive parallels of England\'s best.',
    price: 19.99,
    solPrice: 0.12,
    rarity: 'standard',
    stock: 1000,
    sold: 312,
    isFeatured: false,
    isWorldCup: false,
    xpReward: 75,
    cardsPerPack: 5,
    releaseYear: 2025,
    cards: [
      { id: 'pm-1', player: 'Harry Kane',        team: 'Bayern Munich',   league: 'Bundesliga',      nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'legendary', parallel: 'Reactive Gold',   totalPrint: 10,  cashValue: 89.99,  pullOdds: '1:480',  probability: 0.021 },
      { id: 'pm-2', player: 'Mohamed Salah',     team: 'Liverpool',       league: 'Premier League',  nation: '🇪🇬', rarity: 'epic',      parallel: 'Gold Mosaic',    totalPrint: 25,  cashValue: 49.99,  pullOdds: '1:120',  probability: 0.083 },
      { id: 'pm-3', player: 'Bukayo Saka',       team: 'Arsenal',         league: 'Premier League',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'rare',      parallel: 'Silver Mosaic',  totalPrint: 100, cashValue: 19.99,  pullOdds: '1:36',   probability: 0.28  },
      { id: 'pm-4', player: 'Phil Foden',        team: 'Manchester City', league: 'Premier League',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'rare',      parallel: 'Silver Mosaic',  totalPrint: 100, cashValue: 16.99,  pullOdds: '1:36',   probability: 0.28  },
      { id: 'pm-5', player: 'Cole Palmer',       team: 'Chelsea',         league: 'Premier League',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'uncommon',  parallel: 'Base Mosaic',                     cashValue: 5.99,   pullOdds: '1:8',    probability: 1.25  },
      { id: 'pm-6', player: 'Declan Rice',       team: 'Arsenal',         league: 'Premier League',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'uncommon',  parallel: 'Base Mosaic',                     cashValue: 4.99,   pullOdds: '1:8',    probability: 1.25  },
      { id: 'pm-7', player: 'Base Card',         team: 'Various',         league: 'Premier League',  nation: '🌍',  rarity: 'common',                                                      cashValue: 0.99,   pullOdds: '4:5',    probability: 8.0   },
    ],
  },

  // ─── TOPPS FINEST BUNDESLIGA ──────────────────────────────────────────────
  {
    id: 'topps-finest-bundesliga-2526',
    name: 'Topps Finest Bundesliga',
    series: 'Topps Finest',
    manufacturer: 'Topps',
    edition: 'Bundesliga 2025-26',
    description: 'Premium chromium technology meets Bundesliga\'s finest players. Every card is built on Finest stock with stunning refractor parallels.',
    price: 34.99,
    solPrice: 0.21,
    rarity: 'elite',
    stock: 200,
    sold: 89,
    isFeatured: true,
    isWorldCup: false,
    xpReward: 200,
    cardsPerPack: 5,
    releaseYear: 2025,
    cards: [
      { id: 'tf-1', player: 'Harry Kane',        team: 'Bayern Munich',   league: 'Bundesliga',      nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity: 'legendary', parallel: 'Gold Finest',    number: 9,  totalPrint: 50,  cashValue: 149.99, pullOdds: '1:1200', probability: 0.008 },
      { id: 'tf-2', player: 'Florian Wirtz',     team: 'Bayer Leverkusen',league: 'Bundesliga',      nation: '🇩🇪', rarity: 'legendary', parallel: 'Gold Finest',    number: 10, totalPrint: 50,  cashValue: 129.99, pullOdds: '1:1200', probability: 0.008 },
      { id: 'tf-3', player: 'Jamal Musiala',     team: 'Bayern Munich',   league: 'Bundesliga',      nation: '🇩🇪', rarity: 'epic',      parallel: 'Orange Finest',  totalPrint: 150, cashValue: 69.99,  pullOdds: '1:240',  probability: 0.042 },
      { id: 'tf-4', player: 'Leroy Sané',        team: 'Bayern Munich',   league: 'Bundesliga',      nation: '🇩🇪', rarity: 'rare',      parallel: 'Blue Finest',    totalPrint: 299, cashValue: 29.99,  pullOdds: '1:48',   probability: 0.21  },
      { id: 'tf-5', player: 'Granit Xhaka',      team: 'Bayer Leverkusen',league: 'Bundesliga',      nation: '🇨🇭', rarity: 'rare',      parallel: 'Green Finest',   totalPrint: 299, cashValue: 19.99,  pullOdds: '1:48',   probability: 0.21  },
      { id: 'tf-6', player: 'Base Card',         team: 'Various',         league: 'Bundesliga',      nation: '🌍',  rarity: 'common',                                                      cashValue: 1.99,   pullOdds: '4:5',    probability: 8.0   },
    ],
  },

  // ─── TOPPS MATCH ATTAX WORLD CUP ──────────────────────────────────────────
  {
    id: 'topps-match-attax-wc',
    name: 'Topps Match Attax World Cup',
    series: 'Topps Match Attax',
    manufacturer: 'Topps',
    edition: 'World Cup Special Edition',
    description: "The collector's favourite returns for World Cup 2026. Find Limited, Special, and Legend cards alongside base stars.",
    price: 9.99,
    solPrice: 0.06,
    rarity: 'standard',
    stock: 2000,
    sold: 567,
    isFeatured: false,
    isWorldCup: true,
    xpReward: 40,
    cardsPerPack: 5,
    releaseYear: 2026,
    cards: [
      { id: 'ma-1', player: 'Lionel Messi',      team: 'Inter Miami',      league: 'MLS',             nation: '🇦🇷', rarity: 'legendary', parallel: 'Limited Edition', totalPrint: 25,  cashValue: 99.99,  pullOdds: '1:480',  probability: 0.021 },
      { id: 'ma-2', player: 'Cristiano Ronaldo', team: 'Al Nassr',         league: 'Saudi Pro',       nation: '🇵🇹', rarity: 'legendary', parallel: 'Limited Edition', totalPrint: 25,  cashValue: 89.99,  pullOdds: '1:480',  probability: 0.021 },
      { id: 'ma-3', player: 'Kylian Mbappé',     team: 'Real Madrid',      league: 'La Liga',         nation: '🇫🇷', rarity: 'epic',      parallel: 'Special Card',                    cashValue: 34.99,  pullOdds: '1:96',   probability: 0.104 },
      { id: 'ma-4', player: 'Erling Haaland',    team: 'Manchester City',  league: 'Premier League',  nation: '🇳🇴', rarity: 'rare',      parallel: 'Hat-Trick Hero',                  cashValue: 14.99,  pullOdds: '1:24',   probability: 0.42  },
      { id: 'ma-5', player: 'Base Star',         team: 'Various',          league: 'International',   nation: '🌍',  rarity: 'uncommon',                                                  cashValue: 2.99,   pullOdds: '1:4',    probability: 2.5   },
      { id: 'ma-6', player: 'Base Card',         team: 'Various',          league: 'International',   nation: '🌍',  rarity: 'common',                                                    cashValue: 0.79,   pullOdds: '4:5',    probability: 8.0   },
    ],
  },

  // ─── PANINI ADRENALYN XL LA LIGA ──────────────────────────────────────────
  {
    id: 'panini-adrenalyn-laliga-2526',
    name: 'Panini Adrenalyn XL La Liga',
    series: 'Panini Adrenalyn XL',
    manufacturer: 'Panini',
    edition: 'La Liga 2025-26',
    description: 'The iconic Adrenalyn XL format returns with La Liga\'s finest. Collect Limited, Special, and Top Master cards.',
    price: 14.99,
    solPrice: 0.09,
    rarity: 'standard',
    stock: 800,
    sold: 234,
    isFeatured: false,
    isWorldCup: false,
    xpReward: 60,
    cardsPerPack: 5,
    releaseYear: 2025,
    cards: [
      { id: 'ax-1', player: 'Kylian Mbappé',     team: 'Real Madrid',      league: 'La Liga',         nation: '🇫🇷', rarity: 'legendary', parallel: 'Top Master',   cashValue: 49.99,  pullOdds: '1:240',  probability: 0.042 },
      { id: 'ax-2', player: 'Lamine Yamal',      team: 'Barcelona',        league: 'La Liga',         nation: '🇪🇸', rarity: 'epic',      parallel: 'Limited',      cashValue: 24.99,  pullOdds: '1:96',   probability: 0.104 },
      { id: 'ax-3', player: 'Vinicius Jr.',       team: 'Real Madrid',      league: 'La Liga',         nation: '🇧🇷', rarity: 'rare',      parallel: 'Special',      cashValue: 9.99,   pullOdds: '1:24',   probability: 0.42  },
      { id: 'ax-4', player: 'Robert Lewandowski', team: 'Barcelona',        league: 'La Liga',         nation: '🇵🇱', rarity: 'uncommon',  parallel: 'Shinny',       cashValue: 3.99,   pullOdds: '1:8',    probability: 1.25  },
      { id: 'ax-5', player: 'Base Card',         team: 'Various',          league: 'La Liga',         nation: '🌍',  rarity: 'common',                              cashValue: 0.79,   pullOdds: '4:5',    probability: 8.0   },
    ],
  },
]

// ─── Utility helpers ───────────────────────────────────────────────────────

export function getPackById(id: string): PackDef | undefined {
  return PACK_CATALOG.find(p => p.id === id)
}

export const RARITY_CONFIG = {
  common:    { label: 'Common',    color: '#6b7280', bg: 'bg-gray-800',    border: 'border-gray-700',   glow: 'rgba(107,114,128,0.3)' },
  uncommon:  { label: 'Uncommon', color: '#34d399', bg: 'bg-emerald-950', border: 'border-emerald-800', glow: 'rgba(52,211,153,0.4)'  },
  rare:      { label: 'Rare',     color: '#60a5fa', bg: 'bg-blue-950',    border: 'border-blue-800',    glow: 'rgba(96,165,250,0.4)'  },
  epic:      { label: 'Epic',     color: '#a78bfa', bg: 'bg-purple-950',  border: 'border-purple-800',  glow: 'rgba(167,139,250,0.5)' },
  legendary: { label: 'Legendary',color: '#f5c842', bg: 'bg-yellow-950',  border: 'border-yellow-700',  glow: 'rgba(245,200,66,0.6)'  },
} as const

// Draw 5 cards from a pack based on probability weights
export function drawCards(pack: PackDef, count = 5): CardDef[] {
  const result: CardDef[] = []
  const maxAttempts = count * 20

  for (let i = 0; i < count; i++) {
    // Weighted random selection
    const totalWeight = pack.cards.reduce((sum, c) => sum + c.probability, 0)
    let roll = Math.random() * totalWeight
    let chosen = pack.cards[pack.cards.length - 1]
    for (const card of pack.cards) {
      roll -= card.probability
      if (roll <= 0) { chosen = card; break }
    }
    result.push({ ...chosen, id: chosen.id + '-' + i })
  }

  // Guarantee at least one non-common
  const hasNonCommon = result.some(c => c.rarity !== 'common')
  if (!hasNonCommon && maxAttempts > 0) {
    const nonCommons = pack.cards.filter(c => c.rarity !== 'common')
    if (nonCommons.length > 0) {
      result[0] = { ...nonCommons[Math.floor(Math.random() * nonCommons.length)], id: 'bonus-0' }
    }
  }

  return result
}

import { PrismaClient } from '../app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Packs
  const packs = await Promise.all([
    prisma.pack.create({
      data: {
        name: 'Panini Prizm World Cup 2026',
        series: 'Panini Prizm',
        edition: 'World Cup 2026',
        description: 'The ultimate World Cup collection. Chase Prizm parallels of the world\'s greatest footballers.',
        price: 29.99,
        solPrice: 0.18,
        imageUrl: '/packs/prizm-wc-2026.jpg',
        rarity: 'premium',
        stock: 500,
        isFeatured: true,
        isWorldCup: true,
        xpReward: 150,
      },
    }),
    prisma.pack.create({
      data: {
        name: 'Topps Chrome UCL 2025-26',
        series: 'Topps Chrome',
        edition: 'UEFA Champions League 2025-26',
        description: 'Chrome refractor technology meets Champions League glory. Find Atomic and Superfractor parallels.',
        price: 24.99,
        solPrice: 0.15,
        imageUrl: '/packs/chrome-ucl.jpg',
        rarity: 'premium',
        stock: 300,
        isFeatured: true,
        isWorldCup: false,
        xpReward: 120,
      },
    }),
    prisma.pack.create({
      data: {
        name: 'Panini Mosaic Premier League',
        series: 'Panini Mosaic',
        edition: 'Premier League 2025-26',
        description: 'Stunning mosaic design meets Premier League talent. Includes Silver and Gold Mosaic parallels.',
        price: 19.99,
        solPrice: 0.12,
        imageUrl: '/packs/mosaic-pl.jpg',
        rarity: 'standard',
        stock: 1000,
        isFeatured: false,
        isWorldCup: false,
        xpReward: 75,
      },
    }),
    prisma.pack.create({
      data: {
        name: 'Topps Match Attax World Cup',
        series: 'Topps Match Attax',
        edition: 'World Cup Special Edition',
        description: 'Collector\'s edition Match Attax with World Cup legends and rising stars.',
        price: 9.99,
        solPrice: 0.06,
        imageUrl: '/packs/match-attax-wc.jpg',
        rarity: 'standard',
        stock: 2000,
        isFeatured: false,
        isWorldCup: true,
        xpReward: 40,
      },
    }),
    prisma.pack.create({
      data: {
        name: 'Panini Adrenalyn XL La Liga',
        series: 'Panini Adrenalyn XL',
        edition: 'La Liga 2025-26',
        description: 'The iconic Adrenalyn XL format returns with La Liga\'s finest. Chase Limited and Special cards.',
        price: 14.99,
        solPrice: 0.09,
        imageUrl: '/packs/adrenalyn-laliga.jpg',
        rarity: 'standard',
        stock: 800,
        isFeatured: false,
        isWorldCup: false,
        xpReward: 60,
      },
    }),
    prisma.pack.create({
      data: {
        name: 'Topps Finest Bundesliga',
        series: 'Topps Finest',
        edition: 'Bundesliga 2025-26',
        description: 'Finest chromium technology showcasing Bundesliga talent. Every card a potential gem.',
        price: 34.99,
        solPrice: 0.21,
        imageUrl: '/packs/finest-bundesliga.jpg',
        rarity: 'elite',
        stock: 200,
        isFeatured: true,
        isWorldCup: false,
        xpReward: 200,
      },
    }),
  ])

  // Cards
  const cards = await Promise.all([
    prisma.card.create({
      data: {
        player: 'Kylian Mbappé',
        team: 'Real Madrid',
        league: 'La Liga',
        series: 'Panini Prizm',
        edition: 'World Cup 2026',
        rarity: 'legendary',
        imageUrl: '/cards/mbappe-prizm.jpg',
        year: 2026,
        number: 1,
        totalPrint: 25,
        cashValue: 149.99,
        description: 'Gold Prizm /25 — World Cup Edition',
      },
    }),
    prisma.card.create({
      data: {
        player: 'Erling Haaland',
        team: 'Manchester City',
        league: 'Premier League',
        series: 'Topps Chrome',
        edition: 'UEFA Champions League 2025-26',
        rarity: 'epic',
        imageUrl: '/cards/haaland-chrome.jpg',
        year: 2025,
        number: 42,
        totalPrint: 99,
        cashValue: 59.99,
        description: 'Atomic Refractor /99',
      },
    }),
    prisma.card.create({
      data: {
        player: 'Vinicius Jr.',
        team: 'Real Madrid',
        league: 'La Liga',
        series: 'Panini Prizm',
        edition: 'World Cup 2026',
        rarity: 'epic',
        imageUrl: '/cards/vini-prizm.jpg',
        year: 2026,
        number: 10,
        totalPrint: 149,
        cashValue: 44.99,
        description: 'Silver Prizm /149',
      },
    }),
    prisma.card.create({
      data: {
        player: 'Jude Bellingham',
        team: 'Real Madrid',
        league: 'La Liga',
        series: 'Topps Chrome',
        edition: 'UEFA Champions League 2025-26',
        rarity: 'rare',
        imageUrl: '/cards/bellingham-chrome.jpg',
        year: 2025,
        number: 88,
        totalPrint: 299,
        cashValue: 24.99,
        description: 'Blue Refractor /299',
      },
    }),
    prisma.card.create({
      data: {
        player: 'Phil Foden',
        team: 'Manchester City',
        league: 'Premier League',
        series: 'Panini Mosaic',
        edition: 'Premier League 2025-26',
        rarity: 'rare',
        imageUrl: '/cards/foden-mosaic.jpg',
        year: 2025,
        cashValue: 14.99,
        description: 'Silver Mosaic Parallel',
      },
    }),
    prisma.card.create({
      data: {
        player: 'Bukayo Saka',
        team: 'Arsenal',
        league: 'Premier League',
        series: 'Panini Mosaic',
        edition: 'Premier League 2025-26',
        rarity: 'uncommon',
        imageUrl: '/cards/saka-mosaic.jpg',
        year: 2025,
        cashValue: 7.99,
        description: 'Base Mosaic',
      },
    }),
    prisma.card.create({
      data: {
        player: 'Lamine Yamal',
        team: 'Barcelona',
        league: 'La Liga',
        series: 'Panini Prizm',
        edition: 'World Cup 2026',
        rarity: 'legendary',
        imageUrl: '/cards/yamal-prizm.jpg',
        year: 2026,
        number: 7,
        totalPrint: 10,
        cashValue: 299.99,
        description: 'Gold Prizm /10 — Youngest Star Edition',
      },
    }),
    prisma.card.create({
      data: {
        player: 'Pedri',
        team: 'Barcelona',
        league: 'La Liga',
        series: 'Panini Adrenalyn XL',
        edition: 'La Liga 2025-26',
        rarity: 'rare',
        imageUrl: '/cards/pedri-adrenalyn.jpg',
        year: 2025,
        cashValue: 12.99,
        description: 'Limited Edition Adrenalyn',
      },
    }),
    prisma.card.create({
      data: {
        player: 'Harry Kane',
        team: 'Bayern Munich',
        league: 'Bundesliga',
        series: 'Topps Finest',
        edition: 'Bundesliga 2025-26',
        rarity: 'epic',
        imageUrl: '/cards/kane-finest.jpg',
        year: 2025,
        number: 9,
        totalPrint: 75,
        cashValue: 39.99,
        description: 'Finest Gold Refractor /75',
      },
    }),
    prisma.card.create({
      data: {
        player: 'Common Base',
        team: 'Various',
        league: 'Premier League',
        series: 'Panini Mosaic',
        edition: 'Premier League 2025-26',
        rarity: 'common',
        imageUrl: '/cards/common-base.jpg',
        year: 2025,
        cashValue: 1.99,
        description: 'Base Card',
      },
    }),
  ])

  // PackCards — assign cards to packs with probabilities
  const packCardData = [
    // Prizm World Cup pack
    { packId: packs[0].id, cardId: cards[0].id, probability: 0.01 },   // Mbappé legendary
    { packId: packs[0].id, cardId: cards[2].id, probability: 0.05 },   // Vini epic
    { packId: packs[0].id, cardId: cards[6].id, probability: 0.008 },  // Yamal legendary
    { packId: packs[0].id, cardId: cards[3].id, probability: 0.1 },    // Bellingham rare
    // UCL Chrome pack
    { packId: packs[1].id, cardId: cards[1].id, probability: 0.02 },   // Haaland epic
    { packId: packs[1].id, cardId: cards[3].id, probability: 0.08 },   // Bellingham rare
    { packId: packs[1].id, cardId: cards[9].id, probability: 0.7 },    // Common
    // Mosaic PL pack
    { packId: packs[2].id, cardId: cards[4].id, probability: 0.05 },   // Foden rare
    { packId: packs[2].id, cardId: cards[5].id, probability: 0.15 },   // Saka uncommon
    { packId: packs[2].id, cardId: cards[9].id, probability: 0.65 },   // Common
    // Finest Bundesliga pack
    { packId: packs[5].id, cardId: cards[8].id, probability: 0.15 },   // Kane epic
    { packId: packs[5].id, cardId: cards[9].id, probability: 0.4 },    // Common
    // Adrenalyn La Liga
    { packId: packs[4].id, cardId: cards[7].id, probability: 0.08 },   // Pedri rare
    { packId: packs[4].id, cardId: cards[9].id, probability: 0.6 },    // Common
  ]

  for (const pc of packCardData) {
    await prisma.packCard.create({ data: pc })
  }

  // Rewards
  await Promise.all([
    prisma.reward.create({
      data: {
        name: 'First Pack Free',
        description: 'Open your very first pack on us! Claim a free standard pack.',
        xpRequired: 0,
        type: 'free_pack',
        value: packs[2].id,
        imageUrl: '/rewards/first-pack.jpg',
      },
    }),
    prisma.reward.create({
      data: {
        name: 'Silver Collector',
        description: '5% discount on your next purchase.',
        xpRequired: 500,
        type: 'discount',
        value: '5',
        imageUrl: '/rewards/silver.jpg',
      },
    }),
    prisma.reward.create({
      data: {
        name: 'Gold Collector',
        description: 'Exclusive Gold Mosaic guaranteed in your next pack.',
        xpRequired: 1500,
        type: 'guaranteed_card',
        value: cards[4].id,
        imageUrl: '/rewards/gold.jpg',
      },
    }),
    prisma.reward.create({
      data: {
        name: 'Platinum Legend',
        description: 'Free premium pack — your choice of Topps Chrome or Panini Prizm.',
        xpRequired: 5000,
        type: 'free_premium_pack',
        value: 'choice',
        imageUrl: '/rewards/platinum.jpg',
      },
    }),
    prisma.reward.create({
      data: {
        name: 'Pack Master',
        description: 'Exclusive Pack Master card — never available in packs. 1 of 10.',
        xpRequired: 10000,
        type: 'exclusive_card',
        value: 'pack-master',
        imageUrl: '/rewards/packmaster.jpg',
      },
    }),
  ])

  console.log('Seed complete')
}

main().catch(console.error).finally(() => prisma.$disconnect())

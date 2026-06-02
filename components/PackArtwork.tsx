'use client'

import { motion } from 'framer-motion'

interface PackArtworkProps {
  series: string
  edition: string
  name: string
  rarity: string
  isWorldCup?: boolean
  size?: 'sm' | 'md' | 'lg' | 'full'
  animated?: boolean
}

// Per-series visual config
const seriesConfig: Record<string, {
  bg: string
  accent: string
  accent2: string
  brandColor: string
  pattern: 'prizm' | 'chrome' | 'mosaic' | 'match-attax' | 'adrenalyn' | 'finest' | 'default'
  logoText: string
  topStripe: string
}> = {
  'panini prizm': {
    bg: 'linear-gradient(160deg, #0a0020 0%, #1a0040 40%, #000830 100%)',
    accent: '#7b2fff',
    accent2: '#00e5ff',
    brandColor: '#ffffff',
    pattern: 'prizm',
    logoText: 'PRIZM',
    topStripe: '#7b2fff',
  },
  'topps chrome': {
    bg: 'linear-gradient(160deg, #0d0d0d 0%, #1a1a1a 50%, #0a0a0a 100%)',
    accent: '#c0c0c0',
    accent2: '#60a5fa',
    brandColor: '#ffffff',
    pattern: 'chrome',
    logoText: 'CHROME',
    topStripe: '#1e40af',
  },
  'panini mosaic': {
    bg: 'linear-gradient(160deg, #1a0a00 0%, #2d1200 50%, #0f0600 100%)',
    accent: '#ff6b35',
    accent2: '#f5c842',
    brandColor: '#ffffff',
    pattern: 'mosaic',
    logoText: 'MOSAIC',
    topStripe: '#dc2626',
  },
  'topps match attax': {
    bg: 'linear-gradient(160deg, #001a0a 0%, #003d1a 50%, #001a0a 100%)',
    accent: '#00c853',
    accent2: '#ffe600',
    brandColor: '#ffffff',
    pattern: 'match-attax',
    logoText: 'MATCH ATTAX',
    topStripe: '#00c853',
  },
  'panini adrenalyn xl': {
    bg: 'linear-gradient(160deg, #1a0500 0%, #2d0f00 50%, #1a0500 100%)',
    accent: '#ff4500',
    accent2: '#ff9500',
    brandColor: '#ffffff',
    pattern: 'adrenalyn',
    logoText: 'ADRENALYN XL',
    topStripe: '#ff4500',
  },
  'topps finest': {
    bg: 'linear-gradient(160deg, #0a0800 0%, #1a1400 50%, #0f0b00 100%)',
    accent: '#f5c842',
    accent2: '#ff6b35',
    brandColor: '#f5c842',
    pattern: 'finest',
    logoText: 'FINEST',
    topStripe: '#b8860b',
  },
}

function getConfig(series: string) {
  const key = series.toLowerCase()
  return seriesConfig[key] || {
    bg: 'linear-gradient(160deg, #0f1117 0%, #1a1d26 100%)',
    accent: '#f5c842',
    accent2: '#00c2ff',
    brandColor: '#ffffff',
    pattern: 'default' as const,
    logoText: series.toUpperCase(),
    topStripe: '#f5c842',
  }
}

// Prizm rainbow light streaks
function PrizmPattern({ accent, accent2 }: { accent: string; accent2: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="prizmRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0080" stopOpacity="0.6"/>
          <stop offset="20%" stopColor="#ff8c00" stopOpacity="0.5"/>
          <stop offset="40%" stopColor="#ffe600" stopOpacity="0.5"/>
          <stop offset="60%" stopColor="#00ff80" stopOpacity="0.5"/>
          <stop offset="80%" stopColor={accent2} stopOpacity="0.6"/>
          <stop offset="100%" stopColor={accent} stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="prizmFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="0"/>
          <stop offset="50%" stopColor="black" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
      {/* Rainbow diagonal streaks */}
      {[-40,-20,0,20,40,60,80,100,120,140,160,180].map((x, i) => (
        <line key={i} x1={x} y1={-20} x2={x+120} y2={300} stroke="url(#prizmRainbow)" strokeWidth={i % 3 === 0 ? 8 : 4} strokeOpacity={0.3}/>
      ))}
      {/* Center star burst */}
      <circle cx="100" cy="130" r="60" fill="url(#prizmRainbow)" opacity="0.12"/>
      <circle cx="100" cy="130" r="30" fill="white" opacity="0.06"/>
      <rect x="0" y="0" width="200" height="280" fill="url(#prizmFade)"/>
    </svg>
  )
}

// Chrome refractor pattern
function ChromePattern({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="chromeGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.12"/>
          <stop offset="60%" stopColor={accent} stopOpacity="0.06"/>
          <stop offset="100%" stopColor="black" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="chromeLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="50%" stopColor={accent} stopOpacity="0.5"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      {/* Refractor lines */}
      {Array.from({length: 18}).map((_, i) => (
        <line key={i} x1="0" y1={i*16} x2="200" y2={i*16} stroke={accent} strokeWidth="0.5" strokeOpacity={i % 3 === 0 ? 0.2 : 0.08}/>
      ))}
      {Array.from({length: 12}).map((_, i) => (
        <line key={i} x1={i*18} y1="0" x2={i*18} y2="280" stroke={accent} strokeWidth="0.5" strokeOpacity="0.06"/>
      ))}
      <rect x="0" y="0" width="200" height="280" fill="url(#chromeGlow)"/>
    </svg>
  )
}

// Mosaic tile pattern
function MosaicPattern({ accent, accent2 }: { accent: string; accent2: string }) {
  const tiles = []
  for (let row = 0; row < 14; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * 26
      const y = row * 20
      const hue = (row * 30 + col * 20) % 360
      tiles.push({ x, y, hue, key: `${row}-${col}` })
    }
  }
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mosaicFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="0.2"/>
          <stop offset="40%" stopColor="black" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.85"/>
        </linearGradient>
      </defs>
      {tiles.map(({ x, y, key }) => (
        <rect key={key} x={x+1} y={y+1} width={24} height={18} fill={accent} fillOpacity={0.04 + Math.random() * 0.08} rx="1"/>
      ))}
      {/* Accent tiles */}
      {[{x:26,y:40},{x:104,y:80},{x:52,y:160},{x:130,y:120}].map(({x,y},i) => (
        <rect key={i} x={x+1} y={y+1} width={24} height={18} fill={accent2} fillOpacity={0.15} rx="1"/>
      ))}
      <rect x="0" y="0" width="200" height="280" fill="url(#mosaicFade)"/>
    </svg>
  )
}

// Finest gold premium pattern
function FinestPattern({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="finestGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.2"/>
          <stop offset="100%" stopColor="black" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="finestFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="black" stopOpacity="0.1"/>
          <stop offset="60%" stopColor="black" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.8"/>
        </linearGradient>
      </defs>
      {/* Diamond grid */}
      {Array.from({length: 8}).map((_, i) =>
        Array.from({length: 6}).map((_, j) => (
          <polygon
            key={`${i}-${j}`}
            points={`${j*34+17},${i*34} ${j*34+34},${i*34+17} ${j*34+17},${i*34+34} ${j*34},${i*34+17}`}
            fill="none"
            stroke={accent}
            strokeWidth="0.5"
            strokeOpacity="0.12"
          />
        ))
      )}
      <rect x="0" y="0" width="200" height="280" fill="url(#finestGlow)"/>
      <rect x="0" y="0" width="200" height="280" fill="url(#finestFade)"/>
    </svg>
  )
}

// Default/match attax green pitch pattern
function DefaultPattern({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="defGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.15"/>
          <stop offset="100%" stopColor="black" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="defFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="30%" stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.8"/>
        </linearGradient>
      </defs>
      <circle cx="100" cy="120" r="80" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.15"/>
      <circle cx="100" cy="120" r="50" fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.1"/>
      <line x1="20" y1="120" x2="180" y2="120" stroke={accent} strokeWidth="0.5" strokeOpacity="0.1"/>
      <rect x="0" y="0" width="200" height="280" fill="url(#defGlow)"/>
      <rect x="0" y="0" width="200" height="280" fill="url(#defFade)"/>
    </svg>
  )
}

// Holographic foil overlay for premium/elite
function FoilOverlay({ animated }: { animated?: boolean }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(125deg, transparent 20%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 60%, transparent 80%)',
        animation: animated ? 'foilShift 3s ease-in-out infinite' : undefined,
      }}
    />
  )
}

export default function PackArtwork({
  series, edition, name, rarity, isWorldCup, size = 'md', animated = false,
}: PackArtworkProps) {
  const cfg = getConfig(series)
  const isPremium = rarity === 'premium' || rarity === 'elite'
  const isElite = rarity === 'elite'

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    full: 'text-base',
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: cfg.bg }}
    >
      {/* Series-specific pattern */}
      {cfg.pattern === 'prizm' && <PrizmPattern accent={cfg.accent} accent2={cfg.accent2}/>}
      {cfg.pattern === 'chrome' && <ChromePattern accent={cfg.accent}/>}
      {cfg.pattern === 'mosaic' && <MosaicPattern accent={cfg.accent} accent2={cfg.accent2}/>}
      {cfg.pattern === 'finest' && <FinestPattern accent={cfg.accent}/>}
      {(cfg.pattern === 'match-attax' || cfg.pattern === 'adrenalyn' || cfg.pattern === 'default') && (
        <DefaultPattern accent={cfg.accent}/>
      )}

      {/* Foil overlay for premium */}
      {isPremium && <FoilOverlay animated={animated}/>}

      {/* Top brand stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.topStripe}22, ${cfg.topStripe}44, ${cfg.topStripe}22, transparent)` }}
      >
        <span
          className={`font-black tracking-[0.2em] uppercase ${sizeClasses[size]}`}
          style={{ color: cfg.brandColor, textShadow: `0 0 12px ${cfg.accent}` }}
        >
          {cfg.logoText}
        </span>
      </div>

      {/* Center player silhouette area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 mt-4">
        {/* Football player silhouette as SVG */}
        <svg viewBox="0 0 80 110" className="w-24 h-28 opacity-80" style={{ filter: `drop-shadow(0 0 16px ${cfg.accent})` }}>
          <defs>
            <linearGradient id={`playerGrad-${series}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={cfg.accent} stopOpacity="0.9"/>
              <stop offset="100%" stopColor={cfg.accent2} stopOpacity="0.7"/>
            </linearGradient>
          </defs>
          {/* Head */}
          <ellipse cx="40" cy="10" rx="8" ry="9" fill={`url(#playerGrad-${series})`}/>
          {/* Body */}
          <path d="M28 22 Q40 18 52 22 L56 55 Q40 50 24 55 Z" fill={`url(#playerGrad-${series})`}/>
          {/* Left arm raised */}
          <path d="M28 25 Q18 20 12 15 Q10 12 14 11 Q20 16 28 30Z" fill={`url(#playerGrad-${series})`}/>
          {/* Right arm */}
          <path d="M52 25 Q62 22 68 30 Q66 34 60 31 Q54 28 52 35Z" fill={`url(#playerGrad-${series})`}/>
          {/* Left leg */}
          <path d="M30 54 Q24 70 22 88 Q26 92 32 88 Q36 72 38 56Z" fill={`url(#playerGrad-${series})`}/>
          {/* Right leg kicking */}
          <path d="M50 54 Q54 70 60 84 Q58 90 52 88 Q46 72 42 56Z" fill={`url(#playerGrad-${series})`}/>
          {/* Football */}
          <circle cx="68" cy="90" r="8" fill={`url(#playerGrad-${series})`}/>
          <path d="M64 86 L72 86 M68 82 L68 94 M65 88 L71 88" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
        </svg>

        {/* Series badge */}
        <div
          className="px-3 py-0.5 rounded text-center"
          style={{
            background: `${cfg.accent}22`,
            border: `1px solid ${cfg.accent}55`,
          }}
        >
          <div className={`font-black tracking-wide ${sizeClasses[size]}`} style={{ color: cfg.accent, fontSize: size === 'sm' ? '9px' : '11px' }}>
            {isWorldCup ? '🏆 WORLD CUP' : edition.toUpperCase().split(' ').slice(-2).join(' ')}
          </div>
        </div>
      </div>

      {/* Bottom info band */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 py-2"
        style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}
      >
        <div className={`font-black text-white leading-tight ${sizeClasses[size]}`} style={{ fontSize: size === 'sm' ? '9px' : undefined }}>
          {name}
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-white/40" style={{ fontSize: '9px' }}>5 CARDS PER PACK</span>
          {isElite && <span className="text-[9px] font-bold" style={{ color: cfg.accent }}>ELITE</span>}
        </div>
      </div>

      {/* Shine edge highlights */}
      <div className="absolute inset-y-0 left-0 w-px opacity-30" style={{ background: `linear-gradient(180deg, transparent, ${cfg.accent}, transparent)` }}/>
      <div className="absolute inset-y-0 right-0 w-px opacity-30" style={{ background: `linear-gradient(180deg, transparent, ${cfg.accent}, transparent)` }}/>
      <div className="absolute inset-x-0 top-0 h-px opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)` }}/>

      {/* Animated shimmer sweep on hover */}
      {animated && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}

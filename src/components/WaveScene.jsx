/*
 * WaveScene — the brand's ocean, drawn as SVG stroke lines that echo the
 * wave curl in the Career Maniacs logo. Two moods:
 *   "night" — deep water under the hero, faint gold on the horizon
 *   "dawn"  — the Interview Maniac teaser: the sun coming up on the swell
 * Decorative only: aria-hidden, pointer-events-none, reduced-motion safe.
 */
const WaveScene = ({ variant = 'night', className = '' }) => {
  const dawn = variant === 'dawn'

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
    >
      <style>{`
        @keyframes wave-drift {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-28px) translateY(6px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes wave-draw {
          from { stroke-dashoffset: 2400; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes sun-rise {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .wave-line {
          stroke-dasharray: 2400;
          animation: wave-draw 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards,
                     wave-drift 14s ease-in-out 2.4s infinite;
        }
        .wave-line-slow {
          stroke-dasharray: 2400;
          animation: wave-draw 3.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s backwards,
                     wave-drift 19s ease-in-out 3.5s infinite reverse;
        }
        .sun-disc { animation: sun-rise 2.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s backwards; }
        @media (prefers-reduced-motion: reduce) {
          .wave-line, .wave-line-slow { stroke-dashoffset: 0 !important; animation: none !important; }
          .sun-disc { animation: none !important; }
        }
      `}</style>

      {/* horizon glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: dawn ? '18%' : '8%',
          width: '120vw',
          height: '55vh',
          background: dawn
            ? 'radial-gradient(ellipse at center, oklch(0.72 0.15 70 / 0.28) 0%, transparent 62%)'
            : 'radial-gradient(ellipse at center, oklch(0.62 0.13 245 / 0.14) 0%, transparent 60%)',
        }}
      />

      <svg
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 w-full h-full"
        fill="none"
      >
        <defs>
          <linearGradient id="wave-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.74 0.115 175)" stopOpacity="0" />
            <stop offset="35%" stopColor="oklch(0.74 0.115 175)" />
            <stop offset="75%" stopColor="oklch(0.62 0.13 245)" />
            <stop offset="100%" stopColor="oklch(0.62 0.13 245)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.85 0.145 84)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.85 0.145 84)" />
            <stop offset="100%" stopColor="oklch(0.80 0.155 74)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dawn && (
          <circle
            className="sun-disc"
            cx="720"
            cy="560"
            r="64"
            fill="oklch(0.85 0.145 84)"
            opacity="0.9"
          />
        )}

        {/* the big curl — the logo's wave, drawn large */}
        <path
          className="wave-line"
          d="M180,520 C420,470 620,500 780,470 C990,432 1130,330 1108,258 C1092,206 1010,196 958,238 C914,272 918,338 984,368 C1080,412 1240,398 1380,340"
          stroke="url(#wave-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* inner curl */}
        <path
          className="wave-line-slow"
          d="M560,505 C740,478 880,470 990,430 C1080,398 1112,330 1072,296 C1040,270 990,282 978,318 C966,352 1004,382 1064,382"
          stroke="url(#wave-stroke)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* spray lines running out of the barrel */}
        <path
          className="wave-line-slow"
          d="M60,560 C360,540 700,556 1000,522 C1180,502 1320,480 1440,486"
          stroke="url(#wave-stroke)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.35"
        />
        {dawn ? (
          <path
            className="wave-line"
            d="M300,470 C560,448 900,462 1140,436 C1280,421 1380,410 1440,414"
            stroke="url(#wave-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
        ) : (
          <path
            className="wave-line"
            d="M0,596 C300,580 720,600 1040,572 C1240,555 1380,548 1440,552"
            stroke="url(#wave-gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        )}
      </svg>

      {/* fade the scene into the page background so text zones stay clean */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{ background: 'linear-gradient(to bottom, var(--background), transparent)' }}
      />
    </div>
  )
}

export default WaveScene

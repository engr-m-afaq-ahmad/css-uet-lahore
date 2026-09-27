import { useEffect, useState } from 'react'

const TOTAL_BLOCKS = 24

const BOOT_LINES = [
  'Loading security modules...',
  'Loading authentication layer...',
  'Loading society interface...',
  'Establishing secure connection...',
]

function buildBar(progress) {
  const filled = Math.round((progress / 100) * TOTAL_BLOCKS)
  return '█'.repeat(filled) + '░'.repeat(TOTAL_BLOCKS - filled)
}

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const duration = reduced ? 350 : 1400
    const start = performance.now()
    let frame = 0
    let holdTimer

    document.body.style.overflow = 'hidden'

    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / duration) * 100)
      setProgress(pct)
      if (pct < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        holdTimer = setTimeout(() => setLeaving(true), reduced ? 80 : 460)
      }
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(holdTimer)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!leaving) return undefined
    const timer = setTimeout(() => setDone(true), 460)
    return () => clearTimeout(timer)
  }, [leaving])

  if (done) return null

  const online = progress >= 100
  const visibleLines = BOOT_LINES.filter((_, i) => progress >= (i + 1) * 17)

  return (
    <div
      className={`boot-screen${leaving ? ' is-leaving' : ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Initializing security system"
    >
      <div className="boot-inner">
        <div className="flex items-center justify-between gap-3 border-b border-[rgba(60,232,139,0.28)] pb-3 mb-4">
          <span className="font-bold tracking-[0.2em]">[ CYBER SECURITY SOCIETY ]</span>
          <span className="opacity-60 hidden sm:inline">UET//LAHORE</span>
        </div>

        <div className="mb-1">INITIALIZING SECURITY SYSTEM...</div>

        <div className="whitespace-pre overflow-hidden mb-4">
          <span className="text-[rgba(60,232,139,0.85)]">[{buildBar(progress)}]</span>
          <span className="ml-2">{Math.round(progress)}%</span>
        </div>

        <div className="min-h-[6.5em] sm:min-h-[7em]">
          {visibleLines.map((line) => (
            <div key={line} className="row-in opacity-90">
              <span className="text-[rgba(34,211,238,0.75)]">&gt;</span> {line}
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(60,232,139,0.28)] pt-3 mt-1">
          <div>
            SYSTEM STATUS:{' '}
            <span className={online ? 'text-[#3ce88b] font-bold' : 'text-[#f5c542]'}>
              {online ? 'ONLINE' : 'BOOTING...'}
            </span>
          </div>
          <div className={online ? 'caret' : 'opacity-0'}>
            &gt; ACCESS GRANTED
          </div>
        </div>
      </div>
    </div>
  )
}

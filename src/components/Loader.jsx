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
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const duration = reduced ? 300 : 1300
    const start = performance.now()
    let frame = 0
    let holdTimer
    let triggered = false

    document.body.style.overflow = 'hidden'

    const scheduleLeave = () => {
      if (triggered) return
      triggered = true
      clearTimeout(holdTimer)
      holdTimer = setTimeout(() => setLeaving(true), reduced ? 60 : 420)
    }

    const tick = (now) => {
      const pct = Math.min(100, Math.max(0, ((now - start) / duration) * 100))
      setProgress(pct)
      if (pct >= 100) {
        scheduleLeave()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    // Safety net: never trap the user behind the loader (rAF can be throttled).
    const failsafe = setTimeout(() => {
      cancelAnimationFrame(frame)
      setProgress(100)
      scheduleLeave()
    }, duration + 400)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(holdTimer)
      clearTimeout(failsafe)
    }
  }, [])

  useEffect(() => {
    if (!leaving) return undefined
    const timer = setTimeout(() => {
      document.body.style.overflow = ''
      setDone(true)
    }, 460)
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
        <div className="flex items-center gap-3 border-b border-[rgba(0,255,65,0.28)] pb-3 mb-4">
          <img
            src="/logo-sm.png"
            alt=""
            width="42"
            height="42"
            className="w-10 h-10 object-cover border border-[rgba(0,207,255,0.5)] shrink-0"
          />
          <div className="min-w-0">
            <div className="font-bold tracking-[0.16em] truncate">[ CYBER SECURITY SOCIETY ]</div>
            <div className="opacity-60 text-[10px] tracking-[0.2em]">UET//LAHORE</div>
          </div>
        </div>

        <div className="mb-1">INITIALIZING SECURITY SYSTEM...</div>

        <div className="whitespace-pre overflow-hidden mb-4">
          <span className="text-[rgba(0,255,65,0.85)]">[{buildBar(progress)}]</span>
          <span className="ml-2">{Math.round(progress)}%</span>
        </div>

        <div className="min-h-[6.5em] sm:min-h-[7em]">
          {visibleLines.map((line) => (
            <div key={line} className="row-in opacity-90">
              <span className="text-[rgba(0,207,255,0.9)]">&gt;</span> {line}
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(0,255,65,0.28)] pt-3 mt-1">
          <div>
            SYSTEM STATUS:{' '}
            <span className={online ? 'text-[#00ff41] font-bold' : 'text-[#dfa426]'}>
              {online ? 'ONLINE' : 'BOOTING...'}
            </span>
          </div>
          <div className={online ? 'caret' : 'opacity-0'}>&gt; ACCESS GRANTED</div>
        </div>
      </div>
    </div>
  )
}

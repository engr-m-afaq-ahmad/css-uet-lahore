import { useEffect, useRef, useState } from 'react'
import {
  certificateCount,
  findCertificate,
  formatIssueDate,
} from '../lib/certificates.js'

const STATUS = {
  IDLE: 'idle',
  VERIFYING: 'verifying',
  VERIFIED: 'verified',
  INVALID: 'invalid',
}

const STEPS = [
  'Normalizing input...',
  'Searching certificate database...',
  'Validating certificate ID format...',
  'Querying official registry index...',
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function StatusLine({ status, error }) {
  const map = {
    [STATUS.IDLE]: { label: 'WAITING FOR INPUT', tone: 'text-[#f5c542]', dot: 'is-amber' },
    [STATUS.VERIFYING]: { label: 'VERIFYING...', tone: 'text-[#f5c542]', dot: 'is-amber' },
    [STATUS.VERIFIED]: { label: 'CERTIFICATE VERIFIED', tone: 'text-[#3ce88b]', dot: '' },
    [STATUS.INVALID]: { label: 'RECORD NOT FOUND', tone: 'text-[#ff5f56]', dot: 'is-red' },
  }
  const current = map[status] ?? map[STATUS.IDLE]

  return (
    <div className="mt-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="inline-flex items-center gap-2 text-gray-500">
        <span className={`status-dot ${current.dot}`}></span>
        System status:
      </span>
      <span className={current.tone}>{current.label}</span>
      {error && <span className="text-[#ff5f56] normal-case tracking-normal break-words">{error}</span>}
    </div>
  )
}

function VerifiedBadge() {
  return (
    <div className="terminal-frame is-badge box-draw mx-auto w-[150px] px-4 py-6 text-center">
      <svg viewBox="0 0 48 48" className="w-11 h-11 mx-auto" fill="none" aria-hidden="true">
        <path
          className="check-draw"
          d="M10 25 L20 35 L38 13"
          stroke="#3ce88b"
          strokeWidth="5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <div className="mt-2 font-mono text-[13px] font-bold tracking-[0.24em] text-[#3ce88b] subtle-glitch">
        VERIFIED
      </div>
    </div>
  )
}

function RecordRow({ label, value, highlight = false, delay = 0 }) {
  return (
    <div
      className="row-in grid grid-cols-[84px_1fr] sm:grid-cols-[110px_1fr] gap-x-3 sm:gap-x-5 items-start px-4 sm:px-6 py-3 border-b border-[#14313a]/50 last:border-b-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="label-tech pt-0.5">{label}</span>
      <span
        className={`font-mono text-[12.5px] sm:text-[14px] leading-relaxed break-words ${
          highlight ? 'text-[#3ce88b] font-bold' : 'text-white'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

export default function VerifyCertificatePage() {
  useReveal()

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState(STATUS.IDLE)
  const [logs, setLogs] = useState([])
  const [record, setRecord] = useState(null)
  const [error, setError] = useState('')
  const runRef = useRef(0)
  const inputRef = useRef(null)

  useEffect(() => {
    return () => {
      runRef.current += 1
    }
  }, [])

  async function handleVerify(event) {
    event.preventDefault()
    if (status === STATUS.VERIFYING) return

    const trimmed = query.trim()
    if (!trimmed) {
      setError('> ERROR: enter a certificate number to continue.')
      return
    }

    const runId = ++runRef.current
    setError('')
    setRecord(null)
    setLogs([])
    setStatus(STATUS.VERIFYING)

    const reduced = prefersReducedMotion()
    const stepDelay = reduced ? 40 : 230

    for (const step of STEPS) {
      await sleep(stepDelay)
      if (runRef.current !== runId) return
      setLogs((prev) => [...prev, step])
    }

    const match = findCertificate(trimmed)

    await sleep(reduced ? 60 : 320)
    if (runRef.current !== runId) return

    if (match) {
      setLogs((prev) => [...prev, { text: 'Registry match found. Access granted.', tone: 'ok' }])
      setRecord(match)
      setStatus(STATUS.VERIFIED)
    } else {
      setLogs((prev) => [...prev, { text: 'MATCH NOT FOUND', tone: 'bad' }])
      setStatus(STATUS.INVALID)
    }
  }

  function handleReset() {
    runRef.current += 1
    setStatus(STATUS.IDLE)
    setLogs([])
    setRecord(null)
    setError('')
    setQuery('')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const busy = status === STATUS.VERIFYING
  const showResult = status === STATUS.VERIFIED || status === STATUS.INVALID

  return (
    <div className="pt-16 bg-[#05070a] min-h-screen">
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-3xl mx-auto">

          <div data-reveal className="text-center mb-8 sm:mb-10">
            <span className="text-xs font-mono font-semibold tracking-[0.24em] uppercase text-[#3ce88b]">
              [ CYBER SECURITY SOCIETY ]
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white mt-4 tracking-tight uppercase">
              Certificate<span className="text-[#3ce88b]">_</span>Verification
            </h1>
            <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Verify the authenticity of a Cyber Security Society certificate.
            </p>
            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-1 label-tech">
              <span>Registry records: {certificateCount}</span>
              <span className="hidden sm:inline">Protocol: CSS-VERIFY/1.0</span>
              <span>Access: Public</span>
            </div>
          </div>

          <form onSubmit={handleVerify} data-reveal className="terminal-frame">
            <div className="terminal-bar">
              <span className="truncate">cert_verify.sh // css::uet</span>
              <span className="inline-flex items-center gap-2 shrink-0">
                <span className={`status-dot ${busy ? 'is-amber' : ''}`}></span>
                {busy ? 'Busy' : 'Ready'}
              </span>
            </div>

            <div className="p-4 sm:p-6">
              <label htmlFor="certificate-number" className="label-tech block mb-3">
                Enter certificate number
              </label>

              <input
                id="certificate-number"
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  if (error) setError('')
                }}
                className="term-input"
                placeholder="CSS-2026-XXXX  /  EH-067"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck="false"
                disabled={busy}
                aria-describedby="certificate-hint"
              />

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <button type="submit" className="btn-term w-full sm:w-auto" disabled={busy}>
                  {busy ? (
                    <>Verifying...</>
                  ) : (
                    <>
                      <span className="opacity-60">&gt;</span> Verify Certificate
                    </>
                  )}
                </button>
                <p id="certificate-hint" className="font-mono text-[11px] text-gray-500 break-words">
                  Case-insensitive &middot; whitespace ignored &middot; sample: EH-067
                </p>
              </div>

              <StatusLine status={status} error={error} />
            </div>
          </form>

          {showResult && (
            <div className="mt-6 space-y-6">
              {status === STATUS.VERIFIED ? (
                <>
                  <div className="text-center pt-4">
                    <VerifiedBadge />
                    <div className="mt-4 font-mono text-sm sm:text-base text-[#3ce88b] font-bold uppercase tracking-[0.18em] row-in">
                      ✓ Certificate Verified
                    </div>
                    <p className="mt-2 font-mono text-[11px] sm:text-xs text-gray-500 break-words">
                      Certificate found in the official registry.
                    </p>
                  </div>

                  <div className="terminal-frame reveal-scan">
                    <div className="terminal-bar">
                      <span className="truncate">certificate_record.log</span>
                      <span className="shrink-0 text-[#3ce88b]">Status: Authentic</span>
                    </div>
                    <div className="py-1">
                      <RecordRow label="ID" value={record?.certificateNumber ?? '—'} delay={0} />
                      <RecordRow label="Name" value={record?.name ?? '—'} delay={70} />
                      <RecordRow label="Type" value={record?.certificateType ?? '—'} delay={140} />
                      <RecordRow label="Event" value={record?.event ?? '—'} delay={210} />
                      <RecordRow label="Issued" value={formatIssueDate(record?.issueDate)} delay={280} />
                      <RecordRow label="Status" value="✓ VERIFIED" highlight delay={350} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="terminal-frame is-error reveal-scan">
                  <div className="terminal-bar is-error">
                    <span className="truncate">verification_failed.log</span>
                    <span className="shrink-0">Error</span>
                  </div>
                  <div className="p-5 sm:p-7 text-center">
                    <div className="mx-auto w-16 h-16 border border-[#ff5f56]/70 bg-[#ff5f56]/10 flex items-center justify-center font-mono text-2xl text-[#ff5f56] box-draw">
                      ✕
                    </div>
                    <div className="mt-4 font-mono text-sm sm:text-base font-bold uppercase tracking-[0.16em] text-[#ff5f56] subtle-glitch">
                      Certificate Not Verified
                    </div>
                    <div className="mt-4 mx-auto max-w-md font-mono text-[11.5px] sm:text-xs leading-relaxed text-gray-500 space-y-1 text-left">
                      <p className="text-[#ff5f56]/80">&gt; MATCH NOT FOUND</p>
                      <p>
                        The certificate number entered could not be found in the Cyber Security Society
                        certificate registry.
                      </p>
                      <p>Please check the certificate number and try again.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <button type="button" onClick={handleReset} className="btn-ghost">
                  Verify Another Certificate
                </button>
              </div>
            </div>
          )}

          {status === STATUS.VERIFYING && (
            <div className="terminal-frame mt-6">
              <div className="terminal-bar">
                <span className="truncate">verify_stream.log</span>
                <span className="shrink-0 text-[#f5c542]">Running</span>
              </div>
              <div className="p-4 sm:p-5 font-mono text-[11.5px] sm:text-[13px] leading-relaxed text-gray-400 min-h-[120px]">
                <div className="text-[#3ce88b]">&gt; VERIFYING CERTIFICATE...</div>
                <div className="mt-2 space-y-1">
                  {logs.map((line) => (
                    <div key={line} className="row-in break-words">
                      <span className="text-[#22d3ee]">&gt;</span>{' '}
                      <span>{typeof line === 'string' ? line : line.text}</span>
                    </div>
                  ))}
                </div>
                <div className="caret text-[#3ce88b] mt-1">&gt; </div>
              </div>
            </div>
          )}

          {status === STATUS.IDLE && (
            <div className="terminal-frame mt-6">
              <div className="terminal-bar">
                <span className="truncate">session.log</span>
                <span className="shrink-0">Idle</span>
              </div>
              <div className="p-4 sm:p-5 font-mono text-[11.5px] sm:text-[13px] leading-relaxed text-gray-500">
                <div>
                  <span className="text-[#3ce88b]">&gt;</span> Cyber Security Society verification
                  terminal ready.
                </div>
                <div>
                  <span className="text-[#3ce88b]">&gt;</span> Awaiting certificate number input
                  <span className="caret"></span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center font-mono text-[10px] sm:text-[11px] text-gray-600 leading-relaxed max-w-lg mx-auto break-words">
            Verification checks the certificate number against the Cyber Security Society registry
            file. It confirms the record exists &mdash; it does not certify cryptographic signatures.
          </div>
        </div>
      </section>
    </div>
  )
}

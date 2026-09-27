import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/journey', label: 'Journey' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
]

function VerifyButton({ className = '' }) {
  return (
    <Link
      to="/verify-certificate"
      className={`group inline-flex items-center justify-center gap-1.5 border border-[#3ce88b]/50 bg-[#3ce88b]/10 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#3ce88b] transition-colors hover:bg-[#3ce88b] hover:text-[#04120b] ${className}`}
    >
      <span className="opacity-60 group-hover:opacity-100">&gt;</span>
      <span className="whitespace-nowrap">Verify Certificate</span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [lastPath, setLastPath] = useState(pathname)

  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#05070a]/95 backdrop-blur-sm border-b border-[#14313a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-16 min-w-0">
        <Link to="/" className="flex items-center gap-2.5 min-w-0 shrink-0">
          <span className="w-8 h-8 bg-[#3ce88b] flex items-center justify-center border border-[#3ce88b] shadow-[0_0_16px_rgba(60,232,139,0.35)]">
            <i className="fas fa-shield-halved text-[#04120b] text-sm"></i>
          </span>
          <span className="flex flex-col leading-none min-w-0">
            <span className="font-mono text-[15px] font-bold text-white tracking-[0.08em] glitch-hover">
              CSS<span className="text-[#3ce88b]">::</span>UET
            </span>
            <span className="hidden sm:block text-[9px] font-mono uppercase tracking-[0.2em] text-[#1f9e60] mt-1 truncate">
              Cyber Security Society
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5 min-w-0">
          {links.map((l) => {
            const active = pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-2.5 lg:px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] whitespace-nowrap transition-colors ${
                  active
                    ? 'text-[#3ce88b] bg-[#3ce88b]/10 border-b border-[#3ce88b]'
                    : 'text-gray-400 border-b border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {active && <span className="text-[#3ce88b] mr-1">&gt;</span>}
                {l.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <span className="hidden lg:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
            <span className="status-dot"></span>
            Secure
          </span>
          <VerifyButton className="px-2.5 lg:px-4 py-2" />
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden text-gray-300 text-xl p-2 -mr-2"
        >
          <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      <span className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#3ce88b]/35 to-transparent pointer-events-none"></span>

      {open && (
        <div className="md:hidden bg-[#05070a] border-t border-[#14313a] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 label-tech border-b border-[#14313a]/70">Navigation Menu</div>
          {links.map((l) => {
            const active = pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-5 py-3 font-mono text-[12px] uppercase tracking-[0.16em] transition-colors border-b border-[#14313a]/40 ${
                  active ? 'text-[#3ce88b] bg-[#3ce88b]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {active ? '> ' : '  '}
                {l.label}
              </Link>
            )
          })}
          <div className="p-4">
            <VerifyButton className="w-full px-4 py-3 text-[11px]" />
          </div>
        </div>
      )}
    </nav>
  )
}

import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroScene from '../components/HeroScene.jsx'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target) }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const slides = [
  {
    icon: 'fa-trophy',
    title: 'National Champions 2025',
    desc: 'Won Best Cyber Society at the national cybersecurity summit, competing against 30+ universities across Pakistan.',
  },
  {
    icon: 'fa-calendar-check',
    title: 'CTF Arena 2026 — Aug 15-16',
    desc: 'Our flagship event returns with web exploitation, cryptography, reverse engineering, and forensics challenges.',
  },
  {
    icon: 'fa-chalkboard-user',
    title: 'Weekly Hands-on Labs',
    desc: 'Every Saturday: practical sessions on penetration testing, malware analysis, and secure coding.',
  },
  {
    icon: 'fa-handshake',
    title: 'Industry Partners',
    desc: 'Collaborating with leading infosec firms including Offensive Security, Cisco, and local SIEM providers.',
  },
]

function InfoSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative max-w-3xl mx-auto terminal-frame">
      <div className="terminal-bar">
        <span className="truncate">sys_feed.log // css::uet</span>
        <span className="shrink-0">
          {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="min-w-full flex items-start gap-4 sm:gap-5 p-5 sm:p-7">
              <div className="w-11 h-11 sm:w-14 sm:h-14 border border-[#00ff41]/35 bg-[#00ff41]/10 flex items-center justify-center flex-shrink-0">
                <i className={`fas ${s.icon} text-lg sm:text-xl text-[#00ff41]`}></i>
              </div>
              <div className="min-w-0">
                <div className="label-tech mb-1.5">feed_{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-white font-space font-bold text-base sm:text-xl break-words">{s.title}</h3>
                <p className="text-gray-400 text-sm sm:text-[15px] mt-2 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 py-4 border-t border-[#0a3a55]">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show update ${i + 1}`}
            className={`h-2.5 transition-all ${
              i === active ? 'bg-[#00ff41] w-6' : 'bg-[#0a3a55] hover:bg-[#00ff41]/40 w-2.5'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const heroRef = useRef(null)
  useReveal()

  return (
    <>
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#001a33] pt-28 sm:pt-32 pb-16">
        <HeroScene containerRef={heroRef} />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div data-reveal className="mt-6 mb-9">
            <img
              src="/logo.png"
              alt="Cyber Security Society — UET Lahore emblem"
              width="112"
              height="112"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto object-cover border border-[#00cfff]/45 shadow-[0_0_45px_rgba(0,207,255,0.35)]"
            />
          </div>

          <div data-reveal>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 mb-6 font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-[#00ff41] border border-[#00ff41]/40 bg-[#00ff41]/5">
              <span className="status-dot"></span>
              <span className="hidden sm:inline">University of Engineering &amp; Technology, Lahore</span>
              <span className="sm:hidden">UET Lahore</span>
            </span>
          </div>

          <h1 data-reveal className="font-space text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
            <span className="text-white">Securing </span>
            <span className="text-[#00ff41] glitch-hover">Tomorrow,</span>
            <br />
            <span className="text-white">Today.</span>
          </h1>

          <p data-reveal className="mt-6 text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Empowering the next generation of cybersecurity professionals through hands-on workshops, CTF competitions, and industry collaboration.
          </p>

          <div data-reveal className="mt-7 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-500 flex flex-wrap justify-center gap-x-5 gap-y-1">
            <span>node: uet-lhr</span>
            <span className="text-[#00cfff]">system_status: online</span>
            <span className="text-[#00cfff]">network: secure</span>
          </div>

          <div data-reveal className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-term">
              <span className="opacity-60">&gt;</span> Join Society
            </Link>
            <Link to="/events" className="btn-ghost">
              Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-[#001a33] border-t border-b border-[#0a3a55]">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 sm:gap-20 flex-wrap">
          {[
            { num: '50+', label: 'Active Members' },
            { num: '10+', label: 'Workshops' },
            { num: '6', label: 'CTF Events' },
            { num: '3+', label: 'Partners' },
          ].map((s, i) => (
            <div key={s.label} data-reveal className="text-center min-w-[64px]" style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#00ff41]">{s.num}</div>
              <div className="font-mono text-[9px] sm:text-[10px] text-gray-500 mt-1.5 uppercase tracking-[0.18em]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-[#001a33]">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-center mb-14">
            <span className="label-tech">// live feed</span>
            <h2 className="text-3xl sm:text-4xl font-space font-bold text-white mt-3">
              Highlights &amp; <span className="text-[#00ff41]">Updates</span>
            </h2>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">
              Stay in the loop with our latest achievements, upcoming events, and weekly activities.
            </p>
          </div>

          <InfoSlider />
        </div>
      </section>

      <section className="py-20 px-4 bg-[#001a33] border-t border-[#0a3a55]">
        <div className="max-w-7xl mx-auto text-center">
          <div data-reveal>
            <span className="label-tech">// why us</span>
            <h2 className="text-3xl sm:text-4xl font-space font-bold text-white mt-3">
              Why Join <span className="text-[#00ff41]">CSS UET</span>?
            </h2>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">
              What you gain as part of the Cyber Security Society at UET Lahore.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {[
              { icon: 'fa-flag', title: 'Hands-on CTFs', desc: 'Compete in inter-university Capture The Flag challenges and sharpen your offensive & defensive skills.' },
              { icon: faUsers, title: 'Workshops & Talks', desc: 'Learn from industry experts through monthly workshops on ethical hacking, cryptography, and network security.' },
              { icon: 'fa-handshake', title: 'Career Growth', desc: 'Connect with top infosec firms, gain internship opportunities, and build your professional network.' },
            ].map((f, i) => (
              <div key={f.title} data-reveal className="terminal-frame p-6 sm:p-8 text-left hover:border-[#00ff41]/45 transition-colors" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 border border-[#00ff41]/35 bg-[#00ff41]/10 flex items-center justify-center">
                    <i className={`fas ${f.icon} text-lg text-[#00ff41]`}></i>
                  </div>
                  <span className="label-tech">mod_{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-white font-space font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const faUsers = 'fa-users'

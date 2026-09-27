import { useEffect } from 'react'

const events = [
  {
    id: 1, title: 'CTF Arena 2026', date: 'August 15–16, 2026',
    desc: 'Annual inter-university Capture The Flag competition. Categories: web exploitation, cryptography, reverse engineering, forensics.',
    isUpcoming: true, link: '#', icon: 'fa-flag',
  },
  {
    id: 2, title: 'Ethical Hacking Workshop', date: 'July 10, 2026',
    desc: 'Hands-on workshop on penetration testing, vulnerability assessment, and responsible disclosure.', isUpcoming: true, link: '#', icon: 'fa-terminal',
  },
  {
    id: 3, title: 'Cyber Career Summit', date: 'May 5, 2026',
    desc: 'Panel discussion with industry experts on careers in cybersecurity, certifications, and internships.', isUpcoming: false, link: '#', icon: 'fa-briefcase',
  },
  {
    id: 4, title: 'SecureCode Hackathon', date: 'March 20–21, 2026',
    desc: '24-hour hackathon focused on building secure applications and identifying vulnerabilities.', isUpcoming: false, link: '#', icon: 'fa-code',
  },
  {
    id: 5, title: 'Guest Lecture: Zero Day Threats', date: 'January 18, 2026',
    desc: 'Industry expert shared insights on zero-day vulnerability discovery and responsible disclosure.', isUpcoming: false, link: '#', icon: 'fa-bug',
  },
  {
    id: 6, title: 'Cybersecurity Awareness Week', date: 'October 7–13, 2025',
    desc: 'A week-long campaign with seminars, quizzes, and activities promoting cyber hygiene on campus.', isUpcoming: false, link: '#', icon: 'fa-bullhorn',
  },
]

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

export default function EventsPage() {
  useReveal()

  return (
    <div className="pt-16 bg-[#05070a] min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-center mb-16">
            <span className="label-tech">// events log</span>
            <h1 className="text-4xl sm:text-5xl font-space font-bold text-white mt-3">
              Upcoming &amp; <span className="text-[#3ce88b]">Past Events</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Stay updated with our workshops, CTFs, seminars, and community events.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <div
                key={event.id}
                data-reveal
                className={`p-6 bg-[#0a1116] border flex flex-col ${
                  event.isUpcoming ? 'border-[#3ce88b]/40 hover:border-[#3ce88b]' : 'border-[#14313a] hover:border-gray-500'
                } transition-colors`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 border flex items-center justify-center ${
                    event.isUpcoming ? 'bg-[#3ce88b]/10 border-[#3ce88b]/30' : 'bg-gray-500/10 border-gray-600/30'
                  }`}>
                    <i className={`fas ${event.icon} text-lg ${event.isUpcoming ? 'text-[#3ce88b]' : 'text-gray-500'}`}></i>
                  </div>
                  {event.isUpcoming && (
                    <span className="px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#3ce88b] bg-[#3ce88b]/10 border border-[#3ce88b]/40">
                      ● Upcoming
                    </span>
                  )}
                </div>

                <h3 className="text-white font-space font-bold text-lg mb-1 break-words">{event.title}</h3>
                <div className="flex items-center gap-2 font-mono text-[11px] text-gray-500 mb-3">
                  <i className="fas fa-calendar-alt text-[#1f9e60]"></i>
                  <span>{event.date}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{event.desc}</p>

                <div className="pt-3 border-t border-[#14313a]">
                  <button
                    disabled={!event.isUpcoming}
                    className={`w-full px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-all ${
                      event.isUpcoming
                        ? 'bg-[#3ce88b] text-[#04120b] hover:bg-[#63f2a4] cursor-pointer'
                        : 'bg-[#14313a]/60 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {event.isUpcoming ? '> Register Now' : '// Past Event'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

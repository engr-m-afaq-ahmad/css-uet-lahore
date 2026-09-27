import { useEffect } from 'react'

const timeline = [
  { year: '2021', title: 'Foundation', desc: 'Cyber Security Society established at UET Lahore with 15 founding members.' },
  { year: '2022', title: 'First CTF', desc: 'Organized the first inter-university Capture The Flag competition with 200+ participants.' },
  { year: '2023', title: 'Workshop Series', desc: 'Launched monthly workshops on ethical hacking, cryptography, and network security.' },
  { year: '2024', title: 'National Recognition', desc: 'Won Best Cyber Society award at national cybersecurity summit.' },
  { year: '2025', title: 'Industry Partnerships', desc: 'Collaborated with leading infosec firms for internship and training programs.' },
]

const coreValues = [
  { icon: 'fa-shield-halved', title: 'Integrity', desc: 'Upholding the highest ethical standards in cybersecurity practices and research.' },
  { icon: 'fa-eye', title: 'Vigilance', desc: 'Staying ahead of emerging threats through continuous learning and awareness.' },
  { icon: 'fa-lightbulb', title: 'Innovation', desc: 'Fostering creative solutions to complex security challenges.' },
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

export default function JourneyPage() {
  useReveal()

  return (
    <div className="pt-16 bg-[#05070a] min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-center mb-16">
            <span className="label-tech">// our story</span>
            <h1 className="text-4xl sm:text-5xl font-space font-bold text-white mt-3">
              Our <span className="text-[#3ce88b]">Journey</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              From foundation to national recognition — tracing the milestones of CSS UET Lahore.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((e, i) => (
              <div key={e.year} data-reveal className="relative flex items-start gap-5 pb-12 pl-8 border-l-2 border-dashed border-[#3ce88b]/30 last:pb-0" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="absolute left-[-9px] w-4 h-4 rounded-full bg-[#3ce88b] border-4 border-[#05070a]"></div>
                <div className="pt-0.5 min-w-0">
                  <span className="text-[#3ce88b] font-bold font-mono text-lg tracking-[0.08em]">// {e.year}</span>
                  <h4 className="text-white font-semibold mt-0.5 text-lg">{e.title}</h4>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-20">
            <h3 className="text-center text-2xl font-space font-bold text-white mb-3">
              Our <span className="text-[#3ce88b]">Values</span>
            </h3>
            <p className="text-center text-gray-500 text-sm mb-10 max-w-lg mx-auto">
              The principles that guide everything we do.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {coreValues.map((v, i) => (
                <div key={v.title} data-reveal className="p-8 bg-[#0a1116] border border-[#14313a] text-center hover:border-[#3ce88b]/30 transition-colors" style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="w-14 h-14 mx-auto mb-4 bg-[#3ce88b]/10 border border-[#3ce88b]/30 flex items-center justify-center">
                    <i className={`fas ${v.icon} text-xl text-[#3ce88b]`}></i>
                  </div>
                  <h4 className="text-white font-space font-bold text-lg mb-2">{v.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

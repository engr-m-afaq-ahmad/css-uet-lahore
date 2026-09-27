import { useEffect, useRef } from 'react'

const boardOfGovernors = [
  { year: '2022', name: 'Muhammad Adeel Shafique' },
  { year: '2022', name: 'Shahzaib Mazhar Janjua' },
  { year: '2024', name: 'Shifa Qaiser' },
  { year: '2024', name: 'Muhammad Abdullah Sanghera' },
  { year: '2024', name: 'Savera Zainab' },
  { year: '2024', name: 'Emaan Fatima' },
]

const coreBody = [
  { name: 'Abdul Ahad', role: 'President', bio: 'Steering the society with strategic leadership and operational oversight.' },
  { name: 'SyedaTehreem Fatima', role: 'Vice President', bio: 'Managing internal coordination and supporting executive decisions.' },
  { name: 'Muhammad Afaq Ahmad', role: 'Chief Coordinator', bio: 'Orchestrating cross-team collaboration and society-wide initiatives.' },
  { name: 'Zain-ul-Abidin', role: 'Director General', bio: 'Overseeing strategic planning and organizational development.' },
  { name: 'Raheel Mujahid', role: 'General Secretary', bio: 'Managing administrative operations and official communications.' },
  { name: 'Misma Shahzad', role: 'Vice General Secretary', bio: 'Assisting secretarial functions and maintaining institutional records.' },
  { name: 'Adil Mehmood', role: 'Treasurer', bio: 'Handling financial planning, budgeting, and resource allocation.' },
]

const techTeam = [
  { name: 'Hafiz Muhammad Abdullah', role: 'Technical Lead', bio: 'Driving technical projects and mentoring members in cybersecurity skills.' },
  { name: 'Faizan Amjad', role: 'Technical Lead', bio: 'Leading technical workshops and guiding hands-on security training.' },
  { name: 'Hamza Manzhar', role: 'IOT Lead', bio: 'Spearheading IoT security research and embedded systems workshops.' },
  { name: 'Maheen Zaheer', role: 'Design Lead', bio: 'Crafting visual identity, UI/UX assets, and creative brand materials.' },
  { name: 'Khizra Rafique', role: 'Programming Lead', bio: 'Designing coding challenges and overseeing programming curricula.' },
  { name: 'Noor un Nahar', role: 'Programming Lead', bio: 'Developing programming workshops and technical learning resources.' },
  { name: 'Taha Khalid', role: 'Web Development Lead', bio: 'Architecting and maintaining the society digital presence and web platforms.' },
  { name: 'Abdullah Haider', role: 'Ethical Defence', bio: 'Leading defensive cybersecurity strategies and blue-team operations.' },
  { name: 'Umair Majeed', role: 'Ethical Offence Lead', bio: 'Directing offensive security testing and red-team exercises.' },
]

const nonTechTeam = [
  { name: 'Hamza Tariq', role: 'Finance & Logistics', bio: 'Handling budgeting, sponsorships, and operational logistics for all society events.' },
  { name: 'Haleema Ahsan', role: 'Community Outreach Head', bio: 'Building community partnerships and driving outreach programs.' },
  { name: 'Zoya Rabail', role: 'Management Head', bio: 'Streamlining internal operations and team management workflows.' },
  { name: 'Zumar Sayyam', role: 'PR Head', bio: 'Managing public relations, media engagement, and society branding.' },
  { name: 'Dur e Mknoon, Haider Arshad', role: 'Media Lead', bio: 'Producing multimedia content and managing social media channels.' },
  { name: 'Xainab Safwan', role: 'Sponsorship', bio: 'Securing sponsorships and fostering industry partnerships.' },
  { name: 'Ureeda Munawar', role: 'Documentation', bio: 'Maintaining technical documentation and knowledge base records.' },
  { name: 'Zainab Haider', role: 'Hosting Lead', bio: 'Managing event hosting, session coordination, and speaker arrangements.' },
  { name: 'Abdullah Khalid', role: 'Documentation', bio: 'Recording meeting minutes and archiving society resources.' },
  { name: 'Ahmad Raza', role: 'Management Lead', bio: 'Coordinating management tasks and operational workflows.' },
  { name: 'Muhammad Ahmad Bajwa', role: 'PR Lead', bio: 'Leading promotional campaigns and enhancing society visibility.' },
  { name: 'Hamza Shahid', role: 'Marketing', bio: 'Driving marketing strategies and audience engagement initiatives.' },
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

function TiltCard({ children }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="transition-transform duration-200 ease-out">{children}</div>
}

function TeamGrid({ members }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((m) => (
        <TiltCard key={m.name}>
          <div className="p-6 bg-[#0a1116] border border-[#14313a] hover:border-[#3ce88b]/30 transition-colors h-full">
            <div className="w-14 h-14 bg-[#3ce88b]/10 border border-[#3ce88b]/30 flex items-center justify-center mb-4">
              <i className="fas fa-user-shield text-xl text-[#3ce88b]"></i>
            </div>
            <h4 className="text-white font-space font-bold text-lg">{m.name}</h4>
            <span className="inline-block mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3ce88b] bg-[#3ce88b]/10 border border-[#3ce88b]/30 px-2 py-1">[ {m.role} ]</span>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{m.bio}</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-500 hover:text-[#3ce88b] transition-colors"><i className="fab fa-linkedin text-lg"></i></a>
              <a href="#" className="text-gray-500 hover:text-[#3ce88b] transition-colors"><i className="fab fa-github text-lg"></i></a>
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  )
}

export default function AboutPage() {
  useReveal()

  return (
    <div className="pt-16 bg-[#05070a] min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-center mb-16">
            <span className="label-tech">// about us</span>
            <h1 className="text-4xl sm:text-5xl font-space font-bold text-white mt-3">
              Our <span className="text-[#3ce88b]">Mission</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Cultivating a community of ethical hackers and cybersecurity enthusiasts at UET Lahore.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {[
              { icon: 'fa-bullseye', title: 'Our Mission', desc: 'To cultivate a community of ethical hackers and cybersecurity enthusiasts at UET Lahore, equipped with cutting-edge knowledge, practical skills, and a strong sense of digital responsibility.' },
              { icon: 'fa-binoculars', title: 'Our Vision', desc: 'A digitally resilient Pakistan where every student is empowered with cybersecurity awareness and skills to protect our digital future.' },
            ].map((item, i) => (
              <div key={item.title} data-reveal className="p-8 bg-[#0a1116] border border-[#14313a] hover:border-[#3ce88b]/30 transition-colors" style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="w-12 h-12 bg-[#3ce88b]/10 border border-[#3ce88b]/30 flex items-center justify-center mb-5">
                  <i className={`fas ${item.icon} text-lg text-[#3ce88b]`}></i>
                </div>
                <h3 className="text-white font-space font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div data-reveal className="mb-16">
            <h3 className="text-center text-2xl font-space font-bold text-white mb-3">
              Board of <span className="text-[#3ce88b]">Governors</span>
            </h3>
            <p className="text-center text-gray-500 text-sm mb-10 max-w-lg mx-auto">
              Our esteemed advisory board guiding the society.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse max-w-lg mx-auto">
                <thead>
                  <tr className="border-b-2 border-[#3ce88b]/40">
                    <th className="py-3 px-4 text-[#3ce88b] font-mono font-bold text-xs uppercase tracking-[0.18em]">Year</th>
                    <th className="py-3 px-4 text-[#3ce88b] font-mono font-bold text-xs uppercase tracking-[0.18em]">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {boardOfGovernors.map((g, i) => (
                    <tr key={i} className="border-b border-[#14313a]/50 hover:bg-[#0d161c] transition-colors">
                      <td className="py-3 px-4 font-mono text-[#3ce88b]">{g.year}</td>
                      <td className="py-3 px-4 text-white font-medium">{g.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div data-reveal className="mb-16">
            <h3 className="text-center text-2xl font-space font-bold text-white mb-3">
              <span className="text-[#3ce88b]">Core Body</span>
            </h3>
            <p className="text-center text-gray-500 text-sm mb-10 max-w-lg mx-auto">
              The leadership team driving the society's vision and strategic direction.
            </p>
            <TeamGrid members={coreBody} />
          </div>

          <div data-reveal className="mb-16">
            <h3 className="text-center text-2xl font-space font-bold text-white mb-3">
              Executive Body — <span className="text-[#3ce88b]">Tech Teams</span>
            </h3>
            <p className="text-center text-gray-500 text-sm mb-10 max-w-lg mx-auto">
              The technical backbone — CTFs, labs, workshops, and security research.
            </p>
            <TeamGrid members={techTeam} />
          </div>

          <div data-reveal>
            <h3 className="text-center text-2xl font-space font-bold text-white mb-3">
              Executive Body — <span className="text-[#3ce88b]">Non-Tech Teams</span>
            </h3>
            <p className="text-center text-gray-500 text-sm mb-10 max-w-lg mx-auto">
              Outreach, events, content, finance — the engine behind our community.
            </p>
            <TeamGrid members={nonTechTeam} />
          </div>

        </div>
      </section>
    </div>
  )
}

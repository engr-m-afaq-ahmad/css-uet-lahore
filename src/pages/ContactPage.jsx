import { useEffect } from 'react'

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

export default function ContactPage() {
  useReveal()

  return (
    <div className="pt-16 bg-[#05070a] min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-center mb-16">
            <span className="label-tech">// open channel</span>
            <h1 className="text-4xl sm:text-5xl font-space font-bold text-white mt-3">
              Get In <span className="text-[#3ce88b]">Touch</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Have a question, want to collaborate, or interested in joining? Reach out to us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div data-reveal>
              <form className="terminal-frame p-5 sm:p-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="label-tech">transmit_message.sh</div>
                <div>
                  <label htmlFor="contact-name" className="label-tech block mb-2">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    className="term-input normal-case tracking-normal text-white"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="label-tech block mb-2">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    className="term-input normal-case tracking-normal text-white"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="label-tech block mb-2">Message</label>
                  <textarea
                    id="contact-message"
                    rows="5"
                    placeholder="Write your message here..."
                    className="term-input normal-case tracking-normal text-white resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn-term w-full sm:w-auto"
                >
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            </div>

            <div data-reveal className="space-y-6">
              <div className="terminal-frame p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-[#3ce88b]/10 border border-[#3ce88b]/30 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-lg text-[#3ce88b]"></i>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Email Us</p>
                    <a href="mailto:css@uet.edu.pk" className="text-gray-400 hover:text-[#3ce88b] transition-colors">css@uet.edu.pk</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#3ce88b]/10 border border-[#3ce88b]/30 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-location-dot text-lg text-[#3ce88b]"></i>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Visit Us</p>
                    <p className="text-gray-400">UET Lahore, GT Road, Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="terminal-frame p-6">
                <p className="label-tech mb-4">Follow us</p>
                <div className="flex gap-3">
                  {[
                    { icon: 'fa-discord', href: '#' },
                    { icon: 'fa-linkedin', href: '#' },
                    { icon: 'fa-twitter', href: '#' },
                    { icon: 'fa-github', href: '#' },
                    { icon: 'fa-instagram', href: '#' },
                  ].map((s) => (
                    <a
                      key={s.icon}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-[#05070a] border border-[#14313a] flex items-center justify-center text-gray-500 hover:text-[#3ce88b] hover:border-[#3ce88b]/40 transition-colors"
                    >
                      <i className={`fab ${s.icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>

              <div className="terminal-frame p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 bg-[#3ce88b] flex items-center justify-center">
                    <i className="fas fa-shield-halved text-[#04120b] text-xs"></i>
                  </span>
                  <span className="text-white font-mono font-bold text-lg tracking-[0.06em]">CSS::UET</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  "Securing Tomorrow, Today." &mdash; Join us in building a safer digital world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

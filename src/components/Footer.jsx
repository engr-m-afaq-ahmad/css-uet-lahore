export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#0a3a55] bg-[#001a33]">
      <div className="border-b border-[#0a3a55]/60 bg-[#00101f]/70">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 status-strip">
          <span className="inline-flex items-center gap-2">
            <span className="status-dot"></span>
            System_status: Online
          </span>
          <span>Security_level: Active</span>
          <span>Network: Secure</span>
          <span className="hidden sm:inline">Access: Granted</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-10 px-4">
        <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-gray-500">
          <img
            src="/logo-sm.png"
            alt="Cyber Security Society emblem"
            width="34"
            height="34"
            className="w-[34px] h-[34px] object-cover border border-[#00cfff]/45"
          />
          <span className="uppercase tracking-[0.14em]">
            &copy; 2026 Cyber Security Society &mdash; UET Lahore
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] sm:text-xs text-gray-600 font-mono uppercase tracking-[0.18em]">
          <span className="hover:text-[#00ff41] cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-[#00ff41] cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-[#00ff41] cursor-pointer transition-colors">Code of Conduct</span>
        </div>
      </div>
    </footer>
  )
}

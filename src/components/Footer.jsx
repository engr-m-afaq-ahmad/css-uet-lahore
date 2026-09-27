export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#14313a] bg-[#05070a]">
      <div className="border-b border-[#14313a]/60 bg-[#0a1116]/70">
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
        <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-gray-500">
          <i className="fas fa-shield-halved text-[#3ce88b] text-xs"></i>
          <span className="uppercase tracking-[0.14em]">
            &copy; 2026 Cyber Security Society &mdash; UET Lahore
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] sm:text-xs text-gray-600 font-mono uppercase tracking-[0.18em]">
          <span className="hover:text-[#3ce88b] cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-[#3ce88b] cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-[#3ce88b] cursor-pointer transition-colors">Code of Conduct</span>
        </div>
      </div>
    </footer>
  )
}

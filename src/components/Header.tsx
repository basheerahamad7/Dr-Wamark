import { ShieldCheck, Zap } from "lucide-react";

export function Header() {
  return (
    <header id="app-header" className="w-full bg-slate-900 text-white py-12 px-6 border-b border-slate-800 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-50%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-4 tracking-wide uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          100% Client-Side Privacy
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
          <span className="text-blue-400">Dr Wamark</span> &mdash; AI Text Watermark Remover
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-6">
          The ultimate zero-width space remover and formatting sanitizer. Instantly strip hidden Unicode trackers, fingerprint signatures, and AI watermarks 100% privately on your device.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-700/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> No Data Sent to Servers
          </span>
          <span className="flex items-center gap-1.5 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-700/30">
            <Zap className="w-4 h-4 text-amber-400" /> Instant Local Engine
          </span>
        </div>
      </div>
    </header>
  );
}

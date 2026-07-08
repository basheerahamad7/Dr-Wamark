import { CheckCircle, Info, Sparkles, Database } from "lucide-react";
import { CleanResult } from "../types";

interface MetricsProps {
  result: CleanResult | null;
}

export function Metrics({ result }: MetricsProps) {
  if (!result) {
    return (
      <div
        id="metrics-empty-state"
        className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500 h-full flex flex-col items-center justify-center min-h-[160px] transition hover:bg-slate-100/50"
      >
        <Info className="w-8 h-8 text-slate-400 mb-3" />
        <p className="text-sm font-medium">No processing data yet</p>
        <p className="text-xs text-slate-400 mt-1 max-w-[240px] mx-auto">
          Enter text above and click &ldquo;Clean Text&rdquo; to analyze hidden structure.
        </p>
      </div>
    );
  }

  const { totalRemoved, originalBytes, cleanedBytes, processingTimeMs, breakdown } = result;
  const originalChars = result.originalText.length;
  const cleanedChars = result.cleanedText.length;
  const byteSavings = originalBytes - cleanedBytes;
  const savingsPct = originalBytes > 0 ? ((byteSavings / originalBytes) * 100).toFixed(1) : "0.0";

  return (
    <div id="metrics-dashboard" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full gap-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-blue-500" />
          Metrics Dashboard
        </h3>
        <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-100 flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" /> Checked Local
        </span>
      </div>

      {/* Main Core Counter requested by the user */}
      <div id="primary-metric" className="bg-slate-900 text-white rounded-xl p-5 text-center relative overflow-hidden shadow-inner">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="text-xs text-slate-400 font-medium tracking-wide uppercase mb-1">
          Total Characters Cleaned / Hidden Markers Removed
        </div>
        <div className="text-4xl font-black font-mono text-blue-400 tracking-tight">
          {totalRemoved.toLocaleString()}
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5">
          Processed in <span className="text-amber-400 font-semibold">{processingTimeMs}ms</span>
        </p>
      </div>

      {/* Side-by-side stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Characters</div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-500">Original:</span>
            <span className="text-sm font-bold font-mono text-slate-800">{originalChars.toLocaleString()}</span>
          </div>
          <div className="flex items-baseline justify-between mt-1 pt-1 border-t border-slate-200/50">
            <span className="text-xs text-slate-500">Cleaned:</span>
            <span className="text-sm font-bold font-mono text-slate-800">{cleanedChars.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1 flex items-center gap-1">
            <Database className="w-3 h-3 text-slate-400" /> Byte Size
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-500">Original:</span>
            <span className="text-sm font-bold font-mono text-slate-800">{originalBytes.toLocaleString()} B</span>
          </div>
          <div className="flex items-baseline justify-between mt-1 pt-1 border-t border-slate-200/50">
            <span className="text-xs text-slate-500">Cleaned:</span>
            <span className="text-sm font-bold font-mono text-slate-800">{cleanedBytes.toLocaleString()} B</span>
          </div>
        </div>
      </div>

      {/* Bytes saved notice */}
      {byteSavings > 0 && (
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-center text-xs text-slate-600">
          Stripping hidden symbols reduced memory footprint by{" "}
          <strong className="text-blue-700">{byteSavings} bytes</strong> ({savingsPct}% reduction)
        </div>
      )}

      {/* Detailed breakdowns */}
      <div className="flex flex-col flex-1 min-h-[140px]">
        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2">
          Detected &amp; Removed Markers List
        </div>
        {breakdown.length === 0 ? (
          <div className="flex-1 border border-slate-100 rounded-xl flex items-center justify-center p-4 text-center text-xs text-slate-400 font-medium italic bg-slate-50/30">
            {totalRemoved > 0 ? "Standard whitespace rules applied" : "Clean text! No tracking characters found"}
          </div>
        ) : (
          <div className="flex-1 max-h-[180px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {breakdown.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-700 mb-0.5">
                  <span className="truncate max-w-[200px]">{item.label}</span>
                  <span className="font-mono bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px]">
                    +{item.count} removed
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

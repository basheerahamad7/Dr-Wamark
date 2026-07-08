import { useState, useEffect } from "react";
import {
  Sparkles,
  Clipboard,
  Check,
  RotateCcw,
  BookOpen,
  Trash2,
  Sliders,
  HelpCircle
} from "lucide-react";
import { Header } from "./components/Header";
import { AdPlaceholder } from "./components/AdPlaceholder";
import { Metrics } from "./components/Metrics";
import { Articles } from "./components/Articles";
import { Footer } from "./components/Footer";
import SeoHub from "./components/SeoHub";
import { CleanOptions, CleanResult } from "./types";
import { cleanText, HIDDEN_MARKERS } from "./utils/cleaner";

export default function App() {
  const [inputText, setInputText] = useState<string>("");
  const [cleanedText, setCleanedText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [seoHubOpen, setSeoHubOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<CleanOptions>({
    removeZeroWidth: true,
    removeHiddenFormat: true,
    normalizeWhitespace: true,
    trimTrailing: true,
    normalizeHomoglyphs: true,
    expertNormalization: true,
  });
  const [metricsResult, setMetricsResult] = useState<CleanResult | null>(null);

  // Real-time detection state for warning indicators
  const [detectedCount, setDetectedCount] = useState<number>(0);

  // Count detected characters in input text in real-time
  useEffect(() => {
    let count = 0;
    for (const char of inputText) {
      const isSpecial = HIDDEN_MARKERS.some(m => m.char === char);
      if (isSpecial) {
        count++;
      }
    }
    setDetectedCount(count);
  }, [inputText]);

  // Load sample text with actual zero-width characters and homoglyphs
  const handleLoadSample = () => {
    const sample =
      "T\u200Bh\u200Bi\u200Bs\u200B sentence carries hidden AI watermarks\u200D and invisible trackers\uFEFF inside its letters. " +
      "We also have a Cyrillic homoglyph here like th\u0456s (\u0456 is U+0456 Cyrillic, not Latin i). " +
      "Finally, notice these double spaces   and trailing line spaces.   \n\n" +
      "Developers can paste code from PDFs that contains invalid \u2060 Word Joiners causing compile failures.";
    setInputText(sample);
  };

  // Run cleaner function
  const handleCleanText = () => {
    const result = cleanText(inputText, options);
    setCleanedText(result.cleanedText);
    setMetricsResult(result);
  };

  // Fast direct paste from clipboard
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch {
      // Fail silently if clipboard permissions are blocked in iframe
    }
  };

  // Fast clear
  const handleClear = () => {
    setInputText("");
    setCleanedText("");
    setMetricsResult(null);
  };

  // Copy with interactive state
  const handleCopy = async () => {
    if (!cleanedText) return;
    try {
      await navigator.clipboard.writeText(cleanedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy
      const textArea = document.createElement("textarea");
      textArea.value = cleanedText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-800">
      {/* Premium Header */}
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-6 py-6">
        {/* Google AdSense Top Leaderboard */}
        <AdPlaceholder type="top" />

        {/* Dynamic Warning Alert if hidden characters are detected in real-time */}
        {detectedCount > 0 && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="p-1 rounded-lg bg-amber-100 text-amber-700 text-sm font-bold font-mono">
              ⚠️ {detectedCount}
            </span>
            <div>
              <p className="text-sm font-bold text-amber-900">Hidden Watermarks / Invisible Code Points Detected</p>
              <p className="text-xs text-amber-700 mt-0.5">
                Our scan detected {detectedCount} non-displaying characters in your input text. Click &ldquo;Clean Text&rdquo; to analyze and remove them instantly.
              </p>
            </div>
          </div>
        )}

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main workspace cards (Inputs + Action Button) - Spans 2 columns on large screens */}
          <section id="workspace-section" className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 md:p-6 flex flex-col gap-5">
              {/* Dual Textareas Workspace */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Input block */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="source-input" className="text-sm font-bold text-slate-700 tracking-wide flex items-center gap-1.5">
                      Source Text (Unclean)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleLoadSample}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded transition cursor-pointer"
                      >
                        Load Sample
                      </button>
                      <button
                        onClick={handlePasteFromClipboard}
                        className="text-[11px] font-bold text-slate-600 hover:text-slate-800 bg-slate-50 px-2 py-1 rounded transition cursor-pointer"
                      >
                        Paste
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <textarea
                      id="source-input"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Paste your source text or AI-generated output here to strip invisible signatures, hidden double spaces, trackers, and watermark tokens..."
                      className="w-full h-80 p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm font-mono resize-none leading-relaxed"
                    />
                    <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded">
                      Length: {inputText.length.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Output block */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="sanitized-output" className="text-sm font-bold text-slate-700 tracking-wide">
                      Sanitized Text (Clean)
                    </label>
                    {cleanedText && (
                      <button
                        id="btn-copy"
                        onClick={handleCopy}
                        className={`text-[11px] font-bold inline-flex items-center gap-1 px-2.5 py-1 rounded transition cursor-pointer ${
                          copied
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                        }`}
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Clipboard className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy Cleaned Text"}
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      id="sanitized-output"
                      readOnly
                      value={cleanedText}
                      placeholder="Your sanitized, watermark-free output will appear here after clicking 'Clean Text'..."
                      className="w-full h-80 p-4 border border-slate-200 rounded-xl bg-slate-50 text-sm font-mono resize-none leading-relaxed outline-none"
                    />
                    <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-slate-200/50 px-1.5 py-0.5 rounded">
                      Length: {cleanedText.length.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Configurations panel */}
              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  Sanitization Parameters
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 font-medium cursor-pointer hover:text-slate-800 transition">
                    <input
                      type="checkbox"
                      checked={options.removeZeroWidth}
                      onChange={(e) => setOptions({ ...options, removeZeroWidth: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    <div>
                      <span>Remove Zero-Width Characters</span>
                      <p className="text-[10px] text-slate-400 font-normal">ZWSP, ZWNJ, ZWJ, and BOM signatures.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-600 font-medium cursor-pointer hover:text-slate-800 transition">
                    <input
                      type="checkbox"
                      checked={options.removeHiddenFormat}
                      onChange={(e) => setOptions({ ...options, removeHiddenFormat: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    <div>
                      <span>Remove Formatting &amp; Spacers</span>
                      <p className="text-[10px] text-slate-400 font-normal">Bi-directional embedding and soft hyphens.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-600 font-medium cursor-pointer hover:text-slate-800 transition">
                    <input
                      type="checkbox"
                      checked={options.normalizeWhitespace}
                      onChange={(e) => setOptions({ ...options, normalizeWhitespace: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    <div>
                      <span>Collapse Consecutive Spaces</span>
                      <p className="text-[10px] text-slate-400 font-normal">Normalizes double/triple spaces to a single space.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-600 font-medium cursor-pointer hover:text-slate-800 transition">
                    <input
                      type="checkbox"
                      checked={options.trimTrailing}
                      onChange={(e) => setOptions({ ...options, trimTrailing: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    <div>
                      <span>Trim Trailing Line Spaces</span>
                      <p className="text-[10px] text-slate-400 font-normal">Clears hidden whitespaces at line terminations.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-600 font-medium cursor-pointer hover:text-slate-800 transition">
                    <input
                      type="checkbox"
                      checked={options.normalizeHomoglyphs}
                      onChange={(e) => setOptions({ ...options, normalizeHomoglyphs: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    <div>
                      <span className="flex items-center gap-1">
                        Normalize Cyrillic Homoglyphs
                        <span className="group relative" title="Converts visual homoglyphs like Cyrillic 'а' to Latin 'a'">
                          <HelpCircle className="w-3 h-3 text-slate-400 cursor-help" />
                        </span>
                      </span>
                      <p className="text-[10px] text-slate-400 font-normal">Bypasses spoofing, tracking, and filters.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-600 font-medium cursor-pointer hover:text-slate-800 transition col-span-1 sm:col-span-2 md:col-span-3 border-t border-slate-200/60 pt-2.5 mt-1">
                    <input
                      type="checkbox"
                      checked={options.expertNormalization}
                      onChange={(e) => setOptions({ ...options, expertNormalization: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
                    />
                    <div>
                      <span className="flex items-center gap-1 font-bold text-slate-700">
                        ✨ Expert Text Normalizer &amp; Publication Rewriter
                      </span>
                      <p className="text-[10px] text-slate-500 font-normal mt-0.5">
                        Transforms draft/AI text into clean, natural, publication-ready plain text. Automatically strips HTML, markdown bold/headings/links, removes unnecessary blank lines, merges short paragraphs, and humanizes robotic phrases case-by-case while preserving meaning.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Bottom Action zone */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <button
                  id="btn-clean"
                  onClick={handleCleanText}
                  disabled={!inputText}
                  className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow-sm inline-flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  Clean Text
                </button>

                <button
                  id="btn-clear"
                  onClick={handleClear}
                  disabled={!inputText && !cleanedText}
                  className="border border-slate-200 hover:bg-slate-50 disabled:border-slate-100 disabled:text-slate-300 font-bold text-xs px-4 py-2.5 rounded-lg transition text-slate-600 inline-flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Reset Form
                </button>
              </div>
            </div>

            {/* In-Between Google AdSense Placement */}
            <AdPlaceholder type="in-between" />
          </section>

          {/* Right sidebar section (Live Statistics Dashboard) - 1 Column */}
          <aside id="sidebar-section">
            <Metrics result={metricsResult} />
          </aside>
        </div>

        {/* Content Section - SEO-optimized blog/articles */}
        <Articles />
      </main>

      {/* Footer & mandatory policies modals */}
      <Footer onOpenSeoHub={() => setSeoHubOpen(true)} />

      {/* SEO Strategy Hub Portal */}
      <SeoHub isOpen={seoHubOpen} onClose={() => setSeoHubOpen(false)} />

      {/* Elegant Floating Action Trigger Button */}
      <button
        onClick={() => setSeoHubOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3.5 rounded-full shadow-2xl z-40 transition-all duration-300 hover:scale-110 flex items-center gap-2 group cursor-pointer border border-blue-500/20"
        title="Open SEO Strategy Hub"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-xs font-bold tracking-wider uppercase whitespace-nowrap">
          SEO Strategy Hub
        </span>
      </button>
    </div>
  );
}

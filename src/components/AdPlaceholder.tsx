import { useEffect, useRef } from "react";

interface AdPlaceholderProps {
  type: "top" | "in-between";
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export function AdPlaceholder({ type }: AdPlaceholderProps) {
  const insRef = useRef<HTMLElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && insRef.current) {
        const isLoaded = insRef.current.getAttribute("data-adsbygoogle-status");
        const hasPushed = insRef.current.getAttribute("data-ad-initialized");

        if (!isLoaded && !hasPushed) {
          insRef.current.setAttribute("data-ad-initialized", "true");
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (e) {
      console.warn("AdSense layout initialization notice:", e);
    }
  }, [type]);

  const commentText =
    type === "top"
      ? "<!-- Google AdSense Top Leaderboard -->"
      : "<!-- Google AdSense In-Between Unit -->";

  return (
    <div
      id={`adsense-${type}`}
      className="w-full my-6 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 text-xs tracking-wider transition hover:border-slate-300"
    >
      <div className="w-full font-mono text-[10px] uppercase text-slate-400 font-medium mb-2 flex justify-between items-center px-1">
        <span>Sponsored Advertisement</span>
        <span className="text-[9px] bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-500 font-semibold font-mono">
          Ad Slot ({type === "top" ? "Top Unit" : "Inline Unit"})
        </span>
      </div>

      <div className="w-full flex items-center justify-center bg-slate-100 rounded-lg p-3 min-h-[120px]">
        {/* Render the specific Google AdSense Responsive Fluid Block */}
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minWidth: "250px" }}
          data-ad-format="fluid"
          data-ad-layout-key="-fb+5w+4e-db+86"
          data-ad-client="ca-pub-1772352921481919"
          data-ad-slot="7513172822"
        />
      </div>

      {/* Inject the exact required HTML comment so it compiles into the DOM */}
      <div
        dangerouslySetInnerHTML={{
          __html: commentText,
        }}
        className="hidden"
      />
    </div>
  );
}

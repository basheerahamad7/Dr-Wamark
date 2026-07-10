import { useEffect, useRef } from "react";

interface AdPlaceholderProps {
  type: "top" | "in-between" | "display" | "in-feed" | "in-article" | "multiplex";
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export function AdPlaceholder({ type }: AdPlaceholderProps) {
  const insRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let active = true;
    let observer: ResizeObserver | null = null;
    let timeoutId: any = null;
    let intervalId: any = null;

    const initializeAd = () => {
      if (!active) return;
      try {
        if (typeof window !== "undefined" && insRef.current) {
          const width = insRef.current.offsetWidth || insRef.current.parentElement?.offsetWidth || 0;
          if (width === 0) {
            return; // Don't push yet, width is not ready
          }

          const isLoaded = insRef.current.getAttribute("data-adsbygoogle-status");
          const hasPushed = insRef.current.getAttribute("data-ad-initialized");

          if (!isLoaded && !hasPushed) {
            insRef.current.setAttribute("data-ad-initialized", "true");
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            
            // Clean up observer if we successfully pushed
            if (observer) {
              observer.disconnect();
            }
            if (intervalId) {
              clearInterval(intervalId);
            }
          }
        }
      } catch (e) {
        console.warn("AdSense layout initialization notice:", e);
      }
    };

    // Use a short delay to allow layout calculations to settle
    timeoutId = setTimeout(() => {
      if (!active) return;
      if (insRef.current) {
        const initialWidth = insRef.current.offsetWidth || insRef.current.parentElement?.offsetWidth || 0;
        if (initialWidth > 0) {
          initializeAd();
        } else if (typeof ResizeObserver !== "undefined") {
          // Wait for the container to become visible or resize to positive width
          observer = new ResizeObserver(() => {
            const currentWidth = insRef.current?.offsetWidth || insRef.current?.parentElement?.offsetWidth || 0;
            if (currentWidth > 0) {
              initializeAd();
            }
          });
          if (insRef.current) {
            observer.observe(insRef.current);
          }
          if (insRef.current.parentElement) {
            observer.observe(insRef.current.parentElement);
          }
        } else {
          // Periodic fallback check
          intervalId = setInterval(() => {
            const currentWidth = insRef.current?.offsetWidth || insRef.current?.parentElement?.offsetWidth || 0;
            if (currentWidth > 0) {
              initializeAd();
            }
          }, 500);
        }
      }
    }, 200);

    return () => {
      active = false;
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [type]);

  // Determine configuration based on unit type
  const isDisplay = type === "top" || type === "display";
  const isInFeed = type === "in-between" || type === "in-feed";
  const isInArticle = type === "in-article";
  const isMultiplex = type === "multiplex";

  let label = "Display Banner Ad";
  if (isInFeed) label = "Fluid In-Feed Ad";
  if (isInArticle) label = "In-Article Ad";
  if (isMultiplex) label = "Multiplex Recommendation Grid";

  const commentText = `<!-- Google AdSense - ${label} -->`;

  return (
    <div
      id={`adsense-${type}`}
      className="w-full my-6 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 text-xs tracking-wider transition hover:border-slate-300"
    >
      <div className="w-full font-mono text-[10px] uppercase text-slate-400 font-medium mb-2 flex justify-between items-center px-1">
        <span>Sponsored Advertisement</span>
        <span className="text-[9px] bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-500 font-semibold font-mono">
          Ad Slot ({label})
        </span>
      </div>

      <div className="w-full flex items-center justify-center bg-slate-100 rounded-lg p-3 min-h-[120px]">
        {isDisplay && (
          /* Display Ad Unit (provided by user) */
          <ins
            ref={insRef}
            className="adsbygoogle"
            style={{ display: "block", width: "100%", minWidth: "250px" }}
            data-ad-client="ca-pub-1772352921481919"
            data-ad-slot="7777232443"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}

        {isInFeed && (
          /* In-feed Ad Unit (provided by user) */
          <ins
            ref={insRef}
            className="adsbygoogle"
            style={{ display: "block", width: "100%", minWidth: "250px" }}
            data-ad-format="fluid"
            data-ad-layout-key="-fb+5w+4e-db+86"
            data-ad-client="ca-pub-1772352921481919"
            data-ad-slot="7513172822"
          />
        )}

        {isInArticle && (
          /* In-article Ad Unit */
          <ins
            ref={insRef}
            className="adsbygoogle"
            style={{ display: "block", textAlign: "center" }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-1772352921481919"
            data-ad-slot="7757051146"
          />
        )}

        {isMultiplex && (
          /* Multiplex Recommendation Ad Unit */
          <ins
            ref={insRef}
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-format="autorelaxed"
            data-ad-client="ca-pub-1772352921481919"
            data-ad-slot="9999232443"
          />
        )}
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

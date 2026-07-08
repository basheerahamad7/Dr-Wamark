interface AdPlaceholderProps {
  type: "top" | "in-between";
}

export function AdPlaceholder({ type }: AdPlaceholderProps) {
  const commentText =
    type === "top"
      ? "<!-- Google AdSense Top Leaderboard -->"
      : "<!-- Google AdSense In-Between Unit -->";

  return (
    <div
      id={`adsense-${type}`}
      className="w-full my-6 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 text-xs tracking-wider transition hover:border-slate-300"
    >
      <div className="font-mono text-[10px] uppercase text-slate-400 font-medium mb-1.5">
        Sponsored Advertisement Slot
      </div>
      <div className="h-16 w-full flex items-center justify-center font-mono bg-slate-100 rounded-md text-[11px] text-slate-500">
        {type === "top" ? "970 × 90 Leaderboard or Responsive Banner" : "728 × 90 In-Between Content Banner"}
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

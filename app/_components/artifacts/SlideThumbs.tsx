export function SlideThumbs() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-violet-50 px-3 py-1.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-violet-700/90">
          Investor · Q3
        </span>
        <span className="rounded-md border border-violet-200 bg-violet-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-violet-700">
          10 slides
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-1.5 px-3">
        <SlideTitle />
        <SlideChart />
        <SlideTakeaways />
      </div>
    </div>
  );
}

function SlideTitle() {
  return (
    <div className="flex aspect-[4/3] flex-1 flex-col justify-between overflow-hidden rounded-md bg-violet-700 p-1.5">
      <div className="text-[7px] font-medium uppercase tracking-wider text-white/70">Q3</div>
      <div className="text-[8.5px] font-semibold leading-tight text-white">+38%</div>
    </div>
  );
}

function SlideChart() {
  const bars = [40, 60, 45, 75, 90, 85];
  return (
    <div className="flex aspect-[4/3] flex-1 items-end gap-[2px] overflow-hidden rounded-md bg-white p-1.5 ring-1 ring-black/10">
      {bars.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className="flex-1 rounded-sm bg-violet-500"
        />
      ))}
    </div>
  );
}

function SlideTakeaways() {
  return (
    <div className="flex aspect-[4/3] flex-1 flex-col justify-center gap-1 overflow-hidden rounded-md bg-violet-50 p-1.5 ring-1 ring-violet-200/60">
      <span className="h-[2px] w-3/4 rounded-full bg-violet-400/70" />
      <span className="h-[2px] w-2/3 rounded-full bg-violet-400/60" />
      <span className="h-[2px] w-4/5 rounded-full bg-violet-400/50" />
    </div>
  );
}

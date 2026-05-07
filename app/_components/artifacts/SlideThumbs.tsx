export function SlideThumbs() {
  return (
    <div className="rounded-xl bg-white px-4 pt-3 pb-4 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-violet-700/80">
            Investor update · Q3
          </div>
          <div className="mt-0.5 font-display text-sm font-semibold text-ink">
            10 slides · brand template
          </div>
        </div>
        <span className="rounded-md border border-violet-200 bg-violet-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-violet-700">
          + 7 more
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <SlideTitle />
        <SlideChart />
        <SlideTakeaways />
      </div>
    </div>
  );
}

function SlideTitle() {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br from-violet-600 to-indigo-700 p-2">
      <div className="text-[8px] font-medium uppercase tracking-wider text-white/70">Q3</div>
      <div className="mt-2 text-[10px] font-semibold leading-tight text-white">
        Traffic up 38% QoQ
      </div>
      <div className="mt-1 text-[7px] text-white/60">Investor update · Oct</div>
    </div>
  );
}

function SlideChart() {
  const bars = [40, 60, 45, 75, 90, 85];
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-md bg-white p-2 ring-1 ring-black/10">
      <div className="text-[7px] font-medium uppercase tracking-wider text-ink/60">
        Visits / wk
      </div>
      <div className="mt-1.5 flex h-[calc(100%-12px)] items-end gap-[2px]">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-sm bg-gradient-to-t from-violet-400 to-violet-600"
          />
        ))}
      </div>
    </div>
  );
}

function SlideTakeaways() {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-md bg-violet-50 p-2 ring-1 ring-violet-200/60">
      <div className="text-[7px] font-medium uppercase tracking-wider text-violet-700/70">
        Takeaways
      </div>
      <ul className="mt-1.5 space-y-[3px] text-[7.5px] leading-tight text-ink/80">
        <li className="flex gap-1">
          <span className="text-violet-500">•</span>Paid up 2.1×
        </li>
        <li className="flex gap-1">
          <span className="text-violet-500">•</span>Org search +18%
        </li>
        <li className="flex gap-1">
          <span className="text-violet-500">•</span>NPS 71 → 78
        </li>
      </ul>
    </div>
  );
}

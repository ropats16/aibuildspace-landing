export function ReportMock() {
  const rows = [
    { rank: 1, theme: "Slow first response", count: 38 },
    { rank: 2, theme: "Confusing onboarding", count: 27 },
    { rank: 3, theme: "Missing CSV export", count: 19 },
    { rank: 4, theme: "Login loop on Safari", count: 12 },
    { rank: 5, theme: "Vague error messages", count: 9 },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl bg-white px-4 pt-3 pb-4 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-violet-700/80">
            Customer research
          </div>
          <div className="mt-0.5 font-display text-sm font-semibold text-ink">
            Top complaints · last 30 days
          </div>
        </div>
        <div className="rounded-md border border-violet-200 bg-violet-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-violet-700">
          312 tickets
        </div>
      </div>

      <ul className="mt-3 overflow-hidden rounded-md ring-1 ring-black/5">
        {rows.map((r, i) => (
          <li
            key={r.rank}
            className={`grid grid-cols-[18px_1fr_auto] items-center gap-2 px-2 py-1.5 text-[10.5px] ${
              i % 2 ? "bg-black/[0.015]" : "bg-white"
            }`}
          >
            <span className="text-right font-medium tabular-nums text-violet-700/80">
              {r.rank}
            </span>
            <span className="truncate text-ink">{r.theme}</span>
            <span className="rounded-sm bg-violet-50 px-1 py-0.5 text-[9px] font-medium tabular-nums text-violet-700">
              {r.count}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-2 truncate text-[9.5px] italic text-muted">
        &quot;I waited two days for a reply on a billing question.&quot;
      </p>
    </div>
  );
}

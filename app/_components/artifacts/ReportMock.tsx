export function ReportMock() {
  const rows = [
    { theme: "Slow first response", count: 38, pct: 100 },
    { theme: "Confusing onboarding", count: 27, pct: 71 },
    { theme: "Missing CSV export", count: 19, pct: 50 },
    { theme: "Login loop on Safari", count: 12, pct: 32 },
    { theme: "Vague errors", count: 9, pct: 24 },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-orange-50 px-3 py-1.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-orange-700/90">
          Top complaints
        </span>
        <span className="rounded-md border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-orange-700">
          312 tickets
        </span>
      </div>
      <ul className="flex flex-1 flex-col justify-center gap-1.5 px-3">
        {rows.map((r) => (
          <li key={r.theme} className="flex items-center gap-2">
            <span className="relative h-2 flex-1 rounded-sm bg-orange-50">
              <span
                className="absolute inset-y-0 left-0 rounded-sm bg-orange-500"
                style={{ width: `${r.pct}%` }}
                aria-hidden
              />
            </span>
            <span className="shrink-0 text-[10px] font-medium tabular-nums text-orange-700">
              {r.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReportMock() {
  const rows = [
    { name: "HubSpot", price: "$45", a: true, b: true, c: true },
    { name: "Pipedrive", price: "$24", a: true, b: false, c: true },
    { name: "Attio", price: "$34", a: true, b: true, c: false },
    { name: "Folk", price: "$20", a: false, b: true, c: false },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl bg-white px-4 pt-3 pb-4 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-violet-700/80">
            Research report
          </div>
          <div className="mt-0.5 font-display text-sm font-semibold text-ink">
            CRM comparison · 20-person retail
          </div>
        </div>
        <div className="rounded-md border border-violet-200 bg-violet-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-violet-700">
          1 / 2
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-md ring-1 ring-black/5">
        <div className="grid grid-cols-[1.4fr_0.7fr_0.5fr_0.5fr_0.5fr] bg-violet-50/60 px-2 py-1.5 text-[9px] font-medium uppercase tracking-wider text-violet-700">
          <span>Tool</span>
          <span className="text-right">Price/seat</span>
          <span className="text-center">API</span>
          <span className="text-center">Mobile</span>
          <span className="text-center">Onboard</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.name}
            className={`grid grid-cols-[1.4fr_0.7fr_0.5fr_0.5fr_0.5fr] items-center px-2 py-1.5 text-[10px] ${
              i % 2 ? "bg-black/[0.015]" : "bg-white"
            }`}
          >
            <span className="font-medium text-ink">{r.name}</span>
            <span className="text-right tabular-nums text-ink">{r.price}</span>
            <Mark on={r.a} />
            <Mark on={r.b} />
            <Mark on={r.c} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Mark({ on }: { on: boolean }) {
  return (
    <span className="text-center text-[11px] leading-none">
      {on ? (
        <span className="text-emerald-600">✓</span>
      ) : (
        <span className="text-black/25">—</span>
      )}
    </span>
  );
}

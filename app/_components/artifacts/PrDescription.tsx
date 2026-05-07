export function PrDescription() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-2 border-b border-black/5 bg-teal-50 px-3 py-1.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 rounded-md bg-teal-100 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-teal-700">
            PR open
          </span>
          <span className="truncate text-[10.5px] font-medium text-ink/85">
            feat: rewrite copy
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 px-3 py-2">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="rounded-sm bg-emerald-50 px-1.5 py-0.5 font-medium tabular-nums text-emerald-700">
            +312
          </span>
          <span className="rounded-sm bg-red-50 px-1.5 py-0.5 font-medium tabular-nums text-red-700">
            −104
          </span>
          <span className="ml-auto text-[9.5px] uppercase tracking-wider text-muted">
            12 files
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <Check />
          <span className="text-ink/85">Summary, test plan, screenshots</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <Check />
          <span className="text-ink/85">CI green · 24 checks</span>
        </div>
      </div>
    </div>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] bg-teal-500 text-white"
    >
      <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 5l2 2 4-4" />
      </svg>
    </span>
  );
}

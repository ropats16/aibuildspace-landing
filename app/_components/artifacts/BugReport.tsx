export function BugReport() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-gradient-to-r from-red-50 to-rose-50/60 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <span className="rounded-md bg-red-100 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-red-700">
            Bug
          </span>
          <span className="rounded-md border border-red-200 bg-white px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-red-700">
            P1
          </span>
        </div>
        <span className="text-[10px] text-muted">SAF-241</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5 px-3 py-2">
        <div className="text-[11px] font-medium text-ink/90">
          Workspace switcher freezes
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-md bg-emerald-50/70 px-2 py-1 ring-1 ring-emerald-200/50">
            <div className="text-[9px] font-medium uppercase tracking-wider text-emerald-700/85">
              Expected
            </div>
            <p className="mt-0.5 text-[10px] tabular-nums text-ink/80">&lt; 200ms</p>
          </div>
          <div className="rounded-md bg-red-50/70 px-2 py-1 ring-1 ring-red-200/50">
            <div className="text-[9px] font-medium uppercase tracking-wider text-red-700/90">
              Actual
            </div>
            <p className="mt-0.5 text-[10px] tabular-nums text-ink/80">6+ seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}

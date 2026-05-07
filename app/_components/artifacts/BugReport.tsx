export function BugReport() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-gradient-to-r from-rose-50 to-orange-50/60 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded-md bg-rose-100 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-rose-700">
            Bug
          </span>
          <span className="truncate text-[11px] font-medium text-ink">
            Workspace switcher freezes on Safari
          </span>
        </div>
        <span className="shrink-0 rounded-md border border-rose-200 bg-white px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-rose-700">
          P1
        </span>
      </div>

      <div className="space-y-3 px-4 py-3 text-[11px] leading-snug">
        <div>
          <div className="text-[9px] font-medium uppercase tracking-wider text-rose-700/80">
            Steps to reproduce
          </div>
          <ol className="mt-1 space-y-0.5 text-ink/85">
            <li>1. Open the app in Safari 17</li>
            <li>2. Click the workspace dropdown</li>
            <li>3. Select a different workspace</li>
          </ol>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md bg-emerald-50/70 px-2 py-1.5 ring-1 ring-emerald-200/50">
            <div className="text-[9px] font-medium uppercase tracking-wider text-emerald-700/80">
              Expected
            </div>
            <p className="mt-0.5 text-[10px] text-ink/85">Switches in under 200ms.</p>
          </div>
          <div className="rounded-md bg-rose-50/70 px-2 py-1.5 ring-1 ring-rose-200/50">
            <div className="text-[9px] font-medium uppercase tracking-wider text-rose-700/80">
              Actual
            </div>
            <p className="mt-0.5 text-[10px] text-ink/85">Tab freezes for 6+ seconds.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

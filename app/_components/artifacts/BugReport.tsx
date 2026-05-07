export function BugReport() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-gradient-to-r from-red-50 to-rose-50/60 px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded-md bg-red-100 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-red-700">
            Bug
          </span>
          <span className="truncate text-[11px] font-medium text-ink">
            Workspace switcher freezes
          </span>
        </div>
        <span className="shrink-0 rounded-md border border-red-200 bg-white px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-red-700">
          P1
        </span>
      </div>

      <div className="flex-1 space-y-2 px-4 py-3 text-[11px] leading-snug">
        <div>
          <div className="text-[9px] font-medium uppercase tracking-wider text-red-700/90">
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
            <p className="mt-0.5 text-[10px] text-ink/85">Switches under 200ms.</p>
          </div>
          <div className="rounded-md bg-red-50/70 px-2 py-1.5 ring-1 ring-red-200/50">
            <div className="text-[9px] font-medium uppercase tracking-wider text-red-700/90">
              Actual
            </div>
            <p className="mt-0.5 text-[10px] text-ink/85">Freezes 6+ seconds.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SlackMessage() {
  return (
    <div className="rounded-xl bg-white px-4 pt-3 pb-4 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-700/80">
        <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M5 15a2 2 0 1 1 0-4h2v4H5Zm5 0v-4h4v4h-4Zm-1 4a2 2 0 1 1-4 0v-2h4v2Zm6-14a2 2 0 1 1 4 0v2h-4V5Zm0 5h4a2 2 0 1 1 0 4h-4v-4ZM5 9a2 2 0 1 1 0-4h2v4H5Zm5 0V5h4v4h-4Zm9 6a2 2 0 1 1 4 0v2h-4v-2Z"
          />
        </svg>
        <span className="uppercase tracking-[0.14em]">#leadership</span>
        <span className="text-ink/30">·</span>
        <span className="text-muted">Mon 9:00</span>
      </div>

      <div className="mt-3 flex gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-emerald-400 to-teal-600 text-[11px] font-semibold text-white"
          aria-hidden
        >
          M
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[12px] font-semibold text-ink">Metrics bot</span>
            <span className="text-[9px] text-muted">9:00 AM</span>
          </div>
          <div className="mt-0.5 text-[11px] text-ink">
            Last week, quick read:
          </div>
          <ul className="mt-1.5 space-y-0.5 text-[10.5px] leading-snug text-ink/85">
            <li>• Sessions <span className="font-medium tabular-nums text-emerald-700">+12.4%</span> WoW</li>
            <li>• Signups <span className="font-medium tabular-nums text-emerald-700">+184</span> · CAC $42</li>
            <li>• MRR <span className="font-medium tabular-nums">$48.2k</span> (+$3.1k)</li>
            <li>• Refunds 2 · churn 1.1%</li>
            <li>• Top source: organic / blog</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

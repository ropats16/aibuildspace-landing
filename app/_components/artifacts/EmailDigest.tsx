export function EmailDigest() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b border-black/5 bg-gradient-to-r from-blue-50 to-indigo-50/60 px-4 py-3">
        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-blue-700/80">
          Tuesday brief
        </div>
        <div className="mt-0.5 font-display text-sm font-semibold text-ink">
          Your morning briefing
        </div>
      </div>
      <div className="space-y-2 px-4 py-3 text-[11px] leading-tight">
        <Row dot="bg-blue-500" label="Mail" detail="5 unread · 2 flagged" />
        <Row dot="bg-violet-500" label="Calendar" detail="3 meetings · 9:00, 11:30, 14:00" />
        <Row dot="bg-emerald-500" label="Slack" detail="#engineering — 4 new threads" />
      </div>
    </div>
  );
}

function Row({ dot, label, detail }: { dot: string; label: string; detail: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden />
      <span className="font-medium text-ink/80">{label}</span>
      <span className="truncate text-muted">{detail}</span>
    </div>
  );
}

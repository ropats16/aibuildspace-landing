export function EmailDigest() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b border-black/5 bg-gradient-to-r from-amber-50 to-yellow-50/60 px-4 py-2.5">
        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-amber-700/90">
          Tuesday brief
        </div>
        <div className="mt-0.5 font-display text-[13px] font-semibold text-ink">
          Your morning briefing
        </div>
      </div>
      <div className="flex-1 space-y-2 px-4 py-3 text-[11px] leading-tight">
        <Row dot="bg-amber-500" label="Mail" detail="5 unread · 2 flagged" />
        <Row dot="bg-orange-500" label="Calendar" detail="3 meetings · 9, 11:30, 14" />
        <Row dot="bg-yellow-500" label="Slack" detail="#engineering · 4 new" />
        <Row dot="bg-amber-400" label="Revenue" detail="$4,212 · +12% DoD" />
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

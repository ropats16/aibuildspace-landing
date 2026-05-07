export function EmailDigest() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-amber-50 px-3 py-1.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-amber-700/90">
          Tuesday · 7:00
        </span>
        <span className="rounded-md border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-amber-700">
          Brief
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5 px-3 py-2">
        <Row label="Mail" value="5 unread" dot="bg-amber-500" />
        <Row label="Calendar" value="3 meetings" dot="bg-orange-500" />
        <Row label="Revenue" value="$4.2k · +12%" dot="bg-yellow-500" />
      </div>
    </div>
  );
}

function Row({ label, value, dot }: { label: string; value: string; dot: string }) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
        <span className="font-medium text-ink/85">{label}</span>
      </div>
      <span className="tabular-nums text-muted">{value}</span>
    </div>
  );
}

export function SlackMessage() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-gradient-to-r from-emerald-50 to-teal-50/60 px-3 py-1.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-700/90">
          #leadership
        </span>
        <span className="text-[10px] text-muted">Mon · 9:00</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5 px-3 py-2 text-[11px]">
        <Stat label="MRR" value="$48.2k" delta="+$3.1k" />
        <Stat label="Sessions" value="·" delta="+12.4%" />
        <Stat label="Signups" value="184" delta="CAC $42" />
      </div>
    </div>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-ink/85">{label}</span>
      {value !== "·" && <span className="tabular-nums text-ink">{value}</span>}
      <span className="ml-auto rounded-sm bg-emerald-50 px-1 py-px text-[9.5px] font-medium tabular-nums text-emerald-700">
        {delta}
      </span>
    </div>
  );
}

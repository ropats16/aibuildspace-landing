export function PrDescription() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-gradient-to-r from-emerald-50 to-teal-50/60 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-700">
            PR open
          </span>
          <span className="truncate text-[11px] font-medium text-ink">
            feat: rewrite home copy
          </span>
        </div>
        <span className="shrink-0 rounded-md border border-emerald-200 bg-white px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-emerald-700">
          +312 / −104
        </span>
      </div>

      <div className="space-y-3 px-4 py-3 text-[11px] leading-snug">
        <Block label="Summary">
          <ul className="space-y-0.5 text-ink/85">
            <li>• Replace placeholder hero subline</li>
            <li>• Convert 3 principle cards to 4-step process</li>
            <li>• Rewrite FAQ, Services, About in voice rules</li>
          </ul>
        </Block>

        <Block label="Test plan">
          <ul className="space-y-0.5 text-ink/85">
            <li className="flex gap-1.5">
              <Check /> Em dash sweep returns zero
            </li>
            <li className="flex gap-1.5">
              <Check /> Mobile breakpoint at 375px
            </li>
          </ul>
        </Block>
      </div>
    </div>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[9px] font-medium uppercase tracking-wider text-emerald-700/80">
        {label}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="mt-[2px] inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-[3px] bg-emerald-500 text-white"
    >
      <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 5l2 2 4-4" />
      </svg>
    </span>
  );
}

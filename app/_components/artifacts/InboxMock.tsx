export function InboxMock() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-gradient-to-r from-indigo-50 to-blue-50/60 px-4 py-2">
        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-indigo-700/90">
          Inbox · 12:00
        </div>
        <span className="rounded-md border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-indigo-700">
          14 triaged
        </span>
      </div>
      <ul className="flex-1 divide-y divide-black/5">
        <Row
          highlighted
          from="Maya Patel"
          subject="Re: contract, needs signature"
          tag="Drafted"
          tagClass="bg-indigo-100 text-indigo-700"
        />
        <Row
          highlighted
          from="Devon Reyes"
          subject="Quick question on Q4 plan"
          tag="Drafted"
          tagClass="bg-indigo-100 text-indigo-700"
        />
        <Row
          from="Stripe"
          subject="Weekly settlement summary"
          tag="Read"
          tagClass="bg-black/5 text-ink/60"
          muted
        />
        <Row
          from="Morning Brew"
          subject="The 5-minute roundup"
          tag="Archived"
          tagClass="bg-black/5 text-ink/40"
          muted
        />
      </ul>
    </div>
  );
}

function Row({
  from,
  subject,
  tag,
  tagClass,
  highlighted,
  muted,
}: {
  from: string;
  subject: string;
  tag: string;
  tagClass: string;
  highlighted?: boolean;
  muted?: boolean;
}) {
  return (
    <li
      className={`relative flex items-center gap-3 px-4 py-2 ${
        highlighted ? "bg-indigo-50/60" : ""
      }`}
    >
      {highlighted && (
        <span className="absolute inset-y-1 left-0 w-[2px] rounded-r-full bg-indigo-500" />
      )}
      <div className="min-w-0 flex-1">
        <div
          className={`text-[11px] font-medium ${
            muted ? "text-ink/50" : "text-ink"
          }`}
        >
          {from}
        </div>
        <div
          className={`truncate text-[10px] ${
            muted ? "text-muted/70" : "text-muted"
          }`}
        >
          {subject}
        </div>
      </div>
      <span
        className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-medium ${tagClass}`}
      >
        {tag}
      </span>
    </li>
  );
}

export function InboxMock() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-indigo-50 px-3 py-1.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-indigo-700/90">
          Inbox
        </span>
        <span className="rounded-md border border-indigo-200 bg-indigo-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-indigo-700">
          14 done
        </span>
      </div>
      <ul className="flex flex-1 flex-col justify-center divide-y divide-black/5">
        <Row name="Maya" tag="Drafted" tagClass="bg-indigo-100 text-indigo-700" highlighted />
        <Row name="Devon" tag="Drafted" tagClass="bg-indigo-100 text-indigo-700" highlighted />
        <Row name="Stripe" tag="Read" tagClass="bg-black/5 text-ink/55" />
        <Row name="Brew" tag="Archived" tagClass="bg-black/5 text-ink/40" />
      </ul>
    </div>
  );
}

function Row({
  name,
  tag,
  tagClass,
  highlighted,
}: {
  name: string;
  tag: string;
  tagClass: string;
  highlighted?: boolean;
}) {
  return (
    <li
      className={`relative flex items-center justify-between gap-2 px-3 py-1.5 text-[11px] ${
        highlighted ? "bg-indigo-50/50" : ""
      }`}
    >
      {highlighted && (
        <span className="absolute inset-y-1 left-0 w-[2px] rounded-r-full bg-indigo-500" />
      )}
      <span className="font-medium text-ink/85">{name}</span>
      <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-medium ${tagClass}`}>
        {tag}
      </span>
    </li>
  );
}

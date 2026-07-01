// File download card — an inline component block rendered inside the article
// prose. Server-rendered anchor with the `download` attribute so readers get the
// file directly (same-origin, no third-party site). `downloadName` controls the
// saved filename because Keystatic stores uploads under a field-key-based name,
// not the original ("skill.md" would otherwise land as "file.md").

type FileValue =
  | { data: Uint8Array; extension: string; filename: string }
  | string
  | null;

export type FileDownloadProps = {
  file: FileValue;
  title: string;
  downloadName?: string;
  description?: string;
};

function resolveHref(file: FileValue): string {
  if (typeof file === "string") return file;
  if (file != null) return `/downloads/${file.filename}`;
  return "";
}

export function FileDownload({
  file,
  title,
  downloadName,
  description,
}: FileDownloadProps) {
  const href = resolveHref(file);
  if (!href) return null;

  const fallbackName = href.split("/").pop() || "download";
  const name = downloadName?.trim() || fallbackName;
  const subtitle = description?.trim() || name;

  return (
    <a
      href={href}
      download={name}
      className="file-download group my-8 flex items-center gap-4 rounded-2xl bg-card px-6 py-5 no-underline ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(11,11,12,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(11,11,12,0.22),0_2px_8px_rgba(11,11,12,0.04)] hover:ring-black/[0.10]"
    >
      {/* Leading file icon */}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v10" />
          <path d="M8 11l4 4 4-4" />
          <path d="M5 19h14" />
        </svg>
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Download
        </span>
        <span className="block truncate font-display font-semibold text-ink">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-sm text-muted">
          {subtitle}
        </span>
      </span>

      {/* Trailing affordance */}
      <span className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-accent/10 px-3.5 text-sm font-medium text-accent transition-colors group-hover:bg-accent/15">
        <svg
          viewBox="0 0 20 20"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 3v9" />
          <path d="M6.5 9.5L10 13l3.5-3.5" />
          <path d="M4 15.5h12" />
        </svg>
        Get file
      </span>
    </a>
  );
}

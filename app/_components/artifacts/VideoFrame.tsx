export function VideoFrame() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-black/5 bg-rose-50 px-3 py-1.5">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-rose-700/90">
          Vertical reel
        </span>
        <span className="rounded-md border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-rose-700">
          0:30
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center px-3 py-2">
        <div className="relative aspect-[9/14] h-full overflow-hidden rounded-md bg-gradient-to-br from-pink-300 via-rose-400 to-fuchsia-500 shadow-inner">
          <svg
            viewBox="0 0 90 140"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <circle cx="45" cy="50" r="13" fill="rgba(255,255,255,0.65)" />
            <path
              d="M22 108 C22 84, 68 84, 68 108 L68 140 L22 140 Z"
              fill="rgba(255,255,255,0.5)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-md ring-1 ring-black/5">
              <svg width="8" height="10" viewBox="0 0 10 12" aria-hidden className="ml-0.5">
                <path d="M0 0 L10 6 L0 12 Z" fill="#0B0B0C" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

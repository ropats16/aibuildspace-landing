export function VideoFrame() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-white px-4 pt-3 pb-3 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-rose-700/90">
            Vertical reel
          </div>
          <div className="mt-0.5 font-display text-[13px] font-semibold text-ink">
            Avatar + voice
          </div>
        </div>
        <span className="rounded-md border border-rose-200 bg-rose-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-rose-700">
          0:30
        </span>
      </div>

      <div className="mt-2 flex flex-1 items-center justify-center">
        <div className="relative aspect-[9/14] h-full overflow-hidden rounded-lg bg-gradient-to-br from-pink-300 via-rose-400 to-fuchsia-500 shadow-inner">
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

          <svg
            viewBox="0 0 90 140"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <circle cx="45" cy="48" r="13" fill="rgba(255,255,255,0.6)" />
            <path
              d="M20 105 C20 82, 70 82, 70 105 L70 140 L20 140 Z"
              fill="rgba(255,255,255,0.5)"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-md ring-1 ring-black/5">
              <svg
                width="9"
                height="11"
                viewBox="0 0 10 12"
                aria-hidden
                className="ml-0.5"
              >
                <path d="M0 0 L10 6 L0 12 Z" fill="#0B0B0C" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[8px] font-medium text-white/95">
            <span>Product update</span>
            <span className="tabular-nums">0:30</span>
          </div>
        </div>
      </div>
    </div>
  );
}

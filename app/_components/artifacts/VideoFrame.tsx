export function VideoFrame() {
  return (
    <div className="rounded-xl bg-white px-4 pt-3 pb-4 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-orange-700/80">
            Vertical reel
          </div>
          <div className="mt-0.5 font-display text-sm font-semibold text-ink">
            HeyGen + ElevenLabs
          </div>
        </div>
        <span className="rounded-md border border-orange-200 bg-orange-50 px-1.5 py-0.5 text-[9px] font-medium tabular-nums text-orange-700">
          0:30
        </span>
      </div>

      <div className="mt-3 flex justify-center">
        <div className="relative aspect-[9/16] w-[58%] overflow-hidden rounded-lg bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400 shadow-inner">
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

          <svg
            viewBox="0 0 100 178"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <circle cx="50" cy="58" r="14" fill="rgba(255,255,255,0.55)" />
            <path
              d="M22 130 C22 105, 78 105, 78 130 L78 178 L22 178 Z"
              fill="rgba(255,255,255,0.45)"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md ring-1 ring-black/5">
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                aria-hidden
                className="ml-0.5"
              >
                <path d="M0 0 L10 6 L0 12 Z" fill="#0B0B0C" />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[8px] font-medium text-white/90">
            <span>Product update</span>
            <span className="tabular-nums">0:30</span>
          </div>
        </div>
      </div>
    </div>
  );
}

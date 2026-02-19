export function DvaHeader() {
  return (
    <header className="relative z-10 flex items-center gap-3 border-b border-white/[0.06] bg-[#0a0a0f]/80 px-5 py-3 backdrop-blur-xl">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] ring-1 ring-white/[0.08]">
        <svg
          className="h-4 w-4 text-[#4da5fc]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          {/* Eye/lens with growth line */}
          <path
            d="M2 12C2 12 6.5 5 12 5C17.5 5 22 12 22 12C22 12 17.5 19 12 19C6.5 19 2 12 2 12Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <path
            d="M8 14L10.5 10.5L13.5 12.5L17 8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="17" cy="8" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <div>
        <h1 className="text-sm font-semibold text-white">
          Digital Visibility Agent
        </h1>
        <p className="text-xs text-[#6a6a6f]">
          Marketing-Berater für digitale Sichtbarkeit
        </p>
      </div>
    </header>
  );
}

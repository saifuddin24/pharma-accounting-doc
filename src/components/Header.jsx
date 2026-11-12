export default function Header({ query, onQueryChange, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">
      <button className="icon-button lg:hidden" onClick={onMenuClick} aria-label="Open navigation">☰</button>
      <a href="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight text-slate-900">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm text-white">D</span>
        <span>Documentation</span>
      </a>
      <div className="relative ml-auto w-full max-w-md">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
          placeholder="Search documentation..."
          aria-label="Search documentation"
        />
      </div>
    </header>
  );
}

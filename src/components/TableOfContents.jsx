export default function TableOfContents({ headings, activeId }) {
  const items = headings.filter((heading) => heading.level >= 2 && heading.level <= 4);
  if (!items.length) return null;

  return (
    <aside className="hidden w-56 shrink-0 xl:block">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-2 pl-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">On this page</h2>
        <nav className="space-y-1 border-l border-slate-200">
          {items.map((heading) => (
            <a
              key={`${heading.id}-${heading.level}`}
              href={`#${heading.id}`}
              className={`toc-link ${activeId === heading.id ? 'toc-link-active' : ''}`}
              style={{ paddingLeft: `${12 + (heading.level - 2) * 12}px` }}
            >
              {heading.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

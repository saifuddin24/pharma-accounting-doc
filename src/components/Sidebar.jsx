import SidebarItem from './SidebarItem';

export default function Sidebar({ items, activeId, onNavigate, open, onClose }) {
  return (
    <>
      {open && <button className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={onClose} aria-label="Close navigation" />}
      <aside className={`fixed bottom-0 left-0 top-16 z-40 w-[280px] overflow-y-auto border-r border-slate-200 bg-white px-4 py-6 transition-transform lg:sticky lg:top-16 lg:z-10 lg:block lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Documentation</div>
        <nav aria-label="Documentation navigation" className="space-y-1">
          {items.map((item) => (
            <SidebarItem key={item.id} item={item} activeId={activeId} onNavigate={onNavigate} />
          ))}
        </nav>
      </aside>
    </>
  );
}

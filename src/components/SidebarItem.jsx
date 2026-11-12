import { useState } from 'react';

export default function SidebarItem({ item, activeId, onNavigate, depth = 0 }) {
  const hasChildren = Boolean(item.children?.length);
  const containsActive = hasChildren && item.children.some((child) => child.id === activeId);
  const [expanded, setExpanded] = useState(containsActive || depth === 0);
  const active = item.id === activeId;

  return (
    <div>
      <div className={`group flex items-center rounded-lg ${active ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
        <button
          onClick={() => item.file ? onNavigate(item) : setExpanded((value) => !value)}
          className={`min-w-0 flex-1 px-3 py-2 text-left text-sm ${active ? 'font-semibold text-slate-950' : 'text-slate-600'}`}
        >
          <span className="block truncate">{item.title}</span>
        </button>
        {hasChildren && (
          <button
            className="px-3 py-2 text-xs text-slate-400 hover:text-slate-700"
            onClick={() => setExpanded((value) => !value)}
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.title}`}
          >
            {expanded ? '⌄' : '›'}
          </button>
        )}
      </div>
      {hasChildren && expanded && (
        <div className="ml-3 mt-1 space-y-1 border-l border-slate-200 pl-2">
          {item.children.map((child) => (
            <SidebarItem key={child.id} item={child} activeId={activeId} onNavigate={onNavigate} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

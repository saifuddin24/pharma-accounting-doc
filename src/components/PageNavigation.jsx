export default function PageNavigation({ previous, next, onNavigate }) {
  if (!previous && !next) return null;
  return (
    <div className="mt-14 grid grid-cols-1 gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
      {previous ? (
        <button onClick={() => onNavigate(previous)} className="page-nav-card text-left">
          <span className="text-xs text-slate-400">← Previous</span>
          <span className="mt-1 block font-medium text-slate-800">{previous.title}</span>
        </button>
      ) : <span />}
      {next && (
        <button onClick={() => onNavigate(next)} className="page-nav-card text-right">
          <span className="text-xs text-slate-400">Next →</span>
          <span className="mt-1 block font-medium text-slate-800">{next.title}</span>
        </button>
      )}
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TableOfContents from './components/TableOfContents';
import PageNavigation from './components/PageNavigation';
import { parseMarkdown } from './utils/markdownParser';
import { useDocumentation } from './hooks/useDocumentation';
import { useActiveHeading } from './hooks/useActiveHeading';
import { flattenNavigation, navigation } from './utils/navigation';

function readRoute(pages) {
  const id = window.location.pathname.split('/').filter(Boolean).at(-1);
  return pages.find((page) => page.id === id) || pages[0];
}

export default function App() {
  const pages = useMemo(() => flattenNavigation(), []);
  const [page, setPage] = useState(() => readRoute(pages));
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { markdown, loading, error } = useDocumentation(page);
  const parsedForHeadings = useMemo(() => {
    // Headings are extracted by the same parser used by the content renderer.
    const matches = [...markdown.matchAll(/^(#{1,6})\s+(.+)$/gm)];
    return matches.map((match) => {
      const title = match[2].replace(/[*_`]/g, '').trim();
      return {
        id: title.toLowerCase().trim().replace(/[`~!@#$%^&*()=+[\]{}\\|:;"'<>,.?/]/g, '').replace(/\s+/g, '-'),
        title,
        level: match[1].length,
      };
    });
  }, [markdown]);
  const activeHeading = useActiveHeading(parsedForHeadings);

  useEffect(() => {
    const onPopState = () => setPage(readRoute(pages));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [pages]);

  function navigate(nextPage) {
    if (!nextPage?.file) return;
    const url = `/docs/${nextPage.id}`;
    window.history.pushState({}, '', url);
    setPage(nextPage);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const currentIndex = pages.findIndex((item) => item.id === page?.id);
  const filteredPages = query.trim()
    ? pages.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    : null;

  const parsedMarkdown = useMemo(() => parseMarkdown(markdown), [markdown]);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header query={query} onQueryChange={setQuery} onMenuClick={() => setMobileMenuOpen(true)} />
      <div className="mx-auto flex max-w-[1600px] items-start">
        <Sidebar
          items={navigation}
          activeId={page?.id}
          onNavigate={navigate}
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">
          {query.trim() && (
            <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Matching topics</div>
              {filteredPages.length ? filteredPages.map((item) => (
                <button key={item.id} onClick={() => { navigate(item); setQuery(''); }} className="mr-2 mb-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-100">{item.title}</button>
              )) : <p className="text-sm text-slate-500">No matching topic titles.</p>}
            </div>
          )}
          <div className="mx-auto flex max-w-6xl gap-10">
            <div className="min-w-0 flex-1">
              <div className="mb-6 text-sm text-slate-400">
                {page?.breadcrumb?.join(' / ') || 'Documentation'}
              </div>
              {loading ? (
                <div className="py-16 text-sm text-slate-500">Loading documentation...</div>
              ) : error ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">{error}</div>
              ) : (
                <>
                  <article className="markdown-content">{parsedMarkdown.blocks}</article>
                  <PageNavigation
                    previous={pages[currentIndex - 1]}
                    next={pages[currentIndex + 1]}
                    onNavigate={navigate}
                  />
                </>
              )}
            </div>
            {!loading && !error && <TableOfContents headings={parsedForHeadings} activeId={activeHeading} />}
          </div>
        </main>
      </div>
    </div>
  );
}


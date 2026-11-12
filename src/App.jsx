import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TableOfContents from './components/TableOfContents';
import PageNavigation from './components/PageNavigation';
import { parseMarkdown } from './utils/markdownParser';
import { useDocumentation } from './hooks/useDocumentation';
import { useActiveHeading } from './hooks/useActiveHeading';
import { flattenNavigation, navigation, pageHref } from './utils/navigation';

function readRoute(hash, pages) {
  const [path, encodedHeading] = hash.slice(1).split('#');
  const id = path.match(/^\/docs\/([^/]+)$/)?.[1];
  const heading = encodedHeading
    ? new URLSearchParams(`heading=${encodedHeading}`).get('heading')
    : '';
  return { page: pages.find((item) => item.id === id) || pages[0], heading };
}

export default function App() {
  const pages = useMemo(() => flattenNavigation(), []);
  const [hash, setHash] = useState(() => window.location.hash);
  const { page, heading } = readRoute(hash, pages);
  const [query, setQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { markdown, loading, error, loadedFile } = useDocumentation(page);
  const parsedMarkdown = useMemo(() => parseMarkdown(markdown, page?.id), [markdown, page?.id]);
  const activeHeading = useActiveHeading(parsedMarkdown.headings);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (loading || error || loadedFile !== page?.file) return;
    if (heading) {
      document.getElementById(heading)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [page?.file, heading, loading, error, loadedFile]);

  function navigate(nextPage) {
    if (!nextPage?.file) return;
    window.location.hash = pageHref(nextPage.id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const currentIndex = pages.findIndex((item) => item.id === page?.id);
  const filteredPages = query.trim()
    ? pages.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    : null;

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
            {!loading && !error && <TableOfContents headings={parsedMarkdown.headings} activeId={activeHeading} pageId={page?.id} />}
          </div>
        </main>
      </div>
    </div>
  );
}

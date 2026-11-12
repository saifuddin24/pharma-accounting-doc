import { useEffect, useState } from 'react';

export function useDocumentation(page) {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadedFile, setLoadedFile] = useState('');

  useEffect(() => {
    if (!page?.file) {
      setMarkdown('');
      setError('No documentation file is assigned to this topic.');
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError('');

    fetch(`${import.meta.env.BASE_URL}docs/${page.file}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${page.file}`);
        return response.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoadedFile(page.file);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page?.file]);

  return { markdown, loading, error, loadedFile };
}

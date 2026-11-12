import { useMemo } from 'react';
import { parseMarkdown } from '../utils/markdownParser';

export default function MarkdownRenderer({ markdown }) {
  const parsed = useMemo(() => parseMarkdown(markdown), [markdown]);
  return { content: <article className="markdown-content">{parsed.blocks}</article>, headings: parsed.headings };
}

import React from 'react';
import { slugify } from './slugify';

function inline(text, keyPrefix = 'inline') {
  const tokenPattern = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let index = 0;

  while ((match = tokenPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;

    if (token.startsWith('`')) {
      parts.push(<code key={key} className="inline-code">{token.slice(1, -1)}</code>);
    } else if (token.startsWith('**') || token.startsWith('__')) {
      parts.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('*') || token.startsWith('_')) {
      parts.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith('![')) {
      const parsed = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (parsed) parts.push(<img key={key} src={parsed[2]} alt={parsed[1]} className="my-5 max-w-full rounded-xl border border-slate-200" />);
    } else {
      const parsed = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (parsed) {
        const external = /^https?:\/\//i.test(parsed[2]);
        parts.push(
          <a key={key} href={parsed[2]} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
            {parsed[1]}
          </a>,
        );
      }
    }
    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function parseTable(lines, start) {
  const rows = [];
  let index = start;
  while (index < lines.length && lines[index].trim().startsWith('|')) {
    const cells = lines[index].trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
    rows.push(cells);
    index += 1;
  }
  const hasDivider = rows.length > 1 && rows[1].every((cell) => /^:?-{3,}:?$/.test(cell));
  const bodyRows = hasDivider ? rows.slice(2) : rows.slice(1);
  return {
    node: (
      <div className="my-6 overflow-x-auto">
        <table className="docs-table">
          <thead><tr>{rows[0].map((cell, i) => <th key={i}>{inline(cell, `th-${i}`)}</th>)}</tr></thead>
          <tbody>{bodyRows.map((row, ri) => (
            <tr key={ri}>{rows[0].map((_, ci) => <td key={ci}>{inline(row[ci] || '', `td-${ri}-${ci}`)}</td>)}</tr>
          ))}</tbody>
        </table>
      </div>
    ),
    next: index,
  };
}

export function parseMarkdown(markdown = '') {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  const headings = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) { i += 1; continue; }

    if (line.startsWith('```') || line.startsWith('~~~')) {
      const fence = line.slice(0, 3);
      const language = line.slice(3).trim();
      i += 1;
      const codeLines = [];
      while (i < lines.length && !lines[i].trim().startsWith(fence)) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push(<pre key={blockKey++} className="code-block"><div className="code-language">{language || 'code'}</div><code>{codeLines.join('\n')}</code></pre>);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].replace(/[*_`]/g, '');
      const id = slugify(title);
      headings.push({ id, title, level });
      const Tag = `h${level}`;
      blocks.push(<Tag id={id} key={blockKey++} className={`docs-h${level}`}>{inline(heading[2])}</Tag>);
      i += 1;
      continue;
    }

    if (/^(\*\s*){3,}$|^(-\s*){3,}$|^_{3,}$/.test(line)) {
      blocks.push(<hr key={blockKey++} className="my-8 border-slate-200" />);
      i += 1;
      continue;
    }

    if (line.startsWith('|')) {
      const table = parseTable(lines, i);
      blocks.push(React.cloneElement(table.node, { key: blockKey++ }));
      i = table.next;
      continue;
    }

    if (line.startsWith('>')) {
      const quote = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push(<blockquote key={blockKey++}>{inline(quote.join(' '))}</blockquote>);
      continue;
    }

    if (/^[-*+]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*+]\s+/, ''));
        i += 1;
      }
      blocks.push(<ul key={blockKey++}>{items.map((item, idx) => <li key={idx}>{inline(item, `ul-${idx}`)}</li>)}</ul>);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      blocks.push(<ol key={blockKey++}>{items.map((item, idx) => <li key={idx}>{inline(item, `ol-${idx}`)}</li>)}</ol>);
      continue;
    }

    const paragraph = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|~~~|>|[-*+]\s|\d+\.\s|\|)/.test(lines[i].trim())) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push(<p key={blockKey++}>{inline(paragraph.join(' '), `p-${blockKey}`)}</p>);
  }

  return { blocks, headings };
}

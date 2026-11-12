# Documentation Portal

A lightweight Markdown-based documentation website built with React 18, Vite and Tailwind CSS 3.

## Requirements

- Node.js 18+
- npm

## Getting started

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (normally http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Add a documentation page

1. Add a `.md` file inside `public/docs/`.
2. Add a navigation item in `src/data/navigation.json`.
3. Set its `id`, `title` and `file` properties.

A navigation item can have both `file` and `children`, or only a `file` for a standalone page, or only `children` for a parent grouping.

## Supported Markdown

The initial custom parser supports headings, paragraphs, bold, italic, inline code, fenced code blocks, links, images, unordered and ordered lists, blockquotes, horizontal rules and basic pipe tables.

This is intentionally a small subset rather than a complete CommonMark implementation.

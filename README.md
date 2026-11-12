# Documentation Portal

A lightweight Markdown-based documentation website built with React 18, Vite and Tailwind CSS 3.

Repository: https://github.com/saifuddin24/pharma-accounting-doc

Published website: https://saifuddin24.github.io/pharma-accounting-doc/

## Requirements

- Node.js 18+
- npm

## Getting started

```bash
npm ci
npm run dev
```

Open the local URL shown by Vite (normally http://localhost:5173/pharma-accounting-doc/).

## Build

```bash
npm run build
npm run preview
```

The production files, including Markdown files from `public/docs/`, are generated in `dist/`. Open the URL printed by the preview command to test the production build locally.

## GitHub Pages deployment

In the repository's **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**. Push the project to the `main` branch of `saifuddin24/pharma-accounting-doc`; the deployment workflow installs dependencies with `npm ci`, builds the site, and deploys `dist/` to GitHub Pages. Every subsequent push to `main` triggers the same workflow. You can also run **Deploy to GitHub Pages** manually from the repository's **Actions** tab.

If the workflow reports `Get Pages site failed` or `Not Found`, make sure GitHub Pages is enabled and its source is set to **GitHub Actions** in [repository Pages settings](https://github.com/saifuddin24/pharma-accounting-doc/settings/pages), then rerun the failed workflow from the **Actions** tab. Changing Pages settings requires repository administrator access. The workflow does not automatically enable Pages: that requires a separately privileged token.

The site uses hash-based routes, such as `https://saifuddin24.github.io/pharma-accounting-doc/#/docs/installation`, so links, refreshes, and browser history work on GitHub Pages without server-side SPA rewrites. The Vite base path is `/pharma-accounting-doc/`; change it if the repository is renamed.

## Add a documentation page

1. Add a `.md` file inside `public/docs/`.
2. Add a navigation item in `src/data/navigation.json`.
3. Set its `id`, `title` and `file` properties.

A navigation item can have both `file` and `children`, or only a `file` for a standalone page, or only `children` for a parent grouping.
For links to other topics, use hash routes such as `#/docs/installation`. Markdown heading links such as `#prerequisites` stay within the current topic. Public asset paths such as `/images/example.png` are resolved under the configured Vite base path.

## Supported Markdown

The initial custom parser supports headings, paragraphs, bold, italic, inline code, fenced code blocks, links, images, unordered and ordered lists, blockquotes, horizontal rules and basic pipe tables.

This is intentionally a small subset rather than a complete CommonMark implementation.

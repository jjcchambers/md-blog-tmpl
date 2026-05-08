# md-blog-tmpl

A lightweight, modern markdown blog template. Write `.md` files, drop them in a
folder, and they automatically appear on your blog. Deploys to **Cloudflare
Workers** as pure static HTML — fast, free, and reliable.

Built with [Astro](https://astro.build). Zero JavaScript shipped to the browser
by default (only the theme toggle ships ~1 KB of inline JS).

---

## Features

- **Write in plain Markdown.** No MDX gymnastics, no headless CMS.
- **Auto-routing from directory structure.** `src/pages/blog/topic/post.md` is
served at `/blog/topic/post`.
- **Auto-generated navigation & post index.** The blog index page groups your
posts by topic (the directory each post lives in). New folder = new topic.
- **Dark / light theme** with auto-detection and a toggle. Persists in
`localStorage`.
- **Themable in one file.** All colors, fonts, and spacing live in
`[src/styles/theme.css](src/styles/theme.css)` as CSS custom properties.
- **Modern, accessible design** — semantic HTML, real focus states, reduced
motion support.
- **SEO defaults out of the box** — Open Graph tags, canonical URLs, RSS feed
at `/rss.xml`, sitemap at `/sitemap-index.xml`.
- **One-command Cloudflare deploy** via `npm run deploy`.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (http://localhost:4321)
npm run dev

# 3. Edit src/lib/site.ts to set your site title, description, and nav.

# 4. Replace the example posts under src/pages/blog/ with your own .md files.

# 5. Deploy to Cloudflare Workers (after editing wrangler.jsonc — see below).
npm run deploy
```

---

## Project structure

```
md-blog-tmpl/
├── public/                    ← static assets, copied to dist/ verbatim
│   ├── favicon.svg
│   ├── logo.svg
│   ├── robots.txt
│   └── images/
│       ├── og-default.svg
│       └── posts/             ← put hero & inline post images here
│
├── src/
│   ├── components/            ← Astro components (Nav, Footer, PostCard…)
│   ├── layouts/
│   │   ├── BaseLayout.astro   ← <html><head><body> shell
│   │   └── PostLayout.astro   ← used by every blog post (set in frontmatter)
│   ├── lib/
│   │   ├── site.ts            ← site title, nav, social links
│   │   └── posts.ts           ← reads all .md files; powers index pages
│   ├── styles/
│   │   ├── theme.css          ← ALL design tokens (colors, fonts, spacing)
│   │   └── global.css         ← global styles + .prose article styles
│   └── pages/
│       ├── index.astro        ← homepage
│       ├── about.md
│       ├── 404.astro
│       ├── rss.xml.ts         ← RSS feed
│       └── blog/
│           ├── index.astro    ← all-posts page, grouped by topic
│           ├── getting-started/
│           │   ├── welcome.md
│           │   └── markdown-cheatsheet.md
│           ├── tutorials/
│           │   ├── adding-images.md
│           │   └── customizing-theme.md
│           └── thoughts/
│               └── why-static-sites.md
│
├── astro.config.mjs
├── wrangler.jsonc             ← Cloudflare Workers config
├── tsconfig.json
└── package.json
```

---

## Writing posts

### File location

Drop a Markdown file anywhere under `src/pages/blog/<topic>/`. The file path
maps directly to the URL:


| File                                          | URL                               |
| --------------------------------------------- | --------------------------------- |
| `src/pages/blog/getting-started/welcome.md`   | `/blog/getting-started/welcome`   |
| `src/pages/blog/tutorials/adding-images.md`   | `/blog/tutorials/adding-images`   |
| `src/pages/blog/thoughts/why-static-sites.md` | `/blog/thoughts/why-static-sites` |


> 💡 The folder under `src/pages/blog/` becomes the post's **topic**. Posts are
> automatically grouped by topic on the `[/blog](/blog)` index page.

> 💡 Astro builds with trailing slashes (`/blog/welcome/`) by default. Both
> `/blog/welcome/` and `/blog/welcome` resolve to the same page on Cloudflare.

### Frontmatter

Every post starts with a YAML frontmatter block:

```yaml
---
layout: ../../../layouts/PostLayout.astro
title: My awesome post
description: A short summary used for previews and social cards.
date: 2026-05-06
author: Your Name
tags: [tutorial, astro]
hero: /images/posts/my-post-hero.svg
---
```


| Field         | Required | Notes                                                           |
| ------------- | -------- | --------------------------------------------------------------- |
| `layout`      | yes      | Path to `PostLayout.astro` (relative to the .md file).          |
| `title`       | yes      | Page title (also used in `<title>` and Open Graph meta).        |
| `description` | no       | Used in card previews, OG description, and social cards.        |
| `date`        | no       | ISO 8601 (`YYYY-MM-DD`). Drives sort order. Newest posts first. |
| `author`      | no       | Defaults to `SITE.author` from `src/lib/site.ts`.               |
| `tags`        | no       | List of strings — rendered as pills above the title.            |
| `hero`        | no       | Absolute path (e.g. `/images/posts/foo.svg`) used as the hero.  |
| `draft`       | no       | When `true`, the post is hidden from the index pages.           |


> ⚠️ The `layout:` path is **relative to the markdown file**. If your post is
> nested deeper, add more `../`s. The PostLayout path from a file at
> `src/pages/blog/topic/sub/post.md` would be
> `../../../../layouts/PostLayout.astro`.

### Adding a new topic

Just create a new folder under `src/pages/blog/`:

```bash
mkdir -p src/pages/blog/recipes
$EDITOR src/pages/blog/recipes/sourdough.md
```

The new "Recipes" topic appears automatically on `/blog`. No config changes
needed.

---

## Adding images

There are three places images can live; pick the one that fits.

### Post images: `public/images/posts/`

Most blog images go here. Reference them by absolute path:

```markdown
![A friendly diagram](/images/posts/my-diagram.svg)
```

### Site assets: `public/`

Things used across the whole site — favicon, logo, OG image:

```
public/
├── favicon.svg          ← change to your icon
├── logo.svg             ← if you want to use an <img>-based logo
├── robots.txt
└── images/
    └── og-default.svg   ← Open Graph fallback for posts without a hero
```

### Optimized images: `src/assets/`

If you want resizing / WebP / AVIF, put images in `src/assets/` and use Astro's
`<Image>` component in `.astro` or `.mdx` files. Most users won't need this for
blog posts — `public/` works great.

---

## Theming

All visual tokens live in **one file**: `[src/styles/theme.css](src/styles/theme.css)`.

```css
:root {
  --accent: #2f6feb;          /* primary brand color */
  --accent-hover: #1d4fc2;
  --accent-soft: #e7efff;     /* very light tint, used for tag/active bg */

  --bg: #fbfbfa;              /* page background */
  --surface: #ffffff;         /* cards, headers */
  --text: #1a1a1a;
  --text-muted: #6b6b6b;

  --font-sans: ui-sans-serif, system-ui, ...;
  --font-body: var(--font-sans);
  --font-heading: var(--font-sans);

  --content-width: 720px;     /* article max width */
  /* …and more */
}
```

Change a value, save, refresh. The whole site updates.

There's a full walkthrough in
[the customizing-theme post](src/pages/blog/tutorials/customizing-theme.md).

### Site-level config (title, nav, social)

Edit `[src/lib/site.ts](src/lib/site.ts)`:

```ts
export const SITE = {
  title: "my-blog",
  description: "Notes, essays, and projects.",
  tagline: "Thinking out loud about the web.",
  author: "Your Name",
  url: "https://yourblog.com",
  primaryNav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/yourname" },
    { label: "RSS", href: "/rss.xml" },
  ],
};
```

---

## Deploying to Cloudflare Workers

This template ships static HTML to Cloudflare's
[Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
There's **no Worker script** — Cloudflare just serves the files.

### One-time setup

1. Create a [Cloudflare account](https://dash.cloudflare.com/sign-up) (free
  tier is plenty for a blog).
2. Authenticate Wrangler:
  ```bash
   npx wrangler login
  ```
3. Edit `[wrangler.jsonc](wrangler.jsonc)`:
  - Set `name` to your desired worker name. Final URL will be
   `https://<name>.<your-subdomain>.workers.dev`.
4. Edit `astro.config.mjs` and `src/lib/site.ts` to set your real site URL.

### Deploy

```bash
npm run deploy
```

This runs `astro build` then `wrangler deploy`. The first deploy will print the
URL where your site is live.

### Custom domain

Once deployed, you can attach a custom domain in the Cloudflare dashboard:
**Workers & Pages → your worker → Settings → Domains & Routes → Add Custom
Domain**. If your domain's DNS is on Cloudflare, it's a one-click setup.

### Local Cloudflare preview

To test exactly what Cloudflare will serve (including the static-asset routing
rules in `wrangler.jsonc`):

```bash
npm run cf-preview
```

---

## Demo deploy on GitHub Pages

Cloudflare remains the primary deployment path, but you can also publish a demo
version to GitHub Pages with zero impact on the Cloudflare setup.

This repo includes a workflow at `.github/workflows/deploy-pages.yml` that
builds `dist/` and deploys it to GitHub Pages.

### One-time GitHub setup

1. In your GitHub repo, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. In **Settings → Secrets and variables → Actions → Variables**, add:
   - `PUBLIC_SITE_URL`
   - `PUBLIC_BASE_PATH`

### Variable values

- If your repo is a **project page** (URL looks like
  `https://<user>.github.io/<repo>/`):
  - `PUBLIC_SITE_URL = https://<user>.github.io`
  - `PUBLIC_BASE_PATH = /<repo>`
- If your repo is a **user/org page** (URL looks like
  `https://<user>.github.io/`):
  - `PUBLIC_SITE_URL = https://<user>.github.io`
  - `PUBLIC_BASE_PATH = /`

Once set, every push to `main` will auto-deploy a demo site to GitHub Pages.

### Important URL note (project pages)

If this repo is a project page (for example `md-blog-tmpl`), the demo URL is:

`https://<user>.github.io/<repo>/`

So for this template, it would be:

`https://jjcchambers.github.io/md-blog-tmpl/`

`https://<user>.github.io/` is a different site (your user/org page) and may
show 404 if you do not have one configured.

### Troubleshooting (unstyled page / missing images)

If the demo loads but looks unstyled or images are missing, the base path is
usually wrong. Verify your Actions variables:

- `PUBLIC_SITE_URL = https://<user>.github.io`
- `PUBLIC_BASE_PATH = /<repo>` (project pages) or `/` (user/org pages)

Then re-run the GitHub Pages workflow and hard refresh the browser.

---

## Other useful commands


| Command              | What it does                                              |
| -------------------- | --------------------------------------------------------- |
| `npm run dev`        | Start the Astro dev server with hot reload.               |
| `npm run build`      | Build the static site into `dist/`.                       |
| `npm run preview`    | Preview the built site locally (Astro's preview server).  |
| `npm run cf-preview` | Preview the built site under `wrangler dev` (Cloudflare). |
| `npm run deploy`     | Build then deploy to Cloudflare Workers.                  |


---

## What does **not** ship in this template

To keep the template lean, a few common-but-optional things are deliberately
left out. Here's how to add them if you want them:


| Feature      | How to add                                                          |
| ------------ | ------------------------------------------------------------------- |
| Comments     | Add [Giscus](https://giscus.app) or [Cusdis](https://cusdis.com).   |
| Search       | Add [Pagefind](https://pagefind.app) (static, in-browser).          |
| Newsletter   | Buttondown / ConvertKit form embed in `BaseLayout.astro`.           |
| Math (LaTeX) | `npm i remark-math rehype-katex` and wire up in `astro.config.mjs`. |
| MDX          | `npx astro add mdx`.                                                |
| Image opt.   | Move images to `src/assets/`, use Astro's `<Image>` component.      |


---

## License

MIT — fork it, ship it, change everything.

---
layout: ../../../layouts/PostLayout.astro
title: Welcome to your new blog
description: A 60-second tour of how this template works and where to start writing.
date: 2026-05-06
author: md-blog
tags: [welcome, getting-started]
hero: /images/posts/welcome-hero.svg
---

Welcome! If you can see this page, your blog is up and running. This post is a
quick tour of how the template works.

## How posts are organized

Every Markdown file you put under `src/pages/blog/<topic>/<slug>.md` becomes a
post automatically. The folder it lives in becomes the post's **topic**, and the
file name (minus `.md`) becomes the URL slug. For example:

```
src/pages/blog/getting-started/welcome.md
↓
https://yourblog.com/blog/getting-started/welcome
```

The blog index at [`/blog`](/blog/) groups posts by topic for you, and the
homepage shows the most recent posts. You don't need to register your post
anywhere — it just appears.

## Frontmatter

Each post starts with a YAML frontmatter block:

```yaml
---
layout: ../../../layouts/PostLayout.astro
title: Welcome to your new blog
description: A 60-second tour of how this template works and where to start.
date: 2026-05-06
author: md-blog
tags: [welcome, getting-started]
hero: /images/posts/welcome-hero.svg
---
```

| Field         | Required | Notes                                                  |
| ------------- | :------: | ------------------------------------------------------ |
| `layout`      | yes      | Use `PostLayout.astro` for posts. Path is relative.    |
| `title`       | yes      | Shown in the page header, browser tab, and meta tags.  |
| `description` | no       | Used for previews, OG tags, and the homepage card.     |
| `date`        | no       | ISO 8601. Drives sort order and the byline.            |
| `author`      | no       | Defaults to `SITE.author` from `src/lib/site.ts`.      |
| `tags`        | no       | Array of strings, rendered as pills above the title.   |
| `hero`        | no       | Path to a hero image — used in cards and at top of post. |
| `draft`       | no       | When `true`, the post is hidden from listings.         |

## What next?

Take a look at the other example posts to see what's possible:

- [Markdown cheatsheet](/blog/getting-started/markdown-cheatsheet/) — every
  Markdown feature this template supports.
- [Adding images to posts](/blog/tutorials/adding-images/) — where to put images
  and how to reference them.
- [Customizing the theme](/blog/tutorials/customizing-theme/) — change colors
  and fonts in one file.
- [Why static sites still win](/blog/thoughts/why-static-sites/) — opinion piece
  showing what a long-form post looks like.

When you're ready to make it yours, edit `src/lib/site.ts`, replace the contents
of this folder with your own posts, and run `npm run deploy`.

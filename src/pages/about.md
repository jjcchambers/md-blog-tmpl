---
layout: ../layouts/PostLayout.astro
title: About this template
description: A few notes on what this template is, why it exists, and how to make it your own.
date: 2026-05-06
author: md-blog
tags: [meta]
---

This is a **markdown blog template** built with [Astro](https://astro.build) and
designed to deploy to **Cloudflare Workers**. It's intentionally lightweight: write
posts in plain Markdown, drop them in a folder, and they appear on the site
automatically.

## Why this template exists

I wanted a blog that:

- Has zero runtime cost — pure static HTML / CSS shipped from Cloudflare's edge.
- Lets me write in plain Markdown, no MDX gymnastics required.
- Auto-generates navigation from my folder structure, so I don't have to keep a
  config file in sync with my posts.
- Is themeable via a single CSS file.

## What's included

- Auto-routing from directory structure (`src/pages/blog/topic/post.md` →
  `/blog/topic/post`)
- Light/dark theme via CSS custom properties
- RSS feed at `/rss.xml`, sitemap at `/sitemap-index.xml`
- Reasonable defaults for SEO + Open Graph
- One-command Cloudflare deployment via `npm run deploy`

See the [README](https://github.com/) for full setup instructions.

---
layout: ../../../layouts/PostLayout.astro
title: Why static sites still win in 2026
description: A short opinion piece on why pre-rendered HTML is still the best default for blogs.
date: 2026-05-01
author: md-blog
tags: [opinion, static-sites, performance]
---

Every couple of years someone declares that static sites are dead. Then
Cloudflare adds another zero to its free tier and the whole conversation
restarts.

This is the most boring possible take, but I'll defend it anyway: **for a blog,
plain pre-rendered HTML served from a CDN is still the right default in 2026.**

## The pitch is unchanged

A static site is just a folder of HTML files. There's no database, no app
server, no container, no runtime. When someone visits, the CDN node nearest
them serves a file. That's it.

This unlocks four things that compounded together are hard to beat:

1. **Speed.** First byte latency is measured in milliseconds, anywhere on Earth.
2. **Cost.** Cloudflare's free tier covers ~100,000 requests per day. Most blogs
   never leave the free tier.
3. **Reliability.** No origin to fall over. If the CDN is up, the site is up.
4. **Security.** Nothing to exploit. No SQL injection on a `.html` file.

## "But what about…"

> What if I want comments?

Add [Giscus](https://giscus.app/), [Cusdis](https://cusdis.com/), or just link
to a Mastodon thread. None of these change the fact that the post itself is
static.

> What if I want a contact form?

A single Cloudflare Worker (or Formspree, or Netlify Forms) handles this in
about 30 lines of code. The blog stays static.

> What about search?

[Pagefind](https://pagefind.app/) generates a static search index at build
time. Searches happen entirely in the browser. No server.

> What about real-time features?

If you legitimately need real-time features in your blog, you don't need a
blog. You need an app. Different problem.

## Where I'd reach for something heavier

I'd absolutely reach for SSR (or even SSG with islands) when:

- Pages need to be personalized per user (dashboards, account pages).
- Content changes faster than I can rebuild (live scoreboards, ticker data).
- I have meaningful client-side interactivity that needs hydration.

For everything else — and especially for a blog — start static. You can always
add a Worker later if you actually need one.

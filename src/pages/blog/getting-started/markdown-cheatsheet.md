---
layout: ../../../layouts/PostLayout.astro
title: Markdown cheatsheet
description: A reference of every Markdown feature supported out of the box.
date: 2026-05-04
author: md-blog
tags: [markdown, reference]
---

This post demonstrates every Markdown feature wired up in the template, so you
can copy-paste into your own posts.

## Headings

```markdown
# H1 — only one per page (the post title)
## H2
### H3
#### H4
```

## Inline formatting

You can write **bold**, *italic*, ~~strikethrough~~, and `inline code`. You can
also link to [external sites](https://astro.build) or to
[other posts](/blog/getting-started/welcome/).

## Lists

Unordered:

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

Ordered:

1. Open your editor
2. Create a new `.md` file
3. Start writing

## Blockquote

> "Premature optimization is the root of all evil." — Donald Knuth

## Code blocks

Syntax highlighting is provided by Shiki. Specify a language for color:

```ts
interface Post {
  title: string;
  date: Date;
}

function publish(post: Post): void {
  console.log(`Publishing: ${post.title}`);
}
```

```bash
# Build and deploy in one command
npm run deploy
```

## Tables

| Feature  | Built-in | Notes                              |
| -------- | :------: | ---------------------------------- |
| Markdown |    ✅    | `.md` files in `src/pages`         |
| MDX      |    🧩    | Add via `npx astro add mdx`        |
| RSS      |    ✅    | Generated at `/rss.xml`            |
| Sitemap  |    ✅    | Generated at `/sitemap-index.xml`  |

## Horizontal rule

---

## Images

See [Adding images to posts](/blog/tutorials/adding-images/) for the full
walkthrough — but the short version is:

```markdown
![Alt text](/images/posts/your-image.png)
```

## Footnotes

GitHub-flavored Markdown footnotes also work[^1].

[^1]: Like this — they render at the bottom of the article.

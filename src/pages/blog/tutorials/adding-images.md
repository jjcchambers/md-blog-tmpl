---
layout: ../../../layouts/PostLayout.astro
title: Adding images to your posts
description: Where images live, how to reference them, and how to set a hero image.
date: 2026-05-05
author: md-blog
tags: [images, tutorial]
hero: /images/posts/images-hero.svg
---

There are three places you can put images, and each has a different purpose.

## 1. Hero images and post images — `public/images/`

Anything in `public/` is copied to the build output as-is. The convention in
this template is:

```
public/
└── images/
    ├── og-default.svg          ← default Open Graph image
    └── posts/
        ├── welcome-hero.svg    ← used by welcome.md
        └── adding-images-1.svg ← inline in this post
```

Reference these images with an absolute path starting with `/`:

```markdown
![A friendly diagram](/images/posts/adding-images-1.svg)
```

Result:

![A friendly diagram showing files flowing into a static site](/images/posts/adding-images-1.svg)

You can also set a `hero` image in your frontmatter — it shows above the post
and on the post card on the homepage:

```yaml
---
title: My post
hero: /images/posts/my-post-hero.svg
---
```

## 2. Site-wide assets — `public/`

Things like your favicon or logo go directly in `public/`:

```
public/
├── favicon.svg
├── favicon.ico
└── logo.svg
```

These are referenced from `BaseLayout.astro` and `Logo.astro`.

## 3. Optimized images — `src/assets/`

If you want Astro to optimize an image (resize, convert to WebP/AVIF, etc.),
put it in `src/assets/` and use Astro's `<Image>` component. This requires
authoring with `.astro` or `.mdx` files instead of plain `.md`. Most users won't
need this — `public/` works great for blog images.

## Image best practices

- **Use SVG** for diagrams, icons, and simple illustrations. They're tiny and
  look perfect at any size.
- **Compress JPEGs/PNGs** before committing. Try [Squoosh](https://squoosh.app/).
- **Always include alt text**. It helps screen readers and is a fallback when
  the image doesn't load.
- **Pick reasonable dimensions** — for hero images, 1600×900 is a good target.

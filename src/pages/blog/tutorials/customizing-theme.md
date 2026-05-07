---

## layout: ../../../layouts/PostLayout.astro
title: Customizing the theme
description: Change colors, fonts, and spacing in one file. No CSS spelunking required.
date: 2026-05-03
author: md-blog
tags: [theme, css, tutorial]

The entire visual identity of the site lives in a single file:

```
src/styles/theme.css
```

It defines CSS custom properties for colors, fonts, spacing, and shadows. Every
component reads from these variables, so changing them propagates everywhere.

## Changing the accent color

Open `src/styles/theme.css` and look for the `--accent` variable:

```css
:root {
  --accent: #2f6feb;
  --accent-hover: #1d4fc2;
  --accent-soft: #e7efff;
}
```

Change those three values to your brand color. (`--accent-soft` should be a
much lighter tint — used for backgrounds of tags and active nav items.)

For example, to switch to a warm orange:

```css
:root {
  --accent: #ea580c;
  --accent-hover: #c2410c;
  --accent-soft: #fff1e7;
}
```

## Changing fonts

Theme.css defines three font stacks:

```css
--font-sans: ui-sans-serif, system-ui, ...;
--font-serif: ui-serif, Georgia, ...;
--font-mono: ui-monospace, SFMono-Regular, ...;
```

…and three roles that use them:

```css
--font-body: var(--font-sans);
--font-heading: var(--font-sans);
--font-code: var(--font-mono);
```

Want serif headings and a sans body? Just change `--font-heading`:

```css
--font-heading: var(--font-serif);
```

Want a custom Google Font? Add the `<link>` to `BaseLayout.astro`'s `<head>`,
then update the variable. For example, for **Inter**:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
  rel="stylesheet"
/>
```

```css
--font-sans: "Inter", system-ui, sans-serif;
```

## Dark mode

Two themes are defined:

- A **light** default in `:root`.
- A **dark** override that activates either via `prefers-color-scheme: dark`
(the user's OS setting) **or** when the user clicks the toggle in the header
(which sets `data-theme="dark"` on the root and saves to `localStorage`).

To customize dark mode, edit the values inside the `[data-theme="dark"]` and
`@media (prefers-color-scheme: dark)` blocks.

## Want to disable dark mode?

Remove the `<ThemeToggle />` component from `Nav.astro`, then delete the
`[data-theme="dark"]` block and the `prefers-color-scheme` block from
`theme.css`.
/**
 * Site-wide configuration. Edit these to customize your blog.
 * Everything that should be easy-to-change at the brand/identity level
 * lives here.
 */
export const SITE = {
  /** Shown in the browser tab and in the header logo */
  title: "md-blog",
  /** Shown under the logo / used as default <meta description> */
  description:
    "A lightweight markdown blog template — write `.md` files, ship to Cloudflare.",
  /** Tagline rendered in the homepage hero */
  tagline:
    "Write posts in plain Markdown. Drop them in a folder. They appear here.",
  /** Author shown by default on posts */
  author: "Your Name",
  /** Used for absolute URLs (RSS, OG tags). Should match `site` in astro.config.mjs */
  url: "https://example.com",
  /** Top-of-page navigation. Each item links to a top-level route. */
  primaryNav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
  ],
  /** Optional social / external links rendered in the footer */
  social: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "RSS", href: "/rss.xml" },
  ],
} as const;

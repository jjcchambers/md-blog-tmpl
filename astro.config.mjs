// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// IMPORTANT: change this to your deployed site URL.
// It is used by the sitemap, RSS feed, and Open Graph meta tags.
const rawSiteUrl = process.env.PUBLIC_SITE_URL?.trim();
const rawBasePath = process.env.PUBLIC_BASE_PATH?.trim();
const SITE_URL = rawSiteUrl ? rawSiteUrl : "https://example.com";
const BASE_PATH = rawBasePath ? rawBasePath : "/";

function normalizeBase(base) {
  if (!base || base === "/") return "/";
  const trimmed = base.replace(/\/+$/, "");
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function withBase(url, base) {
  if (!url || !url.startsWith("/") || url.startsWith("//")) return url;
  const normalizedBase = normalizeBase(base);
  if (normalizedBase === "/") return url;
  if (url === normalizedBase || url.startsWith(`${normalizedBase}/`)) return url;
  return `${normalizedBase}${url}`;
}

function prefixMarkdownRootUrls(base) {
  return (tree) => {
    const walk = (node) => {
      if (!node || typeof node !== "object") return;

      if (
        (node.type === "link" || node.type === "image") &&
        typeof node.url === "string"
      ) {
        node.url = withBase(node.url, base);
      }

      if (Array.isArray(node.children)) {
        for (const child of node.children) walk(child);
      }
    };

    walk(tree);
  };
}

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [prefixMarkdownRootUrls(BASE_PATH)],
    shikiConfig: {
      // Built-in Shiki theme. See: https://shiki.style/themes
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
  build: {
    // Emit pretty URLs: /blog/topic/post/ (no .html in URL).
    // Cloudflare's static assets server resolves /blog/topic/post -> /blog/topic/post/index.html
    // automatically, so both /blog/topic/post and /blog/topic/post.html (when format: 'file') work.
    format: "directory",
  },
});

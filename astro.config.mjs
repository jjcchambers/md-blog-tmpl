// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// IMPORTANT: change this to your deployed site URL.
// It is used by the sitemap, RSS feed, and Open Graph meta tags.
const SITE_URL = "https://example.com";

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  markdown: {
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

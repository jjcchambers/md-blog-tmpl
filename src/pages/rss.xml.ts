import rss from "@astrojs/rss";
import { SITE } from "../lib/site";
import { getAllPosts } from "../lib/posts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = getAllPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description ?? "",
      pubDate: post.frontmatter.date
        ? new Date(post.frontmatter.date)
        : new Date(),
      link: post.url,
    })),
  });
}

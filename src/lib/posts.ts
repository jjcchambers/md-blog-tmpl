/**
 * posts.ts
 * --------
 * Reads every markdown file under `src/pages/blog/**` at build time and exposes
 * helpers for listing posts, grouping by topic (the directory the post lives
 * in), and generating navigation. Because Vite/Astro statically analyzes
 * `import.meta.glob`, this all happens at build time — no runtime cost.
 */

export interface PostFrontmatter {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
  hero?: string;
  draft?: boolean;
}

export interface Post {
  /** Public URL, e.g. `/blog/getting-started/welcome` */
  url: string;
  /** Topic / category derived from the parent directory, e.g. `getting-started` */
  topic: string;
  /** Human-friendly topic, e.g. `Getting Started` */
  topicLabel: string;
  /** Slug of the post itself, e.g. `welcome` */
  slug: string;
  frontmatter: PostFrontmatter;
}

const modules = import.meta.glob<{
  url: string;
  frontmatter: PostFrontmatter;
}>("/src/pages/blog/**/*.md", { eager: true });

const HUMANIZE = (s: string): string =>
  s
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

function buildPosts(): Post[] {
  const posts: Post[] = [];

  for (const [filePath, mod] of Object.entries(modules)) {
    if (!mod.url) continue;
    if (mod.frontmatter?.draft) continue;

    // filePath looks like `/src/pages/blog/getting-started/welcome.md`.
    // We strip the prefix to get `getting-started/welcome.md`, then split.
    const rel = filePath.replace(/^\/src\/pages\/blog\//, "").replace(/\.md$/, "");
    const parts = rel.split("/");

    // Posts directly under /blog with no topic dir get topic = "General".
    let topic: string;
    let slug: string;
    if (parts.length === 1) {
      topic = "general";
      slug = parts[0]!;
    } else {
      topic = parts.slice(0, -1).join("/");
      slug = parts[parts.length - 1]!;
    }

    posts.push({
      url: mod.url,
      topic,
      topicLabel: HUMANIZE(topic.split("/").pop() ?? topic),
      slug,
      frontmatter: mod.frontmatter,
    });
  }

  // Newest first
  posts.sort((a, b) => {
    const da = a.frontmatter.date ? Date.parse(a.frontmatter.date) : 0;
    const db = b.frontmatter.date ? Date.parse(b.frontmatter.date) : 0;
    return db - da;
  });

  return posts;
}

const ALL_POSTS = buildPosts();

export function getAllPosts(): Post[] {
  return ALL_POSTS;
}

export interface TopicGroup {
  topic: string;
  topicLabel: string;
  posts: Post[];
}

export function getTopics(): TopicGroup[] {
  const map = new Map<string, TopicGroup>();
  for (const post of ALL_POSTS) {
    let group = map.get(post.topic);
    if (!group) {
      group = { topic: post.topic, topicLabel: post.topicLabel, posts: [] };
      map.set(post.topic, group);
    }
    group.posts.push(post);
  }
  return [...map.values()].sort((a, b) =>
    a.topicLabel.localeCompare(b.topicLabel),
  );
}

export function formatDate(input?: string): string {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

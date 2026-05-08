const BASE_URL = import.meta.env.BASE_URL || "/";

function normalizeBase(base: string): string {
  if (!base || base === "/") return "/";
  const trimmed = base.replace(/\/+$/, "");
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

const NORMALIZED_BASE = normalizeBase(BASE_URL);

export function withBase(url: string): string {
  if (!url) return url;
  if (/^[a-z]+:\/\//i.test(url) || url.startsWith("//")) return url;
  if (!url.startsWith("/")) return url;

  if (NORMALIZED_BASE === "/") return url;
  if (url === NORMALIZED_BASE || url.startsWith(`${NORMALIZED_BASE}/`)) return url;

  return `${NORMALIZED_BASE}${url}`;
}

export function isInternalPath(url: string): boolean {
  return url.startsWith("/") && !url.startsWith("//");
}

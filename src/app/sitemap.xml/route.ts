import { getAllPosts } from "@/lib/posts";
import { getAllTags } from "@/lib/tags";
import { SITE } from "@/lib/constants";

export async function GET() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const pages = [
    { url: SITE.url, lastmod: new Date().toISOString().split("T")[0], freq: "daily" },
    { url: `${SITE.url}/posts`, lastmod: new Date().toISOString().split("T")[0], freq: "daily" },
    { url: `${SITE.url}/tags`, lastmod: new Date().toISOString().split("T")[0], freq: "weekly" },
  ];

  const postUrls = posts.map((p) => ({
    url: `${SITE.url}/posts/${p.slug}`,
    lastmod: (p.updated ?? p.date).toString().split("T")[0],
    freq: "monthly",
  }));

  const tagUrls = tags.map(({ tag }) => ({
    url: `${SITE.url}/tags/${encodeURIComponent(tag)}`,
    lastmod: new Date().toISOString().split("T")[0],
    freq: "weekly",
  }));

  const all = [...pages, ...postUrls, ...tagUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.freq}</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

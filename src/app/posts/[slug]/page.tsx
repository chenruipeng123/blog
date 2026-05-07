import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { readingTime } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { PostHeader } from "@/components/post-header";
import { MDXRenderer } from "@/components/mdx-renderer";
import { TableOfContents } from "@/components/table-of-contents";
import { BackToTop } from "@/components/back-to-top";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "未找到" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE.url}/posts/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
      url: `${SITE.url}/posts/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const rt = readingTime(post.excerpt);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex gap-12">
        {/* Main content */}
        <article className="min-w-0 flex-1 max-w-3xl">
          <PostHeader post={post} readingTime={rt} />
          <div className="prose dark:prose-invert max-w-none">
            <MDXRenderer code={post.code} />
          </div>
        </article>

        {/* Sidebar TOC */}
        <aside className="w-56 shrink-0">
          <TableOfContents toc={post.toc} />
        </aside>
      </div>

      <BackToTop />
    </div>
  );
}

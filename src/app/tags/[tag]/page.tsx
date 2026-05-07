import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/tags";
import { PostList } from "@/components/post-list";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `标签 "${tag}" 下的所有文章`,
  };
}

export default async function TagPostsPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">
        <span className="text-gray-400 dark:text-gray-500">#</span>
        {decodedTag}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {posts.length} 篇文章
      </p>
      <PostList posts={posts} />
    </div>
  );
}

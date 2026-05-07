import type { Metadata } from "next";
import { getPaginatedPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { Pagination } from "@/components/pagination";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "文章",
  description: "所有技术踩坑记录",
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const { posts, totalPages, currentPage: safePage } = getPaginatedPosts(currentPage);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">文章</h1>
      <PostList posts={posts} />
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
      />
    </div>
  );
}

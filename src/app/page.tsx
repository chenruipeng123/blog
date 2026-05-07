import { getRecentPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { SITE } from "@/lib/constants";
import Link from "next/link";

export default function HomePage() {
  const recentPosts = getRecentPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {SITE.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          {SITE.description}
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">最新文章</h2>
          {recentPosts.length > 0 && (
            <Link
              href="/posts"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              查看全部 &rarr;
            </Link>
          )}
        </div>
        <PostList posts={recentPosts} />
      </section>
    </div>
  );
}

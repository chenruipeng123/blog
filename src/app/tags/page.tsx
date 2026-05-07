import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/tags";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览所有文章",
};

export default function TagsPage() {
  const tags = getAllTags();
  const maxCount = tags[0]?.count ?? 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">标签</h1>

      {tags.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">暂无标签。</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map(({ tag, count }) => {
            const size = 0.75 + (count / maxCount) * 1.25;
            return (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-block px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                style={{ fontSize: `${size}rem` }}
              >
                {tag}
                <span className="ml-1.5 text-xs text-gray-400 dark:text-gray-500">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

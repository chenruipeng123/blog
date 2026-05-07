"use client";

import { useState, useMemo, useCallback } from "react";
import Fuse from "fuse.js";
import { PostCard } from "@/components/post-card";
import type { Post } from "#content";

interface Props {
  posts: Post[];
}

function SearchContent({ posts }: Props) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags", "excerpt"],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts]
  );

  const results = useMemo(() => {
    if (!query.trim()) return null;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse]);

  return (
    <div>
      <div className="mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索文章..."
          autoFocus
          className="w-full px-4 py-3 text-lg border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {query.trim() === "" ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          输入关键词开始搜索
        </p>
      ) : results && results.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          没有找到匹配的文章，试试其他关键词。
        </p>
      ) : results ? (
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            找到 {results.length} 篇相关文章
          </p>
          {results.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

import { posts } from "#content";

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">搜索</h1>
      <SearchContent posts={posts} />
    </div>
  );
}

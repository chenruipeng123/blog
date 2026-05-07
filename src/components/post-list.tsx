import type { Post } from '@/lib/posts'
import { PostCard } from './post-card'

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 py-8 text-center">
        暂无文章。
      </p>
    )
  }

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}

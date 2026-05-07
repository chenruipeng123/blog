import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { TagBadge } from './tag-badge'

interface PostHeaderProps {
  post: Post
  readingTime: number
}

export function PostHeader({ post, readingTime }: PostHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        {post.title}
      </h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <time dateTime={new Date(post.date).toISOString().slice(0, 10)}>
          {formatDate(post.date)}
        </time>
        <span>&middot;</span>
        <span>{readingTime} 分钟阅读</span>
        {post.updated && (
          <>
            <span>&middot;</span>
            <span>更新于 {formatDate(post.updated)}</span>
          </>
        )}
      </div>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </header>
  )
}

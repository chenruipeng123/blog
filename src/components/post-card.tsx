import Link from 'next/link'
import type { Post } from '@/lib/posts'
import { formatDate, readingTime } from '@/lib/utils'
import { TagBadge } from './tag-badge'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="py-6 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <time dateTime={new Date(post.date).toISOString().slice(0, 10)}>
          {formatDate(post.date)}
        </time>
        <span>&middot;</span>
        <span>{readingTime(post.excerpt)} 分钟</span>
      </div>
      <Link href={`/posts/${post.slug}`} className="group">
        <h2 className="text-xl font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
        {post.description}
      </p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}

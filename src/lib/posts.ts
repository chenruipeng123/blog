import { posts } from '#content'
import type { Post } from '#content'
import { SITE } from './constants'
import { readingTime } from './utils'

export type { Post }

export interface PaginatedResult {
  posts: Post[]
  totalPages: number
  currentPage: number
  total: number
}

function published(): Post[] {
  return posts
    .filter(p => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllPosts(): Post[] {
  return published()
}

export function getPostBySlug(slug: string): Post | undefined {
  return published().find(p => p.slug === slug)
}

export function getPaginatedPosts(page: number, pageSize: number = SITE.postsPerPage): PaginatedResult {
  const all = published()
  const total = all.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize
  return {
    posts: all.slice(start, start + pageSize),
    totalPages,
    currentPage: safePage,
    total,
  }
}

export function getRecentPosts(count: number = SITE.recentPostsCount): Post[] {
  return published().slice(0, count)
}

export function getReadingTime(post: Post): number {
  return readingTime(post.excerpt + (post as any).raw || post.excerpt)
}

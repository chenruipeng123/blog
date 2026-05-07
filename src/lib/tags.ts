import { getAllPosts } from './posts'
import type { Post } from '#content'

export interface TagCount {
  tag: string
  count: number
}

export function getAllTags(): TagCount[] {
  const tagMap = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1)
    }
  }
  return [...tagMap.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(p => p.tags.includes(tag))
}

'use client'

import { useEffect, useState, useMemo } from 'react'

interface TocItem {
  title: string
  url: string
  items: TocItem[]
}

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  const flatIds = useMemo(() => {
    const ids: string[] = []
    const walk = (items: TocItem[]) => {
      for (const item of items) {
        ids.push(item.url.slice(1))
        walk(item.items)
      }
    }
    walk(toc)
    return ids
  }, [toc])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    for (const id of flatIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [flatIds])

  if (toc.length === 0) return null

  return (
    <nav className="hidden lg:block sticky top-20">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
        目录
      </h3>
      <Tree items={toc} activeId={activeId} />
    </nav>
  )
}

function Tree({ items, activeId, depth = 0 }: { items: TocItem[]; activeId: string; depth?: number }) {
  return (
    <ul className={depth > 0 ? 'ml-3' : 'space-y-1'}>
      {items.map(item => (
        <li key={item.url}>
          <a
            href={item.url}
            className={`block text-sm py-1 transition-colors ${
              activeId === item.url.slice(1)
                ? 'text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(item.url)?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {item.title}
          </a>
          {item.items.length > 0 && <Tree items={item.items} activeId={activeId} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  )
}

import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { Rss } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>&copy; {new Date().getFullYear()} {SITE.author}</span>
        <Link
          href="/rss.xml"
          className="flex items-center gap-1 hover:text-orange-500 transition-colors"
        >
          <Rss size={14} />
          RSS
        </Link>
      </div>
    </footer>
  )
}

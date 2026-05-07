import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export function Pagination({ currentPage, totalPages, basePath = '/posts' }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-2 pt-8">
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft size={14} />
          上一页
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed">
          <ChevronLeft size={14} />
          上一页
        </span>
      )}

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`w-9 h-9 flex items-center justify-center text-sm rounded-md transition-colors ${
              page === currentPage
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          下一页
          <ChevronRight size={14} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed">
          下一页
          <ChevronRight size={14} />
        </span>
      )}
    </nav>
  )
}

'use client'

import { useState, useCallback } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  language: string
  theme: string
  children: React.ReactNode
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    const codeElement = document.querySelector(`[data-language="${language}"]`)
    if (!codeElement) return
    const text = codeElement.textContent ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [language])

  return (
    <div className="group relative">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg border border-b-0 border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        <span>{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          aria-label="复制代码"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <div className="overflow-x-auto rounded-b-lg border border-gray-200 dark:border-gray-700 bg-[#22272e]">
        {children}
      </div>
    </div>
  )
}

import Link from 'next/link'
import { CodeBlock } from './code-block'
import type { ComponentPropsWithoutRef } from 'react'

function Pre({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  const child = children as any
  const codeProps = child?.props ?? {}
  const language = codeProps['data-language'] ?? ''
  const theme = codeProps['data-theme'] ?? ''

  if (!language) {
    return <pre {...props}>{children}</pre>
  }

  return <CodeBlock language={language} theme={theme}>{children}</CodeBlock>
}

function CustomLink({ href, ...props }: ComponentPropsWithoutRef<'a'>) {
  if (!href) return <a {...props} />

  const isExternal = href.startsWith('http://') || href.startsWith('https://')

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    )
  }

  return <Link href={href} {...props as any} />
}

export const MDXComponents = {
  pre: Pre,
  a: CustomLink,
}

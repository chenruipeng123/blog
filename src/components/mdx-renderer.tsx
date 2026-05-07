'use client'

import { useMemo } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { MDXComponents } from './mdx-components'

interface MDXRendererProps {
  code: string
}

export function MDXRenderer({ code }: MDXRendererProps) {
  const Content = useMemo(() => {
    const fn = new Function('runtime', `const{jsx,jsxs,Fragment}=runtime;${code}`)
    return fn(jsxRuntime).default
  }, [code])

  return <Content components={MDXComponents} />
}

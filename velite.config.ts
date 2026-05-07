import { defineConfig, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  root: './content',
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string(),
        slug: s.string(),
        description: s.string(),
        date: s.isodate(),
        updated: s.isodate().optional(),
        tags: s.array(s.string()).default([]),
        draft: s.boolean().default(false),
        code: s.mdx(),
        toc: s.toc(),
        excerpt: s.excerpt({ length: 200 }),
      }),
    },
  },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: {
          className: ['anchor-link'],
          ariaHidden: true,
          tabIndex: -1,
        },
      }],
      [rehypePrettyCode, {
        keepBackground: false,
      }],
    ],
    remarkPlugins: [remarkGfm],
  },
  output: {
    data: '.velite',
    assets: 'public/static',
    clean: true,
  },
})

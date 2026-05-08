const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
if (args.length < 2) {
  console.log('用法: npm run new -- "文章标题" slug')
  console.log('例如: npm run new -- "Nginx 502 排查" nginx-502-debug')
  process.exit(1)
}

const [title, slug] = args
const today = new Date().toISOString().slice(0, 10)
const filename = `${today}-${slug}.mdx`
const filepath = path.join(__dirname, '..', 'content', 'posts', filename)

const template = `---
title: ${title}
slug: ${slug}
description:
date: ${today}
tags: []
---

## 背景



## 原因



## 解决


`

fs.mkdirSync(path.dirname(filepath), { recursive: true })

if (fs.existsSync(filepath)) {
  console.log(`文件已存在: ${filepath}`)
  process.exit(1)
}

fs.writeFileSync(filepath, template)
console.log(`已创建: ${filepath}`)

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function readingTime(content: string): number {
  const wordsPerMinute = 300
  const chineseChars = content.match(/[一-鿿]/g)?.length ?? 0
  const words = content.match(/\b\w+\b/g)?.length ?? 0
  const total = chineseChars + words
  return Math.ceil(total / wordsPerMinute)
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ")
}

// src/lib/news.ts

export type Article = {
  title: string
  description: string
  url: string
  urlToImage?: string | null
  source?: {
    name?: string
  }
}

/**
 * Fetch news by category
 * Used by homepage, category page, search, etc.
 */
export async function getNewsByCategory(
  category: string,
  pageSize = 10
): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=${pageSize}&apiKey=${apiKey}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch news")
  }

  const data = await res.json()
  return data.articles
}

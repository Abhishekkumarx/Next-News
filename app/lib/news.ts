export type Article = {
  title: string
  description: string
  urlToImage?: string | null
  source?: {
    name?: string
  }
  url?: string
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export async function getNewsByCategory(
  category: string,
  page = 1,
  pageSize = 12
): Promise<Article[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/api/news?category=${category}&page=${page}&pageSize=${pageSize}`
    )

    if (!res.ok) {
      console.error(
        `News fetch failed for ${category}:`,
        res.status
      )
      return [] 
    }

    const data = await res.json()
    return data.articles ?? []
  } catch (error) {
    console.error("News fetch error:", error)
    return []
  }
}

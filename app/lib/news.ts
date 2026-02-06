export type Article = {
  title: string
  description: string
  urlToImage?: string | null
  source?: {
    name?: string
  }
  url?: string
}

export async function getNewsByCategory(
  category: string,
  page = 1,
  pageSize = 12
): Promise<Article[]> {
  try {
    // Construct absolute URL for fetch
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const url = `${baseUrl}/api/news?category=${category}&page=${page}&pageSize=${pageSize}`

    console.log(`[getNewsByCategory] Fetching: ${category}, page: ${page}`)

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error(
        `[getNewsByCategory] Fetch failed for ${category}:`,
        res.status,
        errorText
      )
      return []
    }

    const data = await res.json()

    if (data.error) {
      console.error(`[getNewsByCategory] API error for ${category}:`, data.error)
      return []
    }

    const articles = data.articles ?? []
    console.log(`[getNewsByCategory] Success for ${category}: ${articles.length} articles`)

    return articles
  } catch (error) {
    console.error(`[getNewsByCategory] Exception for ${category}:`, error)
    return []
  }
}

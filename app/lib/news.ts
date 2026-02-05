export type Article = {
  title: string
  description: string
  urlToImage?: string | null
  source?: {
    name?: string
  }
  url?: string
}

const API_KEY = process.env.NEWS_API_KEY

export async function getNewsByCategory(
  category: string,
  page = 1,
  pageSize = 12
): Promise<Article[]> {
  if (!API_KEY) {
    console.error("NEWS_API_KEY is missing")
    return []
  }

  const url = new URL("https://newsapi.org/v2/top-headlines")
  url.searchParams.set("category", category)
  url.searchParams.set("country", "us")
  url.searchParams.set("page", page.toString())
  url.searchParams.set("pageSize", pageSize.toString())
  url.searchParams.set("apiKey", API_KEY)

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      console.error(
        `News fetch failed for ${category}:`,
        res.status,
        await res.text()
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

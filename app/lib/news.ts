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
    // Check for different deployment environments
    let baseUrl = 'http://localhost:3000' // Default for local development

    if (process.env.VERCEL_URL) {
      // Vercel deployment
      baseUrl = `https://${process.env.VERCEL_URL}`
    } else if (process.env.AWS_APP_ID || process.env.AWS_BRANCH) {
      // AWS Amplify deployment - use the public URL
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
      if (!baseUrl) {
        console.error('[getNewsByCategory] AWS Amplify detected but NEXT_PUBLIC_BASE_URL not set!')
      }
    } else if (process.env.NEXT_PUBLIC_BASE_URL) {
      // Custom base URL provided
      baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    }

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

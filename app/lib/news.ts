export async function getNewsByCategory(
  category: string,
  page = 1,
  pageSize = 12
): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&country=us&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch news")
  }

  const data = await res.json()
  return data.articles
}

import Main from "./components/Main"
import { getNewsByCategory } from "./lib/news"

const CATEGORIES = ["technology", "business", "sports", "health", "entertainment"]

export default async function HomePage() {
  const allNews = await Promise.all(
    CATEGORIES.map((category) =>
      getNewsByCategory(category, 1, 8)
    )
  )

  const articles = allNews.flat()

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 py-8">
      <Main title="Hot Topics" articles={articles} />
    </main>
  )
}

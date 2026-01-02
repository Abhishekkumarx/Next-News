import Image from "next/image"
import HeroSlider from "./components/HeroSlider"

type Article = {
  title: string
  description: string
  url: string
  urlToImage?: string | null
  source?: {
    name?: string
  }
}

const CATEGORIES = ["technology", "business", "sports"]
const PAGE_SIZE = 8

/* FETCH */
async function getNews(category: string): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=${PAGE_SIZE}&apiKey=${apiKey}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch homepage news")
  }

  const data = await res.json()
  return data.articles
}

/* PAGE */
export default async function HomePage() {
  const allNews = await Promise.all(
    CATEGORIES.map((category) => getNews(category))
  )

  const heroArticles = allNews.flat().slice(0, 5)

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 py-8">
      {/* HERO */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
        Hot Topics
      </h1>

      <HeroSlider articles={heroArticles} />

      {/* SECTIONS */}
      {CATEGORIES.map((category, index) => (
        <section key={category} className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold capitalize mb-6">
            {category}
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allNews[index].map((article, i) => (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div
                  className="cursor-pointer overflow-hidden rounded-lg bg-white
                             shadow-md transition-all duration-300
                             hover:scale-[1.08] hover:shadow-lg"
                >
                  {/* IMAGE */}
                  {article.urlToImage && (
                    <div className="relative w-full h-48">
                      <Image
                        src={article.urlToImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* TEXT */}
                  <div className="p-4 h-[160px] flex flex-col">
                    <h3 className="font-semibold text-base leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {article.description}
                    </p>

                    <div className="mt-auto text-xs text-gray-400">
                      {article.source?.name}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

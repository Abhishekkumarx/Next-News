import Image from "next/image"

type Article = {
  title: string
  description: string
  url: string
  urlToImage?: string | null
  source?: {
    name?: string
  }
}

async function getNews(category: string): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=12&apiKey=${apiKey}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch news")
  }

  const data = await res.json()
  return data.articles
}

type CategoryPageProps = {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const articles = await getNews(category)

  // ✅ DEFINE THESE (WAS MISSING)
  const featuredArticle = articles[0]
  const remainingArticles = articles.slice(1)

  return (
    <main className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mt-6 capitalize">
        {category} News
      </h1>

      {/* 🔥 HERO / FEATURED ARTICLE */}
      {featuredArticle && (
        <div className="mt-6 grid md:grid-cols-2 gap-6 items-center">
          {featuredArticle.urlToImage && (
            <Image
              src={featuredArticle.urlToImage}
              alt={featuredArticle.title}
              width={700}
              height={400}
              className="w-full h-80 object-cover rounded-lg"
            />
          )}

          <div>
            <h2 className="text-3xl font-bold leading-tight">
              {featuredArticle.title}
            </h2>

            <p className="text-gray-600 mt-4">
              {featuredArticle.description}
            </p>

            <p className="text-sm text-gray-400 mt-4">
              Source: {featuredArticle.source?.name}
            </p>
          </div>
        </div>
      )}

      {/* 🧱 REMAINING ARTICLES GRID */}
      <div className="grid gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3">
        {remainingArticles.map((article, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden hover:shadow transition"
          >
            {article.urlToImage && (
              <Image
                src={article.urlToImage}
                alt={article.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="font-semibold text-base">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {article.description}
              </p>

              <p className="text-xs text-gray-400 mt-3">
                {article.source?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

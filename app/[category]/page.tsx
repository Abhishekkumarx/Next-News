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
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch news')
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


  return (
    <main className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mt-6 capitalize">
        {category} News
      </h1>

      <div className="grid gap-6 mt-6">
        {articles.map((article, index) => (
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
                <h2 className="text-lg font-semibold">
                  {article.title}
                </h2>

                <p className="text-gray-600 mt-2 text-sm">
                  {article.description}
                </p>

                <p className="text-xs text-gray-400 mt-3">
                  Source: {article.source.name}
                </p>
              </div>
            </div>
          
        ))}
      </div>
    </main>
  )
}

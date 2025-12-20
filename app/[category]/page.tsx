type Article = {
  title: string
  description: string
  url: string
}

async function getNews(category: string): Promise<Article[]> {
  return [
    {
      title: `${category} News Headline 1`,
      description: `This is a sample description for ${category} news.`,
      url: "#",
    },
    {
      title: `${category} News Headline 2`,
      description: `Another important update from ${category}.`,
      url: "#",
    },
  ]
}


type CategoryPageProps = {
  params: {
    category: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const articles = await getNews(params.category)

  return (
    <main className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mt-6 capitalize">
        {params.category} News
      </h1>

      <div className="grid gap-6 mt-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow"
          >
            <h2 className="text-lg font-semibold">
              {article.title}
            </h2>
            <p className="text-gray-600 mt-2">
              {article.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

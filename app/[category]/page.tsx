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

const PAGE_SIZE = 12
const TOTAL_PAGES = 5

async function getNews(
  category: string,
  page: number
): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${apiKey}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch news")
  }

  const data = await res.json()
  return data.articles
}

/* 🔥 BOTH params AND searchParams ARE ASYNC */
type CategoryPageProps = {
  params: Promise<{
    category: string
  }>
  searchParams: Promise<{
    page?: string
  }>
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params
  const resolvedSearchParams = await searchParams

  // ✅ NOW THIS WORKS
  const rawPage = Number(resolvedSearchParams.page) || 1

  const currentPage = Math.min(
    Math.max(rawPage, 1),
    TOTAL_PAGES
  )

  const prevPage =
    currentPage > 1 ? currentPage - 1 : 1
  const nextPage =
    currentPage < TOTAL_PAGES
      ? currentPage + 1
      : TOTAL_PAGES

  const articles = await getNews(category, currentPage)

  const featuredArticle = articles[0]
  const remainingArticles = articles.slice(1)

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold capitalize">
        {category} News
      </h1>

      </div>

      {/* 🔥 HERO SECTION */}
      {featuredArticle && (
        <div className="mt-6 relative overflow-hidden rounded-2xl shadow-lg">
          {featuredArticle.urlToImage && (
            <Image
              src={featuredArticle.urlToImage}
              alt={featuredArticle.title}
              width={1200}
              height={500}
              className="w-full h-[420px] object-cover"
            />
          )}

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50" />

    {/* Text */}
    <div className="absolute bottom-6 left-6 right-6 text-white">
      <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-3xl">
        {featuredArticle.title}
      </h2>

      <p className="mt-3 text-sm text-gray-200 max-w-2xl line-clamp-3">
        {featuredArticle.description}
      </p>

      <p className="mt-2 text-xs text-gray-300">
        {featuredArticle.source?.name}
      </p>
      </div>
      </div>
    )}

      <div className="grid gap-10 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {remainingArticles.map((article, index) => (
          <div
            key={index}
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
          
        ))}
      </div>



      {/* ✅ PAGINATION (NOW WORKS) */}
      <div className="flex justify-center gap-2 mt-12">
        <a
          href={`/${category}?page=${prevPage}`}
          className={`px-3 py-1 border rounded ${
            currentPage === 1
              ? "pointer-events-none opacity-40"
              : "hover:bg-gray-100"
          }`}
        >
          Prev
        </a>

        {Array.from({ length: TOTAL_PAGES }).map((_, i) => {
          const pageNumber = i + 1
          return (
            <a
              key={pageNumber}
              href={`/${category}?page=${pageNumber}`}
              className={`px-3 py-1 border rounded ${
                currentPage === pageNumber
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </a>
          )
        })}

        <a
          href={`/${category}?page=${nextPage}`}
          className={`px-3 py-1 border rounded ${
            currentPage === TOTAL_PAGES
              ? "pointer-events-none opacity-40"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </a>
      </div>
    </main>
  )
}

import Image from "next/image"
import HeroSlider from "../components/HeroSlider"
import { getNewsByCategory } from "../lib/news"

const TOTAL_PAGES = 5

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
  // Next.js 15+
  const { category } = await params
  const resolvedSearchParams = await searchParams

  const rawPage = Number(resolvedSearchParams.page) || 1
  const currentPage = Math.min(Math.max(rawPage, 1), TOTAL_PAGES)

  const articles = await getNewsByCategory(category, currentPage, 12)

  const heroArticles = articles.slice(0, 5)
  const remainingArticles = articles.slice(5)

  const prevPage = currentPage > 1 ? currentPage - 1 : 1
  const nextPage =
    currentPage < TOTAL_PAGES ? currentPage + 1 : TOTAL_PAGES

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 py-8">
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 capitalize">
        {category} News
      </h1>

      {/* HERO */}
      <HeroSlider articles={heroArticles} />

      {/* GRID */}
      <section className="mt-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {remainingArticles.map((article, i) => (
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

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-16">
        <a
          href={`/${category}?page=${prevPage}`}
          className={`px-3 py-1 rounded border ${
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
              className={`px-3 py-1 rounded border ${
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
          className={`px-3 py-1 rounded border ${
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

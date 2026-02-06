import HeroSlider from "./HeroSlider"
import LatestNews from "./LatestNews"
import { Article } from "../lib/news"

type MainProps = {
  title?: string
  articles: Article[]
}

export default function Main({ title, articles }: MainProps) {
  const heroArticles = articles.slice(0, 5)
  const remainingArticles = articles.slice(5)

  return (
    <>
      {/* OPTIONAL TITLE */}
      {title && (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 capitalize">
          {title}
        </h1>
      )}

      {/* Show message if no articles */}
      {articles.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            No News Available
          </h2>
          <p className="text-yellow-700 mb-4">
            Unable to load news articles at this time. This could be due to:
          </p>
          <ul className="text-left max-w-md mx-auto text-yellow-700 space-y-2">
            <li>• Missing API key configuration on the server</li>
            <li>• API rate limits or quota exceeded</li>
            <li>• Network connectivity issues</li>
          </ul>
          <p className="text-sm text-yellow-600 mt-4">
            Check the server logs for more details.
          </p>
        </div>
      ) : (
        <>
          {/* HERO */}
          <HeroSlider articles={heroArticles} />

          {/* GRID WRAPPER */}
          <section className="mt-16">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <LatestNews articles={remainingArticles} />
            </div>
          </section>
        </>
      )}
    </>
  )
}

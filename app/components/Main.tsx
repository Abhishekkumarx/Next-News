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

      {/* HERO */}
      <HeroSlider articles={heroArticles} />

      {/* GRID WRAPPER — THIS WAS MISSING */}
      <section className="mt-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <LatestNews articles={remainingArticles} />
        </div>
      </section>
    </>
  )
}

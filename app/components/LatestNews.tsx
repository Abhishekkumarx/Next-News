import Image from "next/image"
import { Article } from "../lib/news"

type LatestNewsProps = {
  articles: Article[]
}

export default function LatestNews({ articles }: LatestNewsProps) {
  return (
    <>
      {articles.map((article, index) => (
        <a
          key={index}
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
    </>
  )
}

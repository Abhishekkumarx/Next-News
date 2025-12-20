"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type Article = {
  title: string
  description: string
  urlToImage?: string | null
  source?: {
    name?: string
  }
}

type Props = {
  articles: Article[]
}

export default function HeroSlider({ articles }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % articles.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [articles.length])

  const article = articles[index]

  if (!article) return null

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg">
      {/* IMAGE */}
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          width={1200}
          height={500}
          className="w-full h-[420px] object-cover"
          priority
        />
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* TEXT CONTENT */}
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-3xl">
          {article.title}
        </h2>

        <p className="mt-3 text-sm text-gray-200 max-w-2xl line-clamp-3">
          {article.description}
        </p>

        <p className="mt-2 text-xs text-gray-300">
          {article.source?.name}
        </p>
      </div>
    </div>
  )
}

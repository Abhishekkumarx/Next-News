export const runtime = "nodejs"

import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const category = searchParams.get("category")
  const page = searchParams.get("page") ?? "1"
  const pageSize = searchParams.get("pageSize") ?? "12"

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    )
  }

  const apiKey = process.env.NEWS_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing NEWS_API_KEY" },
      { status: 500 }
    )
  }

  const url = new URL("https://newsapi.org/v2/top-headlines")
  url.searchParams.set("category", category)
  url.searchParams.set("country", "us")
  url.searchParams.set("page", page)
  url.searchParams.set("pageSize", pageSize)
  url.searchParams.set("apiKey", apiKey)

  const res = await fetch(url.toString(), {  next: { revalidate: 60 }, })
  const data = await res.json()

  if (!res.ok || data.status !== "ok") {
    return NextResponse.json(
      { error: data.message || "News API error" },
      { status: 500 }
    )
  }

  return NextResponse.json({
    articles: data.articles,
    totalResults: data.totalResults,
  })
}

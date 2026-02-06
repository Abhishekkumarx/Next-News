import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const category = searchParams.get("category")
  const page = searchParams.get("page") ?? "1"
  const pageSize = searchParams.get("pageSize") ?? "12"

  console.log(`[API Route] Request: category=${category}, page=${page}, pageSize=${pageSize}`)

  if (!category) {
    console.error("[API Route] Missing category parameter")
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    )
  }

  const apiKey = process.env.NEWS_API_KEY

  if (!apiKey) {
    console.error("[API Route] NEWS_API_KEY environment variable is not set!")
    return NextResponse.json(
      { error: "Server configuration error: NEWS_API_KEY is missing. Please add it to Vercel environment variables." },
      { status: 500 }
    )
  }

  console.log(`[API Route] API Key present: ${apiKey.substring(0, 8)}...`)

  const url = new URL("https://newsapi.org/v2/top-headlines")
  url.searchParams.set("category", category)
  url.searchParams.set("country", "us")
  url.searchParams.set("page", page)
  url.searchParams.set("pageSize", pageSize)
  url.searchParams.set("apiKey", apiKey)

  try {
    console.log(`[API Route] Fetching from NewsAPI...`)
    const res = await fetch(url.toString(), {
      cache: "no-store",
    })

    const data = await res.json()

    console.log(`[API Route] NewsAPI response status: ${res.status}`)
    console.log(`[API Route] NewsAPI response:`, JSON.stringify(data).substring(0, 200))

    if (!res.ok || data.status !== "ok") {
      console.error(`[API Route] NewsAPI error:`, data)
      return NextResponse.json(
        { error: data.message || `NewsAPI error: ${data.code || 'unknown'}` },
        { status: res.status || 500 }
      )
    }

    console.log(`[API Route] Success: ${data.articles?.length || 0} articles`)

    return NextResponse.json({
      articles: data.articles,
      totalResults: data.totalResults,
    })
  } catch (error) {
    console.error("[API Route] Fetch exception:", error)
    return NextResponse.json(
      { error: `Failed to fetch news: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
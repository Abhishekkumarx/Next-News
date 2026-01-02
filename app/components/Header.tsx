"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const categories = [
  "technology",
  "business",
  "sports",
  "health",
  "entertainment",
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-y-2 py-2">

          {/* LOGO */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Next<span className="text-blue-600">News</span>
          </Link>

          {/* NAVIGATION */}
          <nav
            className="
              flex items-center gap-x-6
              
              scrollbar-hide
            "
          >
            {categories.map((cat) => {
              const isActive = pathname === `/${cat}`

              return (
                <Link
                  key={cat}
                  href={`/${cat}`}
                  className={`
                    capitalize text-md sm:text-base font-medium
                    transition-all duration-200
                    relative pb-1
                    ${
                      isActive
                        ? "text-blue-600 after:w-full"
                        : "text-gray-700 hover:text-blue-600"
                    }
                    after:absolute after:left-0 after:-bottom-0.5
                    after:h-[2px] after:bg-blue-600
                    after:transition-all after:duration-300
                    after:w-0 hover:after:w-full
                  `}
                >
                  {cat}
                </Link>
              )
            })}
          </nav>

        </div>
      </div>
    </header>
  )
}

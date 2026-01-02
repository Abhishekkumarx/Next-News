export default function MainSkeleton() {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-8 animate-pulse">
      {/* Title */}
      <div className="h-8 w-48 bg-gray-200 rounded mb-6" />

      {/* Hero */}
      <div className="h-64 w-full bg-gray-200 rounded-xl mb-12" />

      {/* Grid */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

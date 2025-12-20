type CategoryPageProps = {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <main className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mt-6 capitalize">
        {params.category} News
      </h1>
    </main>
  )
}

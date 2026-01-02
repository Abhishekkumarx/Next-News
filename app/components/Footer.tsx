import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          
          <p>
            © {new Date().getFullYear()} NextNews. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/contact"
              className="hover:text-blue-600 transition text-lg text-red-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

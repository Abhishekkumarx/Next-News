import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

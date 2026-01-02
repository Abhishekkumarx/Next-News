import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="">
      <div className=" rounded-sm max-w-7xl mx-auto px-4 h-14 flex items-center gap-6 bg-zinc-400">
        
        <Link href="/" className="font-bold text-lg">
          NextNews
        </Link>

        <Link href="/business">Business</Link>
        <Link href="/sports">Sports</Link>
        <Link href="/technology">Technology</Link>
        <Link href="/health">Health</Link>
        <Link href="/entertainment">Entertainment</Link>

      </div>
    </nav>
  )
}

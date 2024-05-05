"use client"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
const SearchBox = () => {
  const pathname = usePathname()
  const router = useRouter();
  const searchParams = useSearchParams()

  const handleSearch = (q: string) => {
    const params = new URLSearchParams(searchParams)
    q ? params.set('q', q) : params.delete('q')
    params.set('page', '1')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative">
      <Input placeholder="Search..."
        className="placeholder:pl-4 placeholder:font-medium"
        defaultValue={searchParams.get('q') ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Search className=" absolute right-4 top-1/2 -translate-y-1/2" size={18} />
    </div>
  )
}

export default SearchBox
"use client"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
const SearchBox = () => {
  return (
    <div className="relative">
      <Input placeholder="Search..."
        className="placeholder:pl-4 placeholder:font-medium"
      />
      <Search className=" absolute right-4 top-1/2 -translate-y-1/2" size={18} />
    </div>
  )
}

export default SearchBox
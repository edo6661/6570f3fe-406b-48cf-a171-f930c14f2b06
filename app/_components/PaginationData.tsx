import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generatePagination } from '@/utils/generatePagination';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface PaginationDataProps {
  totalPages: number;
}
const PaginationData = (
  { totalPages }: PaginationDataProps
) => {

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = +searchParams.get("page")! || 1
  const lastPage = totalPages
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const hasPrev = prevPage > 0
  const hasNext = nextPage <= lastPage
  const allPages = generatePagination(
    currentPage,
    lastPage
  )
  const createPageUrl = (page: number | string) => {
    const params = new URLSearchParams(searchParams)
    page ? params.set("page", page.toString()) : params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <motion.div layout className='flex items-center justify-center'>
        {totalPages > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => createPageUrl(prevPage)}
              disabled={!hasPrev}
              className='disabled:cursor-not-allowed disabled:opacity-50'
            >
              <ArrowLeft />
            </Button>
            {allPages.map((page, index) => {
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => createPageUrl(page)}
                  className={cn("", {
                    "opacity-50 cursor-not-allowed": page === currentPage
                  })}
                >
                  {page}
                </Button>
              );
            })}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => createPageUrl(nextPage)}
              disabled={!hasNext}
              className='disabled:cursor-not-allowed disabled:opacity-50'
            >
              <ArrowRight />
            </Button>
          </>
        )}
      </motion.div>
    </>
  )
}

export default PaginationData
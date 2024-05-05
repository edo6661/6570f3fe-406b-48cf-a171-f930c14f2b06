import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonData = () => {
  return (
    <div className="py-12 space-y-8">
      <div className="flex items-center justify-between">
        <Skeleton className="w-[200px] h-[36px]" />
        <div className="flex items-center gap-4">
          {Array.from({ length: 3 }).map((_, i) => (<Skeleton key={i} className="w-[36px] h-[36px]" />))}
        </div>
      </div>
      <Skeleton
        className="w-[834] h-[300px]"
      />
    </div>
  )
}

export default SkeletonData
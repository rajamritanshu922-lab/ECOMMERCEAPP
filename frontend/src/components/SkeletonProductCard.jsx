import React from 'react'

const SkeletonProductCard = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white">
      <div className="aspect-[4/5] animate-pulse bg-zinc-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
        <div className="h-6 w-24 animate-pulse rounded bg-zinc-200" />
        <div className="h-10 w-full animate-pulse rounded-full bg-zinc-200" />
      </div>
    </div>
  )
}

export default SkeletonProductCard

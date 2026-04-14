import React from 'react'
import ProductCard from './ProductCard'
import SkeletonProductCard from './SkeletonProductCard'

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonProductCard key={i} />
        ))}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 py-16 text-center">
        <p className="text-sm font-medium text-zinc-600">No products match your filters.</p>
        <p className="mt-1 text-xs text-zinc-400">Try another category or search term.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid

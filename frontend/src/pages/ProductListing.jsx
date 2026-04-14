import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../assets/assets'
import ProductGrid from '../components/ProductGrid'
import { filterProducts, getCategories } from '../utils/productHelpers'

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? 'All'
  const categories = useMemo(() => getCategories(), [])

  const filtered = useMemo(
    () => filterProducts(products, { category, subCategory: 'All', query }),
    [category, query],
  )

  const setCategory = (next) => {
    const nextParams = new URLSearchParams(searchParams)
    if (next === 'All') nextParams.delete('category')
    else nextParams.set('category', next)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <div className="pb-16 pt-6 sm:pt-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">Shop</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {filtered.length} product{filtered.length === 1 ? '' : 's'}
          {query ? ` for “${query}”` : ''}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => {
          const active = category === cat || (cat === 'All' && !searchParams.get('category'))
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200',
              ].join(' ')}
            >
              {cat}
            </button>
          )
        })}
      </div>

      <ProductGrid products={filtered} loading={false} />
    </div>
  )
}

export default ProductListing

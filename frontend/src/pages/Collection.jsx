import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import BreadcrumbBar from '../components/BreadcrumbBar'
import ProductGrid from '../components/ProductGrid'
import { useProducts } from '../context/ProductsContext'
import { filterProducts, sortProducts, SUB_CATEGORIES } from '../utils/productHelpers'

const CATEGORY_OPTIONS = ['Men', 'Women', 'Kids']

const Collection = () => {
  const { products, loading } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? 'All'
  const subCategory = searchParams.get('type') ?? 'All'
  const sort = searchParams.get('sort') ?? 'relevant'

  const filtered = useMemo(
    () => filterProducts(products, { category, subCategory, query }),
    [products, category, subCategory, query],
  )

  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort])

  const toggleCategory = (cat) => {
    const next = new URLSearchParams(searchParams)
    if (category === cat) next.delete('category')
    else next.set('category', cat)
    setSearchParams(next, { replace: true })
  }

  const toggleType = (type) => {
    const next = new URLSearchParams(searchParams)
    if (subCategory === type) next.delete('type')
    else next.set('type', type)
    setSearchParams(next, { replace: true })
  }

  const setSort = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'relevant') next.delete('sort')
    else next.set('sort', value)
    setSearchParams(next, { replace: true })
  }

  const clearAllFilters = () => {
    setSearchParams({}, { replace: true })
  }

  return (
    <div className="pb-20 pt-6 sm:pt-8">
      <BreadcrumbBar current="COLLECTION" />

      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <h2 className="border-b border-zinc-900 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
              Filters
            </h2>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400">Categories</p>
              <ul className="mt-3 space-y-2">
                {CATEGORY_OPTIONS.map((cat) => {
                  const active = category === cat
                  return (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={[
                          'text-left text-sm transition-colors duration-200',
                          active ? 'font-semibold text-zinc-900' : 'text-zinc-600 hover:text-zinc-900',
                        ].join(' ')}
                      >
                        {cat}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400">Type</p>
              <ul className="mt-3 space-y-2">
                {SUB_CATEGORIES.filter((s) => s !== 'All').map((type) => {
                  const active = subCategory === type
                  return (
                    <li key={type}>
                      <button
                        type="button"
                        onClick={() => toggleType(type)}
                        className={[
                          'text-left text-sm transition-colors duration-200',
                          active ? 'font-semibold text-zinc-900' : 'text-zinc-600 hover:text-zinc-900',
                        ].join(' ')}
                      >
                        {type}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-10 w-full border border-zinc-900 bg-zinc-900 py-2.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-zinc-800"
            >
              All collections
            </button>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-col gap-4 border-b border-zinc-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-lg font-medium uppercase tracking-[0.12em] text-zinc-900 sm:text-xl">
              All collections
            </h1>
            <label className="flex items-center gap-2 text-sm text-zinc-600">
              <span className="sr-only sm:not-sr-only sm:text-xs sm:uppercase sm:tracking-wider">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full cursor-pointer rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm transition-colors focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 sm:w-auto"
              >
                <option value="relevant">Relevant</option>
                <option value="price-low">Low to High</option>
                <option value="price-high">High to Low</option>
              </select>
            </label>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-zinc-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>

          {loading && (
            <p className="mt-4 text-sm text-zinc-500">Loading products…</p>
          )}

          <div className="mt-8">
            <ProductGrid products={sorted} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection

import React from 'react'
import Hero from '../components/Hero'
import LatestCollectionsSection from '../components/LatestCollectionsSection'
import PolicyFeatures from '../components/PolicyFeatures'
import SubscribeSection from '../components/SubscribeSection'
import ProductGrid from '../components/ProductGrid'
import { useProducts } from '../context/ProductsContext'
import { getBestsellers } from '../utils/productHelpers'

const Home = () => {
  const { products, loading, error } = useProducts()
  const featured = getBestsellers(products, 8)
  const latest = [...products].sort((a, b) => (b.date || 0) - (a.date || 0)).slice(0, 8)

  return (
    <div className="space-y-0 pb-16 pt-0 sm:pb-20">
      {error && (
        <div className="mx-auto mb-4 max-w-3xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Could not load products.</strong> {error} — Is the API running at{' '}
          <code className="rounded bg-amber-100 px-1">http://localhost:5050</code>?
        </div>
      )}
      <div className="-mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] xl:-mx-[11vw] 2xl:-mx-[13vw]">
        <Hero />
      </div>

      <div className="space-y-16 pt-14 sm:space-y-20 sm:pt-16">
        <LatestCollectionsSection />

        <section>
          <div className="mb-8 text-center sm:mb-10">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">Our bestsellers</p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
              Shop the edit
            </h2>
          </div>
          <ProductGrid products={featured} loading={loading} />
        </section>

        <PolicyFeatures />

        <SubscribeSection />

        <section>
          <div className="mb-8 text-center sm:mb-10">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">Just dropped</p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl">
              New arrivals
            </h2>
          </div>
          <ProductGrid products={latest} loading={loading} />
        </section>
      </div>
    </div>
  )
}

export default Home

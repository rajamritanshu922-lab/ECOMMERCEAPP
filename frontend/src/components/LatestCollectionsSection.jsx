import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useProducts } from '../context/ProductsContext'

const cardBase =
  'group relative flex min-h-[280px] flex-col justify-end overflow-hidden border border-neutral-200 bg-neutral-100 p-8 transition-all duration-500 hover:border-neutral-900 sm:min-h-[340px]'

const LatestCollectionsSection = () => {
  const { products } = useProducts()
  const bestImg = useMemo(() => products[0]?.image?.[0], [products])

  return (
    <section className="space-y-8">
      <div className="max-w-2xl">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">Latest collections</p>
        <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600 sm:text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link to="/collection" className={cardBase}>
          {bestImg ? (
            <img
              src={bestImg}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative z-10">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80">Featured</p>
            <h2 className="mt-2 font-display text-2xl font-medium text-white sm:text-3xl">Best sellers</h2>
            <p className="mt-2 max-w-sm font-sans text-sm text-white/85">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <span className="mt-5 inline-block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white underline-offset-4 transition-all group-hover:underline">
              Explore
            </span>
          </div>
        </Link>

        <Link to="/collection?sort=price-high" className={cardBase}>
          <img
            src={assets.hero_banner}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative z-10">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80">New in</p>
            <h2 className="mt-2 font-display text-2xl font-medium text-white sm:text-3xl">Premium picks</h2>
            <p className="mt-2 max-w-sm font-sans text-sm text-white/85">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <span className="mt-5 inline-block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white underline-offset-4 transition-all group-hover:underline">
              Explore
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default LatestCollectionsSection

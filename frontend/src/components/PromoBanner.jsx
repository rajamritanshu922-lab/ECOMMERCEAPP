import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const PromoBanner = () => {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div className="aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[240px]">
          <img
            src={assets.hero_banner}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
        <div className="px-6 py-8 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Members get early access
          </h2>
          <p className="mt-3 text-sm text-zinc-600 sm:text-base">
            Join the list for drops, restocks, and exclusive offers. Free returns on all orders.
          </p>
          <Link
            to="/collection"
            className="mt-6 inline-flex rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800"
          >
            Browse new arrivals
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner

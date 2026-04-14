import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-none sm:rounded-sm">
      <div className="relative min-h-[min(85vh,720px)] w-full">
        <img
          src={assets.hero_img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/20" />
        <div className="relative flex min-h-[min(85vh,720px)] flex-col items-center justify-center px-6 py-20 text-center sm:px-10">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-white/90">
            Our bestsellers
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-white/90"># </span>
            Latest arrivals
          </h1>
          <p className="mt-6 max-w-lg font-sans text-sm leading-relaxed text-white/80 sm:text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry — curated styles for every season.
          </p>
          <Link
            to="/collection"
            className="mt-10 inline-flex min-w-[180px] items-center justify-center border border-white bg-white px-10 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero

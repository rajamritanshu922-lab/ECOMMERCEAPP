import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import BreadcrumbBar from '../components/BreadcrumbBar'

const About = () => {
  return (
    <div className="pb-20 pt-6 sm:pt-8">
      <BreadcrumbBar current="ABOUT" />
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
          <img
            src={assets.about_img}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
        <div>
          <h1 className="text-2xl font-medium uppercase tracking-[0.15em] text-zinc-900 sm:text-3xl">About Forever</h1>
          <p className="mt-6 text-sm leading-relaxed text-zinc-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            We believe in timeless pieces, honest pricing, and a shopping experience that feels calm and considered—much
            like the Forever Buy reference you know.
          </p>
          <Link
            to="/collection"
            className="mt-8 inline-flex border border-zinc-900 bg-zinc-900 px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-zinc-800"
          >
            View collection
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About

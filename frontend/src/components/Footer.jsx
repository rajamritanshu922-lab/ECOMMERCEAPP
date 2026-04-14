import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-zinc-600">
              <li>
                <Link to="/" className="transition-colors hover:text-zinc-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-zinc-900">
                  About us
                </Link>
              </li>
              <li>
                <span className="cursor-default">Delivery</span>
              </li>
              <li>
                <span className="cursor-default">Privacy policy</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">Get in touch</h3>
            <ul className="mt-5 space-y-3 text-sm text-zinc-600">
              <li>
                <a href="tel:+917499208592" className="transition-colors hover:text-zinc-900">
                  +91-7488208592
                </a>
              </li>
              <li>
                <a href="mailto:amritanshurs014@gmail.com" className="transition-colors hover:text-zinc-900">
                  amritanshurs014@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-1">
            <p className="text-sm leading-relaxed text-zinc-600">
              This is a sample UI platform designed exclusively for testing and prototyping. Quality fashion for every
              wardrobe.
            </p>
            <Link
              to="/collection"
              className="mt-4 inline-block text-sm font-medium text-zinc-900 underline-offset-4 transition-colors hover:underline"
            >
              Shop collection
            </Link>
          </div>
        </div>
        <div className="mt-14 border-t border-zinc-200 pt-8 text-center">
          <p className="text-xs text-zinc-500">
            Copyright {new Date().getFullYear()}@ forever.com - All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

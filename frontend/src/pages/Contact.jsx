import React, { useState } from 'react'
import { assets } from '../assets/assets'
import BreadcrumbBar from '../components/BreadcrumbBar'

const Contact = () => {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pb-20 pt-6 sm:pt-8">
      <BreadcrumbBar current="CONTACT" />
      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-xl border border-zinc-200">
          <img src={assets.contact_img} alt="" className="h-full min-h-[240px] w-full object-cover sm:min-h-[320px]" />
        </div>
        <div>
          <h1 className="text-2xl font-medium uppercase tracking-[0.15em] text-zinc-900 sm:text-3xl">Contact</h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Get in touch for orders, sizing help, or partnerships. We typically reply within one business day.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-zinc-700">
            <li>
              <span className="text-zinc-500">Phone:</span>{' '}
              <a href="tel:+12124567890" className="font-medium hover:underline">
                +91-7488208592
              </a>
            </li>
            <li>
              <span className="text-zinc-500">Email:</span>{' '}
              <a href="amritanshurs014@gmail.com" className="font-medium hover:underline">
                    amritanshurs014@gmail.com          

              </a>
            </li>
          </ul>

          <form onSubmit={onSubmit} className="mt-10 space-y-4 border-t border-zinc-200 pt-10">
            <div>
              <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-1.5 w-full border border-zinc-200 bg-white px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 w-full border border-zinc-200 bg-white px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1.5 w-full resize-y border border-zinc-200 bg-white px-3 py-2.5 text-sm focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <button
              type="submit"
              className="w-full border border-zinc-900 bg-zinc-900 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-zinc-800 sm:w-auto sm:px-10"
            >
              Send
            </button>
            {sent && <p className="text-sm text-green-700">Thanks — this is a demo; no message was sent.</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact

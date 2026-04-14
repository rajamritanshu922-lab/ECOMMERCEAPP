import React, { useState } from 'react'

const SubscribeSection = () => {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
    setEmail('')
  }

  return (
    <section className="border border-neutral-900 bg-neutral-900 px-6 py-14 text-center sm:px-10 sm:py-16">
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">Newsletter</p>
      <h2 className="mt-4 font-display text-2xl font-medium text-white sm:text-3xl md:text-4xl">
        Subscribe now &amp; get 20% off
      </h2>
      <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/75">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
      <form onSubmit={onSubmit} className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-stretch">
        <label htmlFor="hero-email" className="sr-only">
          Email
        </label>
        <input
          id="hero-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="min-h-[48px] flex-1 border border-white/20 bg-white/10 px-4 font-sans text-sm text-white placeholder:text-white/45 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
        />
        <button
          type="submit"
          className="min-h-[48px] border border-white bg-white px-8 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 transition-colors hover:bg-neutral-100"
        >
          Subscribe
        </button>
      </form>
      {done && (
        <p className="mt-4 font-sans text-sm text-emerald-400/90">Thanks — you&apos;re on the list (demo).</p>
      )}
      <p className="mx-auto mt-10 max-w-2xl font-sans text-xs leading-relaxed text-white/50">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry&apos;s standard dummy text ever since the 1500s.
      </p>
    </section>
  )
}

export default SubscribeSection

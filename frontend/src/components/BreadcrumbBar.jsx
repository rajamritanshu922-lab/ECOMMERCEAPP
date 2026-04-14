import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const linkClass = 'text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500 transition-colors hover:text-zinc-900'
const activeClass = 'text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-900'

const BreadcrumbBar = ({ current = 'COLLECTION' }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-zinc-200 pb-4 text-[11px] sm:gap-x-3">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mr-1 font-medium uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:text-zinc-900"
      >
        Back
      </button>
      <span className="text-zinc-300" aria-hidden>
        |
      </span>
      <Link to="/" className={current === 'HOME' ? activeClass : linkClass}>
        Home
      </Link>
      <span className="text-zinc-300">|</span>
      <Link to="/collection" className={current === 'COLLECTION' ? activeClass : linkClass}>
        Collection
      </Link>
      <span className="text-zinc-300">|</span>
      <Link to="/about" className={current === 'ABOUT' ? activeClass : linkClass}>
        About
      </Link>
      <span className="text-zinc-300">|</span>
      <Link to="/contact" className={current === 'CONTACT' ? activeClass : linkClass}>
        Contact
      </Link>
    </div>
  )
}

export default BreadcrumbBar

import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useCart } from '../context/CartContext'

const navLinkClass = ({ isActive }) =>
  [
    'text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200',
    isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-900',
  ].join(' ')

const Navbar = () => {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { totalItems } = useCart()

  const onSearchSubmit = (e) => {
    e.preventDefault()
    const q = search.trim()
    navigate(q ? `/collection?q=${encodeURIComponent(q)}` : '/collection')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/90 bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="rounded-lg p-2 transition-opacity hover:opacity-70 lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Open menu"
        >
          <img src={assets.menu_icon} alt="" className="h-5 w-5" width={20} height={20} />
        </button>

        <Link to="/" className="shrink-0">
          <img src={assets.logo} alt="Forever" className="h-7 w-auto object-contain sm:h-8" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex xl:gap-10">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/collection" className={navLinkClass}>
            Collection
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <form
          onSubmit={onSearchSubmit}
          className="hidden min-w-0 flex-1 items-center gap-2 border-b border-zinc-200 px-0 py-1 md:flex md:max-w-xs lg:max-w-sm"
        >
          <img src={assets.search_icon} alt="" className="h-4 w-4 shrink-0 opacity-40" width={16} height={16} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <a
            href="https://admin.foreverbuy.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-900 xl:inline"
          >
            Admin
          </a>
          <Link
            to="/cart"
            className="relative flex items-center justify-center p-2 transition-opacity hover:opacity-80"
            aria-label={`Cart, ${totalItems} items`}
          >
            <img src={assets.cart_icon} alt="" className="h-6 w-6 sm:h-7 sm:w-7" width={28} height={28} />
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-zinc-900 px-0.5 text-[10px] font-semibold text-white">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          </Link>
        </div>
      </div>

      <form onSubmit={onSearchSubmit} className="border-t border-zinc-100 px-4 py-2 md:hidden">
        <div className="flex items-center gap-2 border-b border-zinc-200 py-1">
          <img src={assets.search_icon} alt="" className="h-4 w-4 opacity-40" width={16} height={16} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
      </form>

      {menuOpen && (
        <div className="border-t border-zinc-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/collection" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Collection
            </NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
            <a
              href="https://admin.foreverbuy.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500"
            >
              Admin panel
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar

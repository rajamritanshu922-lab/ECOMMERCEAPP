import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
  }`

export default function Layout() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-zinc-200 bg-white shadow-sm transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center border-b border-zinc-200 px-4">
          <span className="text-lg font-semibold tracking-tight text-zinc-900">Forever Admin</span>
        </div>
        <nav className="space-y-1 p-3">
          <NavLink to="/" end className={linkClass} onClick={() => setSidebarOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/products" className={linkClass} onClick={() => setSidebarOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/products/new" className={linkClass} onClick={() => setSidebarOpen(false)}>
            Add product
          </NavLink>
          <NavLink to="/orders" className={linkClass} onClick={() => setSidebarOpen(false)}>
            Orders
          </NavLink>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 p-3">
          <p className="truncate px-3 text-xs text-zinc-500">{user?.email}</p>
          <button
            type="button"
            onClick={() => {
              logout()
              setSidebarOpen(false)
            }}
            className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Log out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen flex-1 flex-col lg:ml-0">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-zinc-200 bg-white px-4 shadow-sm">
          <button
            type="button"
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden text-sm text-zinc-500 lg:block">
            <Link to="/" className="hover:text-zinc-800">
              Admin panel
            </Link>
          </div>
          <div className="text-sm text-zinc-600">Store management</div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

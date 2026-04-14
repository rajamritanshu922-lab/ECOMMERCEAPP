import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'

export default function Dashboard() {
  const [counts, setCounts] = useState({ products: 0, orders: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [products, orders] = await Promise.all([api('/products'), api('/admin/orders')])
        if (!cancelled) {
          setCounts({ products: products.length, orders: orders.length })
        }
      } catch {
        if (!cancelled) setCounts({ products: 0, orders: 0 })
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-500">Overview of your store</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Products</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-900">{loading ? '—' : counts.products}</p>
          <Link to="/products" className="mt-4 inline-block text-sm font-medium text-zinc-700 hover:underline">
            Manage products
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Orders</p>
          <p className="mt-2 text-3xl font-semibold text-zinc-900">{loading ? '—' : counts.orders}</p>
          <Link to="/orders" className="mt-4 inline-block text-sm font-medium text-zinc-700 hover:underline">
            View orders
          </Link>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../api/client.js'
import { formatPrice } from '../utils/formatPrice'

const Order = () => {
  const hasToken = !!localStorage.getItem('token')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(hasToken)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!hasToken) return
    let cancelled = false
    apiFetch('/orders/my')
      .then((data) => {
        if (!cancelled) setOrders(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load orders')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [hasToken])

  if (!hasToken) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-zinc-600">Sign in to view your orders.</p>
        <Link to="/login" className="mt-4 inline-block text-sm font-medium text-zinc-900 underline">
          Sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-16 pt-8">
      <h1 className="text-2xl font-semibold text-zinc-900">My orders</h1>
      {loading && <p className="mt-8 text-sm text-zinc-500">Loading orders...</p>}
      {error && <p className="mt-8 text-sm text-red-600">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 py-16 text-center">
          <p className="text-sm font-medium text-zinc-600">No orders yet.</p>
          <Link to="/collection" className="mt-4 inline-block text-sm font-medium text-zinc-900 underline">
            Start shopping
          </Link>
        </div>
      )}
      <div className="mt-8 space-y-5">
        {orders.map((order) => (
          <article key={order._id} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-900">Order #{String(order._id).slice(-8)}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : 'Placed order'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-zinc-900">{formatPrice(order.totalAmount)}</p>
                <p className="mt-1 text-xs capitalize text-zinc-500">{order.orderStatus}</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {order.items?.map((item, index) => (
                <div key={`${item.name}-${index}`} className="flex items-center gap-3 text-sm">
                  {item.image && <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover" />}
                  <div className="min-w-0">
                    <p className="font-medium text-zinc-900">{item.name}</p>
                    <p className="text-xs text-zinc-500">
                      Size {item.size} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Order

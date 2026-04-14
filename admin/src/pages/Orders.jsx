import React, { useEffect, useState } from 'react'
import { api } from '../api.js'

const STATUSES = ['placed', 'processing', 'shipped', 'delivered', 'cancelled']

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api('/admin/orders')
      setOrders(data)
    } catch (e) {
      console.error(e)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function updateStatus(id, orderStatus) {
    setUpdating(id)
    try {
      const updated = await api(`/admin/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ orderStatus }),
      })
      setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)))
    } catch (e) {
      alert(e.message)
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900">Orders</h1>
      <p className="mt-1 text-sm text-zinc-500">All customer orders</p>

      {loading ? (
        <p className="mt-8 text-sm text-zinc-500">Loading…</p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Order #{o._id.slice(-8)}</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {o.user?.name || 'User'} · {o.user?.email}
                  </p>
                  <p className="mt-2 text-sm text-zinc-800">
                    {o.items?.length} item(s) · ₹{o.totalAmount} · {o.paymentMethod?.toUpperCase()} ·{' '}
                    <span className="font-medium">{o.paymentStatus}</span>
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {o.shippingAddress?.fullName}, {o.shippingAddress?.city}, {o.shippingAddress?.zip}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <label className="text-xs font-medium uppercase text-zinc-500">Status</label>
                  <select
                    value={o.orderStatus}
                    disabled={updating === o._id}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-sm disabled:opacity-50"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && <p className="text-center text-sm text-zinc-500">No orders yet.</p>}
        </div>
      )}
    </div>
  )
}

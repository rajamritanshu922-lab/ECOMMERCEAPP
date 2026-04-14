import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiFetch } from '../api/client.js'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

const initialAddress = {
  fullName: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: 'India',
}

const Placeorder = () => {
  const navigate = useNavigate()
  const { items, subtotal, clearCart } = useCart()
  const [shippingAddress, setShippingAddress] = useState(initialAddress)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(field, value) {
    setShippingAddress((current) => ({ ...current, [field]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }
    setLoading(true)
    try {
      await apiFetch('/orders/cod', {
        method: 'POST',
        body: JSON.stringify({
          shippingAddress,
          items: items.map((line) => ({
            productId: line.productId,
            name: line.name,
            price: line.price,
            image: line.image,
            size: line.size,
            quantity: line.quantity,
          })),
        }),
      })
      clearCart()
      navigate('/order')
    } catch (err) {
      setError(err.message || 'Could not place order')
    } finally {
      setLoading(false)
    }
  }

  if (!items.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-zinc-600">Your cart is empty.</p>
        <Link to="/collection" className="mt-4 inline-block text-sm font-medium text-zinc-900 underline">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl pb-16 pt-8">
      <h1 className="text-2xl font-semibold text-zinc-900">Place order</h1>
      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-zinc-700">
              Full name
              <input
                value={shippingAddress.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm font-medium text-zinc-700">
              Phone
              <input
                value={shippingAddress.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              />
            </label>
          </div>
          <label className="block text-sm font-medium text-zinc-700">
            Street address
            <input
              value={shippingAddress.street}
              onChange={(e) => updateField('street', e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-zinc-700">
              City
              <input
                value={shippingAddress.city}
                onChange={(e) => updateField('city', e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm font-medium text-zinc-700">
              State
              <input
                value={shippingAddress.state}
                onChange={(e) => updateField('state', e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-zinc-700">
              ZIP
              <input
                value={shippingAddress.zip}
                onChange={(e) => updateField('zip', e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-sm font-medium text-zinc-700">
              Country
              <input
                value={shippingAddress.country}
                onChange={(e) => updateField('country', e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              />
            </label>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">Order summary</h2>
          <div className="mt-5 space-y-3">
            {items.map((line) => (
              <div key={line.key} className="flex justify-between gap-4 text-sm">
                <span className="text-zinc-600">
                  {line.name} x {line.quantity}
                </span>
                <span className="font-medium text-zinc-900">{formatPrice(line.price * line.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-zinc-100 pt-5">
            <div className="flex justify-between text-base font-semibold text-zinc-900">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-zinc-500">Payment method: Cash on delivery</p>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading ? 'Placing order...' : 'Place COD order'}
          </button>
        </aside>
      </form>
    </div>
  )
}

export default Placeorder

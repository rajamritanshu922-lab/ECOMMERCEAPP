import React from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'

const Cart = () => {
  const { items, updateQuantity, removeFromCart, subtotal } = useCart()

  return (
    <div className="pb-16 pt-6 sm:pt-8">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">Your cart</h1>
      <p className="mt-2 text-sm text-zinc-500">{items.length} line item{items.length === 1 ? '' : 's'}</p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-16 text-center">
          <p className="text-sm font-medium text-zinc-600">Your cart is empty.</p>
          <p className="mt-1 text-xs text-zinc-400">Browse the shop and add items you love.</p>
          <Link
            to="/collection"
            className="mt-6 inline-flex rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((line) => (
              <CartItem
                key={line.key}
                line={line}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">Order summary</h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-zinc-900">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <dt>Shipping</dt>
                  <dd className="text-zinc-500">Calculated at checkout</dd>
                </div>
              </dl>
              <div className="mt-6 border-t border-zinc-100 pt-6">
                <div className="flex justify-between text-base font-semibold text-zinc-900">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <Link
                to="/placeorder"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-zinc-900 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800"
              >
                Checkout
              </Link>
              <Link
                to="/collection"
                className="mt-4 block text-center text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Cart

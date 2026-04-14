import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { formatPrice } from '../utils/formatPrice'

const CartItem = ({ line, onUpdateQuantity, onRemove }) => {
  const { key, name, price, image, size, quantity, productId } = line

  return (
    <div className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-shadow duration-200 hover:shadow-sm sm:gap-5 sm:p-5">
      <Link
        to={`/product/${productId}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100 sm:h-28 sm:w-28"
      >
        {image ? (
          <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-zinc-400">No img</div>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to={`/product/${productId}`} className="text-sm font-medium text-zinc-900 hover:underline">
              {name}
            </Link>
            <p className="mt-1 text-xs text-zinc-500">
              Size <span className="font-medium text-zinc-700">{size}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(key)}
            className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Remove item"
          >
            <img src={assets.bin_icon} alt="" className="h-4 w-4" width={16} height={16} />
          </button>
        </div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
          <p className="text-sm font-semibold text-zinc-900">{formatPrice(price * quantity)}</p>
          <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-0.5">
            <button
              type="button"
              onClick={() => onUpdateQuantity(key, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-zinc-700 transition-colors hover:bg-white"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="min-w-[2rem] text-center text-sm font-medium tabular-nums text-zinc-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(key, quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-zinc-700 transition-colors hover:bg-white"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem

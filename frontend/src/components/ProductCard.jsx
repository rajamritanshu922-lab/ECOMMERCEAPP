import React from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const image = product.image?.[0]
  const defaultSize = product.sizes?.[0]

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
      <Link to={`/product/${product._id}`} className="relative block aspect-[4/5] overflow-hidden bg-zinc-100">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-200 text-xs text-zinc-500">
            No image
          </div>
        )}
        {product.bestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-900 shadow-sm backdrop-blur-sm">
            Bestseller
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          {product.category}
        </p>
        <Link to={`/product/${product._id}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-medium text-zinc-900 transition-colors group-hover:text-zinc-600">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-base font-semibold text-zinc-900">{formatPrice(product.price)}</p>
        <button
          type="button"
          onClick={() => addToCart(product, 1, defaultSize)}
          className="mt-4 w-full rounded-full border border-zinc-900 bg-zinc-900 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98]"
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard

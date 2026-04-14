import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import { apiFetch } from '../api/client.js'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import { formatPrice } from '../utils/formatPrice'
import { getProductById } from '../utils/productHelpers'
import { normalizeProduct } from '../utils/normalizeProduct.js'

const ProductDetail = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { products, loading: listLoading } = useProducts()

  const fromList = useMemo(() => getProductById(productId, products), [productId, products])
  const [remote, setRemote] = useState(null)

  useEffect(() => {
    if (fromList || listLoading) return
    let cancelled = false
    apiFetch(`/products/${productId}`)
      .then((raw) => {
        if (!cancelled) setRemote({ id: productId, product: normalizeProduct(raw) })
      })
      .catch(() => {
        if (!cancelled) setRemote({ id: productId, product: null })
      })
    return () => {
      cancelled = true
    }
  }, [productId, fromList, listLoading])

  const product = useMemo(() => {
    if (fromList) return fromList
    if (remote && String(remote.id) === String(productId)) return remote.product
    return null
  }, [fromList, remote, productId])

  const [selectedSize, setSelectedSize] = useState('')
  const [activeImage, setActiveImage] = useState(0)

  const images = product?.image ?? []
  const sizes = product?.sizes ?? []

  React.useEffect(() => {
    if (product?.sizes?.length) setSelectedSize(product.sizes[0])
  }, [product])

  React.useEffect(() => {
    setActiveImage(0)
  }, [productId, product])

  const waiting =
    !product &&
    (listLoading || (!fromList && (!remote || String(remote.id) !== String(productId))))

  if (waiting) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-zinc-600">Loading product…</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-zinc-600">Product not found.</p>
        <Link to="/collection" className="mt-4 inline-block text-sm font-medium text-zinc-900 underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const mainImage = images[activeImage] ?? images[0]

  const onAdd = () => {
    addToCart(product, 1, selectedSize)
    navigate('/cart')
  }

  return (
    <div className="pb-16 pt-6 sm:pt-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        ← Back
      </button>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-100">
            {mainImage ? (
              <img src={mainImage} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-400">No image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={[
                    'h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200',
                    i === activeImage ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-transparent opacity-70 hover:opacity-100',
                  ].join(' ')}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{product.category}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-zinc-900">{formatPrice(product.price)}</p>

          <div className="mt-4 flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="h-4 w-4"
                width={16}
                height={16}
              />
            ))}
            <span className="ml-2 text-xs text-zinc-500">(128 reviews)</span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-zinc-600">{product.description}</p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={[
                    'min-w-[2.75rem] rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
                    selectedSize === size
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300',
                  ].join(' ')}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onAdd}
              className="flex-1 rounded-full bg-zinc-900 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.99]"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => addToCart(product, 1, selectedSize)}
              className="flex-1 rounded-full border border-zinc-200 py-3.5 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50"
            >
              Add & stay
            </button>
          </div>

          <div className="mt-10 flex items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
            <img src={assets.exchange_icon} alt="" className="mt-0.5 h-6 w-6 shrink-0" width={24} height={24} />
            <div>
              <p className="text-sm font-medium text-zinc-900">Free returns</p>
              <p className="mt-1 text-xs text-zinc-500">30 days, no questions. See policy for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

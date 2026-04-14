/* eslint-disable react-refresh/only-export-components -- context + hook pattern */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'shop_cart_lines'

function lineKey(productId, size) {
  return `${productId}::${size}`
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const addToCart = useCallback((product, quantity = 1, size) => {
    const chosenSize = size || product.sizes?.[0] || 'One size'
    const key = lineKey(product._id, chosenSize)
    const thumb = product.image?.[0]

    setLines((prev) => {
      const existing = prev[key]
      const nextQty = (existing?.quantity ?? 0) + quantity
      return {
        ...prev,
        [key]: {
          key,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: thumb,
          size: chosenSize,
          quantity: nextQty,
        },
      }
    })
  }, [])

  const removeFromCart = useCallback((key) => {
    setLines((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const updateQuantity = useCallback((key, quantity) => {
    setLines((prev) => {
      if (quantity < 1) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      const line = prev[key]
      if (!line) return prev
      return { ...prev, [key]: { ...line, quantity } }
    })
  }, [])

  const clearCart = useCallback(() => setLines({}), [])

  const items = useMemo(() => Object.values(lines), [lines])

  const totalItems = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      lines,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
    }),
    [items, lines, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

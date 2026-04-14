/* eslint-disable react-refresh/only-export-components -- provider + hook */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../api/client.js'
import { products as assetProducts } from '../assets/assets.js'
import { normalizeProduct } from '../utils/normalizeProduct.js'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch('/products')
      const list = Array.isArray(data) ? data.map(normalizeProduct).filter(Boolean) : []
      setProducts(list.length ? list : assetProducts.map(normalizeProduct).filter(Boolean))
    } catch (e) {
      setError(e.message || 'Failed to load products')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      refetch,
    }),
    [products, loading, error, refetch],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}

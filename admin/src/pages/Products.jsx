import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api('/products')
      setProducts(data)
    } catch (e) {
      console.error(e)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return
    setDeleting(id)
    try {
      await api(`/products/${id}`, { method: 'DELETE' })
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch (e) {
      alert(e.message)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Products</h1>
          <p className="mt-1 text-sm text-zinc-500">All catalog items</p>
        </div>
        <Link
          to="/products/new"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
        >
          Add product
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-zinc-500">Loading…</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-4 py-3 font-medium text-zinc-700">Image</th>
                <th className="px-4 py-3 font-medium text-zinc-700">Name</th>
                <th className="px-4 py-3 font-medium text-zinc-700">Category</th>
                <th className="px-4 py-3 font-medium text-zinc-700">Price</th>
                <th className="px-4 py-3 font-medium text-zinc-700" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-zinc-50/80">
                  <td className="px-4 py-3">
                    <img
                      src={p.images?.[0]?.url || '/placeholder.png'}
                      alt=""
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900">{p.name}</td>
                  <td className="px-4 py-3 text-zinc-600">
                    {p.category} / {p.subCategory}
                  </td>
                  <td className="px-4 py-3 text-zinc-900">₹{p.price}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(p._id)}
                      disabled={deleting === p._id}
                      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="p-8 text-center text-sm text-zinc-500">No products yet. Add your first product.</p>
          )}
        </div>
      )}
    </div>
  )
}

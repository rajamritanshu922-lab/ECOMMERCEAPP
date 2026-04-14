import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api.js'

export default function ProductForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [sizes, setSizes] = useState('S, M, L, XL')
  const [bestseller, setBestseller] = useState(false)
  const [stock, setStock] = useState('0')
  const [files, setFiles] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!files.length) {
      setError('Select at least one image')
      return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('description', description)
      fd.append('price', price)
      fd.append('category', category)
      fd.append('subCategory', subCategory)
      fd.append('sizes', sizes)
      fd.append('bestseller', String(bestseller))
      fd.append('stock', stock)
      for (const f of files) {
        fd.append('images', f)
      }
      await api('/products', { method: 'POST', body: fd })
      navigate('/products')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold text-zinc-900">Add product</h1>
      <p className="mt-1 text-sm text-zinc-500">Images are uploaded to Cloudinary via the API</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        {error && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </div>
        )}
        <div>
          <label className="block text-xs font-medium uppercase text-zinc-500">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase text-zinc-500">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium uppercase text-zinc-500">Price (INR)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase text-zinc-500">Stock</label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium uppercase text-zinc-500">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            >
              {['Men', 'Women', 'Kids'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium uppercase text-zinc-500">Type</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            >
              {['Topwear', 'Bottomwear', 'Winterwear'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase text-zinc-500">Sizes (comma-separated)</label>
          <input
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input type="checkbox" checked={bestseller} onChange={(e) => setBestseller(e.target.checked)} />
          Bestseller
        </label>
        <div>
          <label className="block text-xs font-medium uppercase text-zinc-500">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
            className="mt-1 w-full text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? 'Uploading…' : 'Create product'}
        </button>
      </form>
    </div>
  )
}

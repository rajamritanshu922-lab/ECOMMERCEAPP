import Product from '../models/Product.js'
import mongoose from 'mongoose'

export async function buildOrderItems(items) {
  if (!Array.isArray(items) || !items.length) {
    throw new Error('items array is required')
  }
  const lines = []
  let total = 0
  for (const row of items) {
    const productId = row.productId || row.product
    const qty = Math.max(1, Number(row.quantity) || 1)
    if (productId && mongoose.Types.ObjectId.isValid(productId)) {
      const p = await Product.findById(productId)
      if (!p) throw new Error(`Product not found: ${productId}`)
      const size = row.size || p.sizes?.[0] || 'One size'
      total += p.price * qty
      lines.push({
        product: p._id,
        name: p.name,
        price: p.price,
        quantity: qty,
        size,
        image: p.images?.[0]?.url || '',
      })
      continue
    }

    const price = Number(row.price)
    if (!row.name || Number.isNaN(price) || price < 0) {
      throw new Error('Product details are required for demo catalog items')
    }
    total += price * qty
    lines.push({
      product: undefined,
      name: row.name,
      price,
      quantity: qty,
      size: row.size || 'One size',
      image: row.image || '',
    })
  }
  return { lines, total }
}

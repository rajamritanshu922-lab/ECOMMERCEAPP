import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

export async function getCart(req, res) {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] })
    }
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function addToCart(req, res) {
  try {
    const { productId, quantity = 1, size } = req.body
    if (!productId) {
      return res.status(400).json({ message: 'productId is required' })
    }
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    const chosenSize = size || product.sizes?.[0] || 'One size'
    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] })
    }
    const idx = cart.items.findIndex(
      (i) => i.product.toString() === productId && i.size === chosenSize,
    )
    const qty = Math.max(1, Number(quantity) || 1)
    if (idx >= 0) {
      cart.items[idx].quantity += qty
    } else {
      cart.items.push({ product: productId, quantity: qty, size: chosenSize })
    }
    await cart.save()
    await cart.populate('items.product')
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function updateCartItem(req, res) {
  try {
    const { quantity } = req.body
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })
    const item = cart.items.id(req.params.itemId)
    if (!item) return res.status(404).json({ message: 'Cart item not found' })
    const q = Number(quantity)
    if (Number.isNaN(q) || q < 1) {
      return res.status(400).json({ message: 'quantity must be >= 1' })
    }
    item.quantity = q
    await cart.save()
    await cart.populate('items.product')
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function removeCartItem(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })
    const item = cart.items.id(req.params.itemId)
    if (!item) return res.status(404).json({ message: 'Cart item not found' })
    item.deleteOne()
    await cart.save()
    await cart.populate('items.product')
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function clearCart(req, res) {
  try {
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] })
    res.json({ message: 'Cart cleared' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

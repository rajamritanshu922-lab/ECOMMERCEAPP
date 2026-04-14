import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import { buildOrderItems } from '../utils/orderItems.js'

async function clearUserCart(userId) {
  await Cart.findOneAndUpdate({ user: userId }, { items: [] })
}

export async function placeCodOrder(req, res) {
  try {
    const { items, shippingAddress } = req.body
    if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.street) {
      return res.status(400).json({ message: 'Complete shipping address required' })
    }
    const { lines, total } = await buildOrderItems(items)
    const order = await Order.create({
      user: req.user.id,
      items: lines,
      shippingAddress,
      paymentMethod: 'cod',
      paymentStatus: 'cod',
      orderStatus: 'placed',
      totalAmount: total,
    })
    await clearUserCart(req.user.id)
    res.status(201).json(order)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
}

export async function myOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).lean()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).lean()
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function adminListOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .lean()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function adminUpdateOrderStatus(req, res) {
  try {
    const { orderStatus } = req.body
    const allowed = ['placed', 'processing', 'shipped', 'delivered', 'cancelled']
    if (!allowed.includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid orderStatus' })
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true },
    ).populate('user', 'name email')
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

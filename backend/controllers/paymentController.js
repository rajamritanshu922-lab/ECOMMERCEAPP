import crypto from 'crypto'
import Stripe from 'stripe'
import Razorpay from 'razorpay'
import Order from '../models/Order.js'
import Cart from '../models/Cart.js'
import { buildOrderItems } from '../utils/orderItems.js'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured')
  return new Stripe(key)
}

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

async function clearUserCart(userId) {
  await Cart.findOneAndUpdate({ user: userId }, { items: [] })
}

export async function createStripeCheckout(req, res) {
  try {
    const { items, shippingAddress, successUrl, cancelUrl } = req.body
    if (!shippingAddress?.fullName) {
      return res.status(400).json({ message: 'shippingAddress required' })
    }
    const { lines, total } = await buildOrderItems(items)
    const order = await Order.create({
      user: req.user.id,
      items: lines,
      shippingAddress,
      paymentMethod: 'stripe',
      paymentStatus: 'pending',
      orderStatus: 'processing',
      totalAmount: total,
    })

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lines.map((l) => ({
        price_data: {
          currency: 'inr',
          product_data: { name: l.name },
          unit_amount: Math.round(l.price * 100),
        },
        quantity: l.quantity,
      })),
      success_url:
        successUrl ||
        `${process.env.FRONTEND_URL || 'http://localhost:5173'}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cart`,
      metadata: { orderId: order._id.toString(), userId: req.user.id },
    })

    order.stripeSessionId = session.id
    await order.save()

    res.json({ sessionId: session.id, url: session.url, orderId: order._id })
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
}

export async function stripeWebhook(req, res) {
  let stripe
  try {
    stripe = getStripe()
  } catch (e) {
    return res.status(500).send('Stripe not configured')
  }
  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return res.status(500).send('STRIPE_WEBHOOK_SECRET not set')
  }
  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err) {
    console.error(err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = session.metadata?.orderId
    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid',
        stripePaymentIntentId: session.payment_intent || undefined,
        orderStatus: 'placed',
      })
      const order = await Order.findById(orderId)
      if (order?.user) await clearUserCart(order.user.toString())
    }
  }

  res.json({ received: true })
}

export async function createRazorpayOrder(req, res) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ message: 'Razorpay not configured' })
    }
    const { items, shippingAddress } = req.body
    if (!shippingAddress?.fullName) {
      return res.status(400).json({ message: 'shippingAddress required' })
    }
    const { lines, total } = await buildOrderItems(items)
    const order = await Order.create({
      user: req.user.id,
      items: lines,
      shippingAddress,
      paymentMethod: 'razorpay',
      paymentStatus: 'pending',
      orderStatus: 'processing',
      totalAmount: total,
    })

    const razorpay = getRazorpay()
    const amountPaise = Math.round(total * 100)
    const rzOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: order._id.toString().slice(0, 40),
    })

    order.razorpayOrderId = rzOrder.id
    await order.save()

    res.json({
      orderId: order._id,
      razorpayOrderId: rzOrder.id,
      amount: amountPaise,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
}

export async function verifyRazorpayPayment(req, res) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({ message: 'Missing payment verification fields' })
    }
    const secret = process.env.RAZORPAY_KEY_SECRET
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = hmac.digest('hex')
    if (digest !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' })
    }

    const order = await Order.findById(orderId)
    if (!order || order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Order not found' })
    }
    if (order.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ message: 'Order id mismatch' })
    }

    order.paymentStatus = 'paid'
    order.razorpayPaymentId = razorpay_payment_id
    order.orderStatus = 'placed'
    await order.save()
    await clearUserCart(req.user.id)

    res.json({ success: true, order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function verifyStripeSession(req, res) {
  try {
    const { sessionId } = req.body
    if (!sessionId) return res.status(400).json({ message: 'sessionId required' })
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed' })
    }
    const orderId = session.metadata?.orderId
    const order = await Order.findById(orderId)
    if (!order || order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Order not found' })
    }
    res.json({ success: true, order })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })
dotenv.config({ path: path.join(__dirname, 'config', '.env') })

import { connectDB } from './config/db.js'
import { configureCloudinary } from './config/cloudinary.js'
import { stripeWebhook } from './controllers/paymentController.js'

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import { orderRoutes, adminOrderRoutes } from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173,http://localhost:5174,http://localhost:5175')
  .split(',')
  .map((s) => s.trim())

app.post('/api/payments/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook)

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
      cb(null, true)
    },
    credentials: true,
  }),
)
app.use(express.json({ limit: '2mb' }))

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'E-commerce API' })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin/orders', adminOrderRoutes)
app.use('/api/payments', paymentRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  if (err.message === 'Only image uploads are allowed') {
    return res.status(400).json({ message: err.message })
  }
  res.status(500).json({ message: err.message || 'Server error' })
})

async function start() {
  try {
    configureCloudinary()
    await connectDB()
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  } catch (e) {
    console.error('Failed to start', e)
    process.exit(1)
  }
}

start()

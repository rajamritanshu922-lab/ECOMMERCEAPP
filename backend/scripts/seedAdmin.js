import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import User from '../models/User.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })
dotenv.config({ path: path.join(__dirname, '..', 'config', '.env') })

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI missing')
  process.exit(1)
}

const email = process.env.SEED_ADMIN_EMAIL || 'admin@forever.com'
const password = process.env.SEED_ADMIN_PASSWORD || 'admin123456'

await mongoose.connect(uri)
const existing = await User.findOne({ email })
if (existing) {
  console.log('Admin already exists:', email)
  process.exit(0)
}
await User.create({ name: 'Admin', email, password, role: 'admin' })
console.log('Admin user created:', email)
process.exit(0)

import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri || !String(uri).trim()) {
    throw new Error(
      'MONGODB_URI is not set. Create backend/.env (see .env.example) with MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce',
    )
  }
  await mongoose.connect(uri)
  console.log('MongoDB connected')
}

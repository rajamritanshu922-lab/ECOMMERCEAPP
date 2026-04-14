import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false },
)

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    images: { type: [imageSchema], default: [] },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, required: true, trim: true },
    sizes: { type: [String], default: [] },
    bestseller: { type: Boolean, default: false },
    date: { type: Number, default: () => Date.now() },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default mongoose.model('Product', productSchema)

import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    image: String,
  },
  { _id: false },
)

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, default: 'India' },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: { type: addressSchema, required: true },
    paymentMethod: {
      type: String,
      enum: ['cod', 'stripe', 'razorpay'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'cod'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'placed',
    },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: 'inr' },
    stripeSessionId: String,
    stripePaymentIntentId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
  },
  { timestamps: true },
)

export default mongoose.model('Order', orderSchema)

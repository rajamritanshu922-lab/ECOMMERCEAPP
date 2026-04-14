import { Router } from 'express'
import * as pay from '../controllers/paymentController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.post('/stripe/checkout', authenticate, pay.createStripeCheckout)
router.post('/stripe/verify-session', authenticate, pay.verifyStripeSession)
router.post('/razorpay/create-order', authenticate, pay.createRazorpayOrder)
router.post('/razorpay/verify', authenticate, pay.verifyRazorpayPayment)

export default router

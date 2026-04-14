import { Router } from 'express'
import * as cart from '../controllers/cartController.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()
router.use(authenticate)

router.get('/', cart.getCart)
router.post('/items', cart.addToCart)
router.patch('/items/:itemId', cart.updateCartItem)
router.delete('/items/:itemId', cart.removeCartItem)
router.delete('/', cart.clearCart)

export default router

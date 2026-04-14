import { Router } from 'express'
import * as order from '../controllers/orderController.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.post('/cod', authenticate, order.placeCodOrder)
router.get('/my', authenticate, order.myOrders)
router.get('/my/:id', authenticate, order.getOrderById)

const admin = Router()
admin.use(authenticate, requireAdmin)
admin.get('/', order.adminListOrders)
admin.patch('/:id/status', order.adminUpdateOrderStatus)

export { router as orderRoutes, admin as adminOrderRoutes }

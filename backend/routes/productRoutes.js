import { Router } from 'express'
import * as product from '../controllers/productController.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'
import { uploadMemory, uploadImagesToCloudinary } from '../middleware/upload.js'

const router = Router()

router.get('/', product.listProducts)
router.get('/:id', product.getProduct)

router.post(
  '/',
  authenticate,
  requireAdmin,
  uploadMemory.array('images', 12),
  uploadImagesToCloudinary,
  product.createProduct,
)

router.patch(
  '/:id',
  authenticate,
  requireAdmin,
  uploadMemory.array('images', 12),
  uploadImagesToCloudinary,
  product.updateProduct,
)

router.delete('/:id', authenticate, requireAdmin, product.deleteProduct)

export default router

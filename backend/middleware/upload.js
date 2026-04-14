import multer from 'multer'
import { Readable } from 'stream'
import { cloudinary } from '../config/cloudinary.js'

export const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image uploads are allowed'))
  },
})

function uploadBuffer(buffer, folder = 'ecommerce/products') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => {
        if (err) return reject(err)
        resolve({ url: result.secure_url, publicId: result.public_id })
      },
    )
    Readable.from(buffer).pipe(stream)
  })
}

export async function uploadImagesToCloudinary(req, res, next) {
  try {
    if (!req.files?.length) {
      req.uploadedImages = []
      return next()
    }
    const results = []
    for (const file of req.files) {
      results.push(await uploadBuffer(file.buffer))
    }
    req.uploadedImages = results
    next()
  } catch (err) {
    next(err)
  }
}

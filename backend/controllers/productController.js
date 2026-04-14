import Product from '../models/Product.js'
import { cloudinary } from '../config/cloudinary.js'

export async function listProducts(req, res) {
  try {
    const { category, subCategory, search } = req.query
    const filter = {}
    if (category) filter.category = category
    if (subCategory) filter.subCategory = subCategory
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ]
    }
    const products = await Product.find(filter).sort({ date: -1 }).lean()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id).lean()
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function createProduct(req, res) {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller, stock } = req.body
    if (!name || price == null || !category || !subCategory) {
      return res.status(400).json({ message: 'name, price, category, subCategory are required' })
    }
    const images = req.uploadedImages || []
    if (!images.length) {
      return res.status(400).json({ message: 'At least one image is required' })
    }
    let sizesArr = sizes
    if (typeof sizes === 'string') {
      try {
        sizesArr = JSON.parse(sizes)
      } catch {
        sizesArr = sizes.split(',').map((s) => s.trim()).filter(Boolean)
      }
    }
    const product = await Product.create({
      name,
      description: description || '',
      price: Number(price),
      images,
      category,
      subCategory,
      sizes: Array.isArray(sizesArr) ? sizesArr : [],
      bestseller: bestseller === true || bestseller === 'true',
      stock: stock != null ? Number(stock) : 0,
    })
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    for (const img of product.images) {
      try {
        await cloudinary.uploader.destroy(img.publicId)
      } catch (e) {
        console.warn('Cloudinary delete', e.message)
      }
    }
    await product.deleteOne()
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    const { name, description, price, category, subCategory, sizes, bestseller, stock } = req.body
    if (name != null) product.name = name
    if (description != null) product.description = description
    if (price != null) product.price = Number(price)
    if (category != null) product.category = category
    if (subCategory != null) product.subCategory = subCategory
    if (bestseller != null) product.bestseller = bestseller === true || bestseller === 'true'
    if (stock != null) product.stock = Number(stock)
    if (sizes != null) {
      let sizesArr = sizes
      if (typeof sizes === 'string') {
        try {
          sizesArr = JSON.parse(sizes)
        } catch {
          sizesArr = sizes.split(',').map((s) => s.trim()).filter(Boolean)
        }
      }
      if (Array.isArray(sizesArr)) product.sizes = sizesArr
    }
    const newImages = req.uploadedImages || []
    if (newImages.length) {
      product.images.push(...newImages)
    }
    await product.save()
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

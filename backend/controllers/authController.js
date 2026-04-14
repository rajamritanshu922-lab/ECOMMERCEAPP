import validator from 'validator'
import User from '../models/User.js'
import { signToken } from '../utils/jwt.js'

export async function register(req, res) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(409).json({ message: 'Email already registered' })
    }
    const user = await User.create({ name, email, password, role: 'user' })
    const token = signToken(user._id.toString(), user.role)
    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message || 'Registration failed' })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const ok = await user.comparePassword(password)
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = signToken(user._id.toString(), user.role)
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message || 'Login failed' })
  }
}

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ message: 'Invalid admin credentials' })
    }
    const ok = await user.comparePassword(password)
    if (!ok) {
      return res.status(401).json({ message: 'Invalid admin credentials' })
    }
    const token = signToken(user._id.toString(), user.role)
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message || 'Admin login failed' })
  }
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.user.id).lean()
    if (!user) return res.status(404).json({ message: 'User not found' })
    delete user.password
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

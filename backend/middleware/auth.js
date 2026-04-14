import { verifyToken } from '../utils/jwt.js'

export function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' })
    }
    const token = header.slice(7)
    const payload = verifyToken(token)
    req.user = { id: payload.userId, role: payload.role }
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' })
  }
  next()
}

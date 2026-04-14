import jwt from 'jsonwebtoken'

const secret = () => {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET is not set')
  return s
}

export function signToken(userId, role) {
  return jwt.sign({ userId, role }, secret(), { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
}

export function verifyToken(token) {
  return jwt.verify(token, secret())
}

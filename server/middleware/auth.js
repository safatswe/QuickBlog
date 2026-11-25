import jwt from 'jsonwebtoken'

// Admin only
const auth = (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    if (!token) return res.json({ success: false, message: 'Not authorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role !== 'admin') {
      return res.json({ success: false, message: 'Not authorized' })
    }
    next()
  } catch (error) {
    res.json({ success: false, message: 'Invalid or expired token' })
  }
}

export default auth
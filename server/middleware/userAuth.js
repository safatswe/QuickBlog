import jwt from 'jsonwebtoken'

// Normal logged-in users only
const userAuth = (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    if (!token) return res.json({ success: false, message: 'Not authorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role !== 'user') {
      return res.json({ success: false, message: 'Not authorized' })
    }

    req.userId = decoded.id
    next()
  } catch (error) {
    res.json({ success: false, message: 'Invalid or expired token' })
  }
}

export default userAuth
import jwt from 'jsonwebtoken'

// Admin OR a normal user (used for the AI writer)
const anyAuth = (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '')
    if (!token) return res.json({ success: false, message: 'Not authorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role === 'admin') {
      req.actorKey = 'admin'
      req.actorRole = 'admin'
    } else if (decoded.role === 'user') {
      req.actorKey = decoded.id
      req.actorRole = 'user'
    } else {
      return res.json({ success: false, message: 'Not authorized' })
    }
    next()
  } catch (error) {
    res.json({ success: false, message: 'Invalid or expired token' })
  }
}

export default anyAuth
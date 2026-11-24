import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.replace('Bearer ', '')
    if (!token) return res.json({ success: false, message: 'Not authorized' })

    jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    res.json({ success: false, message: 'Invalid or expired token' })
  }
}

export default auth

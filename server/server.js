import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/blogRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()

// In production set CLIENT_URL (your Vercel address) so only your site can call the API.
// Several addresses can be separated with commas. If it is not set, any site is allowed.
const clientUrls = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((url) => url.trim().replace(/\/$/, ''))
  : null

app.use(cors(clientUrls ? { origin: clientUrls } : undefined))
app.use(express.json())

app.get('/', (req, res) => res.send('QuickBlog API is working'))
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
})
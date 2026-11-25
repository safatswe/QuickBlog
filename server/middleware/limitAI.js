// Stops one person from using up the free AI quota.
// Users: 10 generations per hour. Admin: 50 per hour.
// (Kept in memory, so it resets when the server restarts.)
const WINDOW_MS = 60 * 60 * 1000
const LIMITS = { admin: 50, user: 10 }
const usage = new Map()

const limitAI = (req, res, next) => {
  const now = Date.now()
  const key = req.actorKey
  const limit = LIMITS[req.actorRole] || 10

  let entry = usage.get(key)
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS }
    usage.set(key, entry)
  }

  if (entry.count >= limit) {
    const minutes = Math.ceil((entry.resetAt - now) / 60000)
    return res.json({
      success: false,
      message: `AI limit reached (${limit} per hour). Try again in about ${minutes} minutes.`,
    })
  }

  entry.count += 1
  next()
}

export default limitAI

import 'dotenv/config'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Errors that usually go away if we wait a little or use another model
const BUSY_CODES = [429, 500, 502, 503, 504]

// How long to wait for one answer before giving up (default 30 seconds)
const TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS) || 30000

const callModel = async (model, prompt, apiKey) => {
  console.log(`Asking AI model "${model}"...`)

  let response
  let data
  try {
    response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }
    )
    data = await response.json().catch(() => ({}))
  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      const timeoutError = new Error('The AI took too long to respond')
      timeoutError.status = 504
      timeoutError.timedOut = true
      throw timeoutError
    }
    throw err
  }

  if (!response.ok) {
    const error = new Error(data?.error?.message || `AI request failed (status ${response.status})`)
    error.status = response.status
    throw error
  }

  const parts = data?.candidates?.[0]?.content?.parts || []
  const text = parts
    .filter((part) => !part.thought)
    .map((part) => part.text || '')
    .join('')
    .trim()

  if (!text) throw new Error('The AI returned an empty response. Please try again.')

  return text
}

// One function that talks to the AI. If you ever switch AI provider,
// this is the only file you need to change.
export const generateText = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is missing in server/.env')

  // Main model first, then a backup model if the main one is busy or unavailable
  const primary = process.env.AI_MODEL || 'gemini-flash-latest'
  const fallback = process.env.AI_FALLBACK_MODEL || 'gemini-flash-latest'
  const models = primary === fallback ? [primary] : [primary, fallback]

  let lastError

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        return await callModel(model, prompt, apiKey)
      } catch (error) {
        lastError = error
        console.log(`AI model "${model}" attempt ${attempt} failed: ${error.message}`)

        // Too slow: do not wait again, go straight to the backup model
        if (error.timedOut) break

        // Busy: wait a moment and try the same model once more
        if (BUSY_CODES.includes(error.status) && attempt < 2) {
          await sleep(2000)
          continue
        }

        // Busy or model not available: move on to the backup model
        if (BUSY_CODES.includes(error.status) || error.status === 404) break

        // Anything else (wrong key, bad request) will not fix itself
        throw error
      }
    }
  }

  if (BUSY_CODES.includes(lastError?.status)) {
    throw new Error('The AI is very busy right now. Please wait a minute and try again.')
  }
  throw lastError
}
// Run from the server folder:  node scripts/test-ai.js
// Sends a tiny question to several AI models and shows which ones work right now.
import 'dotenv/config'

const key = process.env.GEMINI_API_KEY
if (!key) {
  console.log('Add GEMINI_API_KEY to server/.env first.')
  process.exit(1)
}

const models = [
  process.env.AI_MODEL,
  process.env.AI_FALLBACK_MODEL,
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
].filter((name, index, all) => name && all.indexOf(name) === index)

console.log('Testing models (each gets up to 25 seconds)...\n')

for (const model of models) {
  const start = Date.now()
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({ contents: [{ parts: [{ text: 'Say hello in five words.' }] }] }),
        signal: AbortSignal.timeout(25000),
      }
    )
    const data = await res.json().catch(() => ({}))
    const seconds = ((Date.now() - start) / 1000).toFixed(1)

    if (res.ok) {
      const text = (data?.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim()
      console.log(`WORKS   ${model}  (${seconds}s)  ->  ${text.slice(0, 60)}`)
    } else {
      console.log(`FAILED  ${model}  (${seconds}s)  ->  ${res.status}: ${(data?.error?.message || '').slice(0, 90)}`)
    }
  } catch (error) {
    const seconds = ((Date.now() - start) / 1000).toFixed(1)
    const reason = error.name === 'TimeoutError' ? 'no answer in 25 seconds' : error.message
    console.log(`FAILED  ${model}  (${seconds}s)  ->  ${reason}`)
  }
}

console.log('\nDone. Put a WORKS model in AI_MODEL (the fastest one) inside server/.env')
// Run from the server folder:  node scripts/list-models.js
// Prints the AI models your API key can use.
import 'dotenv/config'

const key = process.env.GEMINI_API_KEY
if (!key) {
  console.log('Add GEMINI_API_KEY to server/.env first.')
  process.exit(1)
}

const names = []
let pageToken = ''

do {
  const url =
    'https://generativelanguage.googleapis.com/v1beta/models?pageSize=100' +
    (pageToken ? `&pageToken=${pageToken}` : '')
  const res = await fetch(url, { headers: { 'x-goog-api-key': key } })
  const data = await res.json()

  if (!res.ok) {
    console.log('Error:', data?.error?.message || `status ${res.status}`)
    process.exit(1)
  }

  for (const model of data.models || []) {
    if (model.supportedGenerationMethods?.includes('generateContent')) {
      names.push(model.name.replace('models/', ''))
    }
  }
  pageToken = data.nextPageToken || ''
} while (pageToken)

console.log('Models you can use. Put one name in AI_MODEL inside server/.env:\n')
names.forEach((name) => console.log('  ' + name + (name.includes('flash') ? '   <- fast and cheap, good choice' : '')))

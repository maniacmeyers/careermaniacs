export async function submitContact(data, { fetcher = fetch, timeoutMs = 20000 } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetcher('https://formsubmit.co/ajax/jeff@careermaniacs.com', {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'New Career Maniacs inquiry',
        _replyto: data.email.trim(),
        _template: 'table',
        name: data.name.trim(),
        email: data.email.trim(),
        currentRole: data.currentRole || '',
        careerStage: data.careerStage || '',
        need: data.need || '',
        message: data.message.trim(),
      }),
    })
    if (!response.ok) throw new Error('Contact service unavailable')
    const result = await response.json()
    if (result.success !== true && result.success !== 'true') throw new Error('Submission not accepted')
  } finally {
    clearTimeout(timer)
  }
}

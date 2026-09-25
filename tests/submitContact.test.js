import test from 'node:test'
import assert from 'node:assert/strict'
import { submitContact } from '../src/lib/submitContact.js'
const data = { name: ' Test ', email: ' test@example.com ', message: ' Test message ', careerStage: 'Starting a search' }
test('sends to Jeff with reply-to and requires provider acceptance', async () => {
  await submitContact(data, { fetcher: async (url, options) => {
    assert.equal(url, 'https://formsubmit.co/ajax/jeff@careermaniacs.com')
    const body = JSON.parse(options.body)
    assert.equal(body._replyto, 'test@example.com')
    assert.equal(body.message, 'Test message')
    assert.equal(body.careerStage, 'Starting a search')
    return { ok: true, json: async () => ({ success: 'true' }) }
  } })
  for (const response of [{ ok: false }, { ok: true, json: async () => ({ success: false }) }]) {
    await assert.rejects(submitContact(data, { fetcher: async () => response }))
  }
})
test('aborts stalled requests so the form can recover', async () => {
  await assert.rejects(submitContact(data, { timeoutMs: 5, fetcher: (_url, { signal }) =>
    new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(new Error('timeout')), { once: true }))
  }), /timeout/)
})

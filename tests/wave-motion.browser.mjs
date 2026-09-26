// Run with the dev server up: node tests/wave-motion.browser.mjs
// PLAYWRIGHT_MODULE may point to an existing Playwright installation.
import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173/')
  const video = page.locator('.wave-video')
  assert.equal(await video.getAttribute('src'), null, 'No video download above the fold')
  await page.locator('#method').scrollIntoViewIfNeeded()
  await page.waitForFunction(() => document.querySelector('.wave-video').currentTime > 0)
  await page.getByRole('button', { name: 'Pause wave', exact: true }).click()
  const pausedAt = await video.evaluate(v => v.currentTime)
  await page.waitForTimeout(350)
  assert.equal(await video.evaluate(v => v.currentTime), pausedAt, 'Pause stops playback')
  await page.getByRole('button', { name: 'Play wave', exact: true }).click()
  await page.waitForFunction(time => document.querySelector('.wave-video').currentTime > time, pausedAt)
  assert((await video.evaluate(v => v.duration)) >= 17, 'Wave gives readers a longer cycle')
  await page.waitForFunction(() => {
    const v = document.querySelector('.wave-video')
    return v.currentTime > v.duration - 0.5
  })
  await page.waitForFunction(() => document.querySelector('.wave-video').currentTime < 2)
  assert.equal(await video.evaluate(v => v.paused), false, 'Wave keeps playing after wrapping')
  await page.locator('.ocean-hero').scrollIntoViewIfNeeded()
  await page.waitForFunction(() => document.querySelector('.wave-video').paused)
  await page.locator('#method').scrollIntoViewIfNeeded()
  await page.waitForFunction(() => !document.querySelector('.wave-video').paused)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForFunction(() => document.querySelector('.wave-video').paused)
  assert.equal(await page.getByRole('button', { name: /wave/ }).count(), 0, 'Reduced motion shows the still with no control')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.reload()
  await page.locator('#method').scrollIntoViewIfNeeded()
  await page.waitForFunction(() => !document.querySelector('.wave-video').paused)
  assert.match(await video.getAttribute('src'), /maniac-wave-motion-960\.mp4$/, 'Phones load the 960px encode')
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
  console.log('Wave motion: lazy load, looping, pause, offscreen pause/resume, reduced motion and the lighter phone encode passed.')
} finally {
  await browser.close()
}

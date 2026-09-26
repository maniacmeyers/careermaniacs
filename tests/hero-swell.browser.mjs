// Run against a preview: TEST_URL=http://127.0.0.1:4173 node tests/hero-swell.browser.mjs
import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const url = process.env.TEST_URL || 'http://127.0.0.1:5173/'
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] })
const state = (page) => page.evaluate(() => { const v = document.querySelector('.hero-swell video'); return { t: v.currentTime, paused: v.paused, loop: v.loop } })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(url)
  await page.waitForSelector('.hero-swell.is-shown')
  const a = await state(page); await page.waitForTimeout(1500); const b = await state(page)
  assert(a.loop && !b.paused && b.t > a.t, 'Swell loops and keeps playing at rest')
  await page.evaluate(() => scrollTo(0, 450)); await page.waitForTimeout(400)
  const c = await state(page); await page.waitForTimeout(1200); const d = await state(page)
  assert(!d.paused && d.t !== c.t, 'Swell keeps playing after the visitor scrolls')
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(300)
  await page.getByRole('button', { name: 'Pause swell video' }).click()
  assert((await state(page)).paused, 'Pause control stops the swell')
  await page.getByRole('button', { name: 'Play swell video' }).click()
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(600)
  assert((await state(page)).paused, 'Swell pauses when the hero is off screen')
  const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await reduced.goto(url); await reduced.waitForTimeout(2500)
  assert.equal(await reduced.evaluate(() => document.querySelector('.hero-swell video').getAttribute('src')), null, 'Reduced motion never loads the video')
  console.log('Hero swell: loops at rest, keeps playing on scroll, pause control, offscreen pause, reduced motion passed.')
} finally { await browser.close() }

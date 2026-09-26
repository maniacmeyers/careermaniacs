// Run against a preview: TEST_URL=http://127.0.0.1:4173 node tests/hero-swell.browser.mjs
import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const url = process.env.TEST_URL || 'http://127.0.0.1:5173/'
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] })
const time = (page) => page.evaluate(() => document.querySelector('.hero-swell video').currentTime)
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(url)
  await page.waitForSelector('.hero-swell.is-shown')
  await page.waitForTimeout(4500)
  const held = await time(page)
  assert(Math.abs(held - 3.2) < 0.4, `Idle build holds near 40% (got ${held})`)
  await page.evaluate(() => scrollTo(0, 450)); await page.waitForTimeout(600)
  assert(await time(page) > held + 1, 'Scrolling carries the swell forward')
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(600)
  assert(Math.abs((await time(page)) - held) < 0.2, 'Scrolling back returns to the held frame')
  const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await reduced.goto(url); await reduced.waitForTimeout(2500)
  assert.equal(await reduced.evaluate(() => document.querySelector('.hero-swell video').getAttribute('src')), null, 'Reduced motion never loads the video')
  console.log('Hero swell: idle build and hold, scroll-driven growth, reverse, reduced motion passed.')
} finally { await browser.close() }

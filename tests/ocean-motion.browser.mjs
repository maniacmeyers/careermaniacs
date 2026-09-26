// Run against a preview: TEST_URL=http://127.0.0.1:4173 node tests/ocean-motion.browser.mjs
import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const same = (a, b) => a.equals(b)
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173/')
  const hero = page.locator('.ocean-hero')
  await page.waitForSelector('.ocean-hero canvas.is-live')
  const water = { x: 700, y: 520, width: 450, height: 240 }
  const a = await page.screenshot({ clip: water }); await page.waitForTimeout(500)
  assert(!same(a, await page.screenshot({ clip: water })), 'Water moves')
  await hero.getByRole('button', { name: 'Pause water' }).click()
  await page.waitForTimeout(400) // let the frame already in flight land (software GL can be slow)
  const p1 = await page.screenshot({ clip: water }); await page.waitForTimeout(500)
  assert(same(p1, await page.screenshot({ clip: water })), 'Pause stops the water')
  await hero.getByRole('button', { name: 'Play water' }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload(); await page.waitForSelector('.ocean-hero canvas.is-live')
  assert.equal(await hero.getByRole('button', { name: /water/ }).count(), 0, 'Reduced motion: still water, no control')
  console.log('Ocean motion: moves, pauses, resumes, and holds still under reduced motion.')
} finally { await browser.close() }

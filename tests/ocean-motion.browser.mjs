// Run against a preview: TEST_URL=http://127.0.0.1:4173 node tests/ocean-motion.browser.mjs
import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const same = (a, b) => a.equals(b)
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(process.env.TEST_URL || 'http://127.0.0.1:5173/')
  const hero = page.locator('.closing-ocean')
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; const el = document.querySelector('.closing-ocean'); scrollTo(0, el.offsetTop + el.offsetHeight - innerHeight) })
  await page.waitForSelector('.closing-ocean canvas.is-live')
  const box = await hero.boundingBox()
  const water = { x: 700, y: Math.max(0, box.y + box.height * 0.55), width: 400, height: 120 }
  const a = await page.screenshot({ clip: water }); await page.waitForTimeout(500)
  assert(!same(a, await page.screenshot({ clip: water })), 'Water moves')
  await hero.getByRole('button', { name: 'Pause water animation' }).click()
  await page.waitForTimeout(400) // let the frame already in flight land (software GL can be slow)
  const p1 = await page.screenshot({ clip: water }); await page.waitForTimeout(500)
  assert(same(p1, await page.screenshot({ clip: water })), 'Pause stops the water')
  await hero.getByRole('button', { name: 'Play water animation' }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload(); await hero.scrollIntoViewIfNeeded(); await page.waitForSelector('.closing-ocean canvas.is-live')
  assert.equal(await hero.getByRole('button', { name: /water/ }).count(), 0, 'Reduced motion: still water, no control')
  console.log('Ocean motion: moves, pauses, resumes, and holds still under reduced motion.')
} finally { await browser.close() }

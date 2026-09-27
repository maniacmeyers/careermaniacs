// Run against a preview: TEST_URL=http://127.0.0.1:4173 node tests/link-scroll.browser.mjs
import assert from 'node:assert/strict'
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const url = process.env.TEST_URL || 'http://127.0.0.1:5173/'
for (const engine of [chromium, webkit]) {
  let browser
  try { browser = await engine.launch(engine === chromium ? { channel: 'chrome' } : {}) } catch { console.log(`${engine.name()}: not installed, skipped`); continue }
  try {
    for (const [w, h] of [[1440, 900], [390, 844]]) {
      const page = await browser.newPage({ viewport: { width: w, height: h } })
      await page.goto(url)
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, document.querySelector('.coach-section').offsetTop) })
      await page.getByRole('link', { name: 'Meet your coach' }).click()
      await page.waitForURL(/\/about$/); await page.waitForTimeout(800)
      assert.equal(await page.evaluate(() => Math.round(scrollY)), 0, `${engine.name()} ${w}px: About opens at the top`)
      await page.goBack(); await page.waitForTimeout(500)
      await page.getByRole('link', { name: 'Talk to Jeff' }).first().click()
      await page.waitForURL(/\/contact#book$/); await page.waitForTimeout(800)
      assert(await page.evaluate(() => Math.abs(document.getElementById('book').getBoundingClientRect().top - 96) < 4), `${engine.name()} ${w}px: #book anchor still lands on the form`)
    }
    console.log(`${engine.name()}: in-site links open at the top; anchors still land.`)
  } finally { await browser.close() }
}

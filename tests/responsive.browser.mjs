import assert from 'node:assert/strict'
const { chromium, webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.TEST_URL || 'http://127.0.0.1:5173'
const routes = ['/', '/about', '/services', '/services/job-acquisition', '/services/gtm-onboarding', '/services/ai-workshop', '/testimonials', '/contact', '/privacy', '/terms']
for (const engine of [chromium, webkit]) {
  const browser = await engine.launch(engine === chromium ? { channel: 'chrome', headless: true } : {})
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' })
    for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 844 })
      for (const route of routes) {
        await page.goto(base + route)
        await page.evaluate(() => document.fonts.ready)
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${engine.name()} ${width}px ${route}: page overflow`)
        if (route === '/') {
          const geometry = await page.locator('.method-heading').evaluate(el => {
            const parent = el.getBoundingClientRect()
            return [...el.children].map(child => ({ left: child.getBoundingClientRect().left - parent.left, right: child.getBoundingClientRect().right, font: parseFloat(getComputedStyle(child).fontSize) }))
          })
          assert(geometry.every(item => Math.abs(item.left) < 1 && item.right <= width), `Method text alignment at ${width}px`)
          if (width <= 430) assert(await page.locator('.method-heading h2').evaluate(el => parseFloat(getComputedStyle(el).fontSize)) < 56, 'Phone heading scales down')
        }
      }
    }
    console.log(`${engine.name()}: ten pages at seven widths passed.`)
  } finally { await browser.close() }
}

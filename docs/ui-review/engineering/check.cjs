const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE);
const { AxeBuilder } = require(process.env.AXE_MODULE);

const base = process.argv[2] || 'http://127.0.0.1:8382/';
const output = process.argv[3] || __dirname;

(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [1440, 768, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('requestfailed', request => errors.push(request.url()));
      page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
      await page.goto(base);
      const slots = page.locator('[data-photo]');
      assert.equal(await slots.count(), 4);
      assert.equal(await page.locator('.service-grid article').count(), 9);
      const assets = await page.evaluate(async () => {
        await document.fonts.ready;
        return Promise.all(Array.from(document.images, async image => {
          image.loading = 'eager';
          await image.decode();
          return image.naturalWidth;
        }));
      });
      assert.ok(assets.every(width => width >= 1));
      assert.equal(await page.locator('.hero-grid').evaluate(el => getComputedStyle(el).animationName), 'none');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      assert.deepEqual(errors, []);
      const results = await new AxeBuilder({ page }).analyze();
      assert.deepEqual(results.violations.map(({ id, nodes }) => [id, nodes.map(n => n.target)]), []);
      fs.mkdirSync(output, { recursive: true });
      if (width !== 768) {
        await page.screenshot({ path: path.join(output, `home-${width}.png`), fullPage: true });
        await page.screenshot({ path: path.join(output, `hero-${width}.png`) });
      }
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus-visible').innerText(), 'Skip to content');
      await page.keyboard.press('Enter');
      assert.equal(new URL(page.url()).hash, '#main');
      await page.keyboard.press('Tab');
      assert.match(await page.locator(':focus-visible').innerText(), /Discuss your car/);
      await page.keyboard.press('Enter');
      assert.equal(new URL(page.url()).hash, '#contact');
      assert.equal(await page.getByRole('link', { name: 'Call 03 9873 3874' }).getAttribute('href'), 'tel:+61398733874');
      const directions = await page.getByRole('link', { name: 'Get directions' }).getAttribute('href');
      assert.equal(new URL(directions).searchParams.get('destination'), '1 Walter Street, Moorabbin VIC 3189, Australia');
      for (const link of await page.getByRole('navigation').getByRole('link').all()) {
        await link.click();
        assert.equal(new URL(page.url()).hash, await link.getAttribute('href'));
      }
      console.log(`PASS Chromium ${width}px: assets, reflow, reduced motion, axe, keyboard and contact links`);
      if (width === 390) {
        await page.route('**/austin-engine-on-stand.webp', route => route.fulfill({
          path: path.join(__dirname, '../../../site/assets/bmc-museum-cutaway.jpg')
        }));
        await page.route('**/red-mini-engine-bay.webp', route => route.abort());
        await page.goto(base);
        await page.locator('#projects').scrollIntoViewIfNeeded();
        await page.locator('.has-photo img').waitFor();
        assert.equal(await page.locator('.has-photo img').getAttribute('data-photo'), 'assets/austin-engine-on-stand.webp');
        assert.ok(await page.getByText('Road & event preparation').isVisible());
        console.log('PASS 390px: valid replacement reveals photo and failed asset keeps fallback');
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
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
      const slots = page.locator('.workshop-photo');
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
      assert.ok(assets.every(width => width > 1));
      const expected = [
        ['austin-engine-on-stand.webp', 1536, 2048],
        ['red-mini-engine-bay.webp', 1080, 922],
        ['twin-su-carburettors.webp', 2040, 918],
        ['link-automotive-shop-sign.webp', 2040, 918]
      ];
      for (const [index, [filename, width, height]] of expected.entries()) {
        const photo = slots.nth(index);
        const source = await photo.evaluate(img => {
          const { currentSrc, naturalWidth, naturalHeight, alt } = img;
          return { currentSrc, naturalWidth, naturalHeight, alt };
        });
        assert.ok(source.alt);
        assert.ok(await photo.isVisible());
        assert.ok(new URL(source.currentSrc).pathname.endsWith('/' + filename));
        assert.deepEqual([source.naturalWidth, source.naturalHeight], [width, height]);
        const response = await context.request.get(source.currentSrc);
        assert.equal(response.status(), 200);
        assert.match(response.headers()['content-type'], /image\/webp/);
        const digest = bytes => createHash('sha256').update(bytes).digest('hex');
        assert.equal(digest(await response.body()), digest(fs.readFileSync(path.join(__dirname, '../../../site/assets', filename))));
      }
      for (const href of await page.locator('link[rel*="icon"]').evaluateAll(links => links.map(link => link.href))) {
        const response = await context.request.get(href);
        assert.equal(response.status(), 200);
        assert.match(response.headers()['content-type'], /^image\//);
      }
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
      await page.waitForURL(url => url.hash === '#main');
      await page.keyboard.press('Tab');
      assert.match(await page.locator(':focus-visible').innerText(), /Discuss your car/);
      await page.keyboard.press('Enter');
      await page.waitForURL(url => url.hash === '#contact');
      assert.equal(await page.getByRole('link', { name: 'Call 03 9873 3874' }).getAttribute('href'), 'tel:+61398733874');
      const directions = await page.getByRole('link', { name: 'Get directions' }).getAttribute('href');
      assert.equal(new URL(directions).searchParams.get('destination'), '1 Walter Street, Moorabbin VIC 3189, Australia');
      for (const link of await page.getByRole('navigation').getByRole('link').all()) {
        await link.click();
        const target = await link.getAttribute('href');
        await page.waitForURL(url => url.hash === target);
      }
      console.log(`PASS Chromium ${width}px: assets, reflow, reduced motion, axe, keyboard and contact links`);
      await page.goto(base);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      assert.match(await page.locator(':focus-visible').innerText(), /Contact & directions/);
      await page.keyboard.press('Enter');
      await page.waitForURL(url => url.hash === '#contact');
      console.log('PASS banner keyboard navigation and all four network WebPs match the source bytes');
      await context.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

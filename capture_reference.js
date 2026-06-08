import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  try {
    await page.goto('https://casa-castro-web-page.vercel.app/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: 'reference.png', fullPage: true });
    console.log('Screenshot saved to reference.png');
  } catch (e) {
    console.error('Failed to capture screenshot:', e);
  }
  await browser.close();
})();

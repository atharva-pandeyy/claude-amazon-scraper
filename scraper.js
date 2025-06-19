const puppeteer = require('puppeteer');

const scrapeAmazon = async (searchQuery) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  );

  const url = `https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.s-main-slot');

  const products = await page.evaluate(() => {
    const items = [];
    const results = document.querySelectorAll('.s-main-slot .s-result-item');

    results.forEach((item) => {
      const title = item.querySelector('h2')?.innerText?.trim();
      const rawLink = item.querySelector('a')?.href;
      const rating = item.querySelector('.a-icon-star-small span')?.innerText?.trim();
      const price = item.querySelector('.a-price .a-offscreen')?.innerText?.trim();
      const availability = item.querySelector('.a-color-success')?.innerText?.trim();

      if (title && rawLink) {
        const cleanLink = rawLink.split("/ref=")[0];

        items.push({
          title,
          link: cleanLink,
          price: price || "₹ Not available",
          rating: rating || "No rating",
          availability: availability || "Check site",
        });
      }
    });

    return items.slice(0, 3);
  });

  await browser.close();
  return products;
};

module.exports = scrapeAmazon;

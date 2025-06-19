const readline = require('readline');
const callClaude = require('./claude');
const scrapeAmazon = require('./scraper');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🛒 What do you want to buy on Amazon?');

rl.question('', async (userQuery) => {
  try {
    console.log('\n💬 Claude interpreting your request...\n');
    const refinedQuery = await callClaude(userQuery);
    console.log(`Claude interpreted it as:\n\n${refinedQuery}\n`);

    console.log(`🔍 Scraping Amazon for: "${refinedQuery}"...`);
    const products = await scrapeAmazon(refinedQuery);

    if (!products.length) {
      console.log('⚠️ No relevant results found. Try rephrasing your query.');
    } else {
      console.log('\n📦 Absolutely user here are the Top 3 Amazon Results for you :\n');
      products.forEach((product, index) => {
        console.log(`${index + 1}. 🛍️ ${product.title}`);
        console.log(`   💸 Price: ${product.price}`);
        console.log(`   ⭐ Rating: ${product.rating}`);
        console.log(`   ✅ Availability: ${product.availability}`);
        console.log(`🔗 Link: ${product.link}\n`);
      });
    }
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
  } finally {
    rl.close();
  }
});

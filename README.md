# Amazon AI Product Discovery Agent

This project is a lightweight AI agent designed to convert human-friendly product queries into structured searches and extract live product data from Amazon using Puppeteer and Claude AI.

## 🔍 What It Does
- Accepts natural language queries (e.g., “Show me phone accessories under ₹500”)
- Uses Claude AI to convert the input into a valid Amazon search term
- Triggers a Puppeteer-based scraper (`scraper.js`) to extract product data
- Returns raw or parsed product information via console output

## 💡 Key Features
- Claude-powered query interpretation (`claude.js`)
- Dynamic Amazon scraping via headless browser automation (`scraper.js`)
- Easily customizable logic for filters like price, category, or keywords
- CLI-style prototype with modular architecture

## 🛠 Tech Stack
- `Node.js`, `JavaScript`
- `Claude AI API` (via HTTP)
- `Puppeteer` for browser automation
- (Optional) `n8n` integration in early iterations

## 📦 Files
- `claude.js` – Handles user input + AI query generation
- `scraper.js` – Automates Amazon search and extracts results
- `.env` – For API keys and settings (not included in repo)

## 🧠 Project Purpose
This prototype was built to explore the potential of combining AI reasoning with browser automation for personalized product discovery — turning vague requests into intelligent, actionable results.

---

*Built by Atharva Pandey • [GitHub](https://github.com/atharva-pandeyy)*

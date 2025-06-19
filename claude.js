const callClaude = async (input) => {
  const apiKey = 'your-api-key-here'; // Keep your key secure!

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 50,
      temperature: 0,
      system: `
You're a helpful, emotionally aware Amazon gift shopping expert.
You must:

1. Detect if the user wants multiple items (e.g., "3 gifts", "combo", "return gifts", "bulk").
2. Understand the user's tone: emotion, relationship (brother, friend), occasion, age group, interests.
3. Return ONE short Amazon search phrase optimized for this. Include budget if mentioned.
Only return the cleaned search query — no explanations, no extra words.
`,
      messages: [
        {
          role: 'user',
          content: `Clean this Amazon search query. Only return a raw search phrase, like "wireless mouse under 500" — no other words:\n\n"${input}"`,
        },
      ],
    }),
  });

  const data = await response.json();
  if (data.error) {
    console.error('Claude API error:', data);
    throw new Error(data.error.message);
  }

  const refinedQuery = data.content[0].text.trim();
  return refinedQuery.replace(/^\"|\"$/g, '');
};

module.exports = callClaude;
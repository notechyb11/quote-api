// File: api/quote.js
export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const fallbackQuotes = [
    { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { content: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
    { content: "Dream big and dare to fail.", author: "Norman Vaughan" }
  ];

  try {
    const response = await fetch("https://zenquotes.io/api/random");
    if (!response.ok) throw new Error(`API failed: ${response.status}`);

    const data = await response.json();
    const quote = data[0]; // ZenQuotes returns an array with one object

    return res.status(200).json({
      content: quote.q,
      author: quote.a,
    });
  } catch (error) {
    console.error("Quote API failed, using fallback:", error.message);

    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    return res.status(200).json(randomQuote);
  }
}

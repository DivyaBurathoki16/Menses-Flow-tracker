// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
require("dotenv").config();

router.post("/", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    console.log("OpenAI API response:", data);
    if (data.choices && data.choices.length > 0) {
      const reply = data.choices[0].message.content;
      return res.json({ response: reply });
    } else {
      return res.status(500).json({ error: "No response from OpenAI", data });
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return res.status(500).json({ error: "Error processing your request.", message: error.message });
  }
});

module.exports = router;

const express = require('express')
const router = express.Router()
require('dotenv').config();
const { Configuration, OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

router.post("/suggest", async (req, res) => {
    try {
        // Extract the prompt from the request body
        const { prompt } = req.body;
    
        if (!prompt) {
          return res.status(400).json({ error: "Prompt is required" });
        }
    
        // Call the OpenAI API to get a response
        const response = await openai.createChatCompletion({
          model: "gpt-4", // Specify the model to use
          messages: [
            { role: "system", content: "You are an expert in project managing." },
            { role: "user", content: `Choose 1 out of 3 of the models for project managing (Scrum,Kanban,Extreme programming) base on the description,show 3 reasons:${prompt}`},
          ],
        });
    
        // Extract the assistant's reply
        const suggestion = response.data.choices[0].message.content;
    
        // Send the suggestion back to the client
        res.status(200).json({ suggestion });
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: "An error occurred while processing your request" });
      }

})

module.exports = router;
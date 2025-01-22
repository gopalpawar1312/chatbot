const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoints

// Send a message
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message cannot be empty." });
  }

  // Save user message to the database
  const userMessage = { sender: "user", text: message, timestamp: new Date() };
  db.run(
    `INSERT INTO messages (sender, text, timestamp) VALUES (?, ?, ?)`,
    [userMessage.sender, userMessage.text, userMessage.timestamp],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to save message." });
      }

      // Generate a bot reply (simulated response)
      const botReply = {
        sender: "bot",
        text: `You said: "${message}". How can I assist further?`,
        timestamp: new Date(),
      };

      db.run(
        `INSERT INTO messages (sender, text, timestamp) VALUES (?, ?, ?)`,
        [botReply.sender, botReply.text, botReply.timestamp],
        function (err) {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Failed to save bot reply." });
          }

          res.json({ reply: botReply.text });
        }
      );
    }
  );
});

// Retrieve all messages
app.get("/api/chat", (req, res) => {
  db.all("SELECT * FROM messages ORDER BY timestamp ASC", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Failed to retrieve messages." });
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

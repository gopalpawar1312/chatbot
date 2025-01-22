import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: Unable to fetch a response." },
      ]);
    }

    setInput("");
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Chatbot
      </Typography>
      <Paper elevation={3} sx={{ p: 2, height: 400, overflowY: "auto", mb: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={msg.text}
                sx={{
                  bgcolor: msg.sender === "user" ? "#e3f2fd" : "#e8eaf6",
                  borderRadius: 2,
                  p: 1,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: "flex" }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default App;

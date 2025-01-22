const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to SQLite database');
        db.run(`
            CREATE TABLE messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_message TEXT NOT NULL,
                bot_response TEXT NOT NULL
            )
        `);
    }
});

// API: Send and Save Messages
app.post('/api/messages', (req, res) => {
    const { user_message } = req.body;

    // Generate a bot response (placeholder logic)
    const bot_response = `You said: ${user_message}`;

    db.run(
        `INSERT INTO messages (user_message, bot_response) VALUES (?, ?)`,
        [user_message, bot_response],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, user_message, bot_response });
        }
    );
});

// API: Retrieve Messages
app.get('/api/messages', (req, res) => {
    db.all(`SELECT * FROM messages`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

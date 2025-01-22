import React, { useState, useEffect } from 'react';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Fetch previous messages on load
        fetch('http://localhost:5000/api/messages')
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch((err) => console.error(err));
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;

        fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_message: input }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages((prev) => [...prev, data]);
                setInput('');
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <div>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <strong>User:</strong> {msg.user_message}
                        <br />
                        <strong>Bot:</strong> {msg.bot_response}
                        <hr />
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ChatBox;

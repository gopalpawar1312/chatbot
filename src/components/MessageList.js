import React from 'react';

const MessageList = ({ messages }) => (
  <div className="message-list">
    {messages.map((msg, idx) => (
      <div key={idx} className={`message ${msg.sender}`}>
        {msg.text}
      </div>
    ))}
  </div>
);

export default MessageList;

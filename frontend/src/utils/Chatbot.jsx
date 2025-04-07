// src/components/Chatbot.jsx
import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! How can I help you with your period, mensuration, hygiene, or symptoms today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      const botReply = data.response || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "There was an error processing your request." }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', width: '300px' }}>
      <h3>Health Chatbot</h3>
      <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'bot' ? 'left' : 'right', margin: '5px 0' }}>
            <strong>{msg.sender === 'bot' ? 'Bot' : 'You'}:</strong> {msg.text}
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <button onClick={handleSend} style={{ width: '100%', marginTop: '0.5rem' }}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;

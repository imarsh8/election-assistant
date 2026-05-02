import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Bot } from 'lucide-react';

const API_BASE = 'https://backend-220185214627.us-central1.run.app';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('token');

  // ❌ Disabled because backend has no /chats route
  const fetchHistory = async () => {
    try {
      setMessages([]);
    } catch (err) {
      console.error('History fetch disabled', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');

    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setLoading(true);

    try {
      const historyCtx = [];

      for (let i = 0; i < messages.length; i += 2) {
        if (messages[i] && messages[i + 1]) {
          historyCtx.push({
            message: messages[i].text,
            response: messages[i + 1].text
          });
        }
      }

      const res = await axios.post(
        `${API_BASE}/chat`,
        {
          message: userMsg,
          history: historyCtx
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessages(prev => [
        ...prev,
        { text: res.data.response, isBot: true }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        { text: 'Sorry, something went wrong. Please try again.', isBot: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="page-title">AI Election Assistant</h2>

      <div className="chat-container">
        <div className="chat-header">
          <Bot size={20} style={{ marginRight: '8px', color: 'var(--primary)' }} />
          Election Assistant Pro
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--secondary-text)', marginTop: '2rem' }}>
              Ask anything about elections, voting, or candidates 🚀
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.isBot ? 'bot' : 'user'}`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="message bot" style={{ fontStyle: 'italic' }}>
              Thinking...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />

          <button type="submit" className="chat-send-btn" disabled={loading}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
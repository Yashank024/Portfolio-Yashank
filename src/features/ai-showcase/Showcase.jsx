import React, { useState } from 'react';
import Button from '@components/ui/Button/Button';
import Card from '@components/ui/Card/Card';

export default function Showcase() {
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about Yashank's skills and projects.", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");

    setTimeout(() => {
      let reply = "I am a static AI assistant placeholder. Yashank is specialized in Generative AI, RAG Systems, and WebGL!";
      if (userMsg.toLowerCase().includes("project") || userMsg.toLowerCase().includes("work")) {
        reply = "Yashank has built projects like KnowDoc AI (OCR document intelligence), Yuva Foods (3D layout), and Exteroid.";
      } else if (userMsg.toLowerCase().includes("skill") || userMsg.toLowerCase().includes("tech")) {
        reply = "His primary stack includes React, Three.js, WebGL, FastAPI, Python, PHP, and ChromaDB.";
      }
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
    }, 600);
  };

  return (
    <Card style={{ padding: '20px', maxWidth: '400px', margin: '20px auto' }}>
      <h3 style={{ fontWeight: '800', marginBottom: '12px', fontSize: '15px' }}>⚡ Yashank AI Assistant</h3>
      <div style={{ height: '200px', overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '10px', marginBottom: '12px', background: 'rgba(28,21,16,0.01)' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.isBot ? 'flex-start' : 'flex-end', marginBottom: '8px' }}>
            <div style={{
              padding: '8px 12px',
              borderRadius: '12px',
              fontSize: '12.5px',
              maxWidth: '80%',
              textAlign: 'left',
              background: m.isBot ? 'var(--color-surface)' : 'var(--color-accent)',
              color: m.isBot ? 'var(--color-text)' : 'white',
              border: m.isBot ? '1px solid var(--color-border)' : 'none'
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask AI..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--color-border)',
            fontSize: '13px',
            background: 'white',
            color: 'var(--color-text)'
          }}
        />
        <Button variant="primary" onClick={handleSend} style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '6px' }}>Send</Button>
      </div>
    </Card>
  );
}

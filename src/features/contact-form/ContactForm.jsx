import React, { useState } from 'react';
import Button from '@components/ui/Button/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill all fields.');
      return;
    }
    setStatus('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '20px auto', textAlign: 'left' }}>
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '13px', background: 'white', color: 'var(--color-text)' }}
        />
      </div>
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '13px', background: 'white', color: 'var(--color-text)' }}
        />
      </div>
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Message</label>
        <textarea
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '13px', background: 'white', color: 'var(--color-text)' }}
        />
      </div>
      <Button type="submit" variant="primary">Send Message</Button>
      {status && <p style={{ fontSize: '12px', color: 'var(--color-accent)', marginTop: '8px' }}>{status}</p>}
    </form>
  );
}

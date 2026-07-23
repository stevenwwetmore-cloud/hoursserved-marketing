import { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader, AlertCircle } from 'lucide-react';

const CURRENCY_SYMBOLS = {
  USD: '$',
  CAD: 'CAD $',
  GBP: '£',
  AUD: 'AUD $',
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  // Handle query params for district quote prefill
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clubs = params.get('clubs');
    const currency = params.get('currency');
    const total = params.get('total');

    if (clubs && currency && total) {
      const symbol = CURRENCY_SYMBOLS[currency.toUpperCase() as keyof typeof CURRENCY_SYMBOLS] || currency;
      const prefilled = `District quote request: ${clubs} clubs, ${currency.toUpperCase()}, annual total ${symbol}${parseFloat(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`;
      setMessage(prefilled);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, organization, message, honeypot }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.');
    }
    setSending(false);
  };

  const handleReset = () => {
    setSent(false);
    setError('');
    setName('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setMessage('');
    setHoneypot('');
  };

  if (sent) {
    return (
      <div className="p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-700 mx-auto mb-3" aria-hidden="true" />
        <h3 className="font-bold text-white mb-1">Message sent!</h3>
        <p className="text-base text-white">We'll get back to you at <strong>{email}</strong> as soon as possible.</p>
        <button onClick={handleReset} className="mt-5 text-sm hover:underline text-white">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-white mb-1 text-left">Name</label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-white mb-1 text-left">Email <span className="text-red-300">*</span></label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-medium text-white mb-1 text-left">Phone</label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="(optional)"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
          />
        </div>
        <div>
          <label htmlFor="contact-organization" className="block text-sm font-medium text-white mb-1 text-left">Organization</label>
          <input
            id="contact-organization"
            type="text"
            value={organization}
            onChange={e => setOrganization(e.target.value)}
            placeholder="Club / org name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-white mb-1 text-left">How can we help? <span className="text-red-300">*</span></label>
        <textarea
          id="contact-message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Describe your question or issue…"
          required
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E56] resize-none"
        />
      </div>

      {/* Honeypot field - visually hidden but not display:none */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="contact-honeypot">Leave this field blank</label>
        <input
          id="contact-honeypot"
          type="text"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 border border-red-200 rounded-lg px-3 py-2 text-base text-red-100 bg-red-900/20">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-100" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={sending || !email || !message}
        className="w-full text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        style={{ backgroundColor: '#0F6E56' }}
      >
        {sending ? <><Loader className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</> : <><Send className="w-4 h-4" aria-hidden="true" /> Send Message</>}
      </button>
    </form>
  );
}

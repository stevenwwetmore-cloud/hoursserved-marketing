import { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle, Loader, AlertCircle } from 'lucide-react';

const CURRENCY_SYMBOLS = {
  USD: '$',
  CAD: 'CAD $',
  GBP: '£',
  AUD: 'AUD $',
};

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle query params for district quote prefill and auto-open
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clubs = params.get('clubs');
    const currency = params.get('currency');
    const total = params.get('total');

    if (clubs && currency && total) {
      const symbol = CURRENCY_SYMBOLS[currency.toUpperCase() as keyof typeof CURRENCY_SYMBOLS] || currency;
      const prefilled = `District quote request: ${clubs} clubs, ${currency.toUpperCase()}, annual total ${symbol}${parseFloat(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`;
      setMessage(prefilled);
      setOpen(true);
    }
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Focus modal when it opens
      modalRef.current?.focus();
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

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

  const handleClose = () => {
    setOpen(false);
    setError('');
    // Return focus to trigger button
    triggerRef.current?.focus();
  };

  const handleCloseAfterSuccess = () => {
    setOpen(false);
    setSent(false);
    setError('');
    setName('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setMessage('');
    setHoneypot('');
    // Return focus to trigger button
    triggerRef.current?.focus();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="inline-block bg-white font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg"
        style={{ color: '#1E3A5F' }}
      >
        Send us a message
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            tabIndex={-1}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h2 id="contact-modal-title" className="font-bold text-gray-900 text-base">Contact Us</h2>
                <p className="text-base text-gray-600">We'll get back to you as soon as possible</p>
              </div>
              <button onClick={handleClose} className="text-gray-600 hover:text-gray-900 transition-colors" aria-label="Close">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {sent ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-700 mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-bold text-gray-900 mb-1">Message sent!</h3>
                <p className="text-base text-gray-900">We'll get back to you at <strong>{email}</strong> as soon as possible.</p>
                <button onClick={handleCloseAfterSuccess} className="mt-5 text-sm hover:underline" style={{ color: '#1E3A5F' }}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-700">*</span></label>
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
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
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
                    <label htmlFor="contact-organization" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
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
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">How can we help? <span className="text-red-700">*</span></label>
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
                  <div role="alert" className="flex items-start gap-2 border border-red-200 rounded-lg px-3 py-2 text-base text-red-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-700" aria-hidden="true" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending || !email || !message}
                  className="w-full text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]"
                  style={{ backgroundColor: '#0F6E56' }}
                >
                  {sending ? <><Loader className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</> : <><Send className="w-4 h-4" aria-hidden="true" /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

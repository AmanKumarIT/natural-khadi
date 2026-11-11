import { useState } from 'react';
import ChatWidgetButton from './ChatWidgetButton';
import { CONTACT } from '../config/site';

/** Floating "Chat with product specialist" launcher. Front-end only: opens a small contact panel. */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const send = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(msg || 'Hi, I need help choosing a product.');
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Product enquiry')}&body=${body}`;
  };

  return (
    <>
      <ChatWidgetButton onToggle={() => setOpen((o) => !o)} />
      {open && (
        <div className="fixed bottom-[96px] right-margin z-40 w-[340px] max-w-[calc(100vw-2rem)] bg-surface-container-lowest rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.2)] overflow-hidden kn-pop-in">
          <div className="bg-olive-gold-cta text-on-primary px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-nav-link text-[15px] font-semibold">Chat with product specialist</p>
              <p className="font-announcement-text text-[11px] uppercase opacity-90">Ayurvedic Doctors Online</p>
            </div>
            <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="hover:opacity-80">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <form onSubmit={send} className="p-4 flex flex-col gap-3">
            <p className="font-nav-link text-sm text-near-black">👋 Hi! Tell us what you&apos;re looking for and our specialists will help you.</p>
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} placeholder="Type your message…" className="w-full border border-card-border rounded-[8px] p-3 font-nav-link text-sm outline-none focus:ring-2 focus:ring-olive-gold-cta resize-none" />
            <button type="submit" className="h-11 rounded-[8px] bg-near-black text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors">Send message</button>
            <div className="flex items-center justify-between font-nav-link text-xs text-heading-gray pt-1">
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-primary"><span className="material-symbols-outlined text-base">call</span>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1 hover:text-primary"><span className="material-symbols-outlined text-base">mail</span>Email us</a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

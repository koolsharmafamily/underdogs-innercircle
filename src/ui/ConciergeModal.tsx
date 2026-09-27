'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/state/store';

interface Message {
  role: 'goldie' | 'user';
  text: string;
}

const FAQ_KNOWLEDGE: Record<string, string> = {
  'next night':
    'The next gathering is La Dolce Vita — our 80s Greek Island / Santorini After Dark edition. Compulsory vintage resort attire, sound by DJs Luna & Monish. Verified coin holders receive the exact Civil Lines coordinates 72 hours prior.',
  'venue':
    'The location stays strictly sealed until 72 hours before the night. Previous gatherings have inhabited transformed private salons, secret warehouse spaces, and Millo in Civil Lines. Once your coin is verified, the drop appears on your private dashboard.',
  'dress code':
    'Each edition demands its own world. For La Dolce Vita: 80s Riviera chic, whitewashed linen, vintage silk and gold accessories. For The Grand Launch: all-black satin and milled gold accents. Never casual.',
  'bring a guest':
    'Every individual inside must hold a verified coin or be explicitly cleared through your plus-one allocation. Random gatecrashers are denied without exception at the door.',
  'get a coin':
    'Use the "Request Your Coin" button or tell me your Instagram handle. The Underdogs crew reviews each submission manually — we look for community presence and shared energy.',
};

export function ConciergeModal() {
  const overlay = useAppStore((s) => s.overlay);
  const closeOverlay = useAppStore((s) => s.closeOverlay);
  const openOverlay = useAppStore((s) => s.openOverlay);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'goldie',
      text: 'Welcome to the Vault. I am Goldie, concierge to the Underdogs Innercircle. Ask me about upcoming editions, dress codes, or access protocols.',
    },
  ]);
  const [input, setInput] = useState('');

  const isOpen = overlay === 'concierge';
  if (!isOpen) return null;

  const handleSend = (queryText: string) => {
    const q = queryText.trim();
    if (!q) return;

    const userMsg: Message = { role: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Answer matching
    const lower = q.toLowerCase();
    let reply =
      "I'm keeping my eye on the door. For personal verification or to join the upcoming guest list, submit your request through the coin protocol.";

    for (const [key, answer] of Object.entries(FAQ_KNOWLEDGE)) {
      if (lower.includes(key)) {
        reply = answer;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'goldie', text: reply }]);
    }, 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 text-[#ece1cf]"
      role="dialog"
      aria-modal="true"
      aria-label="Goldie AI Concierge"
    >
      <div className="w-full max-w-xl bg-[#141414] border border-[#cbb074]/30 rounded-sm shadow-2xl flex flex-col h-[580px] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#ece1cf]/15 flex items-center justify-between bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            {/* Goldie Avatar Badge (The Living Face of the Coin) */}
            <div className="w-10 h-10 rounded-full border border-[#cbb074] relative overflow-hidden flex-shrink-0 shadow-md bg-[#050505]">
              <Image
                src="/brand/logo.jpg"
                alt="Goldie the Concierge"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-['Cinzel'] font-bold text-sm tracking-widest text-[#f3e0ac]">
                GOLDIE
              </div>
              <div className="font-mono text-[9px] text-emerald-400 tracking-wider">
                CONCIERGE ACTIVE · DISCRETION PRESERVED
              </div>
            </div>
          </div>
          <button
            onClick={closeOverlay}
            className="text-xs font-mono text-[#cbb074] hover:text-[#f3e0ac] tracking-widest cursor-pointer px-2 py-1"
          >
            ✕
          </button>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-sm ${
                  m.role === 'user'
                    ? 'bg-[#cbb074] text-[#141414] font-medium'
                    : 'bg-[#1b171a] border border-[#ece1cf]/15 text-[#ece1cf] leading-relaxed'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-5 py-2.5 border-t border-[#ece1cf]/10 flex gap-2 overflow-x-auto text-[10px] font-mono no-scrollbar">
          {[
            'What is the next night?',
            'Where is the venue?',
            'What is the dress code?',
            'How do I get a coin?',
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="px-2.5 py-1 bg-[#23171c] border border-[#cbb074]/30 text-[#cbb074] hover:border-[#cbb074] whitespace-nowrap rounded-sm cursor-pointer transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="p-4 bg-[#0a0a0a] border-t border-[#ece1cf]/15 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask Goldie about the circle..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3.5 py-2.5 bg-[#141414] border border-[#ece1cf]/20 rounded-sm text-xs font-mono text-[#ece1cf] focus:outline-none focus:border-[#cbb074]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#cbb074] text-[#141414] font-mono font-bold text-xs tracking-wider uppercase rounded-sm hover:bg-[#f3e0ac] transition-all cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/state/store';

export function RequestCoinModal() {
  const overlay = useAppStore((s) => s.overlay);
  const closeOverlay = useAppStore((s) => s.closeOverlay);

  const [step, setStep] = useState<'form' | 'token' | 'minted'>('form');
  const [name, setName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [contact, setContact] = useState('');
  const [token, setToken] = useState('7729');
  const [serial, setSerial] = useState('061');
  const [copied, setCopied] = useState(false);

  const isOpen = overlay === 'coin';
  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    setStep('token');
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSerial = String(Math.floor(Math.random() * 80) + 60).padStart(3, '0');
    setSerial(randomSerial);
    setStep('minted');
    if (typeof window !== 'undefined') {
      import('@/audio/sound').then(({ sound }) => {
        sound?.playCoinMint();
      });
    }
  };

  const copyCertificate = () => {
    const certText = `UNDERDOGS INNERCIRCLE — ACCESSION PASS\nMember: ${name.toUpperCase()}\nSerial: #IC-${serial}\nToken: 7729\nAccess: Secret Location All-Access Sanctuary\nRegistry: Underdogs Entertainment, Nagpur`;
    navigator.clipboard?.writeText(certText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#080706]/92 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 text-[#E8E2D8] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Client Demo: Private Coin Accession"
    >
      <div className="w-full max-w-lg bg-[#0F0E0C]/98 border border-[#C8B08A]/25 p-6 sm:p-10 rounded-[1px] shadow-[0_30px_70px_rgba(0,0,0,0.9)] relative my-auto">
        {/* Close Button */}
        <button
          onClick={closeOverlay}
          className="absolute top-5 right-5 text-xs font-mono text-[#8E7B62] hover:text-[#EDE2D0] tracking-widest cursor-pointer transition-colors p-1"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Step 1: Client / Guest Application */}
        {step === 'form' && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8B08A]" />
              <span className="text-[9px] font-mono text-[#C8B08A] tracking-[0.25em] uppercase">
                Interactive Client Preview · Vetting Flow
              </span>
            </div>

            <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-light tracking-[0.1em] text-[#EDE2D0] mb-2">
              REQUEST INTRODUCTION
            </h3>

            <p className="font-serif text-xs text-[#E8E2D8]/75 mb-6 leading-relaxed font-light">
              Experience the accession process: High-profile patrons submit credentials for peer review. Upon endorsement, a serialized 22k bullion coin is struck and registered into the Sixty Ledger.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8E7B62] mb-1.5">
                  Guest / Host Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Devendra Singhania"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-3 bg-[#080706] border border-[#C8B08A]/20 rounded-[1px] text-[#EDE2D0] focus:border-[#C8B08A] focus:outline-none transition-colors text-xs placeholder:text-[#8E7B62]/50"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8E7B62] mb-1.5">
                  Affiliation / Brand / Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Managing Partner / Creative Director"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  className="w-full px-3.5 py-3 bg-[#080706] border border-[#C8B08A]/20 rounded-[1px] text-[#EDE2D0] focus:border-[#C8B08A] focus:outline-none transition-colors text-xs placeholder:text-[#8E7B62]/50"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8E7B62] mb-1.5">
                  Private Registry Email or Phone *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. patron@domain.com or +91 98..."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3.5 py-3 bg-[#080706] border border-[#C8B08A]/20 rounded-[1px] text-[#EDE2D0] focus:border-[#C8B08A] focus:outline-none transition-colors text-xs placeholder:text-[#8E7B62]/50"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C8B08A] text-[#080706] font-semibold text-[10px] tracking-[0.24em] uppercase hover:bg-[#EDE2D0] transition-colors cursor-pointer rounded-[1px] shadow-lg flex items-center justify-center gap-2"
                >
                  Submit for Peer Review →
                </button>
              </div>

              <p className="text-[10px] text-[#8E7B62] text-center font-mono tracking-wide pt-1">
                Zero spam. Direct private concierge registry only.
              </p>
            </form>
          </div>
        )}

        {/* Step 2: Demonstration Authorization Key */}
        {step === 'token' && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8B08A]" />
              <span className="text-[9px] font-mono text-[#C8B08A] tracking-[0.25em] uppercase">
                Peer Review Endorsement
              </span>
            </div>

            <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-light tracking-[0.1em] text-[#EDE2D0] mb-2">
              CONCIERGE ACCESS TOKEN
            </h3>

            <div className="bg-[#080706] border border-[#C8B08A]/20 p-4 rounded-[1px] mb-5">
              <p className="font-serif text-xs text-[#E8E2D8]/80 leading-relaxed font-light">
                In actual live operation, once the admission committee endorses a candidate, a unique 4-digit cryptographic token is dispatched. For this sales/client preview, your demo accession token is pre-filled below:
              </p>
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] border-t border-[#C8B08A]/10 pt-2.5">
                <span className="text-[#8E7B62]">DEMO TOKEN:</span>
                <span className="text-[#EDE2D0] font-bold tracking-widest bg-[#C8B08A]/15 px-2.5 py-0.5 border border-[#C8B08A]/30">
                  7729
                </span>
              </div>
            </div>

            <form onSubmit={handleTokenSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8E7B62] mb-1.5 text-center">
                  Enter 4-Digit Token to Mint Medallion
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full text-center text-3xl font-mono tracking-[0.5em] px-3 py-3 bg-[#080706] border border-[#C8B08A]/35 rounded-[1px] text-[#EDE2D0] focus:outline-none focus:border-[#C8B08A] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C8B08A] text-[#080706] font-semibold text-[10px] tracking-[0.24em] uppercase hover:bg-[#EDE2D0] transition-colors cursor-pointer rounded-[1px] shadow-lg flex items-center justify-center gap-2"
              >
                Authenticate & Mint Medallion →
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full text-center text-[10px] text-[#8E7B62] hover:text-[#EDE2D0] tracking-widest uppercase transition-colors"
              >
                ← Back to Details
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Successfully Minted Medallion & Client Value Proposition */}
        {step === 'minted' && (
          <div className="text-center">
            {/* Medallion Display */}
            <div className="w-24 h-24 mx-auto mb-4 rounded-full relative overflow-hidden p-[1px] border border-[#C8B08A]/45 shadow-[0_10px_30px_rgba(200,176,138,0.2)] bg-[#080706]">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-[#080706]">
                <Image
                  src="/brand/logo.jpg"
                  alt="Minted Underdogs 22k Gold Medallion"
                  fill
                  priority
                  className="object-cover scale-105"
                />
              </div>
            </div>

            <span className="font-mono text-[9px] tracking-[0.28em] text-[#C8B08A] uppercase block mb-1">
              PHYSICAL BULLION STRUCK · REGISTERED
            </span>
            <h3 className="font-['Cinzel'] text-2xl font-normal tracking-[0.1em] text-[#EDE2D0] mb-0.5">
              {name.toUpperCase() || 'INNERCIRCLE PATRON'}
            </h3>
            {affiliation && (
              <span className="font-serif italic text-xs text-[#C8B08A]/80 block mb-2 font-light">
                {affiliation}
              </span>
            )}
            <p className="font-mono text-[11px] text-[#8E7B62] mb-5 tracking-wider">
              LEDGER SERIAL: <span className="text-[#EDE2D0] font-semibold">#IC-{serial}</span> · STATUS: ACTIVE
            </p>

            {/* Credential Dossier */}
            <div className="p-4 bg-[#080706] border border-[#C8B08A]/20 rounded-[1px] text-left mb-5 font-mono text-[10px] space-y-2">
              <div className="flex justify-between items-center border-b border-[#C8B08A]/10 pb-1.5">
                <span className="text-[#8E7B62]">ACCESS LEVEL:</span>
                <span className="text-[#EDE2D0]">ALL-ACCESS SANCTUARY PASS</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#C8B08A]/10 pb-1.5">
                <span className="text-[#8E7B62]">GPS PROTOCOL:</span>
                <span className="text-[#C8B08A]">SEALED · REVEALED T-72 HOURS</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8E7B62]">VERIFICATION:</span>
                <span className="text-[#EDE2D0]">RFID BULLION DOOR SCAN</span>
              </div>
            </div>

            {/* Value Statement For The Event Company / Client */}
            <div className="bg-[#14120E] border-l-2 border-[#C8B08A] p-3 text-left mb-6 font-serif text-[11px] text-[#E8E2D8]/80 leading-relaxed">
              <strong className="text-[#C8B08A] block font-mono text-[9px] tracking-wider uppercase mb-0.5">
                How this works for your event:
              </strong>
              Each coin is a physical, laser-engraved 22k bullion keepsake. Guests present their physical coin or digital accession pass at the secret door. No paper tickets, zero scalping, and unmatched exclusivity for high-profile client gatherings.
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                onClick={copyCertificate}
                className="w-full py-3 bg-[#C8B08A] text-[#080706] font-semibold text-[10px] tracking-[0.24em] uppercase hover:bg-[#EDE2D0] transition-colors cursor-pointer rounded-[1px] shadow-lg"
              >
                {copied ? '✓ Pass Copied to Clipboard' : 'Copy Digital Pass Key ↗'}
              </button>
              <button
                onClick={closeOverlay}
                className="w-full py-2.5 border border-[#C8B08A]/30 text-[#EDE2D0] hover:border-[#C8B08A] font-mono text-[10px] tracking-[0.2em] uppercase transition-colors cursor-pointer rounded-[1px]"
              >
                Enter the Vault [Esc]
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

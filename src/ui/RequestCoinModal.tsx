'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppStore } from '@/state/store';

export function RequestCoinModal() {
  const overlay = useAppStore((s) => s.overlay);
  const closeOverlay = useAppStore((s) => s.closeOverlay);

  const [step, setStep] = useState<'form' | 'otp' | 'minted'>('form');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('7729');
  const [serial, setSerial] = useState('061');

  const isOpen = overlay === 'coin';
  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !handle || !phone) return;
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSerial(String(Math.floor(Math.random() * 80) + 60).padStart(3, '0'));
    setStep('minted');
    if (typeof window !== 'undefined') {
      import('@/audio/sound').then(({ sound }) => {
        sound?.playCoinMint();
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#080706]/92 backdrop-blur-2xl flex items-center justify-center p-6 text-[#E8E2D8]"
      role="dialog"
      aria-modal="true"
      aria-label="Request For Introduction"
    >
      <div className="w-full max-w-md bg-[#0F0E0C]/96 border border-[#C8B08A]/22 p-8 sm:p-10 rounded-[1px] shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative">
        <button
          onClick={closeOverlay}
          className="absolute top-5 right-5 text-xs font-mono text-[#8E7B62] hover:text-[#EDE2D0] tracking-widest cursor-pointer transition-colors"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {step === 'form' && (
          <div>
            <div className="text-[9px] font-mono text-[#8E7B62] tracking-[0.25em] uppercase mb-1.5">
              MEMBERSHIP PROTOCOL · NAGPUR
            </div>
            <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-light tracking-[0.1em] text-[#EDE2D0] mb-2.5">
              REQUEST INTRODUCTION
            </h3>
            <p className="font-serif text-xs text-[#E8E2D8]/75 mb-6 leading-relaxed font-light">
              Admission into the Innercircle is strictly vetted. Every member holds an engraved coin that unlocks private access, location drops, and private booking rights.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8E7B62] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-3 bg-[#080706] border border-[#C8B08A]/20 rounded-[1px] text-[#EDE2D0] focus:border-[#C8B08A] focus:outline-none transition-colors text-xs"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8E7B62] mb-1.5">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="@yourhandle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-3.5 py-3 bg-[#080706] border border-[#C8B08A]/20 rounded-[1px] text-[#EDE2D0] focus:border-[#C8B08A] focus:outline-none transition-colors text-xs"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.22em] text-[#8E7B62] mb-1.5">
                  Mobile (For Verification & Encrypted Drops)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-3 bg-[#080706] border border-[#C8B08A]/20 rounded-[1px] text-[#EDE2D0] focus:border-[#C8B08A] focus:outline-none transition-colors text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C8B08A] text-[#080706] font-bold text-[10px] tracking-[0.24em] uppercase hover:bg-[#EDE2D0] transition-colors cursor-pointer rounded-[1px] mt-4 shadow-lg"
              >
                Proceed to Verification →
              </button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div>
            <div className="text-[9px] font-mono text-[#8E7B62] tracking-[0.25em] uppercase mb-1.5">
              SECURITY VERIFICATION
            </div>
            <h3 className="font-['Cinzel'] text-xl font-light tracking-[0.1em] text-[#EDE2D0] mb-2.5">
              ENTER ACCESS CODE
            </h3>
            <p className="font-serif text-xs text-[#E8E2D8]/75 mb-5 leading-relaxed font-light">
              We generated an instant access key for <span className="text-[#C8B08A]">{phone}</span>. (Demo key: <strong className="text-[#EDE2D0]">7729</strong>)
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-4 font-mono text-xs">
              <input
                type="text"
                required
                maxLength={4}
                placeholder="7729"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center text-2xl tracking-[0.5em] px-3 py-3.5 bg-[#080706] border border-[#C8B08A]/35 rounded-[1px] text-[#EDE2D0] focus:outline-none focus:border-[#C8B08A] transition-colors"
              />

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C8B08A] text-[#080706] font-bold text-[10px] tracking-[0.24em] uppercase hover:bg-[#EDE2D0] transition-colors cursor-pointer rounded-[1px] shadow-lg"
              >
                Verify & Mint Coin →
              </button>
            </form>
          </div>
        )}

        {step === 'minted' && (
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full relative overflow-hidden p-[1px] border border-[#C8B08A]/35 shadow-xl bg-[#080706]">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-[#080706]">
                <Image
                  src="/brand/logo.jpg"
                  alt="Minted Underdogs Gold Coin"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="text-[9px] font-mono text-[#8E7B62] tracking-[0.25em] uppercase mb-1">
              COIN MINTED · ACCESS GRANTED
            </div>
            <h3 className="font-['Cinzel'] text-xl font-normal tracking-[0.1em] mb-1 text-[#EDE2D0]">
              {name.toUpperCase()}
            </h3>
            <p className="font-mono text-[11px] text-[#E8E2D8]/65 mb-6">
              SERIAL: <span className="text-[#C8B08A]">#IC-{serial}</span> · REGISTERED TO {handle}
            </p>

            <div className="p-4 bg-[#080706] border border-[#C8B08A]/15 rounded-[1px] text-left mb-6 font-mono text-[10px] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8E7B62]">STATUS:</span>
                <span className="text-[#EDE2D0]">APPROVED FOR GUEST LIST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E7B62]">NEXT DROP:</span>
                <span className="text-[#C8B08A]">72H BEFORE NIGHT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E7B62]">KEY ID:</span>
                <span className="text-[#EDE2D0]">UNDERDOGS-COIN-{serial}</span>
              </div>
            </div>

            <button
              onClick={closeOverlay}
              className="w-full py-3.5 bg-[#C8B08A] text-[#080706] font-bold text-[10px] tracking-[0.24em] uppercase hover:bg-[#EDE2D0] transition-colors cursor-pointer rounded-[1px]"
            >
              Enter the Vault
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

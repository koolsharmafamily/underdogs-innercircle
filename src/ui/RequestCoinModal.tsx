'use client';

import { useState } from 'react';
import { useAppStore } from '@/state/store';

export function RequestCoinModal() {
  const overlay = useAppStore((s) => s.overlay);
  const closeOverlay = useAppStore((s) => s.closeOverlay);

  const [step, setStep] = useState<'form' | 'otp' | 'minted'>('form');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
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
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6 text-[#ece1cf]"
      role="dialog"
      aria-modal="true"
      aria-label="Request Your Innercircle Coin"
    >
      <div className="w-full max-w-md bg-[#141414] border border-[#cbb074]/30 p-8 rounded-sm shadow-2xl relative">
        <button
          onClick={closeOverlay}
          className="absolute top-5 right-5 text-xs font-mono text-[#cbb074] hover:text-[#f3e0ac] tracking-widest cursor-pointer"
        >
          ✕
        </button>

        {step === 'form' && (
          <div>
            <div className="text-[10px] font-mono text-[#cbb074] tracking-[0.25em] uppercase mb-1">
              MEMBERSHIP PROTOCOL
            </div>
            <h3 className="font-['Cinzel'] text-2xl font-bold tracking-wide mb-2">
              REQUEST YOUR COIN
            </h3>
            <p className="font-serif text-xs text-[#ece1cf]/70 mb-6 leading-relaxed">
              Admission into the Innercircle is strictly vetted. Every member holds a serialized coin that unlocks private access, location drops, and private booking rights.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#cbb074] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#050505] border border-[#ece1cf]/20 rounded-sm text-[#ece1cf] focus:border-[#cbb074] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#cbb074] mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  required
                  placeholder="@yourhandle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#050505] border border-[#ece1cf]/20 rounded-sm text-[#ece1cf] focus:border-[#cbb074] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#cbb074] mb-1">
                  Mobile (For OTP & Encrypted Drops)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#050505] border border-[#ece1cf]/20 rounded-sm text-[#ece1cf] focus:border-[#cbb074] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#cbb074] text-[#141414] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#f3e0ac] transition-all cursor-pointer rounded-sm mt-4 shadow-lg"
              >
                Proceed to Verification →
              </button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div>
            <div className="text-[10px] font-mono text-[#cbb074] tracking-[0.25em] uppercase mb-1">
              SECURITY VERIFICATION
            </div>
            <h3 className="font-['Cinzel'] text-xl font-bold tracking-wide mb-2">
              ENTER ACCESS CODE
            </h3>
            <p className="font-serif text-xs text-[#ece1cf]/70 mb-4 leading-relaxed">
              We generated an instant access key for <span className="text-[#cbb074]">{phone}</span>. (Demo mode key: <strong className="text-[#f3e0ac]">7729</strong>)
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-4 font-mono text-xs">
              <input
                type="text"
                required
                maxLength={4}
                placeholder="7729"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center text-2xl tracking-[0.5em] px-3 py-3 bg-[#050505] border border-[#cbb074] rounded-sm text-[#f3e0ac] focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-3 bg-[#cbb074] text-[#141414] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#f3e0ac] transition-all cursor-pointer rounded-sm shadow-lg"
              >
                Verify & Mint Coin →
              </button>
            </form>
          </div>
        )}

        {step === 'minted' && (
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-dashed border-[#cbb074] flex items-center justify-center bg-[#050505] shadow-[0_0_25px_rgba(203,176,116,0.3)]">
              <span className="font-['Cinzel'] text-2xl font-bold text-[#cbb074]">
                IC
              </span>
            </div>

            <div className="text-[10px] font-mono text-[#cbb074] tracking-[0.25em] uppercase mb-1">
              COIN MINTED · ACCESS GRANTED
            </div>
            <h3 className="font-['Cinzel'] text-2xl font-bold tracking-wide mb-1 text-[#f3e0ac]">
              {name.toUpperCase()}
            </h3>
            <p className="font-mono text-xs text-[#ece1cf]/60 mb-6">
              SERIAL: <span className="text-[#cbb074]">#IC-{serial}</span> · REGISTERED TO {handle}
            </p>

            <div className="p-4 bg-[#050505] border border-[#ece1cf]/15 rounded-sm text-left mb-6 font-mono text-[11px] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#ece1cf]/50">STATUS:</span>
                <span className="text-emerald-400">APPROVED FOR GUEST LIST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#ece1cf]/50">NEXT DROP:</span>
                <span className="text-[#cbb074]">72H BEFORE NIGHT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#ece1cf]/50">KEY ID:</span>
                <span className="text-[#ece1cf]">UNDERDOGS-COIN-{serial}</span>
              </div>
            </div>

            <button
              onClick={closeOverlay}
              className="w-full py-3 bg-[#cbb074] text-[#141414] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#f3e0ac] transition-all cursor-pointer rounded-sm"
            >
              Enter the Experience
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/state/store';
import { sound } from '@/audio/sound';

export function SoundToggle({ className = '' }: { className?: string }) {
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const setSoundEnabled = useAppStore((s) => s.setSoundEnabled);

  useEffect(() => {
    // Check localStorage
    const saved = localStorage.getItem('ic_sound');
    if (saved === 'true') {
      setSoundEnabled(true);
    }
  }, [setSoundEnabled]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('ic_sound', String(next));
    if (sound) {
      sound.toggle(next);
      if (next) {
        sound.playTick(1.5);
      }
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`group flex items-center gap-1.5 cursor-pointer font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:text-[#cbb074] ${className}`}
      aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
      title={soundEnabled ? 'Mute sound' : 'Enable sound'}
    >
      <span className="flex items-center gap-[2px] h-3">
        <span
          className={`w-[2px] bg-current transition-all duration-300 ${
            soundEnabled ? 'h-2.5 animate-pulse' : 'h-1 opacity-40'
          }`}
        />
        <span
          className={`w-[2px] bg-current transition-all duration-300 ${
            soundEnabled ? 'h-3 animate-pulse delay-75' : 'h-1.5 opacity-40'
          }`}
        />
        <span
          className={`w-[2px] bg-current transition-all duration-300 ${
            soundEnabled ? 'h-2 animate-pulse delay-150' : 'h-1 opacity-40'
          }`}
        />
      </span>
      <span>Sound: {soundEnabled ? 'On' : 'Off'}</span>
    </button>
  );
}

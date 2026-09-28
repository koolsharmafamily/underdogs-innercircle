'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/state/store';
import { sound, AUDIO_TRACKS } from '@/audio/sound';

export function SoundToggle({ className = '' }: { className?: string }) {
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const setSoundEnabled = useAppStore((s) => s.setSoundEnabled);
  const [trackIdx, setTrackIdx] = useState(0);

  useEffect(() => {
    if (!sound) return;
    setTrackIdx(sound.getTrackIndex());
    const unsub = sound.subscribe((idx) => {
      setTrackIdx(idx);
    });
    return unsub;
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('ic_sound', String(next));
    if (sound) {
      sound.toggle(next);
    }
  };

  const switchTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!sound) return;
    if (!soundEnabled) {
      setSoundEnabled(true);
      localStorage.setItem('ic_sound', 'true');
      sound.enable();
    } else {
      sound.nextTrack();
    }
  };

  const currentTrack = AUDIO_TRACKS[trackIdx] || AUDIO_TRACKS[0];

  return (
    <div className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase ${className}`}>
      <button
        onClick={toggleSound}
        className="group flex items-center gap-1.5 cursor-pointer transition-colors hover:text-[#cbb074]"
        aria-label={soundEnabled ? 'Mute music' : 'Play music'}
        title={soundEnabled ? `Playing: ${currentTrack.title} (Click to Mute)` : 'Play Underdogs Soundtrack'}
      >
        <span className="flex items-end gap-[2px] h-3">
          <span
            className={`w-[2px] bg-[#cbb074] transition-all duration-300 ${
              soundEnabled ? 'h-2.5 animate-pulse' : 'h-1 opacity-40'
            }`}
          />
          <span
            className={`w-[2px] bg-[#cbb074] transition-all duration-300 ${
              soundEnabled ? 'h-3 animate-pulse delay-75' : 'h-1.5 opacity-40'
            }`}
          />
          <span
            className={`w-[2px] bg-[#cbb074] transition-all duration-300 ${
              soundEnabled ? 'h-2 animate-pulse delay-150' : 'h-1 opacity-40'
            }`}
          />
        </span>
        <span>
          {soundEnabled ? currentTrack.title : 'Sound: Off'}
        </span>
      </button>

      {soundEnabled && (
        <button
          onClick={switchTrack}
          className="text-[10px] text-[#cbb074] hover:text-[#f3e0ac] border border-[#cbb074]/35 hover:border-[#cbb074] px-1.5 py-0.5 rounded-sm cursor-pointer transition-colors"
          title="Next Track (Vault · After Dark · Innercircle)"
          aria-label="Next Track"
        >
          ›
        </button>
      )}
    </div>
  );
}

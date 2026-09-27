import { create } from 'zustand';

export type TierId = 'T3' | 'T2' | 'T1' | 'T0';
export type IntroPhase =
  | 'booting'
  | 'loading'
  | 'ready'
  | 'firstLight'
  | 'descent'
  | 'handoff'
  | 'done';

export type OverlayType = 'none' | 'menu' | 'index' | 'contact' | 'concierge' | 'coin';

export interface AppState {
  // Phase & Lifecycle
  phase: IntroPhase;
  progress: number; // 0 - 100
  setPhase: (phase: IntroPhase) => void;
  setProgress: (progress: number) => void;

  // Scene & Navigation
  worldMode: 'home' | 'case' | '404' | 'legal';
  setWorldMode: (mode: 'home' | 'case' | '404' | 'legal') => void;
  currentScene: string;
  setCurrentScene: (scene: string) => void;
  activeProjectIndex: number;
  setActiveProjectIndex: (index: number) => void;

  // Overlays
  overlay: OverlayType;
  openOverlay: (overlay: OverlayType) => void;
  closeOverlay: () => void;

  // Tier & Performance
  tier: TierId;
  setTier: (tier: TierId) => void;

  // Accessibility & Preferences
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  motionEnabled: boolean;
  setMotionEnabled: (v: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;

  // Theme
  theme: 'vault' | 'aegean';
  setTheme: (theme: 'vault' | 'aegean') => void;

  // Hints
  hintsSeen: Record<string, boolean>;
  markHintSeen: (hint: string) => void;

  // Transition & Shutter state
  shutterProgress: number; // 0 open, 1 closed
  setShutterProgress: (v: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  phase: 'booting',
  progress: 0,
  setPhase: (phase) => set({ phase }),
  setProgress: (progress) => set({ progress }),

  worldMode: 'home',
  setWorldMode: (worldMode) => set({ worldMode }),
  currentScene: 'hero',
  setCurrentScene: (currentScene) => set({ currentScene }),
  activeProjectIndex: 0,
  setActiveProjectIndex: (activeProjectIndex) => set({ activeProjectIndex }),

  overlay: 'none',
  openOverlay: (overlay) => set({ overlay }),
  closeOverlay: () => set({ overlay: 'none' }),

  tier: 'T3',
  setTier: (tier) => set({ tier }),

  reducedMotion: false,
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  motionEnabled: true,
  setMotionEnabled: (motionEnabled) => set({ motionEnabled }),
  soundEnabled: false,
  setSoundEnabled: (soundEnabled) => set({ soundEnabled }),

  theme: 'vault',
  setTheme: (theme) => set({ theme }),

  hintsSeen: {},
  markHintSeen: (hint) =>
    set((state) => ({ hintsSeen: { ...state.hintsSeen, [hint]: true } })),

  shutterProgress: 0,
  setShutterProgress: (shutterProgress) => set({ shutterProgress }),
}));

'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { frame } from '@/state/frame';
import { useAppStore } from '@/state/store';
import { scenes } from '@content/scenes';
import { ACTS } from './acts';

export function Director() {
  const setCurrentScene = useAppStore((s) => s.setCurrentScene);
  const setActiveProjectIndex = useAppStore((s) => s.setActiveProjectIndex);
  const lastReportedScene = useRef('hero');

  useFrame((_, delta) => {
    const G = Math.max(0, Math.min(scenes.length - 1, frame.story.G));
    const k = Math.min(Math.floor(G), scenes.length - 1);
    const local = G - k;

    const curScene = scenes[k];
    const nextScene = scenes[Math.min(k + 1, scenes.length - 1)];

    frame.story.sceneIndex = k;
    frame.story.sceneId = curScene.id;
    frame.story.local = local;

    // Transition progress T
    // Transition zone occupies the last fraction (default 0.35) of the scene
    const transFraction = 0.35;
    if (local > 1 - transFraction && k < scenes.length - 1) {
      const u = (local - (1 - transFraction)) / transFraction;
      // Smoothstep
      frame.story.T = u * u * (3 - 2 * u);
    } else {
      frame.story.T = 0;
    }

    // Act determination
    const actCur = Array.isArray(curScene.act) ? curScene.act[0] : curScene.act;
    const actNext = Array.isArray(curScene.act)
      ? curScene.act[1]
      : Array.isArray(nextScene.act)
      ? nextScene.act[0]
      : nextScene.act;

    frame.acts.a = actCur;
    frame.acts.b = actNext;
    frame.acts.t = frame.story.T;

    // Discrete scene report to React store
    if (curScene.id !== lastReportedScene.current) {
      lastReportedScene.current = curScene.id;
      setCurrentScene(curScene.id);
      if (typeof window !== 'undefined') {
        import('@/audio/sound').then(({ sound }) => {
          sound?.setAct(actCur);
          sound?.playTick(1.2);
        });
      }
    }

    // Update active project index in Work scene
    if (curScene.id === 'work') {
      const projIndex = Math.min(4, Math.floor(local * 5));
      setActiveProjectIndex(projIndex);
    }
  });

  return null;
}

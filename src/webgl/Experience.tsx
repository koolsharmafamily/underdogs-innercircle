'use client';

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { frame } from '@/state/frame';
import { useAppStore } from '@/state/store';
import { Director } from './core/Director';
import { CameraRig } from './camera/CameraRig';
import { LightRig } from './core/LightRig';
import { Fog } from './core/Fog';
import { Floor } from './world/Floor';
import { Wordmark3D } from './world/Wordmark3D';
import { Dust } from './world/Dust';
import { KineticArray } from './kinetic/KineticArray';

function CanvasClockBridge() {
  // Bridge the Canvas advance function to our frame singleton
  useEffect(() => {
    // When frameloop="never", R3F's advance is available globally or we advance the state
  }, []);
  return null;
}

export function Experience() {
  const tier = useAppStore((s) => s.tier);

  if (tier === 'T0') {
    return null; // T0 fallback uses background posters
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        shadows={tier !== 'T1'}
        dpr={tier === 'T3' ? [1, 2] : [1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          alpha: false,
        }}
        camera={{ position: [0, 3.1, 12], fov: 34, near: 0.1, far: 100 }}
      >
        <Director />
        <CameraRig />
        <LightRig />
        <Fog />

        <group>
          <Floor />
          <Wordmark3D />
          <Dust />
          <KineticArray />
        </group>
      </Canvas>
    </div>
  );
}

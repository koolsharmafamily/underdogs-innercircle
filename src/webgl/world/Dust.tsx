'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/state/store';
import { frame } from '@/state/frame';

export function Dust() {
  const tier = useAppStore((s) => s.tier);
  const count = tier === 'T3' ? 4000 : tier === 'T2' ? 2000 : 800;

  const pointsRef = useRef<THREE.Points>(null);

  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      ph[i * 3] = Math.random() * Math.PI * 2;
      ph[i * 3 + 1] = Math.random() * Math.PI * 2;
      ph[i * 3 + 2] = Math.random() * Math.PI * 2;
    }

    return [pos, ph];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    const time = frame.time;
    const dt = Math.min(delta, 1 / 30);
    const velBoost = 1.0 + Math.abs(frame.vNorm) * 2.0;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      array[i3 + 1] -= dt * 0.15 * velBoost; // slowly fall
      array[i3] += Math.sin(time * 0.4 + phases[i3]) * dt * 0.1;
      array[i3 + 2] += Math.cos(time * 0.4 + phases[i3 + 2]) * dt * 0.1;

      // Wrap around bounds
      if (array[i3 + 1] < 0.1) array[i3 + 1] = 12.0;
      if (array[i3] > 15) array[i3] = -15;
      if (array[i3] < -15) array[i3] = 15;
      if (array[i3 + 2] > 15) array[i3 + 2] = -15;
      if (array[i3 + 2] < -15) array[i3 + 2] = 15;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#C8B08A"
        transparent
        opacity={0.28}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

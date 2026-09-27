'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { frame } from '@/state/frame';
import { useAppStore } from '@/state/store';

export function Wordmark3D() {
  const groupRef = useRef<THREE.Group>(null);
  const phase = useAppStore((s) => s.phase);

  useFrame(() => {
    if (!groupRef.current) return;
    const isHero = frame.story.sceneId === 'hero';
    // Wordmark rises out of floor fog in Hero, sinks back during transition to Manifesto
    const targetY = isHero ? 3.0 : -4.0;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -4.0, -7.0]} aria-hidden="true">
      <Text
        fontSize={1.7}
        letterSpacing={0.25}
        color="#cbb074"
        anchorX="center"
        anchorY="middle"
        position={[0, 1.2, 0]}
        castShadow
        receiveShadow
      >
        UNDERDOGS
        <meshStandardMaterial
          color="#342528"
          roughness={0.82}
          metalness={0.25}
        />
      </Text>

      <Text
        fontSize={1.2}
        letterSpacing={0.35}
        color="#ece1cf"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.6, 0]}
        castShadow
        receiveShadow
      >
        INNERCIRCLE
        <meshStandardMaterial
          color="#23171c"
          roughness={0.85}
          metalness={0.2}
        />
      </Text>
    </group>
  );
}

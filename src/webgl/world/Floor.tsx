'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { frame } from '@/state/frame';

export function Floor() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (!materialRef.current) return;
    const isWhiteRoom = frame.acts.a === 'whiteRoom' || frame.acts.b === 'whiteRoom';
    const targetRoughness = isWhiteRoom ? 0.95 : 0.45;
    const targetColor = isWhiteRoom ? '#EFEBE4' : '#0B0A09';

    materialRef.current.roughness = THREE.MathUtils.lerp(
      materialRef.current.roughness,
      targetRoughness,
      0.08
    );
    materialRef.current.color.lerp(new THREE.Color(targetColor), 0.08);
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[120, 120, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#0B0A09"
        roughness={0.45}
        metalness={0.1}
      />
    </mesh>
  );
}

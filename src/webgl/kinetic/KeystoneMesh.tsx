'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SLAT_CONFIG } from './config';

interface KeystoneMeshProps {
  matrixRef: React.MutableRefObject<THREE.Matrix4>;
}

export function KeystoneMesh({ matrixRef }: KeystoneMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.matrix.copy(matrixRef.current);
    }
  });

  return (
    <mesh
      ref={meshRef}
      matrixAutoUpdate={false}
      castShadow
    >
      <boxGeometry
        args={[
          SLAT_CONFIG.length,
          SLAT_CONFIG.width,
          SLAT_CONFIG.thickness,
        ]}
      />
      <meshPhysicalMaterial
        color="#FFFFFF"
        transmission={0.92}
        roughness={0.04}
        ior={1.52}
        thickness={SLAT_CONFIG.thickness}
        reflectivity={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.02}
        attenuationColor="#ece1cf"
        attenuationDistance={0.5}
        transparent
      />
    </mesh>
  );
}

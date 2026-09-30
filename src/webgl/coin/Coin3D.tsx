'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { frame } from '@/state/frame';
import { useAppStore } from '@/state/store';

// Preload the canonical Underdogs Coin 3D GLB model
useGLTF.preload('/underdogs-coin.glb');

interface CoinTrajectoryNode {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
}

const COIN_TRAJECTORY: CoinTrajectoryNode[] = [
  // 0.0: Hero (The Vault - Centered, spinning majestically on edge)
  { pos: [0, 1.0, 0], rot: [Math.PI / 2, 0, 0], scale: 1.05 },
  // 1.0: Manifesto (The Covenant - Duality 180° Heads to Tails flip, floating right)
  { pos: [1.3, 0.35, 0.2], rot: [Math.PI / 2 + 0.12, Math.PI, 0.05], scale: 1.1 },
  // 2.0: Work (The Nights - Resting flat like a champagne coaster)
  { pos: [1.8, -0.6, 0.5], rot: [0.32, Math.PI * 1.5, -0.04], scale: 1.15 },
  // 3.0: Capabilities (The Pillars - Floating left architectural crest)
  { pos: [-1.8, 0.4, 0.3], rot: [Math.PI / 2 - 0.1, Math.PI * 2.0, 0.04], scale: 1.0 },
  // 4.0: Process (The Passage - Centered portal gatekeeper)
  { pos: [0, 0.2, -0.4], rot: [Math.PI / 2, Math.PI * 2.5, 0], scale: 0.95 },
  // 5.0: Proof (The Circle - Floating among verified attendees)
  { pos: [2.0, 0.15, 0.4], rot: [Math.PI / 2 + 0.1, Math.PI * 3.0, 0.05], scale: 1.0 },
  // 6.0: Contact (The Mint - Golden Climax Medallion front and center)
  { pos: [0, 0.35, 0.6], rot: [Math.PI / 2, Math.PI * 4.0, 0], scale: 1.25 },
];

export function Coin3D() {
  const groupRef = useRef<THREE.Group>(null);
  const worldMode = useAppStore((s) => s.worldMode);

  // Load the authentic Underdogs Coin GLB from /underdogs-coin.glb
  const gltf = useGLTF('/underdogs-coin.glb');

  // Normalize, center, and tune the GLB model for quiet luxury rendering
  const model = useMemo(() => {
    const clone = gltf.scene.clone(true);

    // Compute exact bounding dimensions
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center model at local origin (0, 0, 0)
    clone.position.x -= center.x;
    clone.position.y -= center.y;
    clone.position.z -= center.z;

    // Normalize scale: diameter ~3.3 units (matching our scene proportion)
    const maxDim = Math.max(size.x, size.y);
    const scaleFactor = 3.3 / (maxDim || 1);
    clone.scale.multiplyScalar(scaleFactor);

    // Internal alignment rotation:
    // The GLB coin face lies in the XY plane (facing +Z).
    // Rotating -PI/2 around X makes the front face (+Z) point to (+Y),
    // which exactly matches our Euler trajectory coordinates for flips and spins.
    clone.rotation.x = -Math.PI / 2;

    // Traverse and enhance PBR physical materials
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((m) => m.clone());
          } else {
            mesh.material = mesh.material.clone();
          }

          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.envMapIntensity = 1.35;
              if (mat.name.includes('gold')) {
                mat.metalness = Math.min(0.95, Math.max(0.72, mat.metalness));
                mat.roughness = Math.max(0.22, mat.roughness);
              } else if (mat.name.includes('enamel')) {
                mat.roughness = 0.08;
                mat.metalness = 0.05;
              }
              mat.needsUpdate = true;
            }
          });
        }
      }
    });

    return clone;
  }, [gltf.scene]);

  // Per-frame physics, spin and chapter-driven placement
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 1 / 30);
    const G = frame.story.G;
    const time = frame.time;

    // Pointer parallax: Normalized tilt with smooth maximum angle (approx 14 degrees = 0.25 rad)
    const normX = typeof window !== 'undefined' ? (frame.pointer.dampedX / Math.max(1, window.innerWidth)) * 2 - 1 : 0;
    const normY = typeof window !== 'undefined' ? -(frame.pointer.dampedY / Math.max(1, window.innerHeight)) * 2 + 1 : 0;
    const targetTiltX = Math.max(-0.25, Math.min(0.25, normY * 0.22));
    const targetTiltY = Math.max(-0.35, Math.min(0.35, normX * 0.3));

    // Continuous flight trajectory with subtle forward lead
    const velocityLead = Math.max(-0.08, Math.min(0.08, frame.vNorm * 0.12));
    const leadG = Math.max(0, Math.min(COIN_TRAJECTORY.length - 1, G * 1.03 + velocityLead));

    const k = Math.min(Math.floor(leadG), COIN_TRAJECTORY.length - 2);
    const u = Math.max(0, Math.min(1, leadG - k));
    // Smooth cubic Hermite ease (3u^2 - 2u^3)
    const t = u * u * (3 - 2 * u);

    const nodeA = COIN_TRAJECTORY[k];
    const nodeB = COIN_TRAJECTORY[k + 1];

    let targetX = THREE.MathUtils.lerp(nodeA.pos[0], nodeB.pos[0], t);
    let targetY = THREE.MathUtils.lerp(nodeA.pos[1], nodeB.pos[1], t);
    let targetZ = THREE.MathUtils.lerp(nodeA.pos[2], nodeB.pos[2], t);

    let targetRotX = THREE.MathUtils.lerp(nodeA.rot[0], nodeB.rot[0], t) + targetTiltX;
    let targetRotY = THREE.MathUtils.lerp(nodeA.rot[1], nodeB.rot[1], t) + time * 0.10 + targetTiltY;
    let targetRotZ = THREE.MathUtils.lerp(nodeA.rot[2], nodeB.rot[2], t);

    let targetScale = THREE.MathUtils.lerp(nodeA.scale, nodeB.scale, t);

    if (worldMode === 'case') {
      targetX = 3.2;
      targetY = 2.4;
      targetZ = -1.5;
      targetScale = 0.55;
      targetRotX = 0.3;
      targetRotY = time * 0.15;
    }

    // Heavy luxury damping (24k gold bullion gliding through honey)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, dt * 1.5);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, dt * 1.5);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, dt * 1.5);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, dt * 1.2);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, dt * 1.2);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, dt * 1.2);

    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(curScale, targetScale, dt * 1.5);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Authentic 3D Underdogs Medallion GLB */}
      <primitive object={model} />

      {/* Museum Gallery Directional Spotlight */}
      <directionalLight
        position={[4, 6, 8]}
        color="#FFF6E5"
        intensity={2.0}
      />

      {/* Atmospheric Warm Accent Glints */}
      <pointLight
        position={[2.5, 3.5, 3.0]}
        color="#EDE2D0"
        intensity={2.4}
        distance={14}
        decay={2}
      />
      <pointLight
        position={[-3.0, -2.0, 2.0]}
        color="#8E7B62"
        intensity={1.8}
        distance={12}
        decay={2}
      />
    </group>
  );
}

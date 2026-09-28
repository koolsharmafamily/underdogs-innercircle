'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { frame } from '@/state/frame';
import { useAppStore } from '@/state/store';

export function Coin3D() {
  const groupRef = useRef<THREE.Group>(null);
  const coinMeshRef = useRef<THREE.Mesh>(null);
  const worldMode = useAppStore((s) => s.worldMode);
  const currentScene = useAppStore((s) => s.currentScene);
  const overlay = useAppStore((s) => s.overlay);

  // Load the canonical Underdogs coin texture (Logo.jpg)
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  const headsTexture = useLoader(THREE.TextureLoader, '/brand/logo.jpg');

  // Configure heads texture for maximum fidelity
  useEffect(() => {
    if (headsTexture) {
      headsTexture.colorSpace = THREE.SRGBColorSpace;
      headsTexture.generateMipmaps = true;
      headsTexture.minFilter = THREE.LinearMipmapLinearFilter;
      headsTexture.magFilter = THREE.LinearFilter;
      headsTexture.needsUpdate = true;
    }
  }, [headsTexture]);

  // Create procedural high-res Tails texture with Underdogs Octagram Seal
  const tailsTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background: deep dark satin onyx
    ctx.fillStyle = '#0a0808';
    ctx.fillRect(0, 0, 1024, 1024);

    // Outer milled gold rim
    const cx = 512;
    const cy = 512;

    const gradGold = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradGold.addColorStop(0, '#73572b');
    gradGold.addColorStop(0.26, '#b2955e');
    gradGold.addColorStop(0.48, '#f3e0ac');
    gradGold.addColorStop(0.66, '#cbb074');
    gradGold.addColorStop(1, '#977947');

    // Outer gold band
    ctx.lineWidth = 42;
    ctx.strokeStyle = gradGold;
    ctx.beginPath();
    ctx.arc(cx, cy, 460, 0, Math.PI * 2);
    ctx.stroke();

    // Inner filigree ring
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#cbb074';
    ctx.beginPath();
    ctx.arc(cx, cy, 415, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 385, 0, Math.PI * 2);
    ctx.stroke();

    // Circular engraved text: "DIFFERENT WORLDS · SAME COIN · UNDERDOGS INNERCIRCLE"
    ctx.save();
    ctx.font = 'bold 36px Cinzel, serif';
    ctx.fillStyle = '#f3e0ac';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textTop = 'DIFFERENT WORLDS · SAME COIN';
    const textBottom = 'UNDERDOGS INNERCIRCLE · NAGPUR';

    // Draw circular text top
    const radiusText = 438;
    const arcAngle = Math.PI * 0.75;
    const startAngle = -Math.PI / 2 - arcAngle / 2;
    const charStep = arcAngle / textTop.length;
    for (let i = 0; i < textTop.length; i++) {
      const angle = startAngle + i * charStep;
      ctx.save();
      ctx.translate(cx + Math.cos(angle) * radiusText, cy + Math.sin(angle) * radiusText);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText(textTop[i], 0, 0);
      ctx.restore();
    }

    // Draw circular text bottom
    const startAngleB = Math.PI / 2 - arcAngle / 2;
    const charStepB = arcAngle / textBottom.length;
    for (let i = 0; i < textBottom.length; i++) {
      const angle = startAngleB + i * charStepB;
      ctx.save();
      ctx.translate(cx + Math.cos(angle) * radiusText, cy + Math.sin(angle) * radiusText);
      ctx.rotate(angle - Math.PI / 2);
      ctx.fillText(textBottom[i], 0, 0);
      ctx.restore();
    }
    ctx.restore();

    // Central Octagram / Star of the Vault
    ctx.save();
    ctx.translate(cx, cy);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#f3e0ac';
    ctx.shadowColor = '#eab673';
    ctx.shadowBlur = 15;

    // Draw 8-pointed star
    for (let rot = 0; rot < 2; rot++) {
      ctx.save();
      ctx.rotate((rot * Math.PI) / 4);
      ctx.strokeRect(-180, -180, 360, 360);
      ctx.restore();
    }

    // Center emblem "IC" in Trajan Serif
    ctx.font = 'bold 110px Cinzel, serif';
    ctx.fillStyle = '#f3e0ac';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IC', 0, 0);

    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Milled edge normal / bump texture
  const edgeBumpTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 1024, 64);
    // Vertical ridges
    for (let x = 0; x < 1024; x += 8) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, 0, 4, 64);
      ctx.fillStyle = '#000000';
      ctx.fillRect(x + 4, 0, 4, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(64, 1);
    return tex;
  }, []);

  // Geometry: Bevelled cylinder with 128 radial segments
  const coinGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(2.35, 2.35, 0.24, 128);
  }, []);

  // Three materials: [side, top (heads), bottom (tails)]
  const materials = useMemo(() => {
    const sideMat = new THREE.MeshPhysicalMaterial({
      color: '#f3e0ac',
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.7,
      clearcoatRoughness: 0.1,
      bumpMap: edgeBumpTexture || undefined,
      bumpScale: 0.06,
    });

    const headsMat = new THREE.MeshPhysicalMaterial({
      map: headsTexture,
      roughness: 0.2,
      metalness: 0.65,
      clearcoat: 0.95,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
      envMapIntensity: 1.5,
    });

    const tailsMat = new THREE.MeshPhysicalMaterial({
      map: tailsTexture,
      roughness: 0.22,
      metalness: 0.65,
      clearcoat: 0.85,
      clearcoatRoughness: 0.06,
      reflectivity: 0.9,
      envMapIntensity: 1.5,
    });

    return [sideMat, headsMat, tailsMat];
  }, [headsTexture, tailsTexture, edgeBumpTexture]);

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

    // Position & rotation targets based on story progress
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetRotX = 0;
    let targetRotY = time * 0.32; // Stately, unhurried majestic spin on edge in Hero
    let targetRotZ = 0;
    let targetScale = 1.0;

    if (worldMode === 'case') {
      // In case study, dock to top right as a luxury seal
      targetX = 3.2;
      targetY = 2.4;
      targetZ = -1.5;
      targetScale = 0.55;
      targetRotX = 0.3;
      targetRotY = time * 0.15;
    } else if (overlay === 'concierge') {
      // During Goldie chat: docks bottom right and faces user
      targetX = 2.4;
      targetY = -1.6;
      targetZ = 0.8;
      targetScale = 0.65;
      targetRotX = 0.2;
      targetRotY = Math.sin(time * 1.5) * 0.1; // Gentle speaking tilt
    } else if (G < 0.8) {
      // S01 Hero: Center stage, spinning smoothly on edge in black satin
      targetX = 0;
      targetY = 1.0;
      targetZ = 0;
      targetScale = 1.05;
      targetRotX = Math.PI / 2 + targetTiltX;
      targetRotY = time * 0.35 + targetTiltY;
    } else if (G < 1.8) {
      // S02 Heads or Tails: Flips slowly from heads to tails
      const u = (G - 0.8) / 1.0;
      targetX = -1.2 + u * 2.4;
      targetY = 0.2;
      targetZ = 0.2;
      targetScale = 1.1;
      targetRotX = Math.PI / 2 + Math.sin(u * Math.PI) * 0.4;
      targetRotY = time * 0.18 + u * Math.PI; // Flip 180 deg
    } else if (G < 2.8) {
      // S03 The Drop: Lands flat like a coaster for the champagne flute
      const u = (G - 1.8) / 1.0;
      targetX = 1.6;
      targetY = -1.2;
      targetZ = 0.5;
      targetScale = 1.15;
      targetRotX = THREE.MathUtils.lerp(Math.PI / 2, 0.25, u); // Laying flat
      targetRotY = time * 0.12;
    } else if (G < 3.8) {
      // S04 Capabilities: Hovering central icon
      targetX = -1.8;
      targetY = 0.3;
      targetZ = 0.3;
      targetScale = 1.0;
      targetRotX = Math.PI / 2 + targetTiltX;
      targetRotY = time * 0.2;
    } else if (G < 4.8) {
      // S05 Process: Gateway alignment
      targetX = 0;
      targetY = 0.2;
      targetZ = -0.5;
      targetScale = 0.95;
      targetRotX = Math.PI / 2;
      targetRotY = time * 0.22;
    } else if (G < 5.8) {
      // S06 Proof: Floating among members
      targetX = 2.0;
      targetY = 0.1;
      targetZ = 0.4;
      targetScale = 1.0;
      targetRotX = Math.PI / 2 + targetTiltX;
      targetRotY = time * 0.16;
    } else {
      // S07 Contact / Mint: The Golden Climax — large central medallion
      targetX = 0;
      targetY = 0.25;
      targetZ = 0.6;
      targetScale = 1.25;
      targetRotX = Math.PI / 2 + targetTiltX;
      targetRotY = time * 0.2 + targetTiltY;
    }

    // Heavy luxury damping (feels like solid physical 24k gold coin with inertia)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, dt * 3.0);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, dt * 3.0);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, dt * 3.0);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, dt * 2.8);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, dt * 2.8);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, dt * 2.8);

    const curScale = groupRef.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(curScale, targetScale, dt * 3.0);
    groupRef.current.scale.set(nextScale, nextScale, nextScale);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* The 3D Underdogs Gold Medallion */}
      <mesh
        ref={coinMeshRef}
        geometry={coinGeometry}
        material={materials}
        castShadow
        receiveShadow
      />

      {/* Atmospheric Point Light dedicated to the coin's glints */}
      <pointLight
        position={[2.5, 3.5, 3.0]}
        color="#FFF3D6"
        intensity={3.5}
        distance={12}
        decay={2}
      />
      <pointLight
        position={[-3.0, -2.0, 2.0]}
        color="#AE7144"
        intensity={2.8}
        distance={10}
        decay={2}
      />
    </group>
  );
}

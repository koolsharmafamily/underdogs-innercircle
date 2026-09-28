'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { frame } from '@/state/frame';
import { useAppStore } from '@/state/store';
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

    // Continuous flight trajectory with a very slight forward lead multiplier
    // The coin moves in the exact same pattern as the page, but slightly faster (1.08x lead ratio + velocity momentum)
    const velocityLead = Math.max(-0.25, Math.min(0.25, frame.vNorm * 0.35));
    const leadG = Math.max(0, Math.min(COIN_TRAJECTORY.length - 1, G * 1.08 + velocityLead));

    const k = Math.min(Math.floor(leadG), COIN_TRAJECTORY.length - 2);
    const u = Math.max(0, Math.min(1, leadG - k));
    // Smooth cubic Hermite ease (3u^2 - 2u^3) ensures seamless C1 continuity
    const t = u * u * (3 - 2 * u);

    const nodeA = COIN_TRAJECTORY[k];
    const nodeB = COIN_TRAJECTORY[k + 1];

    let targetX = THREE.MathUtils.lerp(nodeA.pos[0], nodeB.pos[0], t);
    let targetY = THREE.MathUtils.lerp(nodeA.pos[1], nodeB.pos[1], t);
    let targetZ = THREE.MathUtils.lerp(nodeA.pos[2], nodeB.pos[2], t);

    let targetRotX = THREE.MathUtils.lerp(nodeA.rot[0], nodeB.rot[0], t) + targetTiltX;
    let targetRotY = THREE.MathUtils.lerp(nodeA.rot[1], nodeB.rot[1], t) + time * 0.25 + targetTiltY;
    let targetRotZ = THREE.MathUtils.lerp(nodeA.rot[2], nodeB.rot[2], t);

    let targetScale = THREE.MathUtils.lerp(nodeA.scale, nodeB.scale, t);

    if (worldMode === 'case') {
      targetX = 3.2;
      targetY = 2.4;
      targetZ = -1.5;
      targetScale = 0.55;
      targetRotX = 0.3;
      targetRotY = time * 0.15;
    } else if (overlay === 'concierge') {
      targetX = 2.4;
      targetY = -1.6;
      targetZ = 0.8;
      targetScale = 0.65;
      targetRotX = 0.2;
      targetRotY = Math.sin(time * 1.5) * 0.1;
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

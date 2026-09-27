import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildMonolith(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);

  const isPortrait = ctx.aspect < 1 || ctx.tier === 'T1';
  const width = isPortrait ? 1.8 : 2.4;
  const height = 6.0;
  const slatsPerSide = isPortrait ? 3 : 4;
  const slatsPerLevel = slatsPerSide * 4;
  const numLevels = Math.floor(n / slatsPerLevel);
  const pitch = height / numLevels;
  const baseY = 0.4;

  const halfW = width / 2;
  const sidePitch = width / slatsPerSide;

  const louverTilt = (25 * Math.PI) / 180;
  const tempQ = new THREE.Quaternion();
  const euler = new THREE.Euler();

  // Temporary list to arrange canonical slot order (Slot 0 is Keystone)
  const slots: {
    pos: [number, number, number];
    rot: [number, number, number, number];
    level: number;
    side: number;
    indexInSide: number;
  }[] = [];

  for (let lvl = 0; lvl < numLevels; lvl++) {
    const y = baseY + lvl * pitch;

    for (let side = 0; side < 4; side++) {
      // 0: front (+Z), 1: right (+X), 2: back (-Z), 3: left (-X)
      for (let s = 0; s < slatsPerSide; s++) {
        const offset = -halfW + sidePitch * (s + 0.5);
        let px = 0, py = y, pz = 0;
        let yaw = 0;

        if (side === 0) {
          // Front side (facing +Z)
          px = offset;
          pz = halfW;
          yaw = 0;
        } else if (side === 1) {
          // Right side (facing +X)
          px = halfW;
          pz = -offset;
          yaw = -Math.PI / 2;
        } else if (side === 2) {
          // Back side (facing -Z)
          px = -offset;
          pz = -halfW;
          yaw = Math.PI;
        } else {
          // Left side (facing -X)
          px = -halfW;
          pz = offset;
          yaw = Math.PI / 2;
        }

        // Louver tilt around local X, then yaw around Y
        euler.set(louverTilt, yaw, 0, 'YXZ');
        tempQ.setFromEuler(euler);

        slots.push({
          pos: [px, py, pz],
          rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
          level: lvl,
          side,
          indexInSide: s,
        });
      }
    }
  }

  // Find slot for Keystone: golden section of front face (level ≈ 0.618 * numLevels)
  const keystoneLevel = Math.floor(numLevels * 0.618);
  const keystoneSide = 0; // Front camera-facing
  const keystoneIdx = 1;

  let keystoneIndex = slots.findIndex(
    (s) => s.level === keystoneLevel && s.side === keystoneSide && s.indexInSide === keystoneIdx
  );
  if (keystoneIndex === -1) keystoneIndex = 0;

  // Put Keystone at index 0
  const keystoneSlot = slots.splice(keystoneIndex, 1)[0];
  slots.unshift(keystoneSlot);

  // Fill typed arrays
  for (let i = 0; i < n; i++) {
    if (i < slots.length) {
      const s = slots[i];
      position[i * 3] = s.pos[0];
      position[i * 3 + 1] = s.pos[1];
      position[i * 3 + 2] = s.pos[2];
      rotation[i * 4] = s.rot[0];
      rotation[i * 4 + 1] = s.rot[1];
      rotation[i * 4 + 2] = s.rot[2];
      rotation[i * 4 + 3] = s.rot[3];
      scale[i * 3] = 1;
      scale[i * 3 + 1] = 1;
      scale[i * 3 + 2] = 1;
      role[i] = 0;
    } else {
      // Park any excess
      position[i * 3] = 0;
      position[i * 3 + 1] = 14;
      position[i * 3 + 2] = 0;
      rotation[i * 4 + 3] = 1;
      scale[i * 3] = 0;
      scale[i * 3 + 1] = 0;
      scale[i * 3 + 2] = 0;
      role[i] = 2;
    }
  }

  return { position, rotation, scale, role };
}

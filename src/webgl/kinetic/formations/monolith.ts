import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildMonolith(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);

  const isPortrait = ctx.aspect < 1 || ctx.tier === 'T1';
  // Vault Colonnade: Pushed further out so slats are distant atmospheric texture
  // Leaving a wide central aperture (x in [-4.5, 4.5]) completely open
  const colonnadeRadius = isPortrait ? 7.5 : 9.5;  // was 5.8/7.2 — pushed further
  const numLevels = Math.min(12, Math.floor(n / 30));  // was 18 — fewer levels
  const slatsPerLevel = Math.floor(n / numLevels);
  const baseY = 0.5;
  const height = 5.8;
  const pitchY = height / numLevels;

  const tempQ = new THREE.Quaternion();
  const euler = new THREE.Euler();

  const slots: {
    pos: [number, number, number];
    rot: [number, number, number, number];
    isKeystone?: boolean;
  }[] = [];

  // Wings: Left wing (angle 120° to 220°), Right wing (angle -40° to 60°)
  // Plus subtle deep background arc (z = -6.0)
  for (let lvl = 0; lvl < numLevels; lvl++) {
    const y = baseY + lvl * pitchY;
    const halfSlats = Math.floor(slatsPerLevel / 2);

    // Left Wing
    for (let s = 0; s < halfSlats; s++) {
      const u = s / Math.max(1, halfSlats - 1);
      // Angle from 125 deg to 215 deg
      const angle = (125 + u * 90) * (Math.PI / 180);
      const px = Math.cos(angle) * colonnadeRadius;
      const pz = Math.sin(angle) * colonnadeRadius * 0.7 - 1.5;

      // Louver tilt facing inward toward center coin at (0, 1, 0)
      const lookYaw = Math.atan2(-px, -pz);
      euler.set(0.12, lookYaw, 0.05, 'YXZ');
      tempQ.setFromEuler(euler);

      slots.push({
        pos: [px, y, pz],
        rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
      });
    }

    // Right Wing
    for (let s = 0; s < halfSlats; s++) {
      const u = s / Math.max(1, halfSlats - 1);
      // Angle from -35 deg to 55 deg
      const angle = (-35 + u * 90) * (Math.PI / 180);
      const px = Math.cos(angle) * colonnadeRadius;
      const pz = Math.sin(angle) * colonnadeRadius * 0.7 - 1.5;

      const lookYaw = Math.atan2(-px, -pz);
      euler.set(0.12, lookYaw, -0.05, 'YXZ');
      tempQ.setFromEuler(euler);

      const isKeystone = lvl === Math.floor(numLevels * 0.75) && s === Math.floor(halfSlats / 2);

      slots.push({
        pos: [px, y, pz],
        rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
        isKeystone,
      });
    }
  }

  // Find slot for Keystone: slot 0 sits on high right wing colonnade
  let keystoneIndex = slots.findIndex((s) => s.isKeystone);
  if (keystoneIndex === -1) keystoneIndex = 0;

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
      // Park any excess far above
      position[i * 3] = 0;
      position[i * 3 + 1] = 20;
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

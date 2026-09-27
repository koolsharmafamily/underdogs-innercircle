import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildVortex(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);

  const numStrands = 4;
  const slatsPerStrand = Math.floor(n / numStrands);
  const heightMin = 0.6;
  const heightMax = 14.0;
  const turns = 3.5;
  const rMin = 1.2;
  const rMax = 4.5;
  const pitchAngle = (20 * Math.PI) / 180; // 20° turbine blade pitch

  const tempQ = new THREE.Quaternion();
  const euler = new THREE.Euler();
  const dir = new THREE.Vector3();

  const slots: {
    pos: [number, number, number];
    rot: [number, number, number, number];
    strand: number;
    idx: number;
    y: number;
  }[] = [];

  for (let s = 0; s < numStrands; s++) {
    const strandPhase = (s / numStrands) * Math.PI * 2;

    for (let i = 0; i < slatsPerStrand; i++) {
      const u = i / (slatsPerStrand - 1); // 0 to 1
      const y = heightMin + u * (heightMax - heightMin);
      const r = rMin + u * (rMax - rMin);
      const theta = strandPhase + u * turns * Math.PI * 2;

      const px = Math.cos(theta) * r;
      const pz = Math.sin(theta) * r;

      // Radial orientation with 20° tilt
      const yaw = -theta + Math.PI / 2;
      euler.set(pitchAngle, yaw, 0, 'YXZ');
      tempQ.setFromEuler(euler);

      slots.push({
        pos: [px, y, pz],
        rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
        strand: s,
        idx: i,
        y,
      });
    }
  }

  // Golden section height for Keystone (strand 0, ~0.618 height)
  const targetGoldenY = heightMin + 0.618 * (heightMax - heightMin);
  let bestDist = Infinity;
  let keystoneIndex = 0;

  for (let i = 0; i < slots.length; i++) {
    if (slots[i].strand === 0) {
      const d = Math.abs(slots[i].y - targetGoldenY);
      if (d < bestDist) {
        bestDist = d;
        keystoneIndex = i;
      }
    }
  }

  // Put Keystone at 0
  const keystoneSlot = slots.splice(keystoneIndex, 1)[0];
  slots.unshift(keystoneSlot);

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

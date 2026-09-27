import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildCollapse(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);

  const tempQ = new THREE.Quaternion();
  const euler = new THREE.Euler();

  // Keystone sits on top of the pile (slot 0)
  position[0] = 0;
  position[1] = 0.45;
  position[2] = 0;
  euler.set(0.1, 0.4, 0.05);
  tempQ.setFromEuler(euler);
  rotation[0] = tempQ.x;
  rotation[1] = tempQ.y;
  rotation[2] = tempQ.z;
  rotation[3] = tempQ.w;
  scale[0] = 1;
  scale[1] = 1;
  scale[2] = 1;
  role[0] = 0;

  // Scattered pile on the floor within a 2.5m radius
  for (let i = 1; i < n; i++) {
    const seed = Math.sin(i * 91.13) * 43758.5453;
    const angle = (Math.abs(seed) % 1) * Math.PI * 2;
    const r = Math.sqrt(Math.abs((seed * 1.5) % 1)) * 2.4;

    const px = Math.cos(angle) * r;
    const pz = Math.sin(angle) * r;
    // Pile is taller in the middle
    const py = Math.max(0.015, (1 - r / 2.5) * 0.4 + ((i % 5) * 0.02));

    const yaw = (Math.abs(seed * 3) % 1) * Math.PI * 2;
    const pitch = ((Math.abs(seed * 7) % 1) - 0.5) * 0.4;
    const roll = ((Math.abs(seed * 11) % 1) - 0.5) * 0.4;

    euler.set(pitch, yaw, roll);
    tempQ.setFromEuler(euler);

    position[i * 3] = px;
    position[i * 3 + 1] = py;
    position[i * 3 + 2] = pz;
    rotation[i * 4] = tempQ.x;
    rotation[i * 4 + 1] = tempQ.y;
    rotation[i * 4 + 2] = tempQ.z;
    rotation[i * 4 + 3] = tempQ.w;
    scale[i * 3] = 1;
    scale[i * 3 + 1] = 1;
    scale[i * 3 + 2] = 1;
    role[i] = 0;
  }

  return { position, rotation, scale, role };
}

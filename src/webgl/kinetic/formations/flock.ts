import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildFlock(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);

  const cx = 0, cy = 5.0, cz = -4.0;
  const rx = 14.0, ry = 4.5, rz = 9.0;

  const tempQ = new THREE.Quaternion();
  const euler = new THREE.Euler();

  // Slot 0 is Keystone at the lead attractor position
  position[0] = cx + 2.0;
  position[1] = cy + 0.8;
  position[2] = cz;
  euler.set(0, Math.PI / 4, 0);
  tempQ.setFromEuler(euler);
  rotation[0] = tempQ.x;
  rotation[1] = tempQ.y;
  rotation[2] = tempQ.z;
  rotation[3] = tempQ.w;
  scale[0] = 1;
  scale[1] = 1;
  scale[2] = 1;
  role[0] = 0;

  // Distributed flock in 3D ellipsoid volume
  for (let i = 1; i < n; i++) {
    // Seeded pseudo-random distribution
    const u = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const v = (Math.cos(i * 78.233) * 43758.5453) % 1;
    const w = (Math.sin(i * 45.164) * 43758.5453) % 1;

    const r = Math.cbrt(Math.abs(u));
    const theta = Math.abs(v) * Math.PI * 2;
    const phi = Math.acos(2 * Math.abs(w) - 1);

    const px = cx + r * Math.sin(phi) * Math.cos(theta) * rx;
    const py = cy + r * Math.sin(phi) * Math.sin(theta) * ry;
    const pz = cz + r * Math.cos(phi) * rz;

    // Orientation along pseudo-streamline
    const yaw = theta + 0.4 * Math.sin(py);
    const pitch = 0.2 * Math.cos(theta);
    const roll = 0.3 * Math.sin(phi);
    euler.set(pitch, yaw, roll, 'YXZ');
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

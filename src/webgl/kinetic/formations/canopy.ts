import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildCanopy(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);

  const rows = 12;
  const cols = Math.ceil(n / rows);
  const pitchX = 0.55;
  const pitchZ = 0.85;
  const y = 6.4;

  const tempQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

  for (let i = 0; i < n; i++) {
    const r = i % rows;
    const c = Math.floor(i / rows);
    const x = (c - cols / 2) * pitchX;
    const z = -r * pitchZ + 2.0;

    position[i * 3] = x;
    position[i * 3 + 1] = y;
    position[i * 3 + 2] = z;

    rotation[i * 4] = tempQ.x;
    rotation[i * 4 + 1] = tempQ.y;
    rotation[i * 4 + 2] = tempQ.z;
    rotation[i * 4 + 3] = tempQ.w;

    scale[i * 3] = 1;
    scale[i * 3 + 1] = 1;
    scale[i * 3 + 2] = 1;
    role[i] = 1;
  }

  return { position, rotation, scale, role };
}

import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildLine(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);

  const visibleCount = ctx.tier === 'T1' ? 48 : 96;
  const rowWidth = ctx.aspect < 1 ? 6.0 : 8.0;
  const pitch = rowWidth / visibleCount;
  const startX = -rowWidth / 2 + pitch / 2;
  const y = 3.1;
  const z = 0;

  const qEdgeOn = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

  // Slot 0 is the Keystone (dead centre)
  position[0] = 0;
  position[1] = y;
  position[2] = z;
  rotation[0] = qEdgeOn.x;
  rotation[1] = qEdgeOn.y;
  rotation[2] = qEdgeOn.z;
  rotation[3] = qEdgeOn.w;
  scale[0] = 1;
  scale[1] = 1;
  scale[2] = 1;
  role[0] = 0; // Primary

  // Visible slats sorted from centre outward (canonical slot order)
  let assigned = 1;
  const half = Math.floor(visibleCount / 2);

  for (let step = 1; step <= half; step++) {
    // Left pair
    if (assigned < n && -step * pitch >= -rowWidth / 2) {
      const idx = assigned++;
      position[idx * 3] = -step * pitch;
      position[idx * 3 + 1] = y;
      position[idx * 3 + 2] = z;
      rotation[idx * 4] = qEdgeOn.x;
      rotation[idx * 4 + 1] = qEdgeOn.y;
      rotation[idx * 4 + 2] = qEdgeOn.z;
      rotation[idx * 4 + 3] = qEdgeOn.w;
      scale[idx * 3] = 1;
      scale[idx * 3 + 1] = 1;
      scale[idx * 3 + 2] = 1;
      role[idx] = 0;
    }
    // Right pair
    if (assigned < n && step * pitch <= rowWidth / 2) {
      const idx = assigned++;
      position[idx * 3] = step * pitch;
      position[idx * 3 + 1] = y;
      position[idx * 3 + 2] = z;
      rotation[idx * 4] = qEdgeOn.x;
      rotation[idx * 4 + 1] = qEdgeOn.y;
      rotation[idx * 4 + 2] = qEdgeOn.z;
      rotation[idx * 4 + 3] = qEdgeOn.w;
      scale[idx * 3] = 1;
      scale[idx * 3 + 1] = 1;
      scale[idx * 3 + 2] = 1;
      role[idx] = 0;
    }
  }

  // Reserve slats parked 14 m above in darkness (Part 5.4)
  const qIdentity = new THREE.Quaternion();
  for (let i = assigned; i < n; i++) {
    const angle = (i / n) * Math.PI * 2;
    position[i * 3] = Math.cos(angle) * 3;
    position[i * 3 + 1] = 14 + (i % 10) * 0.2;
    position[i * 3 + 2] = Math.sin(angle) * 3;
    rotation[i * 4] = qIdentity.x;
    rotation[i * 4 + 1] = qIdentity.y;
    rotation[i * 4 + 2] = qIdentity.z;
    rotation[i * 4 + 3] = qIdentity.w;
    scale[i * 3] = 1;
    scale[i * 3 + 1] = 1;
    scale[i * 3 + 2] = 1;
    role[i] = 2; // Reserve
  }

  return { position, rotation, scale, role };
}

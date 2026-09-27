import * as THREE from 'three';
import { OriginId } from '@content/scenes';
import { FormationData } from './types';

export function computeOrderField(
  origin: OriginId | undefined,
  dataA: FormationData,
  dataB: FormationData,
  n: number
): Float32Array {
  const order = new Float32Array(n);
  const v = new THREE.Vector3();

  if (origin === 'towerTop') {
    // Top of tower first (highest Y in A)
    let maxY = -Infinity;
    for (let i = 0; i < n; i++) {
      if (dataA.position[i * 3 + 1] > maxY) maxY = dataA.position[i * 3 + 1];
    }
    for (let i = 0; i < n; i++) {
      const y = dataA.position[i * 3 + 1];
      order[i] = Math.max(0, Math.min(1, (maxY - y) / 6.0));
    }
  } else if (origin === 'screenCentre') {
    // Radial from screen centre (0, 3.2, 0)
    for (let i = 0; i < n; i++) {
      const x = dataA.position[i * 3];
      const y = dataA.position[i * 3 + 1] - 3.2;
      const dist = Math.hypot(x, y);
      order[i] = Math.min(1, dist / 4.5);
    }
  } else if (origin === 'axis') {
    // Distance from vertical Y axis
    for (let i = 0; i < n; i++) {
      const x = dataA.position[i * 3];
      const z = dataA.position[i * 3 + 2];
      const dist = Math.hypot(x, z);
      order[i] = Math.min(1, dist / 5.0);
    }
  } else if (origin === 'lastCluster') {
    // Distance from cluster 3 (x = 6.0, y = 1.8)
    for (let i = 0; i < n; i++) {
      const x = dataA.position[i * 3] - 6.0;
      const y = dataA.position[i * 3 + 1] - 1.8;
      const z = dataA.position[i * 3 + 2];
      const dist = Math.hypot(x, y, z);
      order[i] = Math.min(1, dist / 8.0);
    }
  } else if (origin === 'markCentre') {
    // Distance from mark centre (0, 3.2, 0)
    for (let i = 0; i < n; i++) {
      const x = dataB.position[i * 3];
      const y = dataB.position[i * 3 + 1] - 3.2;
      const dist = Math.hypot(x, y);
      order[i] = Math.min(1, dist / 3.0);
    }
  } else {
    // Default diagonal sweep
    for (let i = 0; i < n; i++) {
      order[i] = i / n;
    }
  }

  return order;
}

import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildWall(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);
  const cell = new Float32Array(n * 4); // u0, v0, du, dv for each fin

  const isPortrait = ctx.aspect < 1 || ctx.tier === 'T1';
  const cols = isPortrait ? 10 : 24;   // was 18/48 — halved for subtlety
  const rows = isPortrait ? 4 : 5;     // was 6/7 — fewer rows
  const screenFins = cols * rows;

  const pitchX = 0.22;                 // was 0.15 — wider spacing
  const pitchY = 0.85;                 // was 0.62 — more vertical breathing room
  const curveRadius = 18.0;            // was 14.0 — pushed further back
  const centerY = 3.6;                 // was 3.2 — lifted slightly

  const tempQ = new THREE.Quaternion();
  const euler = new THREE.Euler();

  interface SlatEntry {
    pos: [number, number, number];
    rot: [number, number, number, number];
    role: number;
    cell: [number, number, number, number];
    isKeystoneCandidate?: boolean;
  }

  const entries: SlatEntry[] = [];

  // 1. Screen fins (vertical, concave curvature)
  for (let r = 0; r < rows; r++) {
    const y = centerY + (r - (rows - 1) / 2) * pitchY;
    const v0 = r / rows;
    const dv = 1 / rows;

    for (let c = 0; c < cols; c++) {
      const u0 = c / cols;
      const du = 1 / cols;

      const normX = (c - (cols - 1) / 2) * pitchX;
      // Concave cylinder on Y axis
      const theta = normX / curveRadius;
      const x = Math.sin(theta) * curveRadius;
      const z = curveRadius - Math.cos(theta) * curveRadius;

      // Rotate to follow cylinder normal (facing -Z toward camera at 0, 3.2, 12)
      // Note: In Three.js, facing camera means facing +Z or angled toward camera
      euler.set(0, theta, 0, 'YXZ');
      tempQ.setFromEuler(euler);

      entries.push({
        pos: [x, y, z],
        rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
        role: 0, // Primary screen
        cell: [u0, v0, du, dv],
      });
    }
  }

  // 2. Wings (stepping back at 35 degrees)
  const wingCols = isPortrait ? 0 : 8;
  const wingCount = wingCols * rows;
  const wingAngle = (35 * Math.PI) / 180;

  if (wingCols > 0) {
    // Left Wing
    for (let r = 0; r < rows; r++) {
      const y = centerY + (r - (rows - 1) / 2) * pitchY;
      for (let c = 0; c < wingCols; c++) {
        const dist = (c + 1) * pitchX;
        const x = -cols * pitchX * 0.5 - dist * Math.cos(wingAngle);
        const z = -dist * Math.sin(wingAngle);
        euler.set(0, -wingAngle, 0);
        tempQ.setFromEuler(euler);
        entries.push({
          pos: [x, y, z],
          rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
          role: 1, // Secondary wing
          cell: [0, 0, 0, 0],
        });
      }
    }

    // Right Wing (Keystone sits in the right wing at eye height)
    for (let r = 0; r < rows; r++) {
      const y = centerY + (r - (rows - 1) / 2) * pitchY;
      for (let c = 0; c < wingCols; c++) {
        const dist = (c + 1) * pitchX;
        const x = cols * pitchX * 0.5 + dist * Math.cos(wingAngle);
        const z = -dist * Math.sin(wingAngle);
        euler.set(0, wingAngle, 0);
        tempQ.setFromEuler(euler);

        const isKeystone = r === Math.floor(rows / 2) && c === 1;

        entries.push({
          pos: [x, y, z],
          rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
          role: 1,
          cell: [0, 0, 0, 0],
          isKeystoneCandidate: isKeystone,
        });
      }
    }
  }

  // 3. Canopy (horizontal baffles overhead at y = 6.2m)
  const remaining = n - entries.length;
  const canopyRows = 8;
  const canopyCols = Math.ceil(remaining / canopyRows);
  euler.set(Math.PI / 2, 0, 0); // Flat horizontal baffle
  tempQ.setFromEuler(euler);

  for (let i = 0; i < remaining; i++) {
    const cr = i % canopyRows;
    const cc = Math.floor(i / canopyRows);
    const x = (cc - canopyCols / 2) * 0.7;
    const y = 6.2;
    const z = -cr * 1.0 + 2.0;

    entries.push({
      pos: [x, y, z],
      rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
      role: 1,
      cell: [0, 0, 0, 0],
      isKeystoneCandidate: isPortrait && i === 0, // on mobile Keystone is front of canopy
    });
  }

  // Ensure Keystone is slot 0
  let keystoneIndex = entries.findIndex((e) => e.isKeystoneCandidate);
  if (keystoneIndex === -1) keystoneIndex = entries.length - 1;

  const keystoneEntry = entries.splice(keystoneIndex, 1)[0];
  entries.unshift(keystoneEntry);

  // Populate typed arrays
  for (let i = 0; i < n; i++) {
    if (i < entries.length) {
      const e = entries[i];
      position[i * 3] = e.pos[0];
      position[i * 3 + 1] = e.pos[1];
      position[i * 3 + 2] = e.pos[2];
      rotation[i * 4] = e.rot[0];
      rotation[i * 4 + 1] = e.rot[1];
      rotation[i * 4 + 2] = e.rot[2];
      rotation[i * 4 + 3] = e.rot[3];
      scale[i * 3] = 1;
      scale[i * 3 + 1] = 1;
      scale[i * 3 + 2] = 1;
      role[i] = e.role;
      cell[i * 4] = e.cell[0];
      cell[i * 4 + 1] = e.cell[1];
      cell[i * 4 + 2] = e.cell[2];
      cell[i * 4 + 3] = e.cell[3];
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

  return { position, rotation, scale, role, cell };
}

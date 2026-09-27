import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildClusters(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);
  const group = new Uint8Array(n);

  const isPortrait = ctx.aspect < 1 || ctx.tier === 'T1';
  const slatsPerCluster = Math.floor(n / 4);
  const centerY = 1.8;

  // Study centroids in desktop truck (x = -6, -2, 2, 6) or mobile vertical stack
  const clusterX = isPortrait ? [0, 0, 0, 0] : [-6.0, -2.0, 2.0, 6.0];
  const clusterY = isPortrait ? [7.0, 3.5, 0.0, -3.5] : [centerY, centerY, centerY, centerY];

  const tempQ = new THREE.Quaternion();
  const euler = new THREE.Euler();

  interface StudySlot {
    pos: [number, number, number];
    rot: [number, number, number, number];
    group: number;
    isKeystone?: boolean;
  }

  const slots: StudySlot[] = [];

  // Cluster 0: RING (The Curation) — radial turbine ring, r = 1.3m, 3 layers
  {
    const cx = clusterX[0];
    const cy = clusterY[0];
    const layers = 3;
    const perLayer = Math.floor(slatsPerCluster / layers);

    for (let l = 0; l < layers; l++) {
      const zOffset = (l - 1) * 0.25;
      const r = 1.1 + l * 0.18;

      for (let i = 0; i < perLayer; i++) {
        const theta = (i / perLayer) * Math.PI * 2;
        const px = cx + Math.cos(theta) * r;
        const py = cy + Math.sin(theta) * r;
        const pz = zOffset;

        // Tangent + turbine pitch
        euler.set(0, 0, theta + Math.PI / 4);
        tempQ.setFromEuler(euler);

        slots.push({
          pos: [px, py, pz],
          rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
          group: 0,
        });
      }
    }
  }

  // Cluster 1: FAN (The Scenography) — spiral fan, like an opened book
  {
    const cx = clusterX[1];
    const cy = clusterY[1];
    const maxAngle = (140 * Math.PI) / 180;

    for (let i = 0; i < slatsPerCluster; i++) {
      const u = i / (slatsPerCluster - 1);
      const angle = -maxAngle / 2 + u * maxAngle;
      const radius = 0.5 + Math.sin(u * Math.PI) * 0.9;
      const px = cx + Math.sin(angle) * radius;
      const py = cy + Math.cos(angle) * radius * 0.6;
      const pz = (u - 0.5) * 0.8;

      euler.set(0, angle * 0.8, -angle);
      tempQ.setFromEuler(euler);

      slots.push({
        pos: [px, py, pz],
        rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
        group: 1,
      });
    }
  }

  // Cluster 2: LATTICE (The Sound) — woodpile layers of alternating X/Z slats
  {
    const cx = clusterX[2];
    const cy = clusterY[2];
    const layers = 10;
    const perLayer = Math.floor(slatsPerCluster / layers);
    const spacing = 0.35;
    const layerPitchY = 0.12;
    const goldenLayer = Math.floor(layers * 0.618);

    for (let l = 0; l < layers; l++) {
      const ly = cy + (l - layers / 2) * layerPitchY;
      const isX = l % 2 === 0;

      for (let i = 0; i < perLayer; i++) {
        const offset = (i - perLayer / 2) * spacing;
        let px = cx, pz = 0;

        if (isX) {
          px = cx + offset;
          pz = 0;
          euler.set(0, 0, 0);
        } else {
          px = cx;
          pz = offset;
          euler.set(0, Math.PI / 2, 0);
        }
        tempQ.setFromEuler(euler);

        const isKeystone = l === goldenLayer && i === Math.floor(perLayer / 2);

        slots.push({
          pos: [px, ly, pz],
          rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
          group: 2,
          isKeystone,
        });
      }
    }
  }

  // Cluster 3: WAVE (The Discretion) — travelling sine sheet
  {
    const cx = clusterX[3];
    const cy = clusterY[3];
    const cols = 15;
    const rows = Math.floor(slatsPerCluster / cols);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const u = c / (cols - 1);
        const v = r / (rows - 1);
        const px = cx + (u - 0.5) * 2.2;
        const pz = (v - 0.5) * 1.8;
        const wave = Math.sin(u * Math.PI * 3 + v * Math.PI * 2) * 0.35;
        const py = cy + wave;

        euler.set(wave * 0.5, 0, u * 0.4);
        tempQ.setFromEuler(euler);

        slots.push({
          pos: [px, py, pz],
          rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
          group: 3,
        });
      }
    }
  }

  // Find and move Keystone to slot 0
  let keystoneIndex = slots.findIndex((s) => s.isKeystone);
  if (keystoneIndex === -1) keystoneIndex = Math.floor(slots.length / 2);
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
      group[i] = s.group;
    } else {
      position[i * 3] = 0;
      position[i * 3 + 1] = 14;
      position[i * 3 + 2] = 0;
      rotation[i * 4 + 3] = 1;
      scale[i * 3] = 0;
      scale[i * 3 + 1] = 0;
      scale[i * 3 + 2] = 0;
      role[i] = 2;
      group[i] = 0;
    }
  }

  return { position, rotation, scale, role, group };
}

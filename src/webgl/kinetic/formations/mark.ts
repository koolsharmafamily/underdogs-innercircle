import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildMark(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);

  const centerY = 3.2;
  const markRadius = 1.8; // 3.6m diameter coin
  const markCount = ctx.tier === 'T1' ? 90 : 180;
  const restCount = n - markCount;

  const tempQ = new THREE.Quaternion();
  const euler = new THREE.Euler();

  interface MarkSlot {
    pos: [number, number, number];
    rot: [number, number, number, number];
    isMark: boolean;
    isKeystone?: boolean;
  }

  const markSlots: MarkSlot[] = [];

  // Slot 0: KEYSTONE at the top apex golden accent (r = 1.6m, theta = PI/2)
  markSlots.push({
    pos: [0, centerY + markRadius * 0.9, 0],
    rot: [0, 0, 0, 1],
    isMark: true,
    isKeystone: true,
  });

  // 1. Outer Ring (Milled Coin Rim): ~64 slats
  const ringCount = Math.floor(markCount * 0.45);
  for (let i = 0; i < ringCount; i++) {
    const theta = (i / ringCount) * Math.PI * 2;
    const px = Math.cos(theta) * markRadius;
    const py = centerY + Math.sin(theta) * markRadius;
    const pz = 0;

    // Slat tangent to circle
    euler.set(0, 0, theta + Math.PI / 2);
    tempQ.setFromEuler(euler);

    markSlots.push({
      pos: [px, py, pz],
      rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
      isMark: true,
    });
  }

  // 2. Inner Ring (Engraved Inner Circle): ~36 slats
  const innerRadius = markRadius * 0.72;
  const innerCount = Math.floor(markCount * 0.25);
  for (let i = 0; i < innerCount; i++) {
    const theta = (i / innerCount) * Math.PI * 2;
    const px = Math.cos(theta) * innerRadius;
    const py = centerY + Math.sin(theta) * innerRadius;
    const pz = 0.04; // slightly forward

    euler.set(0, 0, theta + Math.PI / 2);
    tempQ.setFromEuler(euler);

    markSlots.push({
      pos: [px, py, pz],
      rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
      isMark: true,
    });
  }

  // 3. Faceted X Eyes (~16 slats: 8 per eye)
  const eyeRadius = 0.45;
  const eyeOffsets = [-0.65, 0.65]; // left and right
  const eyeY = centerY + 0.35;

  eyeOffsets.forEach((ox) => {
    // Diagonal 1
    for (let s = -1; s <= 1; s++) {
      const px = ox + s * 0.16;
      const py = eyeY + s * 0.16;
      euler.set(0, 0, Math.PI / 4);
      tempQ.setFromEuler(euler);
      markSlots.push({
        pos: [px, py, 0.08],
        rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
        isMark: true,
      });
    }
    // Diagonal 2
    for (let s = -1; s <= 1; s++) {
      const px = ox + s * 0.16;
      const py = eyeY - s * 0.16;
      euler.set(0, 0, -Math.PI / 4);
      tempQ.setFromEuler(euler);
      markSlots.push({
        pos: [px, py, 0.08],
        rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
        isMark: true,
      });
    }
  });

  // 4. Crescent Smile & Tongue (~14 slats)
  const smileY = centerY - 0.45;
  const smileRadius = 0.85;
  for (let s = -4; s <= 4; s++) {
    const theta = -Math.PI / 2 + (s / 5) * 0.7;
    const px = Math.cos(theta) * smileRadius;
    const py = smileY + Math.sin(theta) * smileRadius + 0.85;
    euler.set(0, 0, theta + Math.PI / 2);
    tempQ.setFromEuler(euler);
    markSlots.push({
      pos: [px, py, 0.08],
      rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
      isMark: true,
    });
  }
  // Tongue
  for (let t = 0; t < 4; t++) {
    const px = (t - 1.5) * 0.12;
    const py = smileY - 0.22 - t * 0.05;
    euler.set(0, 0, Math.PI / 2);
    tempQ.setFromEuler(euler);
    markSlots.push({
      pos: [px, py, 0.09],
      rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
      isMark: true,
    });
  }

  // 5. Rest field: Remaining slats lying on the floor in a precise grid (broad faces up, 0.3m gaps)
  const floorGridSide = Math.ceil(Math.sqrt(restCount));
  const gridPitch = 0.55;
  euler.set(-Math.PI / 2, 0, 0); // Flat on floor, broad face (+Z) pointing up
  tempQ.setFromEuler(euler);

  let restAssigned = 0;
  for (let r = 0; r < floorGridSide; r++) {
    for (let c = 0; c < floorGridSide; c++) {
      if (restAssigned >= restCount) break;
      const gx = (c - floorGridSide / 2) * gridPitch;
      const gz = (r - floorGridSide / 2) * gridPitch - 1.0;

      // Skip area directly under the mark
      if (Math.hypot(gx, gz) < 1.4) continue;

      markSlots.push({
        pos: [gx, 0.02, gz],
        rot: [tempQ.x, tempQ.y, tempQ.z, tempQ.w],
        isMark: false,
      });
      restAssigned++;
    }
  }

  // Ensure Keystone is slot 0
  let keystoneIndex = markSlots.findIndex((s) => s.isKeystone);
  if (keystoneIndex > 0) {
    const ks = markSlots.splice(keystoneIndex, 1)[0];
    markSlots.unshift(ks);
  }

  for (let i = 0; i < n; i++) {
    if (i < markSlots.length) {
      const s = markSlots[i];
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
      role[i] = s.isMark ? 0 : 1; // 0 for mark (chrome), 1 for rest field (obsidian on floor)
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

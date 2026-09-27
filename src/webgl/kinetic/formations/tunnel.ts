import * as THREE from 'three';
import { FormationData, LayoutContext } from '../types';

export function buildTunnel(n: number, ctx: LayoutContext): FormationData {
  const position = new Float32Array(n * 3);
  const rotation = new Float32Array(n * 4);
  const scale = new Float32Array(n * 3);
  const role = new Uint8Array(n);

  const slatsPerFrame = 20; // 5 per side
  const numFrames = Math.min(
    Math.floor(n / slatsPerFrame),
    ctx.tier === 'T3' ? 60 : ctx.tier === 'T2' ? 36 : 18
  );

  const frameSize = 3.0;
  const halfS = frameSize / 2;
  const pathLength = 72.0;

  // Build S-curve spline points
  const curvePoints = [
    new THREE.Vector3(0, 3.2, 0),
    new THREE.Vector3(3.0, 3.5, -18),
    new THREE.Vector3(-4.0, 2.8, -36),
    new THREE.Vector3(2.0, 3.6, -54),
    new THREE.Vector3(0, 3.2, -pathLength),
  ];
  const spline = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal');

  const tempQ = new THREE.Quaternion();
  const euler = new THREE.Euler();
  const forward = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3();

  interface SlatSlot {
    pos: [number, number, number];
    rot: [number, number, number, number];
    isGate: boolean;
    gateNumber: number;
    isKeystone?: boolean;
  }

  const slots: SlatSlot[] = [];

  const gateU = [0.2, 0.4, 0.6, 0.8];
  const gateFrameIndices = gateU.map((u) => Math.round(u * (numFrames - 1)));

  for (let f = 0; f < numFrames; f++) {
    const u = f / (numFrames - 1);
    const center = spline.getPointAt(u);
    const tangent = spline.getTangentAt(u).normalize();

    // Compute rotation along tangent with 4° spiral roll per frame
    const roll = (f * 4 * Math.PI) / 180;
    right.crossVectors(tangent, up).normalize();
    const frameUp = new THREE.Vector3().crossVectors(right, tangent).normalize();

    // Apply roll around tangent
    const rollQ = new THREE.Quaternion().setFromAxisAngle(tangent, roll);
    const frameRot = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().makeBasis(right, frameUp, tangent.clone().negate())
    ).multiply(rollQ);

    const isGate = gateFrameIndices.includes(f);
    const gateIndex = gateFrameIndices.indexOf(f);

    // 5 slats per side (Top, Right, Bottom, Left)
    for (let side = 0; side < 4; side++) {
      for (let s = 0; s < 5; s++) {
        const offset = -halfS + (s + 0.5) * (frameSize / 5);
        const localPos = new THREE.Vector3();

        let slatYaw = 0;
        if (side === 0) {
          // Top edge
          localPos.set(offset, halfS, 0);
          slatYaw = 0;
        } else if (side === 1) {
          // Right edge
          localPos.set(halfS, -offset, 0);
          slatYaw = Math.PI / 2;
        } else if (side === 2) {
          // Bottom edge
          localPos.set(-offset, -halfS, 0);
          slatYaw = 0;
        } else {
          // Left edge
          localPos.set(-halfS, offset, 0);
          slatYaw = Math.PI / 2;
        }

        // Transform local position to world
        localPos.applyQuaternion(frameRot).add(center);

        // Compute slat world quaternion
        const localRot = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), slatYaw);
        const worldRot = frameRot.clone().multiply(localRot);

        // Keystone is in top edge of gate 03 (index 2 in gateU)
        const isKeystone = isGate && gateIndex === 2 && side === 0 && s === 2;

        slots.push({
          pos: [localPos.x, localPos.y, localPos.z],
          rot: [worldRot.x, worldRot.y, worldRot.z, worldRot.w],
          isGate,
          gateNumber: isGate ? gateIndex + 1 : 0,
          isKeystone,
        });
      }
    }
  }

  // Move Keystone to slot 0
  let keystoneIndex = slots.findIndex((s) => s.isKeystone);
  if (keystoneIndex === -1) keystoneIndex = 0;
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

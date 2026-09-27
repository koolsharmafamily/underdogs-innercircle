import * as THREE from 'three';
import { SLAT_CONFIG } from './config';
import { FormationData } from './types';
import { motionTokens } from '@/motion/tokens';

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export class KineticEngine {
  readonly n: number;

  // Current physical states
  readonly pos: Float32Array;
  readonly vel: Float32Array;
  readonly rot: Float32Array;
  readonly scale: Float32Array;

  // Scalar channels (flip, twist, tilt, edgeOn, emissive, metal)
  readonly flip: Float32Array;
  readonly flipVel: Float32Array;
  readonly twist: Float32Array;
  readonly tilt: Float32Array;
  readonly edgeOn: Float32Array;
  readonly emissive: Float32Array;
  readonly metal: Float32Array;

  // Baked per-instance micro-variation
  readonly arc: Float32Array;
  readonly freq: Float32Array;
  readonly tumble: Uint8Array;
  readonly tone: Float32Array;
  readonly rough: Float32Array;

  // Preallocated scratch objects for zero garbage collection
  private readonly _qa = new THREE.Quaternion();
  private readonly _qb = new THREE.Quaternion();
  private readonly _qRes = new THREE.Quaternion();
  private readonly _tempQ = new THREE.Quaternion();
  private readonly _euler = new THREE.Euler();
  private readonly _matrix = new THREE.Matrix4();
  private readonly _scaleVec = new THREE.Vector3();
  private readonly _posVec = new THREE.Vector3();

  constructor(n: number) {
    this.n = n;
    this.pos = new Float32Array(n * 3);
    this.vel = new Float32Array(n * 3);
    this.rot = new Float32Array(n * 4);
    this.scale = new Float32Array(n * 3);

    this.flip = new Float32Array(n);
    this.flipVel = new Float32Array(n);
    this.twist = new Float32Array(n);
    this.tilt = new Float32Array(n);
    this.edgeOn = new Float32Array(n);
    this.emissive = new Float32Array(n);
    this.metal = new Float32Array(n);

    this.arc = new Float32Array(n);
    this.freq = new Float32Array(n);
    this.tumble = new Uint8Array(n);
    this.tone = new Float32Array(n);
    this.rough = new Float32Array(n);

    const baseFreq = motionTokens.spring.slat.freq;

    // Seeded random initialization (deterministic across reloads)
    for (let i = 0; i < n; i++) {
      const seed1 = Math.sin(i * 127.1) * 43758.5453;
      const seed2 = Math.cos(i * 311.7) * 43758.5453;
      const seed3 = Math.sin(i * 653.3) * 43758.5453;

      const r1 = Math.abs(seed1) % 1;
      const r2 = Math.abs(seed2) % 1;
      const r3 = Math.abs(seed3) % 1;

      // Arc height: 0.4 - 1.2 m
      this.arc[i] = 0.4 + r1 * 0.8;
      // Spring frequency: base ± 8%
      this.freq[i] = baseFreq * (1 + (r2 - 0.5) * 0.16);
      // Tumble flag on 30% of instances
      this.tumble[i] = r3 < 0.3 ? 1 : 0;
      // Lightness offset: ± 3%
      this.tone[i] = (r1 - 0.5) * 0.06;
      // Roughness offset: ± 0.04
      this.rough[i] = (r2 - 0.5) * 0.08;

      this.rot[i * 4 + 3] = 1.0; // Quaternion identity
      this.scale[i * 3] = 1.0;
      this.scale[i * 3 + 1] = 1.0;
      this.scale[i * 3 + 2] = 1.0;
    }
  }

  // Snaps all positions and quaternions immediately to target formation (used on jump or load)
  snapTo(formation: FormationData) {
    for (let i = 0; i < this.n; i++) {
      this.pos[i * 3] = formation.position[i * 3];
      this.pos[i * 3 + 1] = formation.position[i * 3 + 1];
      this.pos[i * 3 + 2] = formation.position[i * 3 + 2];
      this.vel[i * 3] = 0;
      this.vel[i * 3 + 1] = 0;
      this.vel[i * 3 + 2] = 0;

      this.rot[i * 4] = formation.rotation[i * 4];
      this.rot[i * 4 + 1] = formation.rotation[i * 4 + 1];
      this.rot[i * 4 + 2] = formation.rotation[i * 4 + 2];
      this.rot[i * 4 + 3] = formation.rotation[i * 4 + 3];

      this.scale[i * 3] = formation.scale[i * 3];
      this.scale[i * 3 + 1] = formation.scale[i * 3 + 1];
      this.scale[i * 3 + 2] = formation.scale[i * 3 + 2];
    }
  }

  // Primary update loop called per frame
  update(
    dt: number,
    time: number,
    formA: FormationData,
    formB: FormationData,
    T: number, // 0 to 1
    order: Float32Array,
    staggerS: number,
    targetFlip: number,
    edgeOnGlobal: number,
    pointerWorldY: number,
    mesh: THREE.InstancedMesh
  ) {
    const zeta = motionTokens.spring.slat.zeta;
    const TWO_PI = Math.PI * 2;
    const maxSpeed = 12.0; // 12 m/s speed clamp (Part 5.5)

    // Flip spring constants
    const flipW = TWO_PI * motionTokens.spring.flip.freq;
    const flipZeta = motionTokens.spring.flip.zeta;

    for (let i = 0; i < this.n; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      // 1. Local progress with spatial stagger field
      const ord = order[i] ?? (i / this.n);
      const ti = clamp01((T - ord * staggerS) / (1 - staggerS));
      const e = easeInOutCubic(ti);
      const lift = Math.sin(Math.PI * e) * this.arc[i];

      // 2. Base targets from morph
      const targetPosX = formA.position[i3] + (formB.position[i3] - formA.position[i3]) * e;
      const targetPosY = formA.position[i3 + 1] + (formB.position[i3 + 1] - formA.position[i3 + 1]) * e + lift;
      const targetPosZ = formA.position[i3 + 2] + (formB.position[i3 + 2] - formA.position[i3 + 2]) * e;

      // Slerp rotation
      this._qa.fromArray(formA.rotation, i4);
      this._qb.fromArray(formB.rotation, i4);
      this._qRes.copy(this._qa).slerp(this._qb, e);

      // Tumble on 30% of instances
      if (this.tumble[i] === 1) {
        const tumbleRoll = ((90 * Math.PI) / 180) * Math.sin(Math.PI * e);
        this._tempQ.setFromAxisAngle(new THREE.Vector3(1, 0, 0), tumbleRoll);
        this._qRes.multiply(this._tempQ);
      }

      // 3. Physical position spring (weights on wires)
      const w = TWO_PI * this.freq[i];
      const accelX = w * w * (targetPosX - this.pos[i3]) - 2 * zeta * w * this.vel[i3];
      const accelY = w * w * (targetPosY - this.pos[i3 + 1]) - 2 * zeta * w * this.vel[i3 + 1];
      const accelZ = w * w * (targetPosZ - this.pos[i3 + 2]) - 2 * zeta * w * this.vel[i3 + 2];

      this.vel[i3] += accelX * dt;
      this.vel[i3 + 1] += accelY * dt;
      this.vel[i3 + 2] += accelZ * dt;

      // Clamp speed
      const speed = Math.hypot(this.vel[i3], this.vel[i3 + 1], this.vel[i3 + 2]);
      if (speed > maxSpeed) {
        const factor = maxSpeed / speed;
        this.vel[i3] *= factor;
        this.vel[i3 + 1] *= factor;
        this.vel[i3 + 2] *= factor;
      }

      this.pos[i3] += this.vel[i3] * dt;
      this.pos[i3 + 1] += this.vel[i3 + 1] * dt;
      this.pos[i3 + 2] += this.vel[i3 + 2] * dt;

      // 4. Flip scalar spring (for wall flips)
      const flipAccel = flipW * flipW * (targetFlip - this.flip[i]) - 2 * flipZeta * flipW * this.flipVel[i];
      this.flipVel[i] += flipAccel * dt;
      this.flip[i] += this.flipVel[i] * dt;

      if (Math.abs(this.flip[i]) > 0.001) {
        this._tempQ.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.flip[i]);
        this._qRes.multiply(this._tempQ);
      }

      // 5. Edge-on modifier (for menu shutter and transitions)
      const curEdgeOn = Math.max(edgeOnGlobal, this.edgeOn[i]);
      if (curEdgeOn > 0.001) {
        const edgeAngle = (Math.PI / 2) * curEdgeOn;
        this._tempQ.setFromAxisAngle(new THREE.Vector3(0, 1, 0), edgeAngle);
        this._qRes.multiply(this._tempQ);
      }

      // 6. Idle breathing noise (≤ 3° rotation, ≤ 2cm position)
      const idleWave = Math.sin(time * 0.8 + i * 0.1) * 0.015;
      const idleYaw = Math.cos(time * 0.5 + i * 0.15) * 0.025;
      this._tempQ.setFromAxisAngle(new THREE.Vector3(0, 1, 0), idleYaw);
      this._qRes.multiply(this._tempQ);

      // Scale
      const targetScaleX = formA.scale[i3] + (formB.scale[i3] - formA.scale[i3]) * e;
      const targetScaleY = formA.scale[i3 + 1] + (formB.scale[i3 + 1] - formA.scale[i3 + 1]) * e;
      const targetScaleZ = formA.scale[i3 + 2] + (formB.scale[i3 + 2] - formA.scale[i3 + 2]) * e;

      // Compose into matrix
      this._posVec.set(this.pos[i3], this.pos[i3 + 1] + idleWave, this.pos[i3 + 2]);
      this._scaleVec.set(targetScaleX, targetScaleY, targetScaleZ);

      // Slot 0 (Keystone) is scaled to 0 in the InstancedMesh because the separate Keystone mesh renders it
      if (i === 0) {
        this._scaleVec.set(0, 0, 0);
      }

      this._matrix.compose(this._posVec, this._qRes, this._scaleVec);
      mesh.setMatrixAt(i, this._matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }
}

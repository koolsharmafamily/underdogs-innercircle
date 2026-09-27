import * as THREE from 'three';
import { TierId } from '@/state/store';
import { FormationId } from '@content/scenes';

export type Role = 0 | 1 | 2; // 0 = primary | 1 = secondary | 2 = reserve

export interface LayoutContext {
  aspect: number;
  tier: TierId;
  projectCount?: number;
}

export interface FormationData {
  position: Float32Array; // n * 3
  rotation: Float32Array; // n * 4 (quaternions)
  scale: Float32Array;    // n * 3
  role: Uint8Array;       // n
  cell?: Float32Array;    // n * 4 (u0, v0, du, dv)
  group?: Uint8Array;     // n (cluster id)
}

export interface Formation {
  id: FormationId;
  build: (n: number, ctx: LayoutContext) => FormationData;
}

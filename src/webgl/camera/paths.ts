import * as THREE from 'three';

export interface CameraShot {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
}

export interface CameraWaypoint {
  pos: [number, number, number];
  target: [number, number, number];
  fov: number;
}

// Continuous cinematic dolly nodes across global progress G in [0, 6.0]
const CAMERA_NODES: CameraWaypoint[] = [
  // 0.0: Hero (The Vault)
  { pos: [0, 2.8, 12.0], target: [0, 1.0, 0], fov: 34 },
  // 1.0: Manifesto (The Covenant)
  { pos: [0.35, 2.55, 11.8], target: [0.25, 0.9, 0], fov: 34 },
  // 2.0: Work (The Nights)
  { pos: [0.65, 2.35, 11.6], target: [0.55, 0.75, 0], fov: 33 },
  // 3.0: Capabilities (The Pillars)
  { pos: [-0.65, 2.45, 11.6], target: [-0.55, 0.8, 0], fov: 34 },
  // 4.0: Process (The Passage)
  { pos: [0, 2.3, 11.4], target: [0, 0.7, 0], fov: 34 },
  // 5.0: Proof (The Circle)
  { pos: [0.55, 2.45, 11.6], target: [0.45, 0.8, 0], fov: 34 },
  // 6.0: Contact (The Mint)
  { pos: [0, 2.6, 11.2], target: [0, 0.9, 0], fov: 34 },
];

export function sampleCameraTrajectory(G: number, out: CameraShot) {
  const clampedG = Math.max(0, Math.min(CAMERA_NODES.length - 1, G));
  const k = Math.min(Math.floor(clampedG), CAMERA_NODES.length - 2);
  const u = clampedG - k;
  // Smooth Hermite ease ensures continuous first derivative (no velocity snapping)
  const t = u * u * (3 - 2 * u);

  const s = CAMERA_NODES[k];
  const e = CAMERA_NODES[k + 1];

  out.pos.set(
    THREE.MathUtils.lerp(s.pos[0], e.pos[0], t),
    THREE.MathUtils.lerp(s.pos[1], e.pos[1], t),
    THREE.MathUtils.lerp(s.pos[2], e.pos[2], t)
  );

  out.target.set(
    THREE.MathUtils.lerp(s.target[0], e.target[0], t),
    THREE.MathUtils.lerp(s.target[1], e.target[1], t),
    THREE.MathUtils.lerp(s.target[2], e.target[2], t)
  );

  out.fov = THREE.MathUtils.lerp(s.fov, e.fov, t);
}

// Backward-compatible wrapper
export function sampleCameraPath(sceneId: string, progress: number, out: CameraShot) {
  const sceneIdxMap: Record<string, number> = {
    hero: 0,
    manifesto: 1,
    work: 2,
    capabilities: 3,
    process: 4,
    proof: 5,
    contact: 6,
  };
  const baseIdx = sceneIdxMap[sceneId] ?? 0;
  sampleCameraTrajectory(baseIdx + progress, out);
}

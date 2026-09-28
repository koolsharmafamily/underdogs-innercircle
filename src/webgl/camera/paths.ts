import * as THREE from 'three';

export interface CameraShot {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
}

interface CameraWaypoint {
  pos: [number, number, number];
  target: [number, number, number];
  fov: number;
}

// Continuous cinematic dolly trajectory across all 7 scenes
const CAMERA_WAYPOINTS: Record<string, { start: CameraWaypoint; end: CameraWaypoint }> = {
  hero: {
    start: { pos: [0, 2.8, 12.0], target: [0, 1.0, 0], fov: 34 },
    end: { pos: [0.3, 2.6, 11.8], target: [0.2, 0.9, 0], fov: 34 },
  },
  manifesto: {
    start: { pos: [0.3, 2.6, 11.8], target: [0.2, 0.9, 0], fov: 34 },
    end: { pos: [0.6, 2.4, 11.6], target: [0.5, 0.8, 0], fov: 34 },
  },
  work: {
    start: { pos: [0.6, 2.4, 11.6], target: [0.5, 0.8, 0], fov: 34 },
    end: { pos: [0.7, 2.2, 11.5], target: [0.6, 0.6, 0], fov: 33 },
  },
  capabilities: {
    start: { pos: [0.7, 2.2, 11.5], target: [0.6, 0.6, 0], fov: 33 },
    end: { pos: [-0.6, 2.5, 11.6], target: [-0.5, 0.8, 0], fov: 34 },
  },
  process: {
    start: { pos: [-0.6, 2.5, 11.6], target: [-0.5, 0.8, 0], fov: 34 },
    end: { pos: [0, 2.3, 11.4], target: [0, 0.7, 0], fov: 34 },
  },
  proof: {
    start: { pos: [0, 2.3, 11.4], target: [0, 0.7, 0], fov: 34 },
    end: { pos: [0.5, 2.5, 11.6], target: [0.4, 0.8, 0], fov: 34 },
  },
  contact: {
    start: { pos: [0.5, 2.5, 11.6], target: [0.4, 0.8, 0], fov: 34 },
    end: { pos: [0, 2.6, 11.2], target: [0, 0.9, 0], fov: 34 },
  },
};

export function sampleCameraPath(sceneId: string, progress: number, out: CameraShot) {
  const p = Math.max(0, Math.min(1, progress));
  // Smooth cubic ease: 3p^2 - 2p^3
  const t = p * p * (3 - 2 * p);

  const shotDef = CAMERA_WAYPOINTS[sceneId] || CAMERA_WAYPOINTS.hero;
  const s = shotDef.start;
  const e = shotDef.end;

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

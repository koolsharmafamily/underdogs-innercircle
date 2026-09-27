import * as THREE from 'three';

export interface CameraShot {
  pos: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
}

export function sampleCameraPath(sceneId: string, progress: number, out: CameraShot) {
  const p = Math.max(0, Math.min(1, progress));

  switch (sceneId) {
    case 'hero': {
      // Hero: (-1.2, 1.5, 15.5) -> orbit +28° around Y, rise to y = 4.2, radius 12m
      const orbitAngle = (p * 28 * Math.PI) / 180;
      const radius = 15.5 - p * 3.5;
      const x = -1.2 + Math.sin(orbitAngle) * radius * 0.4;
      const y = 1.5 + p * 2.7;
      const z = Math.cos(orbitAngle) * radius;

      out.pos.set(x, y, z);
      out.target.set(0.6, 3.0, 0); // Aim at the tower axis
      out.fov = 34;
      break;
    }

    case 'manifesto': {
      // Axis from (0, 2.5, 0) -> (0, 11, 0), pitch +18° -> 0°
      const y = 2.5 + p * 8.5;
      out.pos.set(0, y, 0.1);
      const pitch = (1 - p) * 2.0;
      out.target.set(0, y + pitch, -5.0);
      out.fov = 36;
      break;
    }

    case 'work': {
      // (0, 3.2, 12.5) -> (0, 3.2, 11.8), aim at screen centre (0, 3.2, 0)
      const z = 12.5 - p * 0.7;
      out.pos.set(0, 3.2, z);
      out.target.set(0, 3.2, 0);
      out.fov = 32;
      break;
    }

    case 'capabilities': {
      // Truck x = -7 -> +7 at y = 1.7, z = 9
      const x = -7.0 + p * 14.0;
      out.pos.set(x, 1.7, 9.0);
      // 6° lead toward direction of travel
      out.target.set(x + 1.0, 1.7, 0);
      out.fov = 36;
      break;
    }

    case 'process': {
      // S-curve tunnel spline
      const curvePoints = [
        new THREE.Vector3(0, 3.2, 0),
        new THREE.Vector3(3.0, 3.5, -18),
        new THREE.Vector3(-4.0, 2.8, -36),
        new THREE.Vector3(2.0, 3.6, -54),
        new THREE.Vector3(0, 3.2, -72),
      ];
      const spline = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal');
      const camPos = spline.getPointAt(p);
      const lookPos = spline.getPointAt(Math.min(1, p + 0.05));

      out.pos.copy(camPos);
      out.target.copy(lookPos);
      out.fov = 38;
      break;
    }

    case 'proof': {
      // (0, 2.2, 24), wide and calm
      out.pos.set(0, 2.2, 24.0);
      out.target.set(0, 4.0, 0);
      out.fov = 34;
      break;
    }

    case 'contact': {
      // (0, 3.2, 11), centred climax
      out.pos.set(0, 3.2, 11.0);
      out.target.set(0, 3.2, 0);
      out.fov = 34;
      break;
    }

    default: {
      out.pos.set(0, 3.1, 12.0);
      out.target.set(0, 3.1, 0);
      out.fov = 30;
      break;
    }
  }
}

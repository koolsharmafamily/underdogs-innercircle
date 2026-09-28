'use client';

import { useRef, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { frame } from '@/state/frame';
import { useAppStore } from '@/state/store';
import { sampleCameraTrajectory, CameraShot } from './paths';

export function CameraRig() {
  const { camera } = useThree();
  const reducedMotion = useAppStore((s) => s.reducedMotion);
  const phase = useAppStore((s) => s.phase);

  const shot = useMemo<CameraShot>(() => ({
    pos: new THREE.Vector3(),
    target: new THREE.Vector3(),
    fov: 34,
  }), []);

  const currentPos = useRef(new THREE.Vector3(0, 3.1, 12));
  const currentTarget = useRef(new THREE.Vector3(0, 3.1, 0));

  useFrame((_, delta) => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const dt = Math.min(delta, 1 / 30);
    const sceneId = frame.story.sceneId || 'hero';

    // Intro descent handling (S00 Loader)
    if (phase === 'booting' || phase === 'loading' || phase === 'ready') {
      camera.position.set(0, 2.8, 12);
      camera.lookAt(0, 1.0, 0);
      camera.fov = 32;
      camera.updateProjectionMatrix();
      return;
    }

    // Sample continuous trajectory across entire story G
    sampleCameraTrajectory(frame.story.G, shot);

    // Parallax factor (Part 5.6: 0 in Loader, 0.5 in Work, 1.0 elsewhere)
    const parallaxMul = reducedMotion ? 0 : sceneId === 'work' ? 0.5 : 1.0;
    const parallaxX = (frame.pointer.dampedX / window.innerWidth - 0.5) * 0.5 * parallaxMul;
    const parallaxY = -(frame.pointer.dampedY / window.innerHeight - 0.5) * 0.3 * parallaxMul;

    // Velocity FOV (Manifesto and Passage: Part 5.6)
    const velocityFov =
      (sceneId === 'manifesto' || sceneId === 'process') && !reducedMotion
        ? Math.min(6, Math.abs(frame.vNorm) * 4)
        : 0;

    // Smoothly damp camera position & lookAt
    const dampSpeed = 1 - Math.exp(-6 * dt);
    const targetX = shot.pos.x + parallaxX;
    const targetY = shot.pos.y + parallaxY;
    const targetZ = shot.pos.z;

    currentPos.current.x += (targetX - currentPos.current.x) * dampSpeed;
    currentPos.current.y += (targetY - currentPos.current.y) * dampSpeed;
    currentPos.current.z += (targetZ - currentPos.current.z) * dampSpeed;

    currentTarget.current.x += (shot.target.x - currentTarget.current.x) * dampSpeed;
    currentTarget.current.y += (shot.target.y - currentTarget.current.y) * dampSpeed;
    currentTarget.current.z += (shot.target.z - currentTarget.current.z) * dampSpeed;

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);

    camera.fov = shot.fov + velocityFov;
    camera.updateProjectionMatrix();
  });

  return null;
}

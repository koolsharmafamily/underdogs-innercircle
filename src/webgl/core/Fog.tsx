'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { frame } from '@/state/frame';
import { ACTS } from './acts';

export function Fog() {
  const { scene, gl } = useThree();
  const fogRef = useRef<THREE.FogExp2 | null>(null);
  const tempCol = useRef(new THREE.Color());

  useEffect(() => {
    const initialAct = ACTS[frame.acts.a] || ACTS.dusk;
    const fog = new THREE.FogExp2(initialAct.fogColor, initialAct.fogDensity);
    scene.fog = fog;
    fogRef.current = fog;
    gl.setClearColor(initialAct.fogColor, 1.0);

    return () => {
      scene.fog = null;
    };
  }, [scene, gl]);

  useFrame(() => {
    if (!fogRef.current) return;

    const actA = ACTS[frame.acts.a] || ACTS.dusk;
    const actB = ACTS[frame.acts.b] || ACTS.dusk;
    const t = frame.acts.t;

    const colA = new THREE.Color(actA.fogColor);
    const colB = new THREE.Color(actB.fogColor);
    tempCol.current.copy(colA).lerp(colB, t);

    // Fog density interpolates in log space (Part 6.7)
    const logA = Math.log(actA.fogDensity);
    const logB = Math.log(actB.fogDensity);
    const density = Math.exp(logA + (logB - logA) * t);

    fogRef.current.color.copy(tempCol.current);
    fogRef.current.density = density;
    gl.setClearColor(tempCol.current, 1.0);
  });

  return null;
}

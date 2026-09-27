'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { frame } from '@/state/frame';
import { ACTS, ActState } from './acts';

function lerpColor(c1: string, c2: string, t: number, out: THREE.Color) {
  const colA = new THREE.Color(c1);
  const colB = new THREE.Color(c2);
  out.copy(colA).lerp(colB, t);
}

export function LightRig() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);
  const spotRefs = [
    useRef<THREE.SpotLight>(null),
    useRef<THREE.SpotLight>(null),
    useRef<THREE.SpotLight>(null),
  ];

  const tempCol = useRef(new THREE.Color());
  const tempCol2 = useRef(new THREE.Color());

  useFrame(() => {
    const actA: ActState = ACTS[frame.acts.a] || ACTS.dusk;
    const actB: ActState = ACTS[frame.acts.b] || ACTS.dusk;
    const t = frame.acts.t;

    // 1. Key Directional Light
    if (keyLightRef.current) {
      lerpColor(actA.keyColor, actB.keyColor, t, tempCol.current);
      keyLightRef.current.color.copy(tempCol.current);
      keyLightRef.current.intensity =
        actA.keyIntensity + (actB.keyIntensity - actA.keyIntensity) * t;

      const az = (actA.keyAzimuth + (actB.keyAzimuth - actA.keyAzimuth) * t) * (Math.PI / 180);
      const el = (actA.keyElevation + (actB.keyElevation - actA.keyElevation) * t) * (Math.PI / 180);

      const dist = 25.0;
      keyLightRef.current.position.set(
        Math.sin(az) * Math.cos(el) * dist,
        Math.sin(el) * dist,
        Math.cos(az) * Math.cos(el) * dist
      );
    }

    // 2. Rim Directional Light
    if (rimLightRef.current) {
      lerpColor(actA.rimColor, actB.rimColor, t, tempCol.current);
      rimLightRef.current.color.copy(tempCol.current);
      rimLightRef.current.intensity =
        actA.rimIntensity + (actB.rimIntensity - actA.rimIntensity) * t;

      const az = (actA.rimAzimuth + (actB.rimAzimuth - actA.rimAzimuth) * t) * (Math.PI / 180);
      const el = (actA.rimElevation + (actB.rimElevation - actA.rimElevation) * t) * (Math.PI / 180);

      const dist = 20.0;
      rimLightRef.current.position.set(
        Math.sin(az) * Math.cos(el) * dist,
        Math.sin(el) * dist,
        Math.cos(az) * Math.cos(el) * dist
      );
    }

    // 3. Hemisphere Light
    if (hemiLightRef.current) {
      lerpColor(actA.hemiSky, actB.hemiSky, t, tempCol.current);
      lerpColor(actA.hemiGround, actB.hemiGround, t, tempCol2.current);
      hemiLightRef.current.color.copy(tempCol.current);
      hemiLightRef.current.groundColor.copy(tempCol2.current);
      hemiLightRef.current.intensity =
        actA.hemiIntensity + (actB.hemiIntensity - actA.hemiIntensity) * t;
    }

    // 4. Three Spot Lights
    const spotIntensity =
      actA.spots.intensity + (actB.spots.intensity - actA.spots.intensity) * t;
    lerpColor(actA.spots.color, actB.spots.color, t, tempCol.current);

    spotRefs.forEach((ref, idx) => {
      if (ref.current) {
        ref.current.color.copy(tempCol.current);
        ref.current.intensity = spotIntensity;
        ref.current.angle = actA.spots.angle + (actB.spots.angle - actA.spots.angle) * t;
        ref.current.penumbra =
          actA.spots.penumbra + (actB.spots.penumbra - actA.spots.penumbra) * t;

        const posA = actA.spots.positions[idx];
        const posB = actB.spots.positions[idx];
        ref.current.position.set(
          posA[0] + (posB[0] - posA[0]) * t,
          posA[1] + (posB[1] - posA[1]) * t,
          posA[2] + (posB[2] - posA[2]) * t
        );
      }
    });
  });

  return (
    <>
      <directionalLight
        ref={keyLightRef}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={12}
        shadow-camera-bottom={-2}
      />
      <directionalLight ref={rimLightRef} />
      <hemisphereLight ref={hemiLightRef} />
      <spotLight ref={spotRefs[0]} decay={2} />
      <spotLight ref={spotRefs[1]} decay={2} />
      <spotLight ref={spotRefs[2]} decay={2} />
    </>
  );
}

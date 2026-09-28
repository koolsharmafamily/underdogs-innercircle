'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SLAT_CONFIG } from './config';
import { KineticEngine } from './engine';
import { formations, getFormation } from './formations';
import { computeOrderField } from './orderFields';
import { LayoutContext, FormationData } from './types';
import { KeystoneMesh } from './KeystoneMesh';
import { frame } from '@/state/frame';
import { useAppStore } from '@/state/store';
import { scenes } from '@content/scenes';

export function KineticArray() {
  const { size } = useThree();
  const tier = useAppStore((s) => s.tier);
  const phase = useAppStore((s) => s.phase);
  const worldMode = useAppStore((s) => s.worldMode);
  const count = SLAT_CONFIG.counts[tier] || 1200;

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const keystoneMatrixRef = useRef(new THREE.Matrix4());
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // Layout context based on current viewport
  const ctx = useMemo<LayoutContext>(() => ({
    aspect: size.width / Math.max(1, size.height),
    tier,
  }), [size.width, size.height, tier]);

  // Pre-generate all formations for this aspect and count (Part 5.4 & Part 5.5)
  const cachedFormations = useMemo(() => {
    return {
      line: formations.line(count, ctx),
      monolith: formations.monolith(count, ctx),
      vortex: formations.vortex(count, ctx),
      wall: formations.wall(count, ctx),
      clusters: formations.clusters(count, ctx),
      tunnel: formations.tunnel(count, ctx),
      flock: formations.flock(count, ctx),
      mark: formations.mark(count, ctx),
      collapse: formations.collapse(count, ctx),
      canopy: formations.canopy(count, ctx),
    };
  }, [count, ctx]);

  // Initialize engine
  const engine = useMemo(() => new KineticEngine(count), [count]);

  // Cache order fields between adjacent scenes
  const orderFields = useMemo(() => {
    const fields: Float32Array[] = [];
    for (let i = 0; i < scenes.length - 1; i++) {
      const cur = scenes[i];
      const next = scenes[i + 1];
      const dataA = cachedFormations[cur.formation as keyof typeof cachedFormations] || cachedFormations.monolith;
      const dataB = cachedFormations[next.formation as keyof typeof cachedFormations] || cachedFormations.monolith;
      fields.push(computeOrderField(cur.transition?.origin, dataA, dataB, count));
    }
    return fields;
  }, [cachedFormations, count]);

  // Snap to Line or Monolith on mount
  useEffect(() => {
    if (phase === 'booting' || phase === 'loading') {
      engine.snapTo(cachedFormations.line);
    } else {
      engine.snapTo(cachedFormations.monolith);
    }
  }, [engine, cachedFormations, phase]);

  // Per-frame kinetic loop
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 1 / 30);
    const time = frame.time;

    // Determine current formation pair from story time
    const k = frame.story.sceneIndex;
    const curScene = scenes[k] || scenes[0];
    const nextScene = scenes[Math.min(k + 1, scenes.length - 1)];

    // Formations
    let formA: FormationData = cachedFormations[curScene.formation as keyof typeof cachedFormations] || cachedFormations.monolith;
    let formB: FormationData = cachedFormations[nextScene.formation as keyof typeof cachedFormations] || cachedFormations.monolith;
    let T = frame.story.T;
    const order = orderFields[k] || new Float32Array(count);

    // Intro phases override (S00)
    if (phase === 'booting' || phase === 'loading' || phase === 'ready') {
      formA = cachedFormations.line;
      formB = cachedFormations.line;
      T = 0;
    } else if (phase === 'firstLight') {
      formA = cachedFormations.line;
      formB = cachedFormations.line;
      T = 0;
    } else if (phase === 'descent') {
      formA = cachedFormations.line;
      formB = cachedFormations.monolith;
      T = Math.min(1, T + dt * 0.8);
    } else if (worldMode === 'case') {
      // In case study mode, kinetic array forms the ceiling canopy (Part 13 S08)
      formA = cachedFormations.canopy;
      formB = cachedFormations.canopy;
      T = 0;
    } else if (worldMode === '404') {
      // 404 Scattered Field collapse
      formA = cachedFormations.collapse;
      formB = cachedFormations.collapse;
      T = 0;
    }

    // Work scene flip angle
    let targetFlip = 0;
    if (curScene.id === 'work') {
      // 5 projects -> 4 flips
      const projProgress = frame.story.local * 5;
      const projIdx = Math.floor(projProgress);
      const stepT = projProgress - projIdx;
      // 25% hold -> 50% flip -> 25% hold (Part 13 S03)
      if (stepT > 0.25 && stepT < 0.75) {
        const u = (stepT - 0.25) / 0.5;
        targetFlip = (projIdx + u) * Math.PI;
      } else if (stepT >= 0.75) {
        targetFlip = (projIdx + 1) * Math.PI;
      } else {
        targetFlip = projIdx * Math.PI;
      }
    }

    const shutter = useAppStore.getState().shutterProgress;

    // Update kinetic engine
    engine.update(
      dt,
      time,
      formA,
      formB,
      T,
      order,
      0.45,
      targetFlip,
      shutter,
      frame.pointer.worldY,
      meshRef.current
    );

    // Capture Keystone matrix (slot 0)
    meshRef.current.getMatrixAt(0, keystoneMatrixRef.current);
    // Scale slot 0 down in instanced mesh so KeystoneMesh renders it uniquely
    const zeroMat = new THREE.Matrix4().makeScale(0, 0, 0);
    meshRef.current.setMatrixAt(0, zeroMat);
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Material blend (Obsidian -> Ceramic in White Room -> Chrome in Mark) — all states are ghostly-subtle
    if (materialRef.current) {
      const isWhiteRoom = frame.acts.a === 'whiteRoom' || frame.acts.b === 'whiteRoom';
      const isContact = curScene.id === 'contact';

      if (isWhiteRoom) {
        materialRef.current.color.lerp(new THREE.Color('#EDE8DF'), 0.08);
        materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, 0.72, 0.08);
        materialRef.current.metalness = THREE.MathUtils.lerp(materialRef.current.metalness, 0.0, 0.08);
        materialRef.current.clearcoat = THREE.MathUtils.lerp(materialRef.current.clearcoat, 0.08, 0.08);
        materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0.12, 0.08);
      } else if (isContact) {
        // Contact mark — subtle gold shimmer
        materialRef.current.color.lerp(new THREE.Color('#F3E0AC'), 0.08);
        materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, 0.15, 0.08);
        materialRef.current.metalness = THREE.MathUtils.lerp(materialRef.current.metalness, 0.7, 0.08);
        materialRef.current.clearcoat = THREE.MathUtils.lerp(materialRef.current.clearcoat, 0.5, 0.08);
        materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0.22, 0.08);
      } else {
        // Obsidian ghost default — barely-there wisps
        materialRef.current.color.lerp(new THREE.Color('#0D0C0B'), 0.08);
        materialRef.current.roughness = THREE.MathUtils.lerp(materialRef.current.roughness, 0.55, 0.08);
        materialRef.current.metalness = THREE.MathUtils.lerp(materialRef.current.metalness, 0.08, 0.08);
        materialRef.current.clearcoat = THREE.MathUtils.lerp(materialRef.current.clearcoat, 0.25, 0.08);
        materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0.18, 0.08);
      }
    }
  });

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        castShadow
        receiveShadow
        frustumCulled={false}
      >
        <boxGeometry
          args={[
            SLAT_CONFIG.length,
            SLAT_CONFIG.width,
            SLAT_CONFIG.thickness,
          ]}
        />
        <meshPhysicalMaterial
          ref={materialRef}
          color="#0D0C0B"
          roughness={0.55}
          metalness={0.08}
          clearcoat={0.25}
          clearcoatRoughness={0.12}
          envMapIntensity={0.6}
          transparent={true}
          opacity={0.18}
          depthWrite={false}
        />
      </instancedMesh>

      {/* The Keystone — Solitary glass protagonist lamella */}
      <KeystoneMesh matrixRef={keystoneMatrixRef} />
    </>
  );
}

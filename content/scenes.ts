import { z } from 'zod';

export type FormationId =
  | 'line'
  | 'monolith'
  | 'vortex'
  | 'wall'
  | 'clusters'
  | 'tunnel'
  | 'flock'
  | 'mark'
  | 'canopy'
  | 'caseWall'
  | 'collapse';

export type ActId = 'dusk' | 'blueHour' | 'gallery' | 'whiteRoom' | 'passage' | 'dawn';
export type CameraPathId =
  | 'loader'
  | 'heroOrbit'
  | 'vortexRise'
  | 'gallery'
  | 'truck'
  | 'tunnelFlight'
  | 'wideDrift'
  | 'finale';
export type TransitionType = 'morph' | 'flip' | 'shutter' | 'passThrough' | 'inversion' | 'peelOff';
export type OriginId = 'towerTop' | 'axis' | 'screenCentre' | 'lastCluster' | 'tunnelExit' | 'markCentre';

export interface SceneDef {
  id: string;
  label: string;
  title: string;
  length: number | { perItem: number; tail: number };
  formation: FormationId;
  act: ActId | [ActId, ActId];
  camera: CameraPathId;
  transition?: {
    length: number;
    type: TransitionType;
    origin: OriginId;
  };
  pin?: boolean;
}

export const scenes: SceneDef[] = [
  {
    id: 'hero',
    label: '(01) The Vault',
    title: 'The Room Behind the Rage',
    length: 160,
    formation: 'monolith',
    act: 'dusk',
    camera: 'heroOrbit',
    transition: { length: 60, type: 'morph', origin: 'towerTop' },
  },
  {
    id: 'manifesto',
    label: '(02) The Covenant',
    title: 'Two Registers, One Circle',
    length: 220,
    formation: 'vortex',
    act: ['dusk', 'blueHour'],
    camera: 'vortexRise',
    transition: { length: 70, type: 'morph', origin: 'axis' },
  },
  {
    id: 'work',
    label: '(03) The Nights',
    title: 'Selected Productions',
    length: { perItem: 80, tail: 40 },
    formation: 'wall',
    act: 'gallery',
    camera: 'gallery',
    transition: { length: 80, type: 'inversion', origin: 'screenCentre' },
  },
  {
    id: 'capabilities',
    label: '(04) The Pillars',
    title: 'The Inner Architecture',
    length: 260,
    formation: 'clusters',
    act: 'whiteRoom',
    camera: 'truck',
    transition: { length: 80, type: 'passThrough', origin: 'lastCluster' },
  },
  {
    id: 'process',
    label: '(05) The Passage',
    title: 'The 4-Step Initiation',
    length: 320,
    formation: 'tunnel',
    act: 'passage',
    camera: 'tunnelFlight',
    transition: { length: 80, type: 'peelOff', origin: 'tunnelExit' },
  },
  {
    id: 'proof',
    label: '(06) The Circle',
    title: 'Voices of the Vault',
    length: 160,
    formation: 'flock',
    act: 'dawn',
    camera: 'wideDrift',
    transition: { length: 60, type: 'morph', origin: 'markCentre' },
  },
  {
    id: 'contact',
    label: '(07) The Mint',
    title: 'Claim Your Coin',
    length: 120,
    formation: 'mark',
    act: 'dawn',
    camera: 'finale',
  },
];

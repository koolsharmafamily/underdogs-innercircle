// The Six Acts starting values from Part 6.2 of MASTER_PROMPT_3D.md

export interface ActState {
  keyColor: string;
  keyIntensity: number;
  keyAzimuth: number;   // degrees
  keyElevation: number; // degrees

  rimColor: string;
  rimIntensity: number;
  rimAzimuth: number;
  rimElevation: number;

  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;

  spots: {
    intensity: number;
    color: string;
    angle: number;
    penumbra: number;
    positions: [number, number, number][];
  };

  fogColor: string;
  fogDensity: number;
  exposure: number;

  bloomIntensity: number;
  bloomThreshold: number;
  vignette: number;
  grain: number;
}

export const ACTS: Record<string, ActState> = {
  dusk: {
    keyColor: '#FFF2D6',
    keyIntensity: 3.2,
    keyAzimuth: 30,
    keyElevation: 35,

    rimColor: '#E3BC95',
    rimIntensity: 1.2,
    rimAzimuth: -60,
    rimElevation: 25,

    hemiSky: '#3D2D24',
    hemiGround: '#14110E',
    hemiIntensity: 0.55,

    spots: {
      intensity: 0,
      color: '#FFD2A6',
      angle: 0.35,
      penumbra: 0.9,
      positions: [
        [-4, 7, 6],
        [0, 7.5, 6],
        [4, 7, 6],
      ],
    },

    fogColor: '#17120F',
    fogDensity: 0.032,
    exposure: 1.0,

    bloomIntensity: 0.28,
    bloomThreshold: 0.92,
    vignette: 0.55,
    grain: 0.04,
  },

  blueHour: {
    keyColor: '#FFD9B8',
    keyIntensity: 1.5,
    keyAzimuth: 25,
    keyElevation: 30,

    rimColor: '#A9C1FF',
    rimIntensity: 0.5,
    rimAzimuth: 80,
    rimElevation: 25,

    hemiSky: '#8FA6DA',
    hemiGround: '#0E1218',
    hemiIntensity: 0.3,

    spots: {
      intensity: 0,
      color: '#FFD2A6',
      angle: 0.35,
      penumbra: 0.9,
      positions: [
        [-4, 7, 6],
        [0, 7.5, 6],
        [4, 7, 6],
      ],
    },

    fogColor: '#0E1218',
    fogDensity: 0.03,
    exposure: 0.95,

    bloomIntensity: 0.22,
    bloomThreshold: 0.92,
    vignette: 0.55,
    grain: 0.04,
  },

  gallery: {
    keyColor: '#FFD2A6',
    keyIntensity: 0.4,
    keyAzimuth: -90,
    keyElevation: 45,

    rimColor: '#A9C1FF',
    rimIntensity: 0.1,
    rimAzimuth: 90,
    rimElevation: 20,

    hemiSky: '#23171c',
    hemiGround: '#0C0E12',
    hemiIntensity: 0.15,

    spots: {
      intensity: 180,
      color: '#FFD2A6',
      angle: 0.35,
      penumbra: 0.9,
      positions: [
        [-4, 7, 6],
        [0, 7.5, 6],
        [4, 7, 6],
      ],
    },

    fogColor: '#0C0E12',
    fogDensity: 0.024,
    exposure: 1.05,

    bloomIntensity: 0.15,
    bloomThreshold: 0.95,
    vignette: 0.5,
    grain: 0.04,
  },

  whiteRoom: {
    keyColor: '#FFFFFF',
    keyIntensity: 1.4,
    keyAzimuth: 0,
    keyElevation: 65,

    rimColor: '#FFFFFF',
    rimIntensity: 0,
    rimAzimuth: 0,
    rimElevation: 0,

    hemiSky: '#FFFFFF',
    hemiGround: '#E9E4DA',
    hemiIntensity: 1.2,

    spots: {
      intensity: 0,
      color: '#FFFFFF',
      angle: 0.5,
      penumbra: 0.5,
      positions: [
        [-4, 7, 6],
        [0, 7.5, 6],
        [4, 7, 6],
      ],
    },

    fogColor: '#EFEBE4',
    fogDensity: 0.018,
    exposure: 1.1,

    bloomIntensity: 0,
    bloomThreshold: 1.0,
    vignette: 0.15,
    grain: 0.03,
  },

  passage: {
    keyColor: '#FF5B1F',
    keyIntensity: 0,
    keyAzimuth: 0,
    keyElevation: 0,

    rimColor: '#A9C1FF',
    rimIntensity: 0,
    rimAzimuth: 0,
    rimElevation: 0,

    hemiSky: '#07080A',
    hemiGround: '#07080A',
    hemiIntensity: 0.05,

    spots: {
      intensity: 35,
      color: '#FF5B1F',
      angle: 1.2,
      penumbra: 0.8,
      positions: [
        [0, 3.5, -15],
        [0, 3.5, -35],
        [0, 3.5, -55],
      ],
    },

    fogColor: '#07080A',
    fogDensity: 0.05,
    exposure: 0.95,

    bloomIntensity: 0.45,
    bloomThreshold: 0.88,
    vignette: 0.6,
    grain: 0.05,
  },

  dawn: {
    keyColor: '#FFC9A3',
    keyIntensity: 2.6,
    keyAzimuth: 115,
    keyElevation: 8,

    rimColor: '#F0C8D4',
    rimIntensity: 0.4,
    rimAzimuth: -115,
    rimElevation: 15,

    hemiSky: '#D8C6E2',
    hemiGround: '#1C1719',
    hemiIntensity: 0.45,

    spots: {
      intensity: 0,
      color: '#FFC9A3',
      angle: 0.35,
      penumbra: 0.9,
      positions: [
        [-4, 7, 6],
        [0, 7.5, 6],
        [4, 7, 6],
      ],
    },

    fogColor: '#2A2224',
    fogDensity: 0.028,
    exposure: 1.08,

    bloomIntensity: 0.3,
    bloomThreshold: 0.92,
    vignette: 0.45,
    grain: 0.04,
  },
};

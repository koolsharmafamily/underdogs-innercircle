// Slat dimensions & Tier configuration from Part 5.2 of MASTER_PROMPT_3D.md

export const SLAT_CONFIG = {
  // Physical dimensions (in metres) — subtle wisp-like lamellae
  length: 0.28,       // local X  (was 0.60 — halved for delicacy)
  width: 0.045,       // local Y  (was 0.14 — thin filaments)
  thickness: 0.008,   // local Z  (was 0.022 — paper-thin)
  bevelRadius: 0.003, // ≈38% of thickness

  // Instance counts by tier — dramatically reduced for subtlety
  counts: {
    T3: 480,  // Desktop high  (was 1200)
    T2: 300,  // Desktop mid / Tablet  (was 720)
    T1: 160,  // Mobile  (was 360)
    T0: 0,    // Poster fallback
  },

  // Per-instance random seeds for micro-variation (baked once)
  variation: {
    lightnessDelta: 0.02, // ±2% (subtler variation)
    roughnessDelta: 0.03, // ±0.03
    springFreqDelta: 0.06,// ±6%
    flightArcMin: 0.3,
    flightArcMax: 0.9,
    tumbleRatio: 0.2,    // 20% of instances (less chaos)
  },
};

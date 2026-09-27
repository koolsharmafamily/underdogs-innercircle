// Slat dimensions & Tier configuration from Part 5.2 of MASTER_PROMPT_3D.md

export const SLAT_CONFIG = {
  // Physical dimensions (in metres)
  length: 0.60,       // local X
  width: 0.14,        // local Y
  thickness: 0.022,   // local Z
  bevelRadius: 0.007, // ≈30% of thickness

  // Instance counts by tier (Part 5.2)
  counts: {
    T3: 1200, // Desktop high
    T2: 720,  // Desktop mid / Tablet
    T1: 360,  // Mobile
    T0: 0,    // Poster fallback
  },

  // Per-instance random seeds for micro-variation (baked once)
  variation: {
    lightnessDelta: 0.03, // ±3%
    roughnessDelta: 0.04, // ±0.04
    springFreqDelta: 0.08,// ±8%
    flightArcMin: 0.4,
    flightArcMax: 1.2,
    tumbleRatio: 0.3,    // 30% of instances
  },
};

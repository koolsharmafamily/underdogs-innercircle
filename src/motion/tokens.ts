// Motion tokens as specified in Part 4.3 of MASTER_PROMPT_3D.md

export const motionTokens = {
  dur: {
    micro: 0.26,       // 200–320 ms
    ui: 0.5,           // 450–600 ms
    text: 1.0,         // 900–1,100 ms (line stagger 80 ms)
    world: 1.6,        // 1,400–1,800 ms
    route: 1.6,        // Page transitions
  },
  ease: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    swift: 'cubic-bezier(0.83, 0, 0.17, 1)',
    in: 'cubic-bezier(0.5, 0, 0.75, 0)',
    hover: 'cubic-bezier(0.25, 1, 0.5, 1)',
  },
  spring: {
    slat: { freq: 1.8, zeta: 0.62 },      // Slat positions and scalar rotations
    flip: { freq: 1.6, zeta: 0.58 },      // Wall flips (one overshoot)
    tilt: { freq: 2.5, zeta: 0.80 },      // Cursor-driven tilts
    magnet: { freq: 4.0, zeta: 0.65 },    // Magnetic buttons
  },
  damp: {
    story: 3.5,    // Global story time
    pointer: 8.0,  // World-space pointer
    cursor: 30.0,  // Cursor dot
  },
  stagger: {
    morph: 0.45,   // Formation morphs
    flip: 0.35,    // Wall flips
    loader: 0.55,  // Loader wave
  },
};

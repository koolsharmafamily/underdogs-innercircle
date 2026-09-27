// Plain mutable singleton written and read every frame (Part 15.6)
// Zero per-frame allocations and zero React re-renders in the render loop

export interface PointerState {
  x: number;
  y: number;
  dampedX: number;
  dampedY: number;
  ndcX: number;
  ndcY: number;
  worldX: number;
  worldY: number;
  worldZ: number;
  isDown: boolean;
}

export interface StoryState {
  G_raw: number; // raw story time = k + local progress
  G: number;     // damped story time (lambda = 3.5)
  sceneIndex: number;
  sceneId: string;
  local: number; // progress within the current scene [0, 1]
  T: number;     // transition progress between formations [0, 1]
}

export interface ActsState {
  a: string;     // current act name
  b: string;     // next act name
  t: number;     // blend factor [0, 1]
}

export interface FrameState {
  time: number;
  dt: number;
  scroll: number;
  velocity: number;
  vNorm: number;
  pointer: PointerState;
  story: StoryState;
  acts: ActsState;
  advance: ((time: number) => void) | null;
}

export const frame: FrameState = {
  time: 0,
  dt: 1 / 60,
  scroll: 0,
  velocity: 0,
  vNorm: 0,
  pointer: {
    x: 0,
    y: 0,
    dampedX: 0,
    dampedY: 0,
    ndcX: 0,
    ndcY: 0,
    worldX: 0,
    worldY: 0,
    worldZ: 0,
    isDown: false,
  },
  story: {
    G_raw: 0,
    G: 0,
    sceneIndex: 0,
    sceneId: 'hero',
    local: 0,
    T: 0,
  },
  acts: {
    a: 'dusk',
    b: 'dusk',
    t: 0,
  },
  advance: null,
};

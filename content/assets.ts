export interface AssetManifest {
  critical: string[];
  scene: string[];
  deferred: string[];
}

export const assets: AssetManifest = {
  critical: [
    '/brand/mark.svg',
    '/brand/logo.jpg',
  ],
  scene: [
    '/brand/launch-post.png',
    '/brand/animation-theme.png',
    '/brand/palette.png',
  ],
  deferred: [
    '/textures/noise.png',
  ],
};

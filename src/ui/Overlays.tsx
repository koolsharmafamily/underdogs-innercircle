'use client';

import { Menu } from './Menu';
import { IndexOverlay } from './IndexOverlay';
import { RequestCoinModal } from './RequestCoinModal';

export function Overlays() {
  return (
    <>
      <Menu />
      <IndexOverlay />
      <RequestCoinModal />
    </>
  );
}

'use client';

import { Menu } from './Menu';
import { IndexOverlay } from './IndexOverlay';
import { RequestCoinModal } from './RequestCoinModal';
import { ConciergeModal } from './ConciergeModal';

export function Overlays() {
  return (
    <>
      <Menu />
      <IndexOverlay />
      <RequestCoinModal />
      <ConciergeModal />
    </>
  );
}

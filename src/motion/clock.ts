import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { frame } from '@/state/frame';
import { useAppStore } from '@/state/store';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function startClock() {
  if (typeof window === 'undefined') return () => {};

  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
  });
  lenisInstance = lenis;

  lenis.on('scroll', ScrollTrigger.update);

  // Global Pointer tracker (damped pointer, ndc coordinates)
  const onPointerMove = (e: PointerEvent) => {
    frame.pointer.x = e.clientX;
    frame.pointer.y = e.clientY;
    frame.pointer.ndcX = (e.clientX / window.innerWidth) * 2 - 1;
    frame.pointer.ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  const onPointerDown = () => {
    frame.pointer.isDown = true;
  };
  const onPointerUp = () => {
    frame.pointer.isDown = false;
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });

  const tick = (time: number, deltaMs: number) => {
    const dt = Math.min(deltaMs / 1000, 1 / 30);
    frame.time = time;
    frame.dt = dt;

    // 1. Scroll step
    lenis.raf(time * 1000);
    frame.scroll = lenis.scroll;
    frame.velocity = lenis.velocity;
    frame.vNorm = Math.max(-1, Math.min(1, lenis.velocity / 3000));

    // Pointer exponential damping (Part 4.2 M5)
    const pDamp = 1 - Math.exp(-8 * dt);
    frame.pointer.dampedX += (frame.pointer.x - frame.pointer.dampedX) * pDamp;
    frame.pointer.dampedY += (frame.pointer.y - frame.pointer.dampedY) * pDamp;

    // Story time damping (Part 11.3)
    const sDamp = 1 - Math.exp(-3.5 * dt);
    frame.story.G += (frame.story.G_raw - frame.story.G) * sDamp;

    // 2. Advance 3D engine if canvas is mounted
    if (frame.advance) {
      frame.advance(time);
    }
  };

  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointerup', onPointerUp);
    lenis.destroy();
    lenisInstance = null;
  };
}

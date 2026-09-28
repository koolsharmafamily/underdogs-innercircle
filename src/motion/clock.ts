import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { frame } from '@/state/frame';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

const sceneIds = ['hero', 'manifesto', 'work', 'capabilities', 'process', 'proof', 'contact'];

function updateStoryFromScroll(scrollY: number) {
  if (typeof document === 'undefined') return;

  const winHeight = window.innerHeight;
  if (scrollY <= 10) {
    frame.story.G_raw = 0;
    return;
  }

  const elements = sceneIds.map((id) => document.getElementById(id));
  let computedG = 0;

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (!el) continue;

    const top = el.offsetTop;
    const height = el.offsetHeight;
    const nextEl = elements[i + 1];
    const nextTop = nextEl ? nextEl.offsetTop : top + height;
    const scrollDistance = Math.max(winHeight, nextTop - top);

    if (scrollY >= top - winHeight * 0.25 && scrollY < nextTop - winHeight * 0.25) {
      const local = Math.min(1, Math.max(0, (scrollY - (top - winHeight * 0.25)) / scrollDistance));
      computedG = i + local;
      break;
    } else if (i === elements.length - 1 && scrollY >= top - winHeight * 0.25) {
      const local = Math.min(1, Math.max(0, (scrollY - (top - winHeight * 0.25)) / Math.max(winHeight, height)));
      computedG = i + local;
      break;
    }
  }

  frame.story.G_raw = Math.max(0, Math.min(sceneIds.length - 1, computedG));
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
    const effectiveScroll = typeof window !== 'undefined' ? window.scrollY : lenis.scroll;
    frame.scroll = effectiveScroll;
    frame.velocity = lenis.velocity;
    frame.vNorm = Math.max(-1, Math.min(1, lenis.velocity / 3000));

    // Update raw story progress based on active scroll
    updateStoryFromScroll(effectiveScroll);

    // Pointer exponential damping
    const pDamp = 1 - Math.exp(-8 * dt);
    frame.pointer.dampedX += (frame.pointer.x - frame.pointer.dampedX) * pDamp;
    frame.pointer.dampedY += (frame.pointer.y - frame.pointer.dampedY) * pDamp;

    // Story time damping (snappy response across sections)
    const sDamp = 1 - Math.exp(-6.0 * dt);
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

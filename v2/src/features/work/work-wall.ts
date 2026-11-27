import { onMotionPreferenceChange, prefersReducedMotion, clamp } from '../../runtime/motion';
import {
  approach,
  computeGeometry,
  fitPanel,
  panelPosition,
  pickSource,
  restScrollFor,
  sliceAngleFor,
  type WallGeometry,
} from './wall-geometry';

/**
 * Work wall controller (signature S2).
 *
 * Modes (chosen by capability, re-evaluated on change):
 *  - static: semantic grid from CSS only (no JS, reduced motion, narrow + fine pointer)
 *  - swipe:  native horizontal scroll-snap track with a curved transform (touch / narrow)
 *  - drum:   sticky CSS 3D cylinder rotated by native vertical scroll (desktop)
 *
 * The semantic <ol> of project links is always in the DOM; the drum is an aria-hidden copy.
 */
type Mode = 'static' | 'swipe' | 'drum';
type Src = { w: number; src: string };
type Teardown = () => void;

const DESKTOP = '(min-width: 901px) and (min-height: 600px)';
const SWIPE = '(max-width: 700px), (max-width: 900px) and (pointer: coarse)';
const SCROLL_PER_PANEL = 0.68; // viewport heights of scroll per project

export function initWorkWall(root: HTMLElement): Teardown {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const view = root.querySelector<HTMLElement>('[data-drum-view]');
  const scrollEl = root.querySelector<HTMLElement>('[data-work-scroll]');
  const switcher = root.querySelector<HTMLElement>('[data-switcher]');
  if (!track || !view || !scrollEl || !switcher) return () => {};

  const items = Array.from(track.querySelectorAll<HTMLElement>(':scope > .work__item'));
  const desktopMq = window.matchMedia(DESKTOP);
  const swipeMq = window.matchMedia(SWIPE);
  let mode: Mode = 'static';
  let teardown: Teardown = () => {};

  const pick = (): Mode => {
    if (prefersReducedMotion()) return 'static';
    if (desktopMq.matches) return 'drum';
    if (swipeMq.matches) return 'swipe';
    return 'static';
  };

  const apply = () => {
    const next = pick();
    if (next === mode) return;
    teardown();
    mode = next;
    root.dataset.mode = mode;
    teardown = mode === 'drum' ? setupDrum() : mode === 'swipe' ? setupSwipe() : () => {};
  };

  // ---------------------------------------------------------------- swipe
  function setupSwipe(): Teardown {
    let centers: number[] = [];
    let itemWidth = 1;
    let frame = 0;

    const measure = () => {
      centers = items.map((el) => el.offsetLeft + el.offsetWidth / 2);
      itemWidth = items[0]?.offsetWidth || 1;
      update();
    };
    const update = () => {
      frame = 0;
      const mid = track!.scrollLeft + track!.clientWidth / 2;
      items.forEach((el, i) => {
        const d = ((centers[i] ?? 0) - mid) / itemWidth;
        const rot = clamp(-d * 24, -38, 38);
        const z = -Math.min(Math.abs(d), 1.5) * 70;
        el.style.transform = `rotateY(${rot.toFixed(2)}deg) translateZ(${z.toFixed(1)}px)`;
        el.style.setProperty('--caption', (1 - Math.min(Math.abs(d), 1) * 0.75).toFixed(2));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    track!.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(track!);
    measure();

    return () => {
      track!.removeEventListener('scroll', onScroll);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
      items.forEach((el) => {
        el.style.transform = '';
        el.style.removeProperty('--caption');
      });
    };
  }

  // ----------------------------------------------------------------- drum
  function setupDrum(): Teardown {
    const count = items.length;
    const buttons = Array.from(switcher!.querySelectorAll<HTMLButtonElement>('[data-goto]'));
    const links = items.map((el) => el.querySelector<HTMLAnchorElement>('a'));
    const sources: Src[][] = items.map((el) => {
      try {
        return JSON.parse(el.dataset.wallSrcs ?? '[]') as Src[];
      } catch {
        return [];
      }
    });

    let geometry: WallGeometry | null = null;
    let drum: HTMLElement | null = null;
    let cards: HTMLElement[] = [];
    let start = 0;
    let length = 1;
    let angle = 0;
    let target = 0;
    let position = 0;
    let active = -1;
    let frame = 0;
    let built = false;
    let inView = false;

    switcher!.hidden = false;

    const headerH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * 16 || 72;

    const layout = () => {
      const vh = window.innerHeight;
      length = Math.round(vh * SCROLL_PER_PANEL * (count - 1));
      const stageH = vh - headerH();
      scrollEl!.style.height = `${stageH + length}px`;
      start = scrollEl!.getBoundingClientRect().top + window.scrollY - headerH();
    };

    const build = () => {
      const rect = view!.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      const size = fitPanel(rect.width, rect.height);
      geometry = computeGeometry(size.width, size.height);
      const g = geometry;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      view!.replaceChildren();
      view!.style.perspective = `${g.perspective}px`;
      drum = document.createElement('div');
      drum.className = 'drum';
      cards = items.map((_, i) => {
        const card = document.createElement('div');
        card.className = 'drum-card';
        card.dataset.i = String(i);
        const src = pickSource(sources[i] ?? [], g.width * dpr)?.src;
        if (src) {
          // Fall back to the static grid if a wall image cannot load.
          const probe = new Image();
          probe.onerror = () => fallbackToStatic();
          probe.src = src;
        }
        const step = g.width / g.slices;
        for (let k = 0; k < g.slices; k++) {
          const s = document.createElement('div');
          s.className = 'drum-slice';
          s.style.width = `${g.sliceWidth}px`;
          s.style.height = `${g.height}px`;
          s.style.marginLeft = `${-g.sliceWidth / 2}px`;
          s.style.marginTop = `${-g.height / 2}px`;
          s.style.transform = `rotateY(${sliceAngleFor(g, i, k)}rad) translateZ(${-g.radius}px)`;
          if (src) {
            const shade = 'linear-gradient(rgb(12 12 11 / var(--dim, 0)), rgb(12 12 11 / var(--dim, 0)))';
            s.style.backgroundImage = `${shade}, url("${src}")`;
            s.style.backgroundSize = `100% 100%, ${g.width}px ${g.height}px`;
            s.style.backgroundPosition = `0 0, ${-(k * step) - (g.sliceWidth - step) / 2}px 0`;
          }
          card.appendChild(s);
        }
        drum!.appendChild(card);
        return card;
      });
      view!.appendChild(drum);
      built = true;
      render();
    };

    const setActive = (i: number) => {
      if (i === active) return;
      active = i;
      items.forEach((el, j) => el.classList.toggle('is-active', j === i));
      cards.forEach((el, j) => el.classList.toggle('is-front', j === i));
      buttons.forEach((b, j) => b.setAttribute('aria-pressed', String(j === i)));
    };

    const render = () => {
      if (!drum || !geometry) return;
      drum.style.transform = `translateZ(${geometry.radius}px) rotateY(${angle}rad)`;
      const pos = angle / geometry.step;
      cards.forEach((c, i) => {
        c.style.visibility = Math.abs(i - pos) < 1.6 ? 'visible' : 'hidden';
      });
    };

    const tick = () => {
      frame = 0;
      angle = approach(angle, target);
      render();
      if (angle !== target) {
        frame = requestAnimationFrame(tick);
      } else if (drum) {
        drum.style.willChange = '';
      }
    };

    const onScroll = () => {
      if (!geometry) return;
      position = panelPosition(window.scrollY, start, length, count);
      target = position * geometry.step;
      setActive(Math.round(position));
      if (!frame && angle !== target) {
        if (drum) drum.style.willChange = 'transform';
        frame = requestAnimationFrame(tick);
      }
    };

    const goTo = (i: number, smooth = true) => {
      window.scrollTo({ top: restScrollFor(i, start, length, count), behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto' });
    };

    const onViewClick = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.drum-card');
      if (!card) return;
      const i = Number(card.dataset.i);
      if (i === active) links[i]?.click();
      else goTo(i);
    };
    const onSwitch = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-goto]');
      if (btn) goTo(Number(btn.dataset.goto));
    };
    // Keyboard users tabbing through project links bring each one to the front.
    const onFocusIn = (e: FocusEvent) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>('.work__item');
      if (!item) return;
      const i = items.indexOf(item);
      if (i >= 0 && i !== active) goTo(i, false);
    };

    const relayout = () => {
      layout();
      if (inView || built) build();
      onScroll();
      angle = target;
      render();
    };

    // Build lazily when the section approaches; listen to scroll only while relevant.
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = !!entry?.isIntersecting;
        if (inView) {
          if (!built) build();
          window.addEventListener('scroll', onScroll, { passive: true });
          onScroll();
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      },
      { rootMargin: '50% 0px' },
    );

    let resizeFrame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(relayout);
    });

    layout();
    setActive(0);
    io.observe(scrollEl!);
    ro.observe(view!);
    view!.addEventListener('click', onViewClick);
    switcher!.addEventListener('click', onSwitch);
    track!.addEventListener('focusin', onFocusIn);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(resizeFrame);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      view!.removeEventListener('click', onViewClick);
      switcher!.removeEventListener('click', onSwitch);
      track!.removeEventListener('focusin', onFocusIn);
      view!.replaceChildren();
      view!.style.perspective = '';
      scrollEl!.style.height = '';
      switcher!.hidden = true;
      items.forEach((el) => el.classList.remove('is-active'));
    };
  }

  function fallbackToStatic() {
    teardown();
    teardown = () => {};
    mode = 'static';
    root.dataset.mode = 'static';
  }

  // ------------------------------------------------------------ lifecycle
  const offMotion = onMotionPreferenceChange(apply);
  desktopMq.addEventListener('change', apply);
  swipeMq.addEventListener('change', apply);
  apply();

  return () => {
    offMotion();
    desktopMq.removeEventListener('change', apply);
    swipeMq.removeEventListener('change', apply);
    teardown();
  };
}

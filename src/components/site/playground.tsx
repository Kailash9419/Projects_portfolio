"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useLanguage } from "@/context/LanguageContext";

/**
 * The playful ending: service tags drop into the footer as physics bodies and
 * the visitor can grab and fling them. Matter.js simulates; the tags are plain
 * DOM pills positioned from the bodies each frame, so they stay crisp and
 * selectable. Runs only while on screen.
 */
export function Playground() {
  const { t, language } = useLanguage();
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current!;
    const pills = Array.from(el.querySelectorAll<HTMLElement>("[data-pill]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.static = "true";
      return;
    }

    const { Engine, Bodies, Composite, Mouse, MouseConstraint, Body, Runner } = Matter;
    const engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
    const W = el.clientWidth;
    const H = el.clientHeight;
    const wall = { isStatic: true, render: { visible: false } };
    const T = 200;
    Composite.add(engine.world, [
      Bodies.rectangle(W / 2, H + T / 2, W * 3, T, wall),
      Bodies.rectangle(-T / 2, H / 2, T, H * 4, wall),
      Bodies.rectangle(W + T / 2, H / 2, T, H * 4, wall),
    ]);

    const bodies = pills.map((p, i) => {
      const w = p.offsetWidth;
      const h = p.offsetHeight;
      const b = Bodies.rectangle(
        W * 0.15 + ((i * 97) % Math.max(1, W * 0.7)),
        -h - i * 70,
        w,
        h,
        { chamfer: { radius: h / 2 }, restitution: 0.55, friction: 0.12, frictionAir: 0.012, density: 0.002 }
      );
      Body.setAngle(b, ((i % 5) - 2) * 0.25);
      return b;
    });
    Composite.add(engine.world, bodies);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let mouse: Matter.Mouse | null = null;
    if (finePointer) {
      // desktop: grab and fling with the mouse
      mouse = Mouse.create(el);
      // let the page keep scrolling with the wheel over the playground
      const m = mouse as unknown as { element: HTMLElement; mousewheel: EventListener };
      m.element.removeEventListener("wheel", m.mousewheel);
      m.element.removeEventListener("mousewheel", m.mousewheel);
      m.element.removeEventListener("DOMMouseScroll", m.mousewheel);
      const drag = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
      Composite.add(engine.world, drag);
    }
    // touch (Matter's touch handlers would block page scrolling): a tap kicks
    // every pill near the finger up and away, like slapping a table
    const kick = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      bodies.forEach((b) => {
        const dx = b.position.x - x;
        const dy = b.position.y - y;
        const d = Math.hypot(dx, dy);
        if (d > 260) return;
        const f = (1 - d / 260) * 0.09 * b.mass;
        Body.applyForce(b, b.position, { x: (dx / (d || 1)) * f * 0.6, y: -f });
        Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.4);
      });
    };
    el.addEventListener("pointerdown", kick);

    let raf = 0;
    let running = false;
    const runner = Runner.create();
    const draw = () => {
      bodies.forEach((b, i) => {
        const p = pills[i];
        p.style.transform = `translate(${b.position.x - p.offsetWidth / 2}px, ${b.position.y - p.offsetHeight / 2}px) rotate(${b.angle}rad)`;
      });
      raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          Runner.run(runner, engine);
          raf = requestAnimationFrame(draw);
        } else if (!e.isIntersecting && running) {
          running = false;
          Runner.stop(runner);
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);

    return () => {
      el.removeEventListener("pointerdown", kick);
      if (mouse) Mouse.clearSourceEvents(mouse);
      io.disconnect();
      Runner.stop(runner);
      cancelAnimationFrame(raf);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [language]);

  return (
    <div
      ref={box}
      className="group/pg relative h-[56svh] min-h-[380px] cursor-grab touch-pan-y overflow-hidden border-t border-line active:cursor-grabbing"
      data-cursor="Throw"
    >
      <p className="pointer-events-none absolute inset-x-0 top-10 whitespace-nowrap text-center font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
        <span className="hidden [@media(pointer:fine)]:inline">↓ {t.playground.hint}</span>
        <span className="[@media(pointer:fine)]:hidden">↓ {t.playground.tapHint}</span>
      </p>
      {t.playground.tags.map((tag, i) => (
        <span
          key={`${language}-${tag}`}
          data-pill
          className={`absolute left-0 top-0 select-none whitespace-nowrap rounded-full px-6 py-3 font-display text-2xl font-extrabold uppercase tracking-tight will-change-transform group-data-[static=true]/pg:static group-data-[static=true]/pg:m-2 group-data-[static=true]/pg:inline-block sm:px-8 sm:py-4 sm:text-4xl ${
            i % 3 === 0 ? "bg-lime text-ink" : i % 3 === 1 ? "border border-line-strong bg-surface text-fg" : "bg-fg text-ink"
          }`}
          style={{ transform: "translate(-9999px, 0)" }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

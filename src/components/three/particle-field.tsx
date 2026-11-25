"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { particleState, STAGES } from "./particle-state";

/**
 * A field of glowing particles that assemble into the DEVLABS wordmark, then
 * morph through the four things we build (store, booking, dashboard, bot) as
 * the visitor scrolls, and finally scatter into a starfield. The cursor
 * pushes particles away like a hand through sand.
 *
 * Shapes are sampled from 2D canvas drawings at runtime: the wordmark from the
 * display font, the icons from SVG paths. No models to download.
 */

/* ───────────────────────── shape sampling ───────────────────────── */

const ICONS: string[][] = [
  // shopping bag
  ["M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", "M3 6h18", "M16 10a4 4 0 0 1-8 0"],
  // calendar with check
  ["M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M16 2v4", "M8 2v4", "M3 10h18", "m9 16 2 2 4-4"],
  // dashboard
  ["M3 3h7v9H3z", "M14 3h7v5h-7z", "M14 12h7v9h-7z", "M3 16h7v5H3z"],
  // bot
  ["M12 8V4H8", "M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z", "M2 14h2", "M20 14h2", "M15 13v2", "M9 13v2"],
];

/** Returns normalised points (x,y in roughly -0.5..0.5, aspect kept) from a drawing. */
function sample(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number): Float32Array {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  draw(ctx, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const raw: number[] = [];
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 140) {
        raw.push(x, y);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  // normalise to the drawing's own bounding box: width spans exactly -0.5..0.5,
  // so the requested world width is the real width (no empty canvas margins)
  const bw = Math.max(1, maxX - minX);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const pts = new Float32Array(raw.length);
  for (let i = 0; i < raw.length; i += 2) {
    pts[i] = (raw[i] - cx) / bw;
    pts[i + 1] = -(raw[i + 1] - cy) / bw;
  }
  return pts;
}

function wordmarkPoints(font: string) {
  return sample(
    (ctx, w, h) => {
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `800 ${Math.round(h * 0.78)}px ${font}`;
      ctx.fillText("DEVLABS", w / 2, h / 2 + h * 0.04);
    },
    1400,
    260
  );
}

function iconPoints(paths: string[]) {
  return sample(
    (ctx, w) => {
      ctx.strokeStyle = "#fff";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 1.7;
      const s = w / 24;
      ctx.setTransform(s * 0.86, 0, 0, s * 0.86, w * 0.07, w * 0.07);
      for (const d of paths) ctx.stroke(new Path2D(d));
    },
    420,
    420
  );
}

/** Pick n points from a sampled set (with jitter), scaled to a given width in world units. */
function fit(src: Float32Array, n: number, width: number, depth: number, seed: number): Float32Array {
  const out = new Float32Array(n * 3);
  const count = src.length / 2;
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    const k = Math.floor(rnd() * count);
    out[i * 3] = (src[k * 2] + (rnd() - 0.5) * 0.004) * width;
    out[i * 3 + 1] = (src[k * 2 + 1] + (rnd() - 0.5) * 0.004) * width;
    out[i * 3 + 2] = (rnd() - 0.5) * depth;
  }
  return out;
}

function starfield(n: number, seed: number): Float32Array {
  const out = new Float32Array(n * 3);
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    const u = rnd() * 2 - 1;
    const th = rnd() * Math.PI * 2;
    const r = 5 + rnd() * 9;
    const q = Math.sqrt(1 - u * u);
    out[i * 3] = r * q * Math.cos(th);
    out[i * 3 + 1] = r * q * Math.sin(th) * 0.7;
    out[i * 3 + 2] = r * u - 4;
  }
  return out;
}

/** Deterministic PRNG (Park–Miller). */
function seededRandom(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/* ───────────────────────── shaders ───────────────────────── */

const vertex = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uPixelRatio;
  uniform float uPresence;
  varying vec3 vColor;
  void main() {
    vColor = aColor * uPresence;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (11.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor * a, a);
  }
`;

/* ───────────────────────── the field ───────────────────────── */

function Field({ font, count }: { font: string; count: number }) {
  const { viewport, size } = useThree();
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);

  const narrow = size.width < 768;

  // all target shapes, rebuilt when the viewport changes size class
  const targets = useMemo(() => {
    const word = wordmarkPoints(font);
    const wordWidth = Math.min(viewport.width * (narrow ? 0.88 : 0.62), 11);
    const iconSize = Math.min(viewport.height * (narrow ? 0.34 : 0.56), viewport.width * (narrow ? 0.62 : 0.34));
    return [
      fit(word, count, wordWidth, 0.5, 11),
      ...ICONS.map((paths, i) => fit(iconPoints(paths), count, iconSize, 0.9, 101 + i)),
      starfield(count, 999),
    ];
  }, [font, count, viewport.width, viewport.height, narrow]);

  const { geometry, material } = useMemo(() => {
    const rand = seededRandom(4242); // seeded so render stays pure
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const start = starfield(count, 7);
    pos.set(start);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const base = start.slice();
    const lime = new THREE.Color("#c5f82a");
    const cyan = new THREE.Color("#3ee6ff");
    const white = new THREE.Color("#ffffff");
    for (let i = 0; i < count; i++) {
      const r = rand();
      sizes[i] = 1.6 + rand() * 2.6 + (r > 0.985 ? 4 : 0);
      const c = r < 0.7 ? lime : r < 0.9 ? cyan : white;
      const boost = 1.2 + rand() * 0.9; // > 1 so bloom catches it
      colors.set([c.r * boost, c.g * boost, c.b * boost], i * 3);
      spd[i] = 1.6 + rand() * 3.2;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    // simulation buffers ride along on the geometry; the frame loop mutates them through the points ref
    g.userData = { base, offset: new Float32Array(count * 3), speed: spd };
    const m = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: { uPixelRatio: { value: 1 }, uPresence: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { geometry: g, material: m };
  }, [count]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  const shift = useRef(new THREE.Vector2());
  const presence = useRef(0);

  useFrame((state, rawDt) => {
    const obj = points.current;
    if (!obj) return;
    const geo = obj.geometry;
    const mat = obj.material as THREE.ShaderMaterial;
    const { base, offset, speed } = geo.userData as { base: Float32Array; offset: Float32Array; speed: Float32Array };
    const dt = Math.min(rawDt, 1 / 30);
    const t = state.clock.elapsedTime;
    const stage = Math.max(0, Math.min(STAGES - 1, particleState.stage));
    const target = targets[stage];
    const pos = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    // layout offset: services put the shape on the right (desktop) or up (mobile)
    const wantX = particleState.layout && !narrow && stage > 0 && stage < 5 ? viewport.width * 0.2 : 0;
    const wantY = stage === 0 ? (narrow ? viewport.height * 0.16 : viewport.height * 0.1) : particleState.layout && narrow && stage < 5 ? viewport.height * 0.18 : 0;
    shift.current.x += (wantX - shift.current.x) * (1 - Math.exp(-dt * 3));
    shift.current.y += (wantY - shift.current.y) * (1 - Math.exp(-dt * 3));

    // pointer in world units on the z=0 plane
    const px = (particleState.px * viewport.width) / 2 - shift.current.x;
    const py = (particleState.py * viewport.height) / 2 - shift.current.y;
    const R = particleState.pointerActive ? (narrow ? 1.1 : 1.25) : 0;
    const R2 = R * R;

    for (let i = 0; i < count; i++) {
      const j = i * 3;
      // spring the base position toward this stage's target, each particle at its own pace
      const k = 1 - Math.exp(-dt * speed[i]);
      base[j] += (target[j] - base[j]) * k;
      base[j + 1] += (target[j + 1] - base[j + 1]) * k;
      base[j + 2] += (target[j + 2] - base[j + 2]) * k;

      // cursor repulsion, eased so the sand flows back
      const dx = base[j] - px;
      const dy = base[j + 1] - py;
      const d2 = dx * dx + dy * dy;
      let ox = 0;
      let oy = 0;
      let oz = 0;
      if (d2 < R2) {
        const d = Math.sqrt(d2) + 1e-4;
        const f = (1 - d / R) ** 2 * 0.9;
        ox = (dx / d) * f;
        oy = (dy / d) * f;
        oz = f * 1.4;
      }
      offset[j] += (ox - offset[j]) * 0.12;
      offset[j + 1] += (oy - offset[j + 1]) * 0.12;
      offset[j + 2] += (oz - offset[j + 2]) * 0.12;

      // idle shimmer
      const w = Math.sin(t * 1.3 + i * 0.37) * 0.012;
      arr[j] = base[j] + offset[j] + w;
      arr[j + 1] = base[j + 1] + offset[j + 1] + Math.cos(t * 1.1 + i * 0.21) * 0.012;
      arr[j + 2] = base[j + 2] + offset[j + 2];
    }
    pos.needsUpdate = true;

    presence.current += (particleState.presence - presence.current) * (1 - Math.exp(-dt * 2.5));
    mat.uniforms.uPresence.value = presence.current;
    mat.uniforms.uPixelRatio.value = state.gl.getPixelRatio();

    if (group.current) {
      group.current.position.set(shift.current.x, shift.current.y, 0);
      group.current.rotation.y += ((particleState.px * 0.18) - group.current.rotation.y) * 0.04;
      group.current.rotation.x += ((-particleState.py * 0.12) - group.current.rotation.x) * 0.04;
      if (stage === 5) group.current.rotation.z += dt * 0.02;
    }
  });

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

export default function ParticleField() {
  const [font, setFont] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [awake, setAwake] = useState(true);

  useEffect(() => {
    const narrow = window.innerWidth < 768;
    const lowPower = (navigator.hardwareConcurrency || 8) <= 4;
    // resolve the next/font family name, wait for it to load, then sample shapes with it
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-bricolage").trim() || "sans-serif";
    document.fonts.load(`800 120px ${family}`).finally(() => {
      setCount(narrow || lowPower ? 5200 : 11000);
      setFont(family);
    });
    // mouse: follow the cursor. touch: a finger on the screen parts the particles, released on lift.
    let release = 0;
    const track = (e: PointerEvent) => {
      particleState.px = (e.clientX / window.innerWidth) * 2 - 1;
      particleState.py = -((e.clientY / window.innerHeight) * 2 - 1);
      particleState.pointerActive = true;
      window.clearTimeout(release);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.buttons) track(e);
    };
    const onDown = (e: PointerEvent) => track(e);
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      release = window.setTimeout(() => (particleState.pointerActive = false), 700);
    };
    const onLeave = () => {
      particleState.pointerActive = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    // stop rendering entirely while the field is invisible
    const id = setInterval(() => setAwake(particleState.presence > 0.01 || document.documentElement.scrollTop < window.innerHeight * 4), 500);
    return () => {
      clearInterval(id);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.clearTimeout(release);
    };
  }, []);

  if (!font || !count) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
    <Canvas
      frameloop={awake ? "always" : "never"}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#050606", 1)}
      eventSource={document.body}
      eventPrefix="client"
    >
      <Field font={font} count={count} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.15} luminanceThreshold={0.25} luminanceSmoothing={0.4} mipmapBlur />
      </EffectComposer>
    </Canvas>
    </div>
  );
}

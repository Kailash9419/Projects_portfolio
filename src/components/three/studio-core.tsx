"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { Bloom, ChromaticAberration, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/**
 * The DevLabs core: a shell of faceted chrome shards around a glowing lime
 * energy heart, wrapped in orbiting rings and sparks. `progress` (0→1, usually
 * scroll) blasts the shell apart; the pointer tilts the whole assembly.
 */

type Props = {
  progress?: React.RefObject<number>;
  /** "hero": bright and large. "calm": dimmer, slower (background use). */
  mood?: "hero" | "calm";
};

const LIME = new THREE.Color("#c5f82a");
const CYAN = new THREE.Color("#3ee6ff");

function useShards(radius: number) {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(radius, 1); // non-indexed: 3 verts per face
    const pos = geo.getAttribute("position");
    const list: { geo: THREE.BufferGeometry; dir: THREE.Vector3; spin: THREE.Vector3 }[] = [];
    for (let i = 0; i < pos.count; i += 3) {
      const a = new THREE.Vector3().fromBufferAttribute(pos, i);
      const b = new THREE.Vector3().fromBufferAttribute(pos, i + 1);
      const c = new THREE.Vector3().fromBufferAttribute(pos, i + 2);
      const center = a.clone().add(b).add(c).divideScalar(3);
      // extrude each face into a bevelled plate
      const inner = [a, b, c].map((v) => v.clone().sub(center).multiplyScalar(0.86).add(center.clone().multiplyScalar(0.8)));
      const outer = [a, b, c].map((v) => v.clone().sub(center).multiplyScalar(0.9).add(center));
      const verts = [
        ...outer,
        ...inner.slice().reverse(),
        outer[0], outer[1], inner[1], outer[0], inner[1], inner[0],
        outer[1], outer[2], inner[2], outer[1], inner[2], inner[1],
        outer[2], outer[0], inner[0], outer[2], inner[0], inner[2],
      ];
      const g = new THREE.BufferGeometry().setFromPoints(verts.map((v) => v.clone().sub(center)));
      g.computeVertexNormals();
      const k = list.length;
      list.push({
        geo: g,
        dir: center,
        spin: new THREE.Vector3(Math.sin(k * 1.7), Math.cos(k * 2.3), Math.sin(k * 0.9)).multiplyScalar(1.4),
      });
    }
    geo.dispose();
    return list;
  }, [radius]);
}

function Core({ progress, mood = "hero" }: Props) {
  const group = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const heart = useRef<THREE.MeshStandardMaterial>(null);
  const lattice = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const intro = useRef(0);
  const shards = useShards(1.6);
  const calm = mood === "calm";

  useFrame((state, dt) => {
    const p = THREE.MathUtils.clamp(progress?.current ?? 0, 0, 1);
    const t = state.clock.elapsedTime;
    const speed = calm ? 0.5 : 1;

    // grow in on mount (scaling the DOM wrapper would break the canvas measurement)
    intro.current = Math.min(1, intro.current + dt * 0.55);
    const e = 1 - Math.pow(1 - intro.current, 4);
    if (tilt.current) tilt.current.scale.setScalar(0.35 + 0.65 * e);

    if (group.current) {
      group.current.rotation.y += dt * 0.22 * speed;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.18 + p * 0.9;
    }
    // pointer tilt, eased
    if (tilt.current) {
      tilt.current.rotation.y = THREE.MathUtils.lerp(tilt.current.rotation.y, state.pointer.x * 0.45, 0.05);
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, -state.pointer.y * 0.35, 0.05);
    }

    // breathing at rest, blast apart with progress
    const breathe = (Math.sin(t * 1.1) * 0.5 + 0.5) * 0.06;
    const spread = Math.max(0, p - 0.05) * 2.4;
    meshes.current.forEach((m, i) => {
      if (!m) return;
      const s = shards[i];
      const jitter = Math.sin(t * 1.4 + i) * 0.012;
      m.position.copy(s.dir).multiplyScalar(1 + breathe + spread * (0.55 + (i % 7) * 0.11) + jitter);
      m.rotation.set(s.spin.x * spread, s.spin.y * spread, s.spin.z * spread);
    });

    if (heart.current) heart.current.emissiveIntensity = (calm ? 1.6 : 2.6) + Math.sin(t * 2.2) * 0.9 + spread * 3;
    if (lattice.current) lattice.current.rotation.set(-t * 0.3, t * 0.4, 0);
    if (ringA.current) ringA.current.rotation.set(Math.PI / 2.4 + Math.sin(t * 0.3) * 0.2, 0, t * 0.6 * speed);
    if (ringB.current) ringB.current.rotation.set(Math.PI / 1.6, t * 0.45 * speed, Math.PI / 5);
    if (ringC.current) {
      ringC.current.rotation.set(t * 0.2, Math.PI / 3, -t * 0.35 * speed);
      ringC.current.scale.setScalar(1 + spread * 0.25);
    }
  });

  return (
    <group ref={tilt}>
      <group ref={group}>
        {shards.map((s, i) => (
          <mesh
            key={i}
            geometry={s.geo}
            ref={(el) => {
              meshes.current[i] = el;
            }}
          >
            <meshStandardMaterial color={i % 9 === 0 ? "#2c3a10" : "#4a524e"} metalness={1} roughness={0.22} flatShading envMapIntensity={1.4} />
          </mesh>
        ))}

        {/* the heart */}
        <mesh>
          <icosahedronGeometry args={[0.95, 4]} />
          <meshStandardMaterial ref={heart} color="#0b1a02" emissive={LIME} emissiveIntensity={2.6} toneMapped={false} />
        </mesh>
        <mesh ref={lattice}>
          <icosahedronGeometry args={[1.18, 1]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.35} toneMapped={false} />
        </mesh>
        <pointLight color={LIME} intensity={calm ? 10 : 18} distance={8} />
      </group>

      {/* orbiting rings */}
      <mesh ref={ringA}>
        <torusGeometry args={[2.55, 0.012, 8, 160]} />
        <meshBasicMaterial color={LIME} toneMapped={false} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[2.9, 0.008, 8, 160]} />
        <meshBasicMaterial color={CYAN} toneMapped={false} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ringC}>
        <torusGeometry args={[3.3, 0.005, 8, 200]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} transparent opacity={0.35} />
      </mesh>

      <Sparkles count={calm ? 50 : 90} scale={[7, 7, 7]} size={calm ? 2 : 3} speed={0.35} color="#c5f82a" opacity={0.8} />
      <Sparkles count={calm ? 20 : 40} scale={[9, 9, 9]} size={2} speed={0.2} color="#3ee6ff" opacity={0.6} />
    </group>
  );
}

export default function StudioCore({ progress, mood = "hero", className }: Props & { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(wrap.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={className ?? "absolute inset-0"}>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, mood === "calm" ? 9.5 : 10.5], fov: 38 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor("#000000", 1)}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <Environment resolution={256}>
          <Lightformer intensity={4} position={[0, 5, -5]} scale={[10, 2, 1]} color="#ffffff" />
          <Lightformer intensity={2.4} position={[-5, 0, 2]} scale={[2, 8, 1]} color="#c5f82a" />
          <Lightformer intensity={1.8} position={[5, -2, 2]} scale={[2, 6, 1]} color="#3ee6ff" />
          <Lightformer form="ring" intensity={3} position={[0, 0, 6]} scale={3} color="#ffffff" />
        </Environment>
        <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.7}>
          <Core progress={progress} mood={mood} />
        </Float>
        <EffectComposer multisampling={0}>
          <Bloom intensity={mood === "calm" ? 0.8 : 1.05} luminanceThreshold={0.6} luminanceSmoothing={0.25} mipmapBlur />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.0008, 0.0012)} radialModulation={false} modulationOffset={0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false });

/** Mounts the fixed particle layer behind the home page (client only). */
export function HomeParticles() {
  return <ParticleField />;
}

"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Billboard, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

/**
 * 3D ecosystem visualization.
 * ArmanX-Labs sits at the center, with three branches (Developer Tools, AI,
 * Experimental) feeding into the open-source community.
 */

type EcoNode = {
  id: string;
  label: string;
  position: [number, number, number];
  kind: "root" | "branch" | "leaf";
};

const NODES: EcoNode[] = [
  { id: "lab", label: "ARMANX-LABS", position: [0, 0, 0], kind: "root" },
  { id: "tools", label: "Developer Tools", position: [-3.5, 1.8, 0.4], kind: "branch" },
  { id: "ai", label: "AI & Intelligence", position: [3.5, 1.8, 0.4], kind: "branch" },
  { id: "exp", label: "Experimental", position: [0, -2.8, 0.6], kind: "branch" },
  { id: "repomap", label: "RepoMap", position: [-5, 3.4, -0.5], kind: "leaf" },
  { id: "intel", label: "Dev Intelligence", position: [-2.5, 3.6, -0.5], kind: "leaf" },
  { id: "agents", label: "AI Agents", position: [2.5, 3.6, -0.5], kind: "leaf" },
  { id: "workflow", label: "AI Workflows", position: [5, 3.4, -0.5], kind: "leaf" },
  { id: "frameworks", label: "Frameworks", position: [-2, -4.4, -0.3], kind: "leaf" },
  { id: "languages", label: "Languages", position: [2, -4.4, -0.3], kind: "leaf" },
  { id: "community", label: "OPEN SOURCE COMMUNITY", position: [0, 0, -3], kind: "root" },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [1, 5],
  [2, 6],
  [2, 7],
  [3, 8],
  [3, 9],
  [0, 10],
  [4, 10],
  [7, 10],
  [9, 10],
];

function EcoNodeMesh({ node, index }: { node: EcoNode; index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + index * 0.5;
    const s =
      node.kind === "root"
        ? 1 + Math.sin(t * 0.8) * 0.08
        : 1 + Math.sin(t * 1.0) * 0.12;
    ref.current.scale.setScalar(s);
    // Slow rotation on cubes for voxel feel
    if (node.kind !== "root") {
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.15;
    }
  });

  const isRoot = node.kind === "root";
  const isBranch = node.kind === "branch";
  const color = isRoot ? "#c4ff3d" : isBranch ? "#f5f5f7" : "#8b8b92";
  const size = isRoot ? 0.32 : isBranch ? 0.2 : 0.11;

  return (
    <group position={node.position}>
      <mesh ref={ref}>
        {/* Voxel cubes instead of spheres — matches pixelated AX logo */}
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={node.kind === "leaf" ? 0.6 : 1}
          wireframe={isBranch}
        />
      </mesh>
      {isRoot && (
        <mesh>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshBasicMaterial color="#c4ff3d" transparent opacity={0.06} />
        </mesh>
      )}
      <Billboard position={[0, isRoot ? -0.5 : -0.35, 0]}>
        <Text
          fontSize={isRoot ? 0.18 : isBranch ? 0.16 : 0.12}
          color={isRoot ? "#c4ff3d" : isBranch ? "#f5f5f7" : "#8b8b92"}
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
}

function EcoScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.4;
    groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.08) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {EDGES.map(([from, to], i) => (
        <Line
          key={i}
          points={[NODES[from].position, NODES[to].position]}
          color="#ffffff"
          transparent
          opacity={0.15}
          lineWidth={1}
        />
      ))}
      {NODES.map((n, i) => (
        <EcoNodeMesh key={n.id} node={n} index={i} />
      ))}
    </group>
  );
}

export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="relative py-32 lg:py-48 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="absolute inset-0 dot-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] text-lab-accent">06</span>
              <span className="w-12 h-px bg-lab-accent/40" />
            </div>
            <h2 className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted">
              The Ecosystem
            </h2>
          </div>
          <div className="lg:col-span-9">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] tracking-[-0.03em] text-lab-fg text-balance">
              The lab is an umbrella —{" "}
              <span className="text-lab-muted">
                multiple projects, one open-source community.
              </span>
            </h3>
          </div>
        </div>

        {/* 3D viz */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[480px] sm:h-[560px] border border-white/[0.08] bg-[#0a0a0d] overflow-hidden"
        >
          <Canvas
            camera={{ position: [0, 0, 9], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <EcoScene />
            </Suspense>
          </Canvas>

          {/* Overlay */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-lab-muted uppercase tracking-wider">
            <div>● Ecosystem graph</div>
            <div className="text-lab-dim mt-0.5">{NODES.length} nodes · {EDGES.length} connections</div>
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-lab-dim uppercase tracking-wider">
            <div>Auto-rotating · 3D</div>
          </div>

          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-lab-accent/40" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-lab-accent/40" />
        </motion.div>

        {/* Future categories */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FUTURE_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="p-6 border border-white/[0.08] hover:border-white/[0.2] bg-[#0e0e12] transition-colors"
            >
              <h4 className="font-display text-lg text-lab-fg mb-2">
                {cat.title}
              </h4>
              <p className="text-sm text-lab-muted leading-relaxed">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FUTURE_CATEGORIES = [
  {
    title: "Developer Intelligence",
    desc: "Code understanding, repository analysis, architecture tools.",
  },
  {
    title: "AI Tools",
    desc: "AI agents, AI-assisted development, intelligent workflows.",
  },
  {
    title: "Developer Productivity",
    desc: "Tools that save developers time — every minute counts.",
  },
  {
    title: "Infrastructure",
    desc: "Open-source backend, deployment, automation, monitoring tools.",
  },
  {
    title: "Web Applications",
    desc: "Useful applications built around real problems.",
  },
  {
    title: "Experimental",
    desc: "Interesting technical experiments and prototypes.",
  },
];

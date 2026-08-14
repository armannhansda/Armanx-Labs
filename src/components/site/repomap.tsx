"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Billboard, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

/**
 * 3D knowledge graph visualization representing RepoMap's
 * repository intelligence — nodes (files) connected by edges (imports).
 */

type GraphNode = {
  id: string;
  label: string;
  position: [number, number, number];
  kind: "core" | "module" | "leaf";
};

type GraphEdge = {
  from: number;
  to: number;
};

const NODES: GraphNode[] = [
  { id: "root", label: "src/", position: [0, 0, 0], kind: "core" },
  { id: "app", label: "app/", position: [2.4, 1.2, 0.4], kind: "module" },
  { id: "components", label: "components/", position: [-2.2, 1.0, -0.5], kind: "module" },
  { id: "lib", label: "lib/", position: [1.8, -1.4, 0.8], kind: "module" },
  { id: "api", label: "api/", position: [-1.6, -1.2, -0.6], kind: "module" },
  { id: "page", label: "page.tsx", position: [3.6, 2.2, 0.8], kind: "leaf" },
  { id: "layout", label: "layout.tsx", position: [3.4, 0.4, 1.4], kind: "leaf" },
  { id: "hero", label: "hero.tsx", position: [-3.4, 1.8, -0.8], kind: "leaf" },
  { id: "nav", label: "nav.tsx", position: [-3.2, 0.2, -1.6], kind: "leaf" },
  { id: "db", label: "db.ts", position: [2.8, -2.4, 1.6], kind: "leaf" },
  { id: "utils", label: "utils.ts", position: [1.0, -2.6, -0.4], kind: "leaf" },
  { id: "route", label: "route.ts", position: [-2.8, -2.2, -1.2], kind: "leaf" },
  { id: "schema", label: "schema.prisma", position: [-1.0, -2.4, 0.8], kind: "leaf" },
];

const EDGES: GraphEdge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 0, to: 4 },
  { from: 1, to: 5 },
  { from: 1, to: 6 },
  { from: 2, to: 7 },
  { from: 2, to: 8 },
  { from: 3, to: 9 },
  { from: 3, to: 10 },
  { from: 4, to: 11 },
  { from: 4, to: 12 },
  { from: 5, to: 7 },
  { from: 6, to: 8 },
  { from: 9, to: 12 },
  { from: 11, to: 12 },
];

function GraphNodeMesh({ node, index }: { node: GraphNode; index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + index * 0.4;
    ref.current.position.y = node.position[1] + Math.sin(t * 0.6) * 0.08;
    const s = 1 + Math.sin(t * 0.8) * 0.1;
    ref.current.scale.setScalar(s);
    // Rotate cubes for voxel feel
    if (node.kind !== "core") {
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.15;
    }
  });

  const color =
    node.kind === "core"
      ? "#c4ff3d"
      : node.kind === "module"
        ? "#f5f5f7"
        : "#8b8b92";

  const size =
    node.kind === "core" ? 0.24 : node.kind === "module" ? 0.16 : 0.09;

  return (
    <group position={node.position}>
      <mesh ref={ref}>
        {/* Voxel cubes — matches AX logo pixelated identity */}
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={node.kind === "leaf" ? 0.7 : 1}
          wireframe={node.kind === "module"}
        />
      </mesh>
      {/* Glow halo for core */}
      {node.kind === "core" && (
        <mesh>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial
            color="#c4ff3d"
            transparent
            opacity={0.08}
          />
        </mesh>
      )}
      <Billboard position={[0, -0.3, 0]}>
        <Text
          fontSize={0.13}
          color={node.kind === "leaf" ? "#8b8b92" : "#f5f5f7"}
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

function GraphEdges() {
  return (
    <>
      {EDGES.map((edge, i) => {
        const from = NODES[edge.from].position;
        const to = NODES[edge.to].position;
        return (
          <Line
            key={i}
            points={[from, to]}
            color="#ffffff"
            transparent
            opacity={0.15}
            lineWidth={1}
          />
        );
      })}
    </>
  );
}

function KnowledgeGraph() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <GraphEdges />
      {NODES.map((node, i) => (
        <GraphNodeMesh key={node.id} node={node} index={i} />
      ))}
    </group>
  );
}

function GraphScene() {
  return (
    <>
      <KnowledgeGraph />
      <ambientLight intensity={0.6} />
    </>
  );
}

const TECH_STACK = [
  "TypeScript",
  "Next.js",
  "Node.js",
  "Express",
  "React Flow",
  "ts-morph",
];

const CAPABILITIES = [
  "Repository structure mapping",
  "File & import relationships",
  "Dependency analysis",
  "Graph visualization",
  "Source-code exploration",
  "Function & component relationships",
  "Architecture understanding",
];

export function RepoMap() {
  return (
    <section
      id="repomap"
      className="relative py-32 lg:py-48 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] text-lab-accent">04</span>
              <span className="w-12 h-px bg-lab-accent/40" />
            </div>
            <h2 className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted">
              Flagship Project
            </h2>
          </div>
          <div className="lg:col-span-9">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[11px] text-lab-muted">
                    Repository Intelligence Platform
                  </span>
                  <span className="inline-flex items-center gap-2 px-2 py-0.5 border border-lab-accent/30 bg-lab-accent-dim">
                    <span className="w-1 h-1 rounded-full bg-lab-accent pulse-dot" />
                    <span className="font-mono text-[10px] text-lab-accent uppercase tracking-wider">
                      Active
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 px-2 py-0.5 border border-white/10 bg-[#0e0e12]">
                    <span className="font-mono text-[10px] text-lab-fg uppercase tracking-wider">
                      6 Contributors
                    </span>
                  </span>
                </div>
                <h3 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-[-0.04em] text-lab-fg">
                  RepoMap
                </h3>
              </div>
            </div>
            <p className="mt-6 text-lg text-lab-muted max-w-2xl leading-relaxed">
              Converts source-code repositories into interactive knowledge
              graphs — making complex codebases easier to understand. Moving
              beyond simple visualization toward a true repository intelligence
              platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://repomap.armanx.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-lab-fg text-lab-bg font-mono text-[12px] tracking-[0.15em] uppercase hover:bg-lab-accent transition-colors"
              >
                Launch
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="https://github.com/ArmanX-Labs/RepoMap"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border border-white/15 text-lab-fg font-mono text-[12px] tracking-[0.15em] uppercase hover:border-lab-accent hover:text-lab-accent transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* 3D graph + side panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Graph */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative h-[420px] sm:h-[520px] border border-white/[0.08] bg-[#0a0a0d] overflow-hidden"
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <Suspense fallback={null}>
                <GraphScene />
              </Suspense>
            </Canvas>

            {/* Overlay labels */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-lab-muted uppercase tracking-wider">
              <div>● Live graph render</div>
              <div className="text-lab-dim mt-0.5">{NODES.length} nodes · {EDGES.length} edges</div>
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-lab-dim uppercase tracking-wider">
              <div>Hover · rotate · observe</div>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-lab-accent/40" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-lab-accent/40" />
          </motion.div>

          {/* Side info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Capabilities */}
            <div className="border border-white/[0.08] bg-[#0e0e12] p-6">
              <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-lab-muted mb-5">
                Currently Focuses On
              </h4>
              <ul className="space-y-3">
                {CAPABILITIES.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 text-sm text-lab-fg/90"
                  >
                    <span className="font-mono text-[10px] text-lab-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="border border-white/[0.08] bg-[#0e0e12] p-6">
              <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-lab-muted mb-5">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 border border-white/10 font-mono text-[11px] text-lab-fg/80 hover:border-lab-accent/40 hover:text-lab-accent transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-5 font-mono text-[10px] text-lab-dim uppercase tracking-wider">
                Future: Tree-sitter · Redis · BullMQ · PostgreSQL · AI services · multi-language
              </p>
            </div>
          </div>
        </div>

        {/* RepoMap's role in ArmanX-Labs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="border-t border-white/[0.06] pt-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="font-display text-2xl sm:text-3xl tracking-tight text-lab-fg mb-4">
                RepoMap is the beginning,{" "}
                <span className="text-lab-muted">
                  not the identity of ArmanX-Labs.
                </span>
              </h4>
              <p className="text-lab-muted leading-relaxed">
                When someone discovers RepoMap, they discover ArmanX-Labs — and
                eventually the rest of the ecosystem. RepoMap is the first major
                project, with more planned across AI tools, automation, and
                experimental technology.
              </p>
            </div>

            <div className="font-mono text-xs">
              <div className="text-lab-dim mb-3 uppercase tracking-wider">
                /project-lifecycle
              </div>
              <div className="space-y-1.5">
                {[
                  ["Idea", "dim"],
                  ["↓", "dim"],
                  ["Experiment", "dim"],
                  ["↓", "dim"],
                  ["Prototype", "dim"],
                  ["↓", "dim"],
                  ["Open Source", "fg"],
                  ["↓", "accent"],
                  ["Community", "accent"],
                  ["↓", "accent"],
                  ["Active Project", "accent"],
                  ["↓", "dim"],
                  ["Product / Platform", "dim"],
                ].map(([label, tone], i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className={
                      tone === "accent"
                        ? "text-lab-accent"
                        : tone === "fg"
                          ? "text-lab-fg"
                          : "text-lab-dim"
                    }
                  >
                    {label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

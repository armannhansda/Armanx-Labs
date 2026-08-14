"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

// --- Cybernetic Data Core Component ---
function CyberneticDataCore({ scrollProgress }: { scrollProgress: any }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particle positions once
  const particles = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const r = 2 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const scrollVal = scrollProgress.get();

    // Constant idle animations + Scroll-driven transformations
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.1;
      
      // Core scales up and pulses as you scroll
      const baseScale = 1 + scrollVal * 1.5;
      const pulse = Math.sin(time * 2) * 0.05;
      coreRef.current.scale.setScalar(baseScale + pulse);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.1 + scrollVal * Math.PI;
      ring1Ref.current.rotation.y = time * 0.15;
      ring1Ref.current.scale.setScalar(1 + scrollVal * 0.5);
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * -0.12 - scrollVal * Math.PI;
      ring2Ref.current.rotation.z = time * 0.1;
      ring2Ref.current.scale.setScalar(1 + scrollVal * 0.8);
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.08 + scrollVal * Math.PI * 1.5;
      ring3Ref.current.rotation.x = time * -0.05;
      ring3Ref.current.scale.setScalar(1 + scrollVal * 1.2);
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05 + scrollVal * 0.5;
      // Particles expand outward on scroll
      particlesRef.current.scale.setScalar(1 + scrollVal * 2);
    }
  });

  return (
    <group>
      {/* Center Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#c4ff3d"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Orbital Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#f5f5f7" transparent opacity={0.3} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3, 0.015, 16, 100]} />
        <meshBasicMaterial color="#c4ff3d" transparent opacity={0.4} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[4, 0.01, 16, 100]} />
        <meshBasicMaterial color="#f5f5f7" transparent opacity={0.2} />
      </mesh>

      {/* Data Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
            count={500}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ffffff"
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// --- Main Hero Component ---
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fade out text as user scrolls down
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  
  // Fade in 3D model as user scrolls down (starts dim so headline pops)
  const modelOpacity = useTransform(smoothProgress, [0, 0.3], [0.3, 1]);

  return (
    // Tall container to allow for scroll-driven animation
    <section ref={containerRef} id="top" className="relative h-[200vh] w-full bg-[#07070a]">
      
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden grid-bg">
        
        {/* 3D Canvas Background */}
        <motion.div style={{ opacity: modelOpacity }} className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <CyberneticDataCore scrollProgress={smoothProgress} />
              <ambientLight intensity={0.6} />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Radial fade overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#07070a_85%)]" />

        {/* Content Overlay */}
        <motion.div 
          suppressHydrationWarning
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-10"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-lab-accent" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-lab-muted">
              Open Source Technology Lab
            </span>
          </motion.div>

          {/* Headline */}
          {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 2.5, type: "spring", mass: 1, stiffness: 60, damping: 15 }}
            className="font-display text-[14vw] sm:text-[12vw] lg:text-[10rem] xl:text-[12rem] leading-[0.9] tracking-[-0.05em] text-lab-fg"
          >
            ArmanX
            <span className="text-lab-accent">·</span>
            Labs
          </motion.h1>
        </div>

        {/* Sub-headline + actions */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, type: "spring", mass: 1, stiffness: 50, damping: 15 }}
            className="lg:col-span-7 text-lg sm:text-xl text-lab-muted leading-relaxed max-w-2xl text-balance"
          >
            An open-source technology lab building developer tools, AI systems,
            and experimental software. We turn ideas into practical, open
            source projects — starting with{" "}
            <span className="text-lab-fg">RepoMap</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.0, type: "spring", mass: 1, stiffness: 50, damping: 15 }}
            className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end"
          >
            <a
              href="#repomap"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-lab-fg text-lab-bg font-mono text-[12px] tracking-[0.15em] uppercase hover:bg-lab-accent transition-colors"
            >
              Explore RepoMap
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-3 px-6 py-3 border border-white/15 text-lab-fg font-mono text-[12px] tracking-[0.15em] uppercase hover:border-lab-accent hover:text-lab-accent transition-colors"
            >
              Our Mission
            </a>
          </motion.div>
        </div>

          {/* Brand line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-20 flex items-center gap-6"
          >
            <span className="font-display text-2xl sm:text-3xl tracking-tight text-lab-fg">
              Build.
            </span>
            <span className="font-display text-2xl sm:text-3xl tracking-tight text-lab-muted">
              Explore.
            </span>
            <span className="font-display text-2xl sm:text-3xl tracking-tight text-lab-dim">
              Innovate.
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          suppressHydrationWarning
          style={{ opacity: textOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-lab-muted">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-lab-muted/40 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: [-48, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-px h-6 bg-lab-accent"
            />
          </div>
        </motion.div>

        {/* Corner coordinates */}
        <motion.div 
          suppressHydrationWarning
          style={{ opacity: textOpacity }}
          className="absolute top-20 right-6 lg:right-10 z-20 font-mono text-[10px] text-lab-dim text-right hidden sm:block"
        >
          <div>LAT 0.0000</div>
          <div>LON 0.0000</div>
          <div className="mt-1 text-lab-accent">● ACTIVE</div>
        </motion.div>

      </div>
    </section>
  );
}

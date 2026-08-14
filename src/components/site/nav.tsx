"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Focus", href: "#focus" },
  { label: "RepoMap", href: "#repomap" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Join", href: "#join" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#07070a]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo — actual AX mark with pixel trail */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <svg
              viewBox="0 0 160 110"
              className="w-9 h-6 text-lab-fg"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              {/* A */}
              <line x1="20" y1="95" x2="45" y2="20" />
              <line x1="45" y1="20" x2="65" y2="95" />
              <line x1="30" y1="70" x2="55" y2="70" />
              {/* X */}
              <line x1="75" y1="20" x2="115" y2="95" />
              <line x1="75" y1="95" x2="108" y2="32" />
              {/* Pixel trail */}
              <rect x="110" y="28" width="4" height="4" fill="currentColor" stroke="none" />
              <rect x="116" y="22" width="3.5" height="3.5" fill="var(--color-lab-accent)" stroke="none" />
              <rect x="122" y="16" width="3" height="3" fill="currentColor" stroke="none" />
              <rect x="128" y="22" width="2.5" height="2.5" fill="currentColor" stroke="none" />
              <rect x="134" y="12" width="2.5" height="2.5" fill="var(--color-lab-accent)" stroke="none" />
            </svg>
            <span className="font-display text-sm tracking-[0.15em] text-lab-fg">
              ARMANX<span className="text-lab-accent">·</span>LABS
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] tracking-[0.15em] uppercase text-lab-muted hover:text-lab-fg transition-colors link-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#join"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-lab-accent hover:text-lab-accent transition-all font-mono text-[11px] tracking-[0.15em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lab-accent pulse-dot" />
            Get Involved
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-lab-fg p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#07070a] md:hidden flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl tracking-tight text-lab-fg hover:text-lab-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

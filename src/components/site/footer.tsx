"use client";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#07070a] mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {/* Top: logo + brand line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <svg
                viewBox="0 0 160 110"
                className="w-10 h-7 text-lab-fg"
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
              <span className="font-display text-base tracking-[0.15em] text-lab-fg">
                ARMANX<span className="text-lab-accent">·</span>LABS
              </span>
            </div>
            <p className="font-display text-2xl sm:text-3xl tracking-tight text-lab-fg max-w-lg leading-tight text-balance">
              Build. Explore. Innovate.
            </p>
            <p className="mt-4 text-sm text-lab-muted max-w-md">
              Open-source technology lab building developer tools, AI systems,
              and experimental software.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterCol
              title="Lab"
              links={[
                { label: "About", href: "#about" },
                { label: "Focus Areas", href: "#focus" },
                { label: "Philosophy", href: "#philosophy" },
                { label: "Ecosystem", href: "#ecosystem" },
              ]}
            />
            <FooterCol
              title="Projects"
              links={[
                { label: "RepoMap", href: "#repomap" },
                { label: "Future Projects", href: "#ecosystem" },
                { label: "Experimental", href: "#focus" },
              ]}
            />
            <FooterCol
              title="Connect"
              links={[
                { label: "GitHub", href: "https://github.com/ArmanX-Labs" },
                { label: "Telegram", href: "#" },
                { label: "X / Twitter", href: "#" },
                { label: "LinkedIn", href: "#" },
              ]}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-[10px] text-lab-dim uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-lab-accent pulse-dot" />
            <span>System operational · Open source</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} ArmanX-Labs</span>
            <span className="text-lab-dim/60">·</span>
            <span>RepoMap is the beginning, not the identity.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-lab-muted mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-lab-fg/70 hover:text-lab-accent transition-colors link-underline"
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

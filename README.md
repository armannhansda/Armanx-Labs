# ArmanX-Labs

![ArmanX-Labs](https://img.shields.io/badge/Status-Active-success) ![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css)

Welcome to the official repository for **ArmanX-Labs**. 

ArmanX-Labs is a dynamic, modern web platform designed to showcase advanced capabilities in frontend engineering. It features highly interactive 3D elements, sleek micro-animations, and a rich, premium user interface designed to provide an engaging digital experience. 

---

## 🌟 Features

- **Immersive 3D Interfaces**: Utilizes `Three.js` and React Three Fiber to render dynamic graphs and interactive 3D elements directly in the browser.
- **Premium Animations**: Powered by `framer-motion` for buttery smooth page transitions, scroll animations, and interactive hover states.
- **Modern UI/UX**: Designed with a dark mode aesthetic, striking gradients, and a component-driven architecture using Tailwind CSS v4.
- **High Performance**: Built on Next.js with React 19, ensuring optimal server-side rendering, fast load times, and a robust developer experience.
- **RepoMap Integration**: Direct integration and showcasing of RepoMap, an advanced intelligence platform for visualizing complex codebases.

## 💻 Tech Stack

This project is built using a state-of-the-art web development stack:

- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need [Node.js](https://nodejs.org/en/) (v18+) and your preferred package manager (`npm`, `yarn`, `pnpm`, or `bun`) installed.

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/ArmanX-Labs/ArmanX-Labs.git
   cd ArmanX-Labs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or yarn install / pnpm install / bun install
   ```

### Running the Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-reload when you make changes to the code.

---

## 📦 Build & Deployment

To build the application for production deployment, run:

```bash
npm run build
```

This will compile the application and output an optimized production build into the `.next` folder, including a standalone server version. 

To start the production server locally:
```bash
npm run start
```

---

## 📂 Project Structure

```text
ArmanX-Labs/
├── public/                  # Static assets (images, fonts, favicons)
├── src/
│   ├── app/                 # Next.js App Router (pages, layouts, globals.css)
│   ├── components/          # Reusable React components
│   │   ├── site/            # High-level sections (Hero, FocusAreas, RepoMap, Footer)
│   │   └── ui/              # Low-level UI primitives (Buttons, Cards, Inputs)
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utility functions and shared logic
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

---

## 🤝 Community & Support

Join the conversation and keep up with our latest developments:
- **GitHub**: [ArmanX-Labs](https://github.com/ArmanX-Labs)
- **RepoMap**: [Launch RepoMap](https://labs.armanx.online/)

## 📄 License

This project is proprietary and confidential. All rights reserved by ArmanX-Labs.

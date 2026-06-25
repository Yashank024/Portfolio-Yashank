# Yashank Gupta - Interactive Web Portfolio Structure & Architecture

An immersive, high-performance portfolio website built with React 19, WebGL (Lightning Effects), and GSAP.

## Architecture

This project follows a strict feature-based, modular architecture to separate core components, sections, assets, and design system states.

### 📁 Directory Structure

```text
src/
├── app/
│   ├── App.jsx                    ← Main application entry point & lazy-loaded sections
│   ├── routes.jsx                 ← Navigation routing configs
│   └── providers.jsx              ← React Context / Global wrapper
│
├── assets/                        ← Static assets (images, vectors, svg files)
│
├── components/                    ← Reusable UI primitives, layouts, and effects
│   ├── ui/                        ← Base primitives (Button, Card, Badge)
│   ├── layout/                    ← Layout utilities (Navbar, Footer, Container)
│   └── effects/                   ← Special graphics effects (Lightning webgl canvas)
│
├── sections/                      ← Full-screen page sections
│   ├── Hero/                      ← Hero landing assembly
│   ├── About/                     ← About section with animated RAG diagram
│   ├── Experience/                ← Experience section with System Architecture diagram
│   ├── Projects/                  ← Projects section split (AI-Native vs Web)
│   ├── Testimonials/              ← Recommendations slider card showcase
│   ├── Contact/                   ← Contact info & footer
│   └── ToolsMarquee/              ← Infinite scrolling developer tools skill marquee
│
├── data/                          ← Data state layer (single source of truth)
│   ├── experience.js              ← Work experience bullets
│   ├── profile.js                 ← Personal bio & metadata
│   └── projects.js                ← AI_PROJECTS & WEB_PROJECTS lists
│
├── hooks/                         ← Shared custom React hooks (useScrollAnimation, etc.)
│
├── features/                      ← Domain-specific features (API stubs & chatbots)
│
├── lib/                           ← Utility functions, animation timeline scripts, helpers
│
└── styles/                        ← Design system tokens and global stylesheet definitions
    ├── variables.css              ← Design variables (colors, clamp() typography, spacing)
    ├── globals.css                ← Global CSS resets
    ├── animations.css             ← Shared transition keyframes
    └── utilities.css              ← Shared utility classes & card structures
```

## System Rules

1. **Modular Scope**: Keep components modular and scoped. Section-specific styling rules belong in local stylesheets (e.g. `AboutSection.css`, `ExperienceSection.css`) rather than in global utility files to prevent side-effects.
2. **Design Tokens**: All borders, text colors, and background transitions must use CSS Custom Properties defined in `styles/variables.css` rather than raw hex/pixel colors to ensure layout consistency.
3. **Data Segregation**: Hardcoded constants and descriptive content must reside in `/src/data/` modules, ensuring a clear separation of concerns between content layers and rendering components.
4. **Aliasing**: Use Vite path aliases (`@app`, `@assets`, `@components`, `@sections`, `@data`, `@styles`) configured in `vite.config.js` to ensure clean imports.

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** CSS variables (Design Tokens) + TailwindCSS
- **Interactive Effects:** WebGL custom Lightning canvas renderer
- **Animations:** GSAP (ScrollTrigger)
- **Deployment:** Cloudflare Pages / Vercel

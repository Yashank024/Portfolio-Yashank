# Yashank Gupta - Interactive Web Portfolio

An immersive, high-performance portfolio website built with React, Three.js (WebGL), and GSAP.

## Architecture

This project follows a strict feature-based, modular architecture to separate UI from 3D graphics and logic.

### 📁 Directory Structure

```text
src/
├── app/
│   └── App.jsx                    ← Main application entry & lazy-loading router
│
├── core/
│   └── constants/
│       └── data.js                ← Single source of truth for all content (Projects, Skills, etc.)
│
├── graphics/                      ← 🎮 ISOLATED: All WebGL / Three.js code
│   ├── scenes/
│   │   ├── FloatingLines.jsx      
│   │   └── EnergyLinesScene.jsx   
│   ├── primitives/
│   │   └── EnergyLine.jsx         
│   └── styles/                    ← Scoped CSS for graphics
│       └── FloatingLines.css      
│
├── modules/                       ← 🧩 UI COMPONENTS: Feature-based modules
│   ├── hero/
│   │   ├── ui/
│   │   │   ├── Hero.jsx           ← Main Hero assembly
│   │   │   ├── Navbar.jsx         
│   │   │   ├── Character.jsx      
│   │   │   └── Lines.jsx          
│   │   ├── styles/
│   │   │   ├── hero.module.css    
│   │   │   └── responsive.module.css 
│   │   └── index.js               ← Public API export for the module
│   │
│   ├── about/
│   ├── skills/
│   ├── projects/
│   ├── experience/
│   └── contact/
│       └── (Each follows the same ui/, styles/, index.js pattern)
│
└── styles/                        ← 🎨 DESIGN SYSTEM & Global CSS
    ├── tokens/
    │   ├── _colors.css            ← CSS Custom Properties for palettes
    │   ├── _spacing.css           ← 4px grid spacing system
    │   ├── _typography.css        ← Fluid clamp() typography
    │   └── _breakpoints.css       ← Media query variables
    ├── base/
    │   └── reset.css              
    └── responsive/
        ├── mobile.css             
        └── tablet.css             
```

## System Rules

1. **Strict Separation:** Files in `modules/` (React UI) must **never** import directly from `graphics/` (Three.js) except at the top-level `App.jsx` assembly point.
2. **Design Tokens:** All new components must use CSS Custom Properties defined in `styles/tokens/` instead of hardcoded hex codes or pixel values.
3. **Data Layer:** Magic strings and content arrays belong in `core/constants/data.js`, not hardcoded inside React components.
4. **Aliasing:** Use Vite path aliases (`@modules`, `@graphics`, `@styles`, `@core`) to avoid relative import hell (e.g., `../../../`).

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Vanilla CSS (Design Tokens System) + TailwindCSS
- **3D Graphics:** Three.js / WebGL / @react-three/fiber
- **Animations:** GSAP (ScrollTrigger)

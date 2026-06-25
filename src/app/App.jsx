import { useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Providers from './providers';
import Hero from '@sections/Hero/Hero';
import Lightning from '@components/effects/Lightning/Lightning';

// Lazy loaded page sections
const ToolsMarquee      = lazy(() => import('@sections/ToolsMarquee/ToolsMarquee'));
const AboutSection      = lazy(() => import('@sections/About/AboutSection'));
const ProjectsSection   = lazy(() => import('@sections/Projects/ProjectsSection'));
const ExperienceSection = lazy(() => import('@sections/Experience/ExperienceSection'));
const Testimonials      = lazy(() => import('@sections/Testimonials/Testimonials'));
const ContactSection    = lazy(() => import('@sections/Contact/ContactSection'));

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
  const heroRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .to('.webgl-layer', { autoAlpha: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
      .to('.hero-text', {
        autoAlpha: 1, y: 0,
        stagger: { each: 0.1, from: 'start' },
        duration: 0.7,
      }, 0.3);
  }, { scope: heroRef });

  return (
    <Providers>
      <div style={{ width: '100%', background: 'var(--color-bg)' }}>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <div
          ref={heroRef}
          style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
        >
          {/* Hero radial glow optimized for white theme */}
          <div style={{
            position: 'absolute', inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,140,66,0.18) 0%, transparent 65%),' +
              'radial-gradient(ellipse 110% 90% at 50% 50%, #FFFFFF 0%, #FAF9F6 45%, #F4F3EE 75%, #ECEAE2 100%)',
            zIndex: 0,
          }} />

          {/* WebGL Layer - Single Lightning bolt in the horizontal center */}
          <div
            className="webgl-layer"
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              visibility: 'hidden', opacity: 0, pointerEvents: 'none',
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <Lightning hue={22} xOffset={0.0} speed={0.65} intensity={1.1} size={0.8} />
            </div>
          </div>

          {/* Hero Content */}
          <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
            <Hero />
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'absolute', bottom: '28px', left: '50%',
            zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            animation: 'scrollBounce 2s ease-in-out infinite',
          }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(28,21,16,0.35)', textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
            <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(28,21,16,0.35), transparent)' }} />
          </div>

          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
            background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
            zIndex: 11, pointerEvents: 'none',
          }} />
        </div>

        {/* ── ALL SECTIONS ──────────────────────────────────────────── */}
        <Suspense fallback={<div style={{ height: '100px', background: 'var(--color-bg)' }} />}>
          <ToolsMarquee />
          <div className="section-divider" />
          <AboutSection />
          <div className="section-divider" />
          <ProjectsSection />
          <div className="section-divider" />
          <ExperienceSection />
          <div className="section-divider" />
          <Testimonials />
          <div className="section-divider" />
          <ContactSection />
        </Suspense>
      </div>
    </Providers>
  );
}

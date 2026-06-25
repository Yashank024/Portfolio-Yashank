import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import Navbar from '@components/layout/Navbar/Navbar';
import Character from './Character';

const Hero = memo(function Hero() {
  const characterRef = useRef(null);
  const textBgRef    = useRef(null);

  useEffect(() => {
    const el  = characterRef.current;
    const txt = textBgRef.current;
    if (!el || !txt) return;

    const charX = gsap.quickTo(el,  'x', { duration: 1.0, ease: 'power2.out' });
    const charY = gsap.quickTo(el,  'y', { duration: 1.0, ease: 'power2.out' });
    const textX = gsap.quickTo(txt, 'x', { duration: 1.5, ease: 'power1.out' });

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      charX(nx * -12);
      charY(ny * -8);
      textX(nx * 8);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="hero-root">

      {/* ① Navbar */}
      <Navbar />

      {/* ② Main stage */}
      <div className="hero-stage">

        {/* ③ Flex Container for proper mobile flow */}
        <div className="hero-content">
          
          {/* Top: PORTFOLIO text */}
          <div className="hero-text-container" ref={textBgRef}>
            <h1 aria-hidden="true" className="hero-portfolio-blur">PORTFOLIO</h1>
            <div className="hero-text hero-anim-init">
              <h1 className="hero-portfolio-title">PORTFOLIO</h1>
            </div>
          </div>

          {/* Middle: Info text */}
          <div className="hero-info hero-text hero-anim-init">
            <p className="overlay-label">// Yashank Gupta · AI Engineer</p>
            <p className="overlay-title">AI · RAG · Vector DB</p>
            <p className="overlay-sub">Uttar Pradesh, India</p>
          </div>

          {/* Right Desktop Info (Hides on mobile) */}
          <div className="hero-info-right hero-text hero-anim-init">
            <p className="overlay-craft-label">// Engineering</p>
            <p className="overlay-craft-title">Autonomous AI<br />Agents</p>
          </div>

          {/* Bottom: Character */}
          <Character ref={characterRef} />

        </div>

      </div>

    </div>
  );
});

export default Hero;

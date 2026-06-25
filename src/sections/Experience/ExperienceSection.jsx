import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCE_BULLETS as bullets, EXPERIENCE_TECH as techUsed } from '@data/experience';
import './ExperienceSection.css';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = memo(function ExperienceSection() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ex-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { autoAlpha: 0, x: -40 },
          {
            autoAlpha: 1, x: 0, duration: 0.8, delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section">
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-5%', right: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,140,66,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section__inner">

        <p className="ex-reveal section__label">— Work Experience</p>

        <h2 className="ex-reveal section__h2">
          Where I've<br />
          <span className="accent-outline">Worked.</span>
        </h2>

        {/* Timeline */}
        <div className="timeline">
          <div className="timeline__line" />
          <div className="timeline__dot" />

          <div className="ex-reveal exp-card">
            {/* Corner glow */}
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '200px', height: '200px',
              background: 'radial-gradient(circle at top left, rgba(255,140,66,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div className="exp-card__header">
              <div>
                <h3 className="exp-card__role">Web Developer</h3>
                <a
                  href="https://gitzgreen.energy"
                  target="_blank" rel="noreferrer"
                  className="exp-card__company"
                >
                  Gitz Green Energy ↗
                </a>
              </div>
              <span className="exp-card__badge">May 2025 – March 2026</span>
            </div>

            {/* Systems Architecture Flow Diagram */}
            <div className="sys-diagram-container">
              <div className="sys-diagram-header">
                <div className="sys-dot" />
                <span className="sys-diagram-title">System Architecture Flow</span>
              </div>
              <div className="sys-grid">
                {/* Left Column - Client Space */}
                <div className="sys-column sys-client-column">
                  {/* Node: Responsive UI */}
                  <div className="sys-node-box active">
                    <span className="sys-node-icon">💻</span>
                    <span className="sys-node-title">Responsive UI</span>
                    <span className="sys-node-desc">HTML5 · CSS3 · JS</span>
                    {/* Flow: Client UI -> PHP Engine */}
                    <div className="sys-connector-h-right" />
                  </div>

                  {/* Vertical Connection UI <-> Dashboard */}
                  <div className="sys-connector-v" />

                  {/* Node: Admin Dashboard */}
                  <div className="sys-node-box active">
                    <span className="sys-node-icon">📊</span>
                    <span className="sys-node-title">Admin Dashboard</span>
                    <span className="sys-node-desc">Operations Portal</span>
                  </div>
                </div>

                {/* Right Column - Server & DB Space */}
                <div className="sys-column sys-engine-column">
                  {/* 1. Logic Layer */}
                  <div className="sys-layer-box engine-layer">
                    <h4 className="sys-layer-title">Logic Layer</h4>
                    <div className="sys-sub-node">
                      <span className="sys-sub-node-icon">⚙️</span>
                      <span>PHP Engine (Core Workflows)</span>
                    </div>
                    {/* Connector: Logic -> Operations */}
                    <div className="sys-connector-v-center" />
                  </div>

                  {/* 2. Operations Layer */}
                  <div className="sys-layer-box engine-layer">
                    <h4 className="sys-layer-title">Operations</h4>
                    <div className="sys-sub-nodes">
                      <div className="sys-sub-node">
                        <span className="sys-sub-node-icon">📍</span>
                        <span>Geo-Tracking Engine</span>
                        {/* Flow: GPS updates -> Admin Dashboard */}
                        <div className="sys-connector-h-left" />
                      </div>
                      <div className="sys-sub-node">
                        <span className="sys-sub-node-icon">🔌</span>
                        <span>API Gateway</span>
                      </div>
                    </div>
                    {/* Connector: Operations -> DB */}
                    <div className="sys-connector-v-center" />
                  </div>

                  {/* 3. Database Layer */}
                  <div className="sys-layer-box db-layer">
                    <h4 className="sys-layer-title">Data Store</h4>
                    <div className="sys-sub-node">
                      <span className="sys-sub-node-icon">📦</span>
                      <span>MySQL Relational DB (Staff & Location Logs)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="exp-bullets">
              {bullets.map((b, i) => (
                <div key={i} className="exp-bullet">
                  <span className="exp-bullet__icon">{b.icon}</span>
                  <p className="exp-bullet__text">{b.text}</p>
                </div>
              ))}
            </div>

            <div className="exp-tags">
              {techUsed.map((tech, ti) => (
                <span key={ti} className="exp-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

export default ExperienceSection;

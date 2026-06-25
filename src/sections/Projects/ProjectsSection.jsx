import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AI_PROJECTS, WEB_PROJECTS } from '@data/projects';
import './ProjectsSection.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = memo(function ProjectsSection() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pr-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1, y: 0, duration: 0.85, delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section">
      {/* Bottom center glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(255,77,0,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section__inner">

        <p className="pr-reveal section__label">— Selected Projects</p>

        <div className="projects-header">
          <h2 className="pr-reveal section__h2" style={{ margin: 0 }}>
            Things I've<br />
            <span className="accent-outline">Shipped.</span>
          </h2>
          <a
            className="projects-link"
            href="https://github.com/Yashank024"
            target="_blank" rel="noreferrer"
          >
            All on GitHub →
          </a>
        </div>

        {/* AI & Cognitive Systems Category */}
        <h3 className="pr-reveal project-category-title">AI & Cognitive Systems</h3>
        <div className="projects-list-ai">
          {AI_PROJECTS.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank" rel="noreferrer"
              className="pr-reveal project-card--horizontal"
              style={{
                '--proj-color': p.color,
                '--proj-color-faded': `${p.color}15`
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = p.color;
                e.currentTarget.style.boxShadow = `0 20px 45px rgba(28,21,16,0.05), 0 0 40px ${p.color}15`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Left Column - Info Pane */}
              <div className="project-card__info-pane">
                {/* Ghost number */}
                <span className="project-card__ghost-num" style={{ color: `${p.color}08`, right: 'auto', left: '20px' }}>
                  {p.num}
                </span>

                <div className="project-card__top">
                  <span
                    className="project-card__icon"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}28, ${p.color}08)`,
                      border: `1px solid ${p.color}35`,
                    }}
                  >{p.emoji}</span>
                  <div>
                    <h3 className="project-card__title">{p.title}</h3>
                    <p className="project-card__sub" style={{ color: p.color }}>{p.subtitle}</p>
                  </div>
                </div>

                <p className="project-card__desc">{p.description}</p>

                <div className="project-card__tags" style={{ marginBottom: '18px' }}>
                  {p.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="project-card__tag"
                      style={{
                        background: `${p.color}12`,
                        border: `1px solid ${p.color}25`,
                        color: `${p.color}CC`,
                      }}
                    >{tag}</span>
                  ))}
                </div>

                <div className="project-card__cta" style={{ color: p.color }}>
                  <span>View Live</span>
                  <span>↗</span>
                </div>
              </div>

              {/* Right Column - Flowchart Pipeline */}
              <div className="project-pipeline-container">
                <div className="project-pipeline-header">
                  <div className="project-pipeline-dot" />
                  <span className="project-pipeline-title">Project Data Workflow</span>
                </div>
                <div className="proj-pipeline-flow">
                  {p.flow.map((step, si) => (
                    <div key={si} style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className="proj-pipeline-step">
                        <span className="proj-pipeline-icon">{step.icon}</span>
                        <span className="proj-pipeline-label">{step.label}</span>
                      </div>
                      {si < p.flow.length - 1 && (
                        <div className="proj-pipeline-connector">
                          <div className="proj-pulse-dot" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="project-card__bottom-line"
                style={{ background: `linear-gradient(to right, transparent, ${p.color}50, transparent)` }}
              />
            </a>
          ))}
        </div>

        {/* Modern Web & Graphics Category */}
        <h3 className="pr-reveal project-category-title">Modern Web & Graphics</h3>
        <div className="projects-grid">
          {WEB_PROJECTS.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank" rel="noreferrer"
              className="pr-reveal project-card"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${p.color}60`;
                e.currentTarget.style.boxShadow = `0 20px 45px rgba(28,21,16,0.06), 0 0 40px ${p.color}10`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Ghost number */}
              <span className="project-card__ghost-num" style={{ color: `${p.color}08` }}>
                {p.num}
              </span>

              <div className="project-card__top">
                <span
                  className="project-card__icon"
                  style={{
                    background: `linear-gradient(135deg, ${p.color}28, ${p.color}08)`,
                    border: `1px solid ${p.color}35`,
                  }}
                >{p.emoji}</span>
                <div>
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__sub" style={{ color: p.color }}>{p.subtitle}</p>
                </div>
              </div>

              <p className="project-card__desc">{p.description}</p>

              <div className="project-card__tags">
                {p.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="project-card__tag"
                    style={{
                      background: `${p.color}12`,
                      border: `1px solid ${p.color}25`,
                      color: `${p.color}CC`,
                    }}
                  >{tag}</span>
                ))}
              </div>

              <div className="project-card__cta" style={{ color: p.color }}>
                <span>View Live</span>
                <span>↗</span>
              </div>

              <div
                className="project-card__bottom-line"
                style={{ background: `linear-gradient(to right, transparent, ${p.color}50, transparent)` }}
              />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
});

export default ProjectsSection;

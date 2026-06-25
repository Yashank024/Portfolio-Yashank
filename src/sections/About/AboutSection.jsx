import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = memo(function AboutSection() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ab-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1, y: 0, duration: 0.8, delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section">
      {/* Ambient spotlight glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '-15%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,140,66,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="section__inner">
        <p className="ab-reveal section__label">— About Me</p>

        <div className="about-grid">
          {/* LEFT — text details */}
          <div>
            <h2 className="ab-reveal section__h2">
              Engineering The<br />
              <span className="accent-outline">Next Gen Of</span><br />
              AI-Native Software.
            </h2>

            <p className="ab-reveal about-body">
              I am an <span className="highlight-text">AI-Native Developer</span> focused on building intelligent software products that combine modern web architectures with cognitive systems. I specialize in developing applications where AI is not just a feature, but a core architectural layer.
            </p>

            <p className="ab-reveal about-body about-body--mb">
              My expertise spans Generative AI engineering, custom Retrieval-Augmented Generation (RAG) pipelines, semantic vector search integration, OCR ingestion workflows, and interactive frontend systems.
            </p>

            <div className="ab-reveal about-btns">
              <a
                href="#contact"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Hire Me →
              </a>
              <a
                href="https://github.com/Yashank024"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* RIGHT — Interactive RAG Flow Diagram */}
          <div>
            <div className="ab-reveal rag-diagram-card">
              <div className="rag-diagram-header">
                <div className="rag-dot" />
                <span className="rag-diagram-title">RAG Architecture Flow</span>
              </div>
              <div className="rag-grid">
                
                {/* Left Column - User Space */}
                <div className="rag-column rag-user-column">
                  
                  {/* User Node */}
                  <div className="rag-node-box active">
                    <span className="rag-node-icon">👤</span>
                    <span className="rag-node-title">User</span>
                  </div>

                  {/* Vertical Connection: User -> Query */}
                  <div className="rag-connector-v">
                    <div className="pulse-dot-v" />
                  </div>

                  {/* Query Node */}
                  <div className="rag-node-box active">
                    <span className="rag-node-icon">🔍</span>
                    <span className="rag-node-title">Query</span>
                    {/* Horizontal Connection Query -> Retrieval (Embedding) */}
                    <div className="rag-connector-h-right">
                      <div className="pulse-dot-h" />
                    </div>
                  </div>

                  {/* Vertical Connection: Output -> User (Upward Response Flow) */}
                  <div className="rag-connector-v">
                    <div className="pulse-dot-v-up" />
                  </div>

                  {/* Output Node */}
                  <div className="rag-node-box active">
                    <span className="rag-node-icon">📤</span>
                    <span className="rag-node-title">Output</span>
                  </div>

                </div>

                {/* Right Column - Engine Space */}
                <div className="rag-column rag-engine-column">
                  
                  {/* 1. Data Sources Layer */}
                  <div className="rag-layer-box">
                    <h4 className="rag-layer-title">Data Sources</h4>
                    <div className="rag-sources-grid">
                      <div className="rag-source-item">
                        <span className="rag-source-icon">📄</span>
                        <span>Docs</span>
                      </div>
                      <div className="rag-source-item">
                        <span className="rag-source-icon">🖼️</span>
                        <span>Images</span>
                      </div>
                      <div className="rag-source-item">
                        <span className="rag-source-icon">🎥</span>
                        <span>Video</span>
                      </div>
                      <div className="rag-source-item">
                        <span className="rag-source-icon">🎵</span>
                        <span>Audio</span>
                      </div>
                    </div>
                    {/* Connector: Data Sources -> Retrieval (Vector DB) */}
                    <div className="rag-connector-v-center">
                      <div className="pulse-dot-v" />
                    </div>
                  </div>

                  {/* 2. Retrieval Layer */}
                  <div className="rag-layer-box retrieval-layer">
                    <h4 className="rag-layer-title">Retrieval</h4>
                    <div className="rag-sub-nodes">
                      {/* Sub-node: Embedding */}
                      <div className="rag-sub-node">
                        <span className="rag-sub-node-icon">🔗</span>
                        <span>Embedding</span>
                        {/* Sub-horizontal Connector: Embedding -> Vector DB */}
                        <div className="rag-connector-sub-h">
                          <div className="pulse-dot-h" />
                        </div>
                      </div>
                      {/* Sub-node: Vector DB */}
                      <div className="rag-sub-node">
                        <span className="rag-sub-node-icon">📦</span>
                        <span>Vector DB (Chroma)</span>
                      </div>
                    </div>
                    {/* Connector: Vector DB -> Augmented */}
                    <div className="rag-connector-v-center">
                      <div className="pulse-dot-v" />
                    </div>
                  </div>

                  {/* 3. Augmented Layer */}
                  <div className="rag-layer-box augmented-layer">
                    <h4 className="rag-layer-title">Augmented</h4>
                    <div className="rag-sub-node">
                      <span className="rag-sub-node-icon">🧩</span>
                      <span>Retrieved Info + Query + Prompt</span>
                    </div>
                    {/* Connector: Augmented -> Generation */}
                    <div className="rag-connector-v-center">
                      <div className="pulse-dot-v" />
                    </div>
                  </div>

                  {/* 4. Generation Layer */}
                  <div className="rag-layer-box generation-layer">
                    <h4 className="rag-layer-title">Generation (LLM)</h4>
                    <div className="rag-sub-node">
                      <span className="rag-sub-node-icon">🧠</span>
                      <span>Gemini Large Language Model</span>
                      {/* Horizontal Connector Left: LLM -> Output Node */}
                      <div className="rag-connector-h-left">
                        <div className="pulse-dot-h-left" />
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;

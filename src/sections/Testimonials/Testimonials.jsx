import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: "Yashank is an exceptional developer who understands both frontend aesthetics and advanced AI workflows. He delivered Yuva Foods with flawless animations and performance.",
    author: "Project Lead",
    role: "Gitz Green Energy",
    avatar: "🏢"
  },
  {
    quote: "His work on KnowDoc AI showed a rare ability to implement complex RAG systems while keeping the user interface extremely polished and interactive. Highly recommended!",
    author: "Technical Consultant",
    role: "AI Dev Alliance",
    avatar: "🧠"
  }
];

const Testimonials = memo(function Testimonials() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.t-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, duration: 0.8, delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="section">
      <div className="section__inner">
        <p className="t-reveal section__label">— Testimonials</p>
        <h2 className="t-reveal section__h2">
          What People <span className="accent-outline">Say.</span>
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="t-reveal glass-card" style={{ padding: '32px', position: 'relative' }}>
              <p style={{ fontStyle: 'italic', fontSize: '16px', lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '24px' }}>{t.avatar}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '800', fontSize: '14.5px', color: 'var(--color-text)' }}>{t.author}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-dim)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Testimonials;

import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_LINKS as LINKS } from '@data/profile';
import Footer from '@components/layout/Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = memo(function ContactSection() {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ct-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 50 },
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
    <section ref={sectionRef} id="contact" className="section section--center">
      {/* Big ambient glow */}
      <div style={{
        position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(255,77,0,0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="contact__inner">

        <p className="ct-reveal section__label">— Get In Touch</p>

        <h2 className="ct-reveal contact__h2">
          Let's<br />
          <span className="accent-outline--2px">Connect.</span>
        </h2>

        <p className="ct-reveal contact__sub">
          Open to freelance work, internships, and full-time opportunities.
          Let's build something impressive together.
        </p>

        {/* Primary CTA */}
        <div className="ct-reveal contact__cta-wrap">
          <a href="mailto:yg421518@gmail.com" className="btn-cta">
            Send Me an Email ✉️
          </a>
        </div>

        {/* Contact cards */}
        <div className="contact-cards">
          {LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="ct-reveal contact-card"
              style={{ textAlign: 'left' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${link.color}45`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            >
              <span
                className="contact-card__icon"
                style={{ background: `${link.color}18`, border: `1px solid ${link.color}30` }}
              >{link.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div className="contact-card__label">{link.label}</div>
                <div className="contact-card__value" style={{ color: link.color }}>{link.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer layout component */}
        <Footer />

      </div>
    </section>
  );
});

export default ContactSection;

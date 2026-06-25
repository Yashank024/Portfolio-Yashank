import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(selector, triggerStart = 'top 85%') {
  useEffect(() => {
    const elements = gsap.utils.toArray(selector);
    elements.forEach((el, i) => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, [selector, triggerStart]);
}

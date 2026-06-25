import gsap from 'gsap';

export const fadeInUp = (element, delay = 0) => {
  return gsap.fromTo(element,
    { autoAlpha: 0, y: 30 },
    { autoAlpha: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' }
  );
};

export const fadeIn = (element, duration = 0.5) => {
  return gsap.fromTo(element,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration, ease: 'sine.inOut' }
  );
};

// GSAP ScrollTrigger animation helpers — used throughout sections
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Animate element sliding in from the left */
export function slideInFromLeft(
  element: Element | string,
  options?: { delay?: number; duration?: number }
) {
  return gsap.fromTo(
    element,
    { x: -80, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: options?.duration ?? 0.8,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element as Element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/** Animate elements with stagger from below */
export function staggerFadeUp(
  elements: Element[] | string,
  options?: { stagger?: number; delay?: number }
) {
  return gsap.fromTo(
    elements,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: options?.stagger ?? 0.15,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: (elements as Element[])[0] ?? (elements as string),
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/** Animate a skill bar from 0 to a target width */
export function animateSkillBar(element: Element, targetWidth: number) {
  return gsap.fromTo(
    element,
    { width: '0%' },
    {
      width: `${targetWidth}%`,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

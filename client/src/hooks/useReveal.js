import { useEffect } from 'react';

/**
 * useReveal
 * Progressive reveal animations using IntersectionObserver.
 * Repeats animations when elements re-enter viewport unless `once` (global) or `data-once` (per element) is set.
 * Element API:
 *  - class="reveal" (required)
 *  - data-anim="fade" | "scale" (optional variant; default = fade-up)
 *  - data-delay="300" (optional ms delay matching CSS attribute selectors)
 *  - data-once (optional boolean attribute to animate only first time)
 */
export function useReveal({ rootMargin = '0px 0px -10% 0px', threshold = 0.18, once = false } = {}) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    if (!nodes.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      nodes.forEach(n => n.classList.add('reveal-show'));
      return;
    }

    const ACTIVE_CLASSES = ['reveal-show', 'reveal-fade', 'reveal-scale'];

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const perElOnce = el.hasAttribute('data-once');
        const anim = el.getAttribute('data-anim');
        const targetClass = anim ? `reveal-${anim}` : 'reveal-show';

        if (entry.isIntersecting) {
          // If already animated and repeating not allowed, skip
            if (!el.classList.contains(targetClass)) {
              // Remove any residual classes
              ACTIVE_CLASSES.forEach(c => c !== targetClass && el.classList.remove(c));
              // Force reflow so re-adding animation class restarts animation
              void el.offsetWidth; // force reflow to restart animation
              el.classList.add(targetClass);
            }
            if (once || perElOnce) {
              obs.unobserve(el);
            }
        } else {
          // Element left viewport: reset if we are allowed to repeat
          if (!(once || perElOnce)) {
            ACTIVE_CLASSES.forEach(c => el.classList.remove(c));
          }
        }
      });
    }, { root: null, rootMargin, threshold });

    nodes.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [rootMargin, threshold, once]);
}

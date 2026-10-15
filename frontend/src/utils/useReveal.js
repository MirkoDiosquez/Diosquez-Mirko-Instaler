import { useEffect } from "react";

// El contenido empieza visible; el movimiento nunca controla su acceso.
export default function useReveal(page) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Set();
    const seen = new WeakSet();
    let observer;
    const reveal = (element) => {
      if (seen.has(element) || preference.matches) return;
      seen.add(element);
      active.add(element);
      element.classList.add("is-revealing");
      element.addEventListener(
        "animationend",
        () => {
          element.classList.remove("is-revealing");
          active.delete(element);
        },
        { once: true },
      );
    };
    const attach = () => {
      observer?.disconnect();
      if (preference.matches || !window.IntersectionObserver) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) {
              reveal(target);
              observer.unobserve(target);
            }
          });
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(
          ".hero-copy h1, .hero-copy > p, .hero-actions, .hero-caption, .hero-media, .about-photo, .about-grid h2, .about-grid p, .section-heading, .benefits h2, .benefit-grid article, .contact-grid h2, .contact-line, .contact-form, .footer-main > div",
        )
        .forEach((element) => observer.observe(element));
    };
    const cancel = () => {
      active.forEach((element) => element.classList.remove("is-revealing"));
      active.clear();
    };
    const onPreference = () => {
      cancel();
      attach();
    };
    attach();
    preference.addEventListener("change", onPreference);
    return () => {
      observer?.disconnect();
      cancel();
      preference.removeEventListener("change", onPreference);
    };
  }, [page]);
}

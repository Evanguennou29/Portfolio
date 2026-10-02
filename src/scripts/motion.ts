let revealObserver: IntersectionObserver | null = null;

export function initializeMotion() {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".hero-profile, .hero-graphic, .hero-controls, .hero-portrait, .section-intro, .skill-group, .project-disclosure, .case-study, .github-cta, .experience-rail, .experience-main, .education-list article, .contact-section, .case-section, .case-visual, .project-pagination, .flow-bridge",
    ),
  );

  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }

  if (reducedMotion.matches || targets.length === 0) {
    root.removeAttribute("data-motion-enabled");
    targets.forEach((target) => {
      target.setAttribute("data-reveal", "true");
      target.setAttribute("data-revealed", "true");
    });
    return;
  }

  root.setAttribute("data-motion-enabled", "true");

  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
    );
    targets.forEach((target, index) => {
      target.setAttribute("data-reveal", "true");
      target.setAttribute("data-revealed", "false");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
      revealObserver?.observe(target);
    });
  } else {
    targets.forEach((target) => {
      target.setAttribute("data-reveal", "true");
      target.setAttribute("data-revealed", "true");
    });
  }
}

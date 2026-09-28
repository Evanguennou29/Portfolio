let revealObserver: IntersectionObserver | null = null;

export function initializeMotion() {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".hero, .quick-facts, .content-section, .contact-section, .case-section, .case-visual, .project-pagination, .timeline-entry, .project-card",
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
    targets.forEach((target) => {
      target.setAttribute("data-reveal", "true");
      target.setAttribute("data-revealed", "false");
      revealObserver?.observe(target);
    });
  } else {
    targets.forEach((target) => {
      target.setAttribute("data-reveal", "true");
      target.setAttribute("data-revealed", "true");
    });
  }

  document
    .querySelectorAll<HTMLElement>("[data-project-card]")
    .forEach((card) => {
      if (card.dataset.spotlightReady) return;
      card.dataset.spotlightReady = "true";
      card.addEventListener(
        "pointermove",
        (event) => {
          if (event.pointerType === "touch") return;
          const bounds = card.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width) * 100;
          const y = ((event.clientY - bounds.top) / bounds.height) * 100;
          card.style.setProperty("--spot-x", `${x}%`);
          card.style.setProperty("--spot-y", `${y}%`);
        },
        { passive: true },
      );
    });
}

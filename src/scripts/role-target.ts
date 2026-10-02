const storageKey = "portfolio-role";

export function initializeRoleTarget() {
  const switcher = document.querySelector<HTMLElement>("[data-role-switcher]");
  const collection = document.querySelector<HTMLElement>(
    "[data-project-collection]",
  );
  const pitchVisual = document.querySelector<HTMLElement>(
    "[data-pitch-visual]",
  );
  const pitchAccessible = document.querySelector<HTMLElement>(
    "[data-pitch-accessible]",
  );
  const cvDownload =
    document.querySelector<HTMLAnchorElement>("[data-cv-download]");
  if (!switcher) return;

  const buttons = Array.from(
    switcher.querySelectorAll<HTMLButtonElement>("[data-target-role]"),
  );
  const buttonForRole = new Map(
    buttons.map((button) => [button.dataset.roleId ?? "", button]),
  );
  const buttonForQuery = new Map(
    buttons.map((button) => [button.dataset.roleQuery ?? "", button]),
  );
  const projectCards = collection
    ? Array.from(
        collection.querySelectorAll<HTMLElement>("[data-project-card]"),
      )
    : [];

  function readSavedRole() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function writeSavedRole(roleId: string) {
    try {
      window.localStorage.setItem(storageKey, roleId);
    } catch {
      // The selected role still works when storage is unavailable.
    }
  }

  function updatePitch(text: string) {
    if (!pitchVisual || !pitchAccessible) return;
    pitchAccessible.textContent = text;
    pitchVisual.textContent = text;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    pitchVisual.animate(
      [
        { opacity: 0, transform: "translateY(5px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 360, easing: "cubic-bezier(.2,.8,.2,1)" },
    );
  }

  function updateProjects(roleId: string) {
    projectCards.forEach((card) => {
      card.dataset.relevant = String(
        card.dataset.roles?.split(" ").includes(roleId) ?? false,
      );
    });
    document
      .querySelectorAll<HTMLElement>("[data-atlas-node]")
      .forEach((node) => {
        node.dataset.relevant = String(
          node.dataset.roles?.split(" ").includes(roleId) ?? false,
        );
      });
  }

  function updateSkills(roleId: string) {
    document
      .querySelectorAll<HTMLElement>("[data-skill-group]")
      .forEach((group) => {
        const roles = group.dataset.roles?.split(" ").filter(Boolean) ?? [];
        group.dataset.relevant =
          roles.length === 0 ? "neutral" : String(roles.includes(roleId));
      });
  }

  function updateAddress(
    button: HTMLButtonElement,
    historyMode: "push" | "replace",
  ) {
    const url = new URL(window.location.href);
    url.searchParams.set("role", button.dataset.roleQuery ?? "ai");
    window.history[historyMode === "push" ? "pushState" : "replaceState"](
      {},
      "",
      url,
    );
  }

  function selectRole(roleId: string, historyMode: "push" | "replace") {
    const button = buttonForRole.get(roleId);
    if (!button) return;

    buttons.forEach((option) => {
      option.setAttribute("aria-pressed", String(option === button));
    });

    updatePitch(button.dataset.pitch ?? "");
    updateProjects(roleId);
    updateSkills(roleId);

    if (cvDownload) {
      cvDownload.href =
        button.dataset.cvUrl ?? button.dataset.cvFallback ?? cvDownload.href;
    }

    writeSavedRole(roleId);
    updateAddress(button, historyMode);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const roleId = button.dataset.roleId;
      if (roleId) selectRole(roleId, "push");
    });
  });

  window.addEventListener("popstate", () => {
    const roleQuery = new URL(window.location.href).searchParams.get("role");
    const button = roleQuery ? buttonForQuery.get(roleQuery) : null;
    selectRole(
      button?.dataset.roleId ?? buttons[0]?.dataset.roleId ?? "",
      "replace",
    );
  });

  const initialUrl = new URL(window.location.href);
  const queryRole = initialUrl.searchParams.get("role");
  const queryButton = queryRole ? buttonForQuery.get(queryRole) : null;
  const savedRole = readSavedRole();
  const savedButton = savedRole ? buttonForRole.get(savedRole) : null;
  const initialRole =
    queryButton?.dataset.roleId ??
    savedButton?.dataset.roleId ??
    buttons[0]?.dataset.roleId ??
    "";
  selectRole(initialRole, queryButton ? "replace" : "replace");
}

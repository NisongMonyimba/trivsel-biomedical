(() => {
  const body = document.body;
  const nav = document.querySelector("[data-nav]");
  const mobileToggle = document.querySelector("[data-mobile-toggle]");
  const triggers = [...document.querySelectorAll("[data-mega-trigger]")];
  const megas = [...document.querySelectorAll("[data-mega]")];

  const closeMegas = () => {
    triggers.forEach((t) => t.setAttribute("aria-expanded", "false"));
    megas.forEach((m) => m.classList.remove("is-open"));
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const key = trigger.dataset.megaTrigger;
      const target = document.querySelector(`[data-mega="${key}"]`);
      const open = trigger.getAttribute("aria-expanded") === "true";
      closeMegas();
      if (!open && target) {
        trigger.setAttribute("aria-expanded", "true");
        target.classList.add("is-open");
      }
    });
  });

  mobileToggle?.addEventListener("click", () => {
    const open = mobileToggle.getAttribute("aria-expanded") === "true";
    mobileToggle.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("is-mobile-open", !open);
    body.classList.toggle("tv-menu-open", !open);
    closeMegas();
  });

  const searchToggle = document.querySelector("[data-search-toggle]");
  const search = document.querySelector("[data-search]");
  const searchClose = document.querySelector("[data-search-close]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchItems = [...document.querySelectorAll("[data-search-item]")];

  const closeSearch = () => {
    if (!search || !searchToggle) return;
    search.hidden = true;
    searchToggle.setAttribute("aria-expanded", "false");
  };

  searchToggle?.addEventListener("click", () => {
    const open = searchToggle.getAttribute("aria-expanded") === "true";
    closeMegas();
    if (open) closeSearch();
    else {
      search.hidden = false;
      searchToggle.setAttribute("aria-expanded", "true");
      setTimeout(() => searchInput?.focus(), 0);
    }
  });

  searchClose?.addEventListener("click", closeSearch);

  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    searchItems.forEach((item) => {
      const haystack = `${item.textContent} ${item.dataset.terms || ""}`.toLowerCase();
      item.hidden = Boolean(query && !haystack.includes(query));
    });
  });

  const pathwayInput = document.querySelector("[data-pathway-search]");
  const pathways = [...document.querySelectorAll("[data-pathway]")];

  pathwayInput?.addEventListener("input", () => {
    const query = pathwayInput.value.trim().toLowerCase();
    pathways.forEach((item) => {
      const haystack = `${item.textContent} ${item.dataset.pathway || ""}`.toLowerCase();
      item.hidden = Boolean(query && !haystack.includes(query));
    });
  });


  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const observedSections = [
    ...document.querySelectorAll(".tv-section, .tv-band, .tv-industry, .tv-research"),
  ];

  if (!reducedMotion && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-in-view", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observedSections.forEach((section) => sectionObserver.observe(section));
  } else {
    observedSections.forEach((section) => section.setAttribute("data-in-view", "true"));
  }

  document.addEventListener("click", (event) => {
    const header = document.querySelector("[data-header]");
    if (header && !header.contains(event.target)) closeMegas();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeMegas();
    closeSearch();
    nav?.classList.remove("is-mobile-open");
    mobileToggle?.setAttribute("aria-expanded", "false");
    body.classList.remove("tv-menu-open");
  });
})();

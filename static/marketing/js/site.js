(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const searchPanel = document.querySelector("[data-search-panel]");
  const searchOpen = document.querySelector("[data-search-open]");
  const searchClose = document.querySelector("[data-search-close]");
  const searchInput = document.querySelector("[data-site-search]");
  const results = document.querySelector("[data-search-results]");

  const index = [
    ["Platform", "/platform", "asset identity maintenance calibration faults readiness lifecycle"],
    ["Industries", "/industries", "healthcare manufacturing laboratories facilities infrastructure ports hospitality"],
    ["Intelligence", "/intelligence", "asset graph operational intelligence readiness human machine responsible ai"],
    ["Research", "/research", "asset intelligence reliability healthcare engineering applied ai measurement evidence"],
    ["Company", "/company", "mission principles people Trivsel Ltd"],
    ["Careers", "/careers", "software engineering design reliability quality security research"],
    ["Contact", "/contact", "pilot product support research contact"],
    ["Open Trivsel", "https://trivsel.uk/", "application product sign in"]
  ];

  const render = (value = "") => {
    if (!results) return;
    const q = value.trim().toLowerCase();
    const rows = index.filter(([title, , terms]) =>
      !q || title.toLowerCase().includes(q) || terms.includes(q)
    );
    results.innerHTML = rows.map(([title, href]) =>
      `<a class="tv-search-result" href="${href}">${title}</a>`
    ).join("");
  };

  const openSearch = () => {
    if (!searchPanel) return;
    searchPanel.hidden = false;
    render("");
    requestAnimationFrame(() => searchInput?.focus());
  };
  const closeSearch = () => {
    if (!searchPanel) return;
    searchPanel.hidden = true;
    searchOpen?.focus();
  };

  searchOpen?.addEventListener("click", openSearch);
  searchClose?.addEventListener("click", closeSearch);
  searchInput?.addEventListener("input", (event) => render(event.target.value));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchPanel && !searchPanel.hidden) closeSearch();
  });
})();

// Progressive enhancement: restrained section reveals.
// Content remains usable without JavaScript.
(() => {
  if (!("IntersectionObserver" in window)) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const sections = document.querySelectorAll(
    ".tv-feature-card, .tv-industry-card, .tv-module-grid article, .tv-role-grid article"
  );

  sections.forEach((element) => element.classList.add("tv-reveal"));

  const observer = new IntersectionObserver(
    (entries, instance) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      }
    },
    { threshold: 0.08 }
  );

  sections.forEach((element) => observer.observe(element));
})();


// ============================================================================
// APPROVED TRIVSEL GLOBAL HEADER DROPDOWNS
// ============================================================================

(() => {
  const groups = [...document.querySelectorAll(".tv-nav-group")];

  const closeAll = (except = null) => {
    for (const group of groups) {
      if (group === except) continue;

      group.classList.remove("is-open");

      const trigger = group.querySelector("[data-dropdown-trigger]");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    }
  };

  for (const group of groups) {
    const trigger = group.querySelector("[data-dropdown-trigger]");
    const dropdown = group.querySelector("[data-dropdown]");

    if (!trigger || !dropdown) continue;

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();

      const opening = !group.classList.contains("is-open");

      closeAll(group);

      group.classList.toggle("is-open", opening);
      trigger.setAttribute("aria-expanded", String(opening));
    });

    group.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      group.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    });
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".tv-nav-group")) return;
    closeAll();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1180) {
      closeAll();
    }
  });
})();

(() => {
  "use strict";
  const box = document.querySelector("#knowledge-search");
  if (!box) return;
  const groups = [...document.querySelectorAll("[data-library-group]")];
  const count = document.querySelector("#knowledge-count");
  box.addEventListener("input", () => {
    const terms = box.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    groups.forEach(group => {
      let groupCount = 0;
      group.querySelectorAll("[data-guide]").forEach(guide => {
        const text = guide.textContent.toLowerCase();
        const match = terms.every(term => text.includes(term));
        guide.hidden = !match;
        if (match) groupCount += 1;
      });
      group.hidden = groupCount === 0;
      visible += groupCount;
    });
    count.textContent = `${visible} matching guide drafts`;
  });
})();

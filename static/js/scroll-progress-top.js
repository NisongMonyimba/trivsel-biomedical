(() => {
  "use strict";

  const KEY = "__trivselScrollProgressTop";
  if (window.__trivselScrollProgressBootstrapped) return;
  window.__trivselScrollProgressBootstrapped = true;
  const SIZE = 48;
  const GAP = 20;
  const STEP = 68;
  const CLUSTER_GAP = 10;
  const BOTTOM_TOLERANCE = 5;
  const CIRCUMFERENCE = 2 * Math.PI * 21;
  const PASSIVE = { passive: true };

  function install() {
    const button = document.querySelector("[data-trivsel-scroll-top]");
    const downCandidate = document.querySelector("[data-trivsel-scroll-down]");
    const downButton = downCandidate && downCandidate.querySelector &&
      downCandidate.classList ? downCandidate : null;
    if (!button) return;
    if (window[KEY] && window[KEY].button === button &&
        window[KEY].downButton === downButton) {
      window[KEY].layout();
      return;
    }
    if (window[KEY]) window[KEY].destroy();

    const ring = button.querySelector(".trivsel-scroll-top__progress");
    const downRing = downButton && downButton.querySelector(".trivsel-scroll-down__progress");
    if (!ring || (downButton && !downRing)) return;
    const main = document.querySelector("[data-trivsel-main]") || document.querySelector("main");
    let surface = null;
    let frame = 0;
    let layoutFrame = 0;
    let scrollTimer = 0;
    let observer = null;
    let bodyObserver = null;
    let media = null;
    let position = null;
    let downPosition = null;
    let downAlongside = null;
    let pairedPosition = null;

    // A main content viewport can scroll independently on desktop. Sidebar menus
    // and nested panels are never considered primary scroll surfaces.
    function chooseSurface() {
      const candidates = Array.from(document.querySelectorAll(
        ".app-sidebar-content, [data-trivsel-scroll-container]"
      ));
      if (main && !candidates.includes(main)) candidates.push(main);
      for (const element of candidates) {
        if (!main || !(element.contains(main) || main.contains(element))) continue;
        if (element.closest("[role='menu'], [role='dialog'], [class*='dropdown'], [class*='popover']")) continue;
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const overflow = style.overflowY;
        if (!/^(auto|scroll)$/.test(overflow) || rect.width < window.innerWidth * .4 ||
            rect.height < window.innerHeight * .4 || element.clientHeight < 1) continue;
        if (element.scrollHeight - element.clientHeight > 1) return element;
      }
      return document.scrollingElement || document.documentElement;
    }

    function metrics() {
      const scroller = surface || document.scrollingElement || document.documentElement;
      const maxScroll = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      const scrollTop = Math.max(0, scroller.scrollTop);
      return { maxScroll, scrollTop, progress: Math.min(1, Math.max(0,
        maxScroll ? scrollTop / maxScroll : 0)) };
    }

    function setVisible(control, visible) {
      if (control.classList.contains("is-visible") === visible) return;
      control.classList.toggle("is-visible", visible);
      control.setAttribute("aria-hidden", String(!visible));
      control.tabIndex = visible ? 0 : -1;
      if (!visible && document.activeElement === control) control.blur();
    }

    function paint() {
      frame = 0;
      const state = metrics();
      ring.style.strokeDasharray = String(CIRCUMFERENCE);
      ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - state.progress));
      if (downRing) {
        downRing.style.strokeDasharray = String(CIRCUMFERENCE);
        downRing.style.strokeDashoffset = String(CIRCUMFERENCE * state.progress);
      }
      const available = !document.body.classList.contains("sidebar-mobile-open");
      const wantsUp = available && state.maxScroll >= 300 && state.scrollTop >= 250;
      const wantsDown = available && state.maxScroll - state.scrollTop > BOTTOM_TOLERANCE;
      const upPlace = wantsUp && wantsDown && pairedPosition ? pairedPosition.up : position;
      const downPlace = wantsUp && wantsDown && pairedPosition ? pairedPosition.down :
        wantsUp ? downAlongside : downPosition;
      if (upPlace) {
        button.style.setProperty("--trivsel-scroll-left", `${upPlace.x}px`);
        button.style.setProperty("--trivsel-scroll-top", `${upPlace.y}px`);
      }
      if (downPlace && downButton) {
        downButton.style.setProperty("--trivsel-scroll-down-left", `${downPlace.x}px`);
        downButton.style.setProperty("--trivsel-scroll-down-top", `${downPlace.y}px`);
      }
      setVisible(button, wantsUp && upPlace !== null);
      if (downButton) setVisible(downButton, wantsDown && downPlace !== null);
    }

    function schedulePaint() {
      if (!frame) frame = window.requestAnimationFrame(paint);
    }

    function viewport() {
      const visual = window.visualViewport;
      return visual ? {
        left: visual.offsetLeft,
        top: visual.offsetTop,
        right: visual.offsetLeft + visual.width,
        bottom: visual.offsetTop + visual.height
      } : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };
    }

    function intersects(a, b, padding = 0) {
      return a.left < b.right + padding && a.right > b.left - padding &&
        a.top < b.bottom + padding && a.bottom > b.top - padding;
    }

    function layout() {
      if (layoutFrame) return;
      layoutFrame = window.requestAnimationFrame(() => {
        layoutFrame = 0;
        const next = chooseSurface();
        if (surface !== next) {
          if (observer && surface && surface !== main && surface !== document.body) {
            observer.unobserve(surface);
          }
          if (surface && surface !== document.scrollingElement &&
              surface !== document.documentElement) surface.removeEventListener("scroll", onScroll);
          surface = next;
          if (surface !== document.scrollingElement && surface !== document.documentElement) {
            surface.addEventListener("scroll", onScroll, PASSIVE);
          }
          if (observer) observer.observe(surface);
        }

        const view = viewport();
        const content = surface === document.scrollingElement ||
          surface === document.documentElement ?
          (main ? main.getBoundingClientRect() : view) : surface.getBoundingClientRect();
        const left = Math.max(view.left, content.left);
        const right = Math.min(view.right, content.right);
        const top = Math.max(view.top, content.top);
        const bottom = Math.min(view.bottom, content.bottom);
        const blockers = [];
        const selectors = [
          "a", "button", "input", "select", "textarea", "[role='button']",
          "[role='menu']", "[role='dialog']", "dialog[open]", "[aria-modal='true']",
          "[class*='cookie']", "[class*='chat']", "[class*='toast']",
          "[class*='floating']", "[class*='sticky']", "[class*='toolbar']",
          "[class*='bottom-bar']", "[class*='modal']", "[class*='popover']",
          "[class*='dropdown']"
        ];
        let overlay = document.body.classList.contains("sidebar-mobile-open");
        for (const element of document.querySelectorAll(selectors.join(","))) {
          if (element === button || element === downButton || button.contains(element) ||
              (downButton && downButton.contains(element)) ||
              element.closest("[data-trivsel-scroll-top], [data-trivsel-scroll-down]")) continue;
          const style = window.getComputedStyle(element);
          if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") continue;
          const rect = element.getBoundingClientRect();
          if (!rect.width || !rect.height || !intersects(rect, view)) continue;
          if (element.matches("[role='dialog'], [aria-modal='true'], dialog[open], .modal.show, .modal.is-open")) {
            overlay = true;
          }
          const fixed = style.position === "fixed" || style.position === "sticky";
          const popup = element.matches("[role='menu'], [class*='popover'], [class*='dropdown'], [class*='toast'], [class*='cookie'], [class*='chat']");
          const interactive = element.matches("a, button, input, select, textarea, [role='button']");
          if (fixed || popup || interactive) blockers.push(rect);
        }

        position = null;
        downPosition = null;
        downAlongside = null;
        pairedPosition = null;
        const downSize = window.innerWidth <= 600 ? 44 : SIZE;
        if (!overlay && right - left >= SIZE + 2 * GAP && bottom - top >= SIZE + 2 * GAP) {
          const candidates = [];
          for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 3; column++) {
              candidates.push({ x: right - GAP - SIZE - column * STEP,
                y: bottom - GAP - SIZE - row * STEP });
            }
          }
          const rectangle = (candidate, size) => ({ left: candidate.x,
            right: candidate.x + size, top: candidate.y, bottom: candidate.y + size });
          const safe = (candidate, size) => {
            const rect = rectangle(candidate, size);
            return rect.left >= left + GAP && rect.top >= top + GAP &&
              rect.right <= right - GAP && rect.bottom <= bottom - GAP &&
              !blockers.some((blocker) => intersects(rect, blocker, 6));
          };
          position = candidates.find((candidate) => safe(candidate, SIZE)) || null;
          downPosition = candidates.find((candidate) => safe(candidate, downSize)) || null;
          downAlongside = candidates.find((candidate) => safe(candidate, downSize) &&
            (!position || !intersects(rectangle(candidate, downSize), rectangle(position, SIZE), 6))) || null;
          for (const up of candidates) {
            const down = { x: up.x + (SIZE - downSize) / 2,
              y: up.y - CLUSTER_GAP - downSize };
            if (downButton && safe(up, SIZE) && safe(down, downSize)) {
              pairedPosition = { up, down };
              break;
            }
          }
        }
        schedulePaint();
      });
    }

    function onScroll() {
      schedulePaint();
      // Sticky controls may change position while the primary content moves.
      // Recheck their rectangles after a short pause, outside the scroll hot path.
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(layout, 160);
    }

    function onClick() {
      if (!surface) return;
      const reduce = media && media.matches;
      const behavior = reduce ? "auto" : "smooth";
      if (surface === document.scrollingElement || surface === document.documentElement) {
        window.scrollTo({ top: 0, behavior });
      } else {
        surface.scrollTo({ top: 0, behavior });
      }
      schedulePaint();
    }

    function onDownClick() {
      if (!surface) return;
      const state = metrics();
      if (state.maxScroll - state.scrollTop <= BOTTOM_TOLERANCE) return;
      const target = Math.min(state.maxScroll, state.scrollTop + surface.clientHeight * .75);
      const behavior = media && media.matches ? "auto" : "smooth";
      if (surface === document.scrollingElement || surface === document.documentElement) {
        window.scrollTo({ top: target, behavior });
      } else {
        surface.scrollTo({ top: target, behavior });
      }
      schedulePaint();
    }

    button.addEventListener("click", onClick);
    if (downButton) downButton.addEventListener("click", onDownClick);
    document.addEventListener("click", layout);
    document.addEventListener("focusin", layout);
    document.addEventListener("toggle", layout, true);
    window.addEventListener("scroll", onScroll, PASSIVE);
    window.addEventListener("resize", layout, PASSIVE);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", layout, PASSIVE);
      window.visualViewport.addEventListener("scroll", layout, PASSIVE);
    }
    if (window.ResizeObserver) {
      observer = new ResizeObserver(layout);
      if (main) observer.observe(main);
      observer.observe(document.body);
    }
    if (window.MutationObserver) {
      bodyObserver = new MutationObserver(layout);
      bodyObserver.observe(document.body, {
        childList: true, attributes: true, attributeFilter: ["class"]
      });
    }
    if (window.matchMedia) media = window.matchMedia("(prefers-reduced-motion: reduce)");
    layout();

    window[KEY] = { button, downButton, layout, destroy() {
      button.removeEventListener("click", onClick);
      if (downButton) downButton.removeEventListener("click", onDownClick);
      document.removeEventListener("click", layout);
      document.removeEventListener("focusin", layout);
      document.removeEventListener("toggle", layout, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", layout);
        window.visualViewport.removeEventListener("scroll", layout);
      }
      if (surface && surface !== document.scrollingElement &&
          surface !== document.documentElement) surface.removeEventListener("scroll", onScroll);
      if (observer) observer.disconnect();
      if (bodyObserver) bodyObserver.disconnect();
      window.clearTimeout(scrollTimer);
      if (frame) window.cancelAnimationFrame(frame);
      if (layoutFrame) window.cancelAnimationFrame(layoutFrame);
      if (window[KEY] && window[KEY].button === button) window[KEY] = null;
    } };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
  window.addEventListener("pageshow", install);
  document.addEventListener("turbo:load", install);
  window.addEventListener("popstate", install);
  window.addEventListener("pagehide", () => {
    if (window[KEY]) window[KEY].destroy();
  });
})();

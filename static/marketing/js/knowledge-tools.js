(() => {
  "use strict";
  function calculate(op, v) {
    if (!Array.isArray(v) || v.length !== (op === "cost" ? 5 : 2)) return null;
    if (v.some(x => typeof x !== "number" || !Number.isFinite(x))) return null;
    let result = null;
    if (op === "signed-difference") result = v[0] - v[1];
    else {
      if (v.some(x => x < 0)) return null;
      if (op === "divide") result = v[1] > 0 ? v[0] / v[1] : null;
      else if (op === "divide-count") result = Number.isInteger(v[1]) && v[1] > 0 ? v[0] / v[1] : null;
      else if (op === "rate-count") result = Number.isInteger(v[0]) && v[1] > 0 ? v[0] / v[1] : null;
      else if (op === "cost") result = v[0] + v[1] + v[2] + v[3] - v[4];
      else {
        if (v[1] > v[0]) return null;
        if (op === "difference") result = v[0] - v[1];
        else if (v[0] > 0 && op === "ratio") result = 100 * (v[1] / v[0]);
        else if (v[0] > 0 && op === "ratio-count" && v.every(Number.isInteger)) result = 100 * (v[1] / v[0]);
        else if (v[0] > 0 && op === "ratio-complement") result = 100 * ((v[0] - v[1]) / v[0]);
      }
    }
    return Number.isFinite(result) ? result : null;
  }
  if (typeof module !== "undefined") module.exports = calculate;
  if (typeof document === "undefined") return;
  document.querySelectorAll("[data-tv-calc]").forEach(block => {
    block.querySelector("[data-calculate]").addEventListener("click", () => {
      const inputs = [...block.querySelectorAll("input")];
      const values = inputs.map(input => input.value.trim() === "" ? NaN : Number(input.value));
      const result = calculate(block.dataset.tvCalc, values);
      block.querySelector("[data-result]").textContent = result === null || !Number.isFinite(result)
        ? "Invalid or insufficient values. Check the stated formula and input constraints."
        : `${Number(result.toPrecision(8))} ${block.dataset.units}`;
    });
  });
})();

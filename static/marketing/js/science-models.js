/* Educational models; no network or persistent storage. */
(function () {
  "use strict";
  const specs = {"stochastic-readiness": [[0.0001, 10], [0.0001, 10], [0.001, 10000]], "harmonic-oscillator": [[0, 100], [0.001, 10], [0.001, 100]], "diffusion": [[1e-06, 10], [0.001, 100], [0.001, 10000]], "rc-circuit": [[1, 1000000], [0.001, 1000000], [1e-06, 10000]], "repair-queue": [[0, 100], [0.001, 100]], "markov-monte-carlo": [[0.0001, 10], [0.0001, 10], [0.001, 10000], [1, 2000], [1, 2147483647]], "diffusion-numerical": [[1e-06, 10], [0.001, 100], [0.001, 10000]]};
  function model(kind, values) {
    const limits = specs[kind];
    if (!limits || !Array.isArray(values) || values.length !== limits.length ||
        !values.every((v, i) => typeof v === "number" && Number.isFinite(v) && v >= limits[i][0] && v <= limits[i][1])) return null;
    const [a,b,c,n,seed] = values;
    if (kind === "markov-monte-carlo") {
      if (!Number.isInteger(n) || !Number.isInteger(seed)) return null;
      let state = seed >>> 0;
      const random = () => { state = (Math.imul(1664525,state)+1013904223)>>>0; return state/4294967296; };
      const up = new Uint8Array(n).fill(1);
      const q = -Math.expm1(-(a+b)*c/200);
      const downProb=a/(a+b)*q, upProb=b/(a+b)*q;
      const points=[[0,1]];
      for (let i=1;i<=200;i++) {
        let count=0;
        for (let j=0;j<n;j++) {
          const u=random();
          up[j]=up[j] ? Number(u>=downProb) : Number(u<upProb);
          count+=up[j];
        }
        points.push([c*i/200,count/n]);
      }
      return points;
    }
    if (kind === "diffusion-numerical") {
      const ratio=a*(c/1000)/(b/20)**2;
      if (!Number.isFinite(ratio) || ratio>0.5) return null;
      let u=Array.from({length:21},(_,j)=>j===0||j===20?0:Math.sin(Math.PI*j/20));
      const points=[[0,u[10]]];
      for (let i=1;i<=1000;i++) {
        const next=new Array(21).fill(0);
        for (let j=1;j<20;j++) next[j]=u[j]+ratio*(u[j-1]-2*u[j]+u[j+1]);
        u=next;
        if (i%5===0) points.push([c*i/1000,u[10]]);
      }
      return points;
    }
    if (kind === "repair-queue" && a >= b) return null;
    const rows = [];
    for (let i=0; i<=200; i++) {
      const t = (kind === "repair-queue" ? a : c)*i/200;
      let y;
      switch (kind) {
        case "stochastic-readiness": y = b/(a+b) + a/(a+b)*Math.exp(-(a+b)*t); break;
        case "harmonic-oscillator": y = a*Math.cos(2*Math.PI*b*t); break;
        case "diffusion": y = Math.exp(-a*(Math.PI/b)**2*t); break;
        case "rc-circuit": y = -Math.expm1(-t/(a*b*1e-6)); break;
        case "repair-queue": y = 1/(b-t); break;
        default: return null;
      }
      if (!Number.isFinite(y)) return null;
      rows.push([t,y]);
    }
    return rows;
  }
  if (typeof module !== "undefined" && module.exports) module.exports = model;
  if (typeof document === "undefined") return;
  document.querySelectorAll("[data-science-model]").forEach(box => {
    const status = box.querySelector("[data-model-status]");
    const table = box.querySelector("[data-model-rows]");
    const plot = box.querySelector("[data-model-plot]");
    const ctx = plot.getContext("2d");
    function draw(rows, lo, hi) {
      if (!ctx) return;
      ctx.clearRect(0, 0, plot.width, plot.height);
      if (!rows) return;
      ctx.strokeStyle = getComputedStyle(box).color;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(28, 10); ctx.lineTo(28, 155); ctx.lineTo(310, 155); ctx.stroke();
      ctx.strokeStyle = "#2465AC"; ctx.lineWidth = 2; ctx.beginPath();
      rows.forEach((r, i) => {
        const x = 28 + 282 * i / (rows.length - 1);
        const y = hi === lo ? 82 : 155 - 145 * (r[1] - lo) / (hi - lo);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
    box.querySelector("[data-run-model]").addEventListener("click", () => {
      const fields = [...box.querySelectorAll("input")];
      const rows = fields.every(f => f.value.trim() !== "" && f.validity.valid) ? model(box.dataset.scienceModel, fields.map(f => Number(f.value))) : null;
      table.replaceChildren(); draw(null);
      if (!rows) { status.textContent = "Invalid or unstable model inputs. Check the limits and assumptions."; return; }
      const ys = rows.map(row => row[1]);
      const lo = Math.min(...ys), hi = Math.max(...ys);
      const fmt = v => Number(v.toPrecision(6)).toString();
      status.textContent = "201 samples; final value " + fmt(ys.at(-1)) + "; sampled range " + fmt(lo) + " to " + fmt(hi) + ".";
      draw(rows, lo, hi);
      rows.filter((_,i)=>i%10===0).forEach(row => {
        const tr=document.createElement("tr"); row.forEach(v=>{const td=document.createElement("td");td.textContent=fmt(v);tr.append(td);});table.append(tr);
      });
    });
  });
})();

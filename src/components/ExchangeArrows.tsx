"use client";

import { useEffect, useRef, useState } from "react";

// Draws curved arrows from each university seal ([data-seal]) to its city pin
// ([data-pin]) inside the parent element. Positions are measured from the DOM so
// they follow the responsive layout, the card's tilt and its hover lift.
const LINKS = [
  { seal: "upv", pin: "valencia" },
  { seal: "dtu", pin: "copenhagen" },
] as const;

type Arrow = { key: string; d: string };

export default function ExchangeArrows() {
  const ref = useRef<SVGSVGElement>(null);
  const [arrows, setArrows] = useState<Arrow[]>([]);

  useEffect(() => {
    const svg = ref.current;
    const host = svg?.parentElement;
    if (!svg || !host) return;

    const measure = () => {
      const box = host.getBoundingClientRect();
      // The layout may apply CSS zoom to <html>; convert measured px back to this SVG's CSS px.
      const k = host.offsetWidth ? box.width / host.offsetWidth : 1;
      const next: Arrow[] = [];
      for (const { seal, pin } of LINKS) {
        const s = host.querySelector(`[data-seal="${seal}"]`)?.getBoundingClientRect();
        const p = host.querySelector(`[data-pin="${pin}"]`)?.getBoundingClientRect();
        if (!s || !p || !s.width || !p.width) continue;
        const sx = (s.left + s.width / 2 - box.left) / k;
        const sy = (s.top + s.height / 2 - box.top) / k;
        const px = (p.left + p.width / 2 - box.left) / k;
        const py = (p.top + p.height / 2 - box.top) / k;
        const dx = px - sx;
        const dy = py - sy;
        const len = Math.hypot(dx, dy);
        if (len < 60) continue;
        const ux = dx / len;
        const uy = dy / len;
        // Leave the seal edge and stop short of the pin.
        const r = s.width / k / 2 + 6;
        const ax = sx + ux * r;
        const ay = sy + uy * r;
        const bx = px - ux * 12;
        const by = py - uy * 12;
        // Gentle bow: push the control point along the perpendicular that points up.
        const bow = Math.min(40, len * 0.18);
        const [nx, ny] = ux >= 0 ? [uy, -ux] : [-uy, ux];
        const cx = (ax + bx) / 2 + nx * bow;
        const cy = (ay + by) / 2 + ny * bow;
        next.push({ key: seal, d: `M${ax.toFixed(1)} ${ay.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}` });
      }
      setArrows(next);
    };

    // Follow entry animations and hover transitions frame by frame for a moment.
    let raf = 0;
    let until = 0;
    const tick = () => {
      measure();
      raf = performance.now() < until ? requestAnimationFrame(tick) : 0;
    };
    const follow = (ms = 700) => {
      until = Math.max(until, performance.now() + ms);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    follow(1200);
    const ro = new ResizeObserver(() => follow(100));
    ro.observe(host);
    const onRun = () => follow();
    const onEnd = () => follow(50);
    host.addEventListener("transitionrun", onRun);
    host.addEventListener("transitionend", onEnd);
    host.addEventListener("animationend", onEnd);
    document.fonts?.ready.then(() => follow(100));

    return () => {
      ro.disconnect();
      host.removeEventListener("transitionrun", onRun);
      host.removeEventListener("transitionend", onEnd);
      host.removeEventListener("animationend", onEnd);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible md:block">
      <defs>
        <marker id="seal-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--color-cream)" />
        </marker>
      </defs>
      {arrows.map((a) => (
        <path
          key={a.key}
          d={a.d}
          fill="none"
          stroke="var(--color-cream)"
          strokeWidth="1.8"
          strokeDasharray="5 5"
          strokeLinecap="round"
          markerEnd="url(#seal-arrow)"
        />
      ))}
    </svg>
  );
}

import { DENMARK, LAND, LYNGBY, MAP_H, MAP_W, SPAIN, VALENCIA } from "@/lib/europeMap";

type Props = { from: string; to: string; label: string; className?: string };

// White line map drawn straight on the red panel. The pins carry data-pin so
// ExchangeArrows can aim the seal arrows at them.
export default function ExchangeMap({ from, to, label, className }: Props) {
  const [vx, vy] = VALENCIA;
  const [lx, ly] = LYNGBY;
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label={label} className={className}>
      <defs>
        {/* Coastlines are clamped at the frame edge; clip them and fade the borders out. */}
        <radialGradient id="map-fade" cx="50%" cy="50%" r="62%">
          <stop offset="78%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id="map-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={MAP_W} height={MAP_H}>
          <rect width={MAP_W} height={MAP_H} fill="url(#map-fade)" />
        </mask>
      </defs>
      <g mask="url(#map-mask)">
      <path d={LAND} fill="none" stroke="var(--color-cream)" strokeOpacity="0.55" strokeWidth="0.7" strokeLinejoin="round" />
      <path d={SPAIN} fill="var(--color-cream)" fillOpacity="0.14" stroke="var(--color-cream)" strokeWidth="1" strokeLinejoin="round" />
      <path d={DENMARK} fill="var(--color-cream)" fillOpacity="0.14" stroke="var(--color-cream)" strokeWidth="1" strokeLinejoin="round" />
      </g>

      {[
        { key: "valencia", x: vx, y: vy },
        { key: "copenhagen", x: lx, y: ly },
      ].map((p) => (
        <g key={p.key}>
          <circle cx={p.x} cy={p.y} r="8" fill="var(--color-cream)" opacity="0.25" />
          <circle data-pin={p.key} cx={p.x} cy={p.y} r="4" fill="var(--color-cream)" />
        </g>
      ))}

      <g className="fill-cream font-sans" fontSize="13" fontWeight="600" stroke="var(--color-panel)" strokeWidth="4" paintOrder="stroke" strokeLinejoin="round">
        <text x={vx - 10} y={vy + 22} textAnchor="middle">
          {from}
        </text>
        <text x={lx + 4} y={ly - 13} textAnchor="middle">
          {to}
        </text>
      </g>
    </svg>
  );
}

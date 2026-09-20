/** Thin-line laurel wreath; leaves are placed along each stem's bezier curve. */
type Pt = [number, number];

const STEM: [Pt, Pt, Pt, Pt] = [
  [24, 43],
  [12, 41],
  [5, 30],
  [9, 12],
];

function bezier(t: number, [p0, p1, p2, p3]: typeof STEM): { p: Pt; d: Pt } {
  const u = 1 - t;
  const p: Pt = [
    u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0],
    u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1],
  ];
  const d: Pt = [
    3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]),
    3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]),
  ];
  return { p, d };
}

function leaves() {
  const out: { x: number; y: number; a: number }[] = [];
  const steps = 6;
  for (let i = 1; i <= steps; i++) {
    const t = i / (steps + 0.4);
    const { p, d } = bezier(t, STEM);
    const tangent = (Math.atan2(d[1], d[0]) * 180) / Math.PI;
    // one leaf on each side of the stem, splaying forward
    for (const side of [-1, 1]) {
      const len = Math.hypot(d[0], d[1]);
      const nx = (-d[1] / len) * side * 2.6;
      const ny = (d[0] / len) * side * 2.6;
      out.push({ x: p[0] + nx, y: p[1] + ny, a: tangent + 90 + side * 28 });
    }
  }
  return out;
}

const LEAVES = leaves();
const f = (n: number) => n.toFixed(2);

export function Laurel({ className = "" }: { className?: string }) {
  const [p0, p1, p2, p3] = STEM;
  const stem = `M${p0} C${p1} ${p2} ${p3}`;
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden="true">
      {[1, -1].map((mirror) => (
        <g key={mirror} transform={mirror === -1 ? "translate(48 0) scale(-1 1)" : undefined}>
          <path d={stem} />
          {LEAVES.map((l, i) => (
            <ellipse key={i} cx={f(l.x)} cy={f(l.y)} rx="1.25" ry="3.1" transform={`rotate(${f(l.a)} ${f(l.x)} ${f(l.y)})`} />
          ))}
          <ellipse cx="9.4" cy="10" rx="1.2" ry="3" transform="rotate(12 9.4 10)" />
        </g>
      ))}
    </svg>
  );
}

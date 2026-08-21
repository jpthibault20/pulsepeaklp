// app/outils/calculateur-zones/puissance/PowerDurationCurve.tsx
const WIDTH = 640;
const HEIGHT = 260;
const PAD_LEFT = 16;
const PAD_RIGHT = 16;
const PAD_TOP = 20;
const PAD_BOTTOM = 36;

// Courbe schématique (non calculée) illustrant la relation puissance/durée :
// décroissance rapide sur les efforts courts, puis asymptote vers la Critical Power.
const CURVE_POINTS: [number, number][] = [
    [0, 0.98],
    [0.03, 0.86],
    [0.08, 0.72],
    [0.16, 0.6],
    [0.28, 0.5],
    [0.42, 0.42],
    [0.58, 0.36],
    [0.74, 0.31],
    [1, 0.27],
];

const markers = [
    { x: 0.03, label: "5s", sub: "Neuromusc." },
    { x: 0.16, label: "1min", sub: "Anaérobie" },
    { x: 0.42, label: "5min", sub: "VO2max" },
    { x: 0.85, label: "60min", sub: "FTP / CP" },
];

export default function PowerDurationCurve() {
    const x = (t: number) => PAD_LEFT + t * (WIDTH - PAD_LEFT - PAD_RIGHT);
    const y = (p: number) => PAD_TOP + (1 - p) * (HEIGHT - PAD_TOP - PAD_BOTTOM);

    const linePath = `M${CURVE_POINTS.map(([t, p]) => `${x(t).toFixed(1)},${y(p).toFixed(1)}`).join(" L")}`;

    return (
        <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-auto w-full text-slate-400"
            role="img"
            aria-label="Courbe schématique de la relation puissance-durée en cyclisme"
        >
            <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={HEIGHT - PAD_BOTTOM}
                y2={HEIGHT - PAD_BOTTOM}
                stroke="currentColor"
                strokeOpacity={0.2}
            />
            <line x1={PAD_LEFT} x2={PAD_LEFT} y1={PAD_TOP} y2={HEIGHT - PAD_BOTTOM} stroke="currentColor" strokeOpacity={0.2} />

            <text x={WIDTH - PAD_RIGHT} y={16} textAnchor="end" fontSize={10} fill="currentColor">
                Puissance ↑
            </text>
            <text x={WIDTH - PAD_RIGHT} y={HEIGHT - 10} textAnchor="end" fontSize={10} fill="currentColor">
                Durée de l&apos;effort →
            </text>

            <path d={linePath} fill="none" stroke="#2563eb" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

            {markers.map((m) => {
                const point = CURVE_POINTS.reduce((closest, [t, p]) =>
                    Math.abs(t - m.x) < Math.abs(closest[0] - m.x) ? [t, p] : closest
                );
                const anchor = m.x < 0.1 ? "start" : m.x > 0.9 ? "end" : "middle";
                return (
                    <g key={m.label}>
                        <circle cx={x(point[0])} cy={y(point[1])} r={4} fill="#2563eb" />
                        <text x={x(point[0])} y={y(point[1]) - 12} textAnchor={anchor} fontSize={11} fontWeight={700} fill="currentColor" className="fill-slate-700 dark:fill-slate-200">
                            {m.label}
                        </text>
                        <text x={x(point[0])} y={HEIGHT - 20} textAnchor={anchor} fontSize={9} fill="currentColor">
                            {m.sub}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

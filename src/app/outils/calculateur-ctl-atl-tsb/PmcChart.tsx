// app/outils/calculateur-ctl-atl-tsb/PmcChart.tsx
"use client";

import { useMemo } from "react";
import type { PmcPoint } from "./pmcUtils";

const WIDTH = 640;
const HEIGHT = 260;
const PAD_LEFT = 40;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

export default function PmcChart({ points }: { points: PmcPoint[] }) {
    const { ctlPath, atlPath, tsbPath, zeroY, yTicks, xTicks } = useMemo(() => {
        if (points.length < 2) return { ctlPath: "", atlPath: "", tsbPath: "", zeroY: 0, yTicks: [], xTicks: [] };

        const allValues = points.flatMap((p) => [p.ctl, p.atl, p.tsb]);
        const minV = Math.min(...allValues, 0);
        const maxV = Math.max(...allValues, 1);
        const range = Math.max(1, maxV - minV);
        const minPadded = minV - range * 0.1;
        const maxPadded = maxV + range * 0.1;

        const x = (i: number) => PAD_LEFT + (i / (points.length - 1)) * (WIDTH - PAD_LEFT - PAD_RIGHT);
        const y = (v: number) =>
            PAD_TOP + (1 - (v - minPadded) / (maxPadded - minPadded)) * (HEIGHT - PAD_TOP - PAD_BOTTOM);

        const buildPath = (values: number[]) =>
            `M${values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" L")}`;

        const ctlPath = buildPath(points.map((p) => p.ctl));
        const atlPath = buildPath(points.map((p) => p.atl));
        const tsbPath = buildPath(points.map((p) => p.tsb));

        const yTickCount = 4;
        const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => {
            const v = minPadded + (i / yTickCount) * (maxPadded - minPadded);
            return { v: Math.round(v), y: y(v) };
        });

        const xTickCount = Math.min(6, points.length - 1);
        const xTicks = Array.from({ length: xTickCount + 1 }, (_, i) => {
            const idx = Math.round((i / xTickCount) * (points.length - 1));
            return { label: points[idx].date.slice(5), x: x(idx) };
        });

        return { ctlPath, atlPath, tsbPath, zeroY: y(0), yTicks, xTicks };
    }, [points]);

    if (points.length < 2) return null;

    return (
        <div>
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-auto w-full text-slate-400" role="img" aria-label="Évolution CTL, ATL et TSB dans le temps">
                {yTicks.map((t) => (
                    <g key={t.v}>
                        <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={t.y} y2={t.y} stroke="currentColor" strokeOpacity={0.12} strokeWidth={1} />
                        <text x={PAD_LEFT - 6} y={t.y + 3} textAnchor="end" fontSize={9} fill="currentColor">
                            {t.v}
                        </text>
                    </g>
                ))}

                <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={zeroY} y2={zeroY} stroke="currentColor" strokeOpacity={0.25} strokeDasharray="3 3" strokeWidth={1} />

                {xTicks.map((t, i) => (
                    <text key={`${t.label}-${i}`} x={t.x} y={HEIGHT - 10} textAnchor="middle" fontSize={9} fill="currentColor">
                        {t.label}
                    </text>
                ))}

                <path d={tsbPath} fill="none" stroke="#10b981" strokeWidth={1.5} strokeLinejoin="round" />
                <path d={atlPath} fill="none" stroke="#f97316" strokeWidth={1.5} strokeLinejoin="round" />
                <path d={ctlPath} fill="none" stroke="#2563eb" strokeWidth={2} strokeLinejoin="round" />
            </svg>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-4 rounded bg-blue-600" /> CTL (fitness)
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-4 rounded bg-orange-500" /> ATL (fatigue)
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-4 rounded bg-emerald-500" /> TSB (forme)
                </span>
            </div>
        </div>
    );
}

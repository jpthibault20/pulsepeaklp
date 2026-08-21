// app/outils/analyseur-gpx/ElevationChart.tsx
"use client";

import { useMemo } from "react";

interface Props {
    data: { distKm: number; ele: number }[];
}

const WIDTH = 640;
const HEIGHT = 220;
const PAD_LEFT = 40;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

export default function ElevationChart({ data }: Props) {
    const { linePath, areaPath, yTicks, xTicks } = useMemo(() => {
        if (data.length < 2) return { linePath: "", areaPath: "", yTicks: [], xTicks: [] };

        const maxDist = data[data.length - 1].distKm;
        const minEle = Math.min(...data.map((d) => d.ele));
        const maxEle = Math.max(...data.map((d) => d.ele));
        const eleRange = Math.max(1, maxEle - minEle);
        const eleMinPadded = minEle - eleRange * 0.1;
        const eleMaxPadded = maxEle + eleRange * 0.1;

        const x = (distKm: number) => PAD_LEFT + (distKm / maxDist) * (WIDTH - PAD_LEFT - PAD_RIGHT);
        const y = (ele: number) =>
            PAD_TOP + (1 - (ele - eleMinPadded) / (eleMaxPadded - eleMinPadded)) * (HEIGHT - PAD_TOP - PAD_BOTTOM);

        const points = data.map((d) => `${x(d.distKm).toFixed(1)},${y(d.ele).toFixed(1)}`);
        const linePath = `M${points.join(" L")}`;
        const baseY = HEIGHT - PAD_BOTTOM;
        const areaPath = `M${x(data[0].distKm).toFixed(1)},${baseY} L${points.join(" L")} L${x(maxDist).toFixed(1)},${baseY} Z`;

        const yTickCount = 4;
        const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => {
            const ele = eleMinPadded + (i / yTickCount) * (eleMaxPadded - eleMinPadded);
            return { ele: Math.round(ele), y: y(ele) };
        });

        const xTickCount = Math.min(6, Math.max(2, Math.round(maxDist)));
        const xTicks = Array.from({ length: xTickCount + 1 }, (_, i) => {
            const distKm = (i / xTickCount) * maxDist;
            return { distKm: Math.round(distKm * 10) / 10, x: x(distKm) };
        });

        return { linePath, areaPath, yTicks, xTicks };
    }, [data]);

    if (data.length < 2) return null;

    return (
        <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-auto w-full text-slate-400"
            role="img"
            aria-label="Profil d'élévation du parcours"
        >
            <defs>
                <linearGradient id="elevation-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
            </defs>

            {yTicks.map((t) => (
                <g key={t.ele}>
                    <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={t.y} y2={t.y} stroke="currentColor" strokeOpacity={0.12} strokeWidth={1} />
                    <text x={PAD_LEFT - 6} y={t.y + 3} textAnchor="end" fontSize={9} fill="currentColor">
                        {t.ele}m
                    </text>
                </g>
            ))}

            {xTicks.map((t) => (
                <text key={t.distKm} x={t.x} y={HEIGHT - 10} textAnchor="middle" fontSize={9} fill="currentColor">
                    {t.distKm}km
                </text>
            ))}

            <path d={areaPath} fill="url(#elevation-fill)" />
            <path d={linePath} fill="none" stroke="#2563eb" strokeWidth={1.75} strokeLinejoin="round" />
        </svg>
    );
}

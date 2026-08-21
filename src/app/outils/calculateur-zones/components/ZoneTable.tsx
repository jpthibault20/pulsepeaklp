// app/outils/calculateur-zones/components/ZoneTable.tsx
import Badge from "../../../components/Badge";
import type { BadgeColor } from "../../../components/Badge";

export interface ZoneRow {
    n: number;
    name: string;
    pct: string;
    range: string;
    color: BadgeColor;
}

export default function ZoneTable({ zones, unit }: { zones: ZoneRow[]; unit: string }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[300px] border-collapse text-sm">
                <thead>
                    <tr className="border-b border-slate-200/80 text-left text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-500">
                        <th className="py-2 pr-2 font-semibold">Zone</th>
                        <th className="py-2 pr-2 font-semibold">%</th>
                        <th className="py-2 font-semibold">{unit}</th>
                    </tr>
                </thead>
                <tbody>
                    {zones.map((z) => (
                        <tr key={z.n} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                            <td className="py-2.5 pr-2">
                                <div className="flex items-center gap-2">
                                    <Badge text={`Z${z.n}`} color={z.color} />
                                    <span className="text-slate-700 dark:text-slate-300">{z.name}</span>
                                </div>
                            </td>
                            <td className="whitespace-nowrap py-2.5 pr-2 text-slate-600 dark:text-slate-400">{z.pct}</td>
                            <td className="whitespace-nowrap py-2.5 font-semibold text-slate-900 dark:text-white">
                                {z.range}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// app/outils/calculateur-ctl-atl-tsb/pmcUtils.ts

export function parseCsv(text: string): { headers: string[]; rows: string[][] } {
    const rows: string[][] = [];
    let field = "";
    let row: string[] = [];
    let inQuotes = false;

    const pushField = () => {
        row.push(field);
        field = "";
    };
    const pushRow = () => {
        pushField();
        rows.push(row);
        row = [];
    };

    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inQuotes) {
            if (c === '"') {
                if (text[i + 1] === '"') {
                    field += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                field += c;
            }
        } else if (c === '"') {
            inQuotes = true;
        } else if (c === ",") {
            pushField();
        } else if (c === "\n") {
            pushRow();
        } else if (c === "\r") {
            // ignore, \n handles line breaks
        } else {
            field += c;
        }
    }
    if (field.length > 0 || row.length > 0) pushRow();

    const nonEmptyRows = rows.filter((r) => r.some((cell) => cell.trim() !== ""));
    const [headers, ...dataRows] = nonEmptyRows;
    return { headers: headers ?? [], rows: dataRows };
}

const DATE_HEADER_HINTS = ["date"];
const LOAD_HEADER_HINTS = [
    "relative effort",
    "suffer score",
    "training stress score",
    "training load",
    "tss",
    "perceived exertion",
    "load",
];

export function detectColumn(headers: string[], hints: string[]): number | null {
    const lower = headers.map((h) => h.toLowerCase());
    for (const hint of hints) {
        const idx = lower.findIndex((h) => h.includes(hint));
        if (idx !== -1) return idx;
    }
    return null;
}

export function detectDateColumn(headers: string[]): number | null {
    return detectColumn(headers, DATE_HEADER_HINTS);
}

export function detectLoadColumn(headers: string[]): number | null {
    return detectColumn(headers, LOAD_HEADER_HINTS);
}

export function parseDateFlexible(raw: string): Date | null {
    const trimmed = raw.trim();
    if (!trimmed) return null;

    const native = new Date(trimmed);
    if (!Number.isNaN(native.getTime())) return native;

    const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
        const d = new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]));
        if (!Number.isNaN(d.getTime())) return d;
    }

    const dmy = trimmed.match(/^(\d{1,2})[/.](\d{1,2})[/.](\d{4})/);
    if (dmy) {
        const d = new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]));
        if (!Number.isNaN(d.getTime())) return d;
    }

    return null;
}

export function toDateKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function buildDailyLoad(rows: string[][], dateIdx: number, loadIdx: number): Map<string, number> {
    const daily = new Map<string, number>();

    for (const row of rows) {
        const dateRaw = row[dateIdx];
        const loadRaw = row[loadIdx];
        if (!dateRaw || !loadRaw) continue;

        const date = parseDateFlexible(dateRaw);
        const load = parseFloat(loadRaw.replace(",", "."));
        if (!date || !Number.isFinite(load)) continue;

        const key = toDateKey(date);
        daily.set(key, (daily.get(key) || 0) + load);
    }

    return daily;
}

export interface PmcPoint {
    date: string;
    tss: number;
    ctl: number;
    atl: number;
    tsb: number;
}

const CTL_DAYS = 42;
const ATL_DAYS = 7;
const MAX_DAYS = 1100;

export function computePmc(dailyLoad: Map<string, number>, endDate: Date = new Date()): PmcPoint[] {
    if (dailyLoad.size === 0) return [];

    const keys = Array.from(dailyLoad.keys()).sort();
    let cursor = new Date(keys[0] + "T00:00:00");
    const end = new Date(toDateKey(endDate) + "T00:00:00");

    const totalDays = Math.round((end.getTime() - cursor.getTime()) / 86400000) + 1;
    if (totalDays > MAX_DAYS) {
        cursor = new Date(end.getTime() - (MAX_DAYS - 1) * 86400000);
    }

    const points: PmcPoint[] = [];
    let ctlPrev = 0;
    let atlPrev = 0;

    for (let d = new Date(cursor); d.getTime() <= end.getTime(); d.setDate(d.getDate() + 1)) {
        const key = toDateKey(d);
        const tss = dailyLoad.get(key) || 0;
        const ctl = ctlPrev + (tss - ctlPrev) / CTL_DAYS;
        const atl = atlPrev + (tss - atlPrev) / ATL_DAYS;
        const tsb = ctlPrev - atlPrev;
        points.push({ date: key, tss, ctl, atl, tsb });
        ctlPrev = ctl;
        atlPrev = atl;
    }

    return points;
}

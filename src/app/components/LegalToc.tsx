// app/components/LegalToc.tsx
export default function LegalToc({ items }: { items: { id: string; label: string }[] }) {
    return (
        <nav
            aria-label="Sommaire"
            className="mb-10 rounded-xl border border-slate-200/80 bg-white/60 p-5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/40"
        >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-500">
                Sommaire
            </p>
            <ol className="grid gap-1.5 sm:grid-cols-2">
                {items.map((item, i) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                        >
                            {i + 1}. {item.label}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}

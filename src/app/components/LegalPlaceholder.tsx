// app/components/LegalPlaceholder.tsx
export default function LegalPlaceholder({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded border border-dashed border-amber-400 bg-amber-50 px-1.5 py-0.5 text-amber-700 dark:border-amber-500/50 dark:bg-amber-500/10 dark:text-amber-400">
            {children}
        </span>
    );
}

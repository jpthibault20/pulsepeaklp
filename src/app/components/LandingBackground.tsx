// app/components/LandingBackground.tsx
export default function LandingBackground() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
            <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15" />
            <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-400/10" />
            <div className="absolute bottom-0 -right-40 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-400/10" />
        </div>
    );
}

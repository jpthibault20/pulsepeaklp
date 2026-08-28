"use client";

// app/components/DisciplineProof.tsx
import { useState } from "react";
import { disciplineOrder, getDiscipline, type Discipline } from "@/lib/disciplines";
import DisciplineShowcase from "./DisciplineShowcase";

export default function DisciplineProof() {
  const [active, setActive] = useState<Discipline>("velo");

  return (
    <div className="mb-16">
      {/* Sélecteur */}
      <div
        role="tablist"
        aria-label="Choisir une discipline"
        className="mx-auto mb-10 flex max-w-full flex-wrap items-center justify-center gap-2"
      >
        {disciplineOrder.map((key) => {
          const config = getDiscipline(key);
          const Icon = config.icon;
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(key)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "border-slate-200/80 bg-white/80 text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:text-blue-400"
              }`}
            >
              <Icon size={16} />
              {config.label}
            </button>
          );
        })}
      </div>

      <DisciplineShowcase discipline={active} linkToPage />
    </div>
  );
}

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function SortableItem(props: { id: string; value: string }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto', // L'élément passe au premier plan quand on le bouge
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`
        relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-grab active:cursor-grabbing touch-none
        transition-colors select-none group
        ${isDragging
                    ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] scale-105'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                }
      `}
        >
            {/* Poignée (Grip) */}
            <div className={`p-1 rounded bg-slate-900 ${isDragging ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                <GripVertical size={20} />
            </div>

            {/* Texte de l'option */}
            <span className={`font-medium text-lg ${isDragging ? 'text-white' : 'text-slate-300'}`}>
                {props.value}
            </span>

            {/* Petit indicateur visuel à droite */}
            <div className="ml-auto text-xs font-bold text-slate-700 bg-slate-900 px-2 py-1 rounded">
                :::
            </div>
        </div>
    );
}

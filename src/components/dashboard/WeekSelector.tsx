import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface WeekSelectorProps {
    selectedWeek?: string;
    onWeekChange: (week: string) => void;
}

export function WeekSelector({ selectedWeek }: WeekSelectorProps) {
    // Simple mock logic for week navigation. 
    // Ideally, backend returns "current week" if selectedWeek is undefined

    // Format week number: 202504 -> Week 4, 2025
    const displayWeek = selectedWeek
        ? `Tuần ${selectedWeek.slice(4)}, ${selectedWeek.slice(0, 4)}`
        : 'Tuần này';

    return (
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-gray-200 shadow-sm inline-flex">
            <button
                className="p-1 hover:bg-gray-100 rounded-md text-gray-600 transition-colors"
                onClick={() => {
                    // Logic to go back 1 week
                    // Simplified for MVP UI demo
                }}
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 px-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900 min-w-[120px] text-center">
                    {displayWeek}
                </span>
            </div>

            <button
                className="p-1 hover:bg-gray-100 rounded-md text-gray-600 transition-colors"
                onClick={() => { }}
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}

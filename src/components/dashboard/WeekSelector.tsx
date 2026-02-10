import { Calendar } from 'lucide-react';

interface WeekSelectorProps {
    selectedWeek: string | undefined;
    onWeekChange: (week: string) => void;
}

export function WeekSelector({ selectedWeek, onWeekChange }: WeekSelectorProps) {
    return (
        <div className="flex items-center gap-2">
            <Calendar style={{ width: 16, height: 16, color: 'var(--gold-dark)' }} />
            <input
                type="week"
                value={selectedWeek || ''}
                onChange={(e) => onWeekChange(e.target.value)}
                className="vintage-input text-sm"
                style={{
                    fontFamily: 'var(--font-ui)',
                    padding: '6px 12px',
                }}
            />
        </div>
    );
}

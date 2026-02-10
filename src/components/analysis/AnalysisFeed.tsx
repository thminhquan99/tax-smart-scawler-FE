import { AnalysisCard } from './AnalysisCard';
import { BookOpen } from 'lucide-react';
import type { AnalysisSummary } from '../../services/api';

interface AnalysisFeedProps {
    analyses: AnalysisSummary[];
}

export function AnalysisFeed({ analyses }: AnalysisFeedProps) {
    if (!analyses || analyses?.length === 0) {
        return (
            <div
                className="parchment-card p-12 text-center"
            >
                <div
                    className="flex items-center justify-center mx-auto mb-4 rounded-full"
                    style={{
                        width: 64,
                        height: 64,
                        background: 'linear-gradient(135deg, var(--parchment-dark), var(--parchment))',
                        border: '2px solid var(--gold)',
                    }}
                >
                    <BookOpen style={{ width: 28, height: 28, color: 'var(--gold-dark)' }} />
                </div>
                <h3
                    className="font-display text-lg font-bold mb-1"
                    style={{ color: 'var(--ink-dark)' }}
                >
                    No updates this week
                </h3>
                <p
                    className="font-body text-sm"
                    style={{ color: 'var(--ink-faded)' }}
                >
                    Wait for the next crawl cycle or check previous weeks.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {analyses.map((analysis) => (
                <AnalysisCard key={analysis.id} analysis={analysis} />
            ))}
        </div>
    );
}

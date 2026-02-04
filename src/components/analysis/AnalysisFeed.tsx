import { AnalysisCard } from './AnalysisCard';
import type { AnalysisSummary } from '../../services/api';

interface AnalysisFeedProps {
    analyses: AnalysisSummary[];
}

export function AnalysisFeed({ analyses }: AnalysisFeedProps) {
    if (!analyses || analyses?.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📭</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No updates this week</h3>
                <p className="text-gray-500">Wait for the next crawl cycle or check previous weeks.</p>
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

import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../common/Badge';
import type { AnalysisSummary } from '../../services/api';

interface AnalysisCardProps {
    analysis: AnalysisSummary;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
    // Determine color based on highest priority
    const priorityColor = analysis.highPriorityCount > 0 ? 'red' : 'yellow';

    return (
        <Link
            to={`/analysis/${analysis.id}`}
            className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group border-l-4 border-l-transparent hover:border-l-blue-600"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    {!analysis.userViewed && (
                        <Badge variant="blue">New</Badge>
                    )}
                    <Badge variant={priorityColor}>
                        {analysis.highPriorityCount > 0 ? 'High Priority' : 'Normal'}
                    </Badge>
                    <span className="text-xs text-gray-400 font-mono">
                        {analysis.newDocument.documentNumber}
                    </span>
                </div>
                <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                {analysis.newDocument.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                {analysis.summary}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>{analysis.totalChanges} changes detected</span>
                </div>
                {analysis.affectedIndustries?.length > 0 && (
                    <div>• Affected: {analysis.affectedIndustries.slice(0, 3).join(', ')}</div>
                )}
            </div>
        </Link>
    );
}

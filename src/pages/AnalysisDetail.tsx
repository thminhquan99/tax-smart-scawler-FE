import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { ArrowLeft, Clock, ExternalLink, ArrowRight, TrendingUp } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export function AnalysisDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: detail, isLoading, error } = useQuery({
        queryKey: ['analysis-detail', id],
        queryFn: () => {
            if (!id) throw new Error("No ID provided");
            return apiService.getAnalysisDetail(id).then(res => res.data);
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (error || !detail) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold text-gray-900">Analysis not found</h2>
                <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Navigation */}
            <div className="mb-6">
                <Link to="/" className="inline-flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            {/* Header Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <Badge variant="blue">Week {detail.weekNumber}</Badge>
                            {detail.newDocument.taxTypes.map(t => (
                                <Badge key={t} variant="gray">{t}</Badge>
                            ))}
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                            {detail.newDocument.title}
                        </h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{detail.newDocument.documentNumber}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Analyzed on {new Date(detail.analyzedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <a
                        href={detail.newDocument.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View Original
                    </a>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-blue-900 mb-1">AI Summary</h3>
                    <p className="text-blue-800 leading-relaxed">{detail.analysis.summary}</p>
                </div>
            </div>

            {/* Changes Feed */}
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    {detail.analysis.totalChanges}
                </span>
                Key Changes Detected
            </h2>

            <div className="space-y-6">
                {detail.analysis.changes.map((change, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Badge variant={change.priority === 'HIGH' ? 'red' : change.priority === 'MEDIUM' ? 'yellow' : 'gray'}>
                                    {change.priority}
                                </Badge>
                                <span className="font-semibold text-gray-900">{change.title}</span>
                            </div>
                            <Badge variant="gray">{change.category}</Badge>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Old Provision */}
                            {change.oldProvision && (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                        Old Provision
                                        {change.oldProvision.article && <span className="bg-gray-100 px-1 rounded text-gray-600 normal-case">{change.oldProvision.article}</span>}
                                    </h4>
                                    <div className="p-4 bg-red-50 rounded-lg border border-red-100 text-gray-800 text-sm leading-relaxed min-h-[100px]">
                                        {change.oldProvision.text}
                                    </div>
                                </div>
                            )}

                            {/* New Provision */}
                            <div className={!change.oldProvision ? "md:col-span-2 space-y-2" : "space-y-2"}>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                    New Provision
                                    <span className="bg-blue-100 text-blue-800 px-1 rounded normal-case">{change.newProvision.article}</span>
                                </h4>
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-gray-800 text-sm leading-relaxed min-h-[100px]">
                                    {change.newProvision.text}
                                </div>
                            </div>
                        </div>

                        {/* Impact Analysis */}
                        <div className="bg-gray-50 p-4 border-t border-gray-100">
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 p-1 rounded ${change.impact.type === 'INCREASE' ? 'bg-red-100 text-red-600' : change.impact.type === 'DECREASE' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                                    {change.impact.type === 'INCREASE' ? <TrendingUp className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">Impact Analysis</h4>
                                    <p className="text-sm text-gray-600 mt-1">{change.impact.description}</p>
                                    {change.impact.example && (
                                        <p className="text-xs text-gray-500 mt-2 italic bg-white p-2 rounded border border-gray-200 inline-block">
                                            Ex: {change.impact.example}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

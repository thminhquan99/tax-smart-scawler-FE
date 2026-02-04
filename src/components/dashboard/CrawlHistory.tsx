import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../services/api';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';

export function CrawlHistory() {
    const queryClient = useQueryClient();

    const { data: history, isLoading } = useQuery({
        queryKey: ['crawlHistory'],
        queryFn: apiService.getCrawlHistory,
        refetchInterval: 5000, // Poll every 5s to see updates
    });

    const triggerMutation = useMutation({
        mutationFn: apiService.triggerCrawl,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['crawlHistory'] });
            queryClient.invalidateQueries({ queryKey: ['weeklyAnalyses'] });
            queryClient.invalidateQueries({ queryKey: ['weeklyStats'] });
        },
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    Crawl History
                </h2>
                <button
                    onClick={() => triggerMutation.mutate()}
                    disabled={triggerMutation.isPending}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${triggerMutation.isPending ? 'animate-spin' : ''}`} />
                    {triggerMutation.isPending ? 'Running...' : 'Trigger Now'}
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Started At</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Docs Found</th>
                            <th className="px-6 py-3">Docs Saved</th>
                            <th className="px-6 py-3">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center">Loading...</td>
                            </tr>
                        ) : history?.map((log) => {
                            const start = new Date(log.startedAt);
                            const end = log.completedAt ? new Date(log.completedAt) : null;
                            const duration = end ? ((end.getTime() - start.getTime()) / 1000).toFixed(1) + 's' : '-';

                            return (
                                <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {start.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {log.status === 'SUCCESS' && <Badge variant="green"><CheckCircle className="w-3 h-3 mr-1 inline" />Success</Badge>}
                                        {log.status === 'FAILED' && <Badge variant="red"><XCircle className="w-3 h-3 mr-1 inline" />Failed</Badge>}
                                        {log.status === 'RUNNING' && <Badge variant="yellow"><RefreshCw className="w-3 h-3 mr-1 inline animate-spin" />Running</Badge>}
                                    </td>
                                    <td className="px-6 py-4">{log.documentsFound}</td>
                                    <td className="px-6 py-4 font-semibold text-green-600">{log.documentsSaved}</td>
                                    <td className="px-6 py-4 text-gray-500">{duration}</td>
                                </tr>
                            );
                        })}
                        {history?.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No crawl history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

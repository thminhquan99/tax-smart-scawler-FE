import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { StatCard } from '../components/dashboard/StatCard';
import { WeekSelector } from '../components/dashboard/WeekSelector';
import { AnalysisFeed } from '../components/analysis/AnalysisFeed';
import { PaginatedNewsFeed } from '../components/news/PaginatedNewsFeed';
import { FileText, AlertCircle, TrendingUp, BarChart, Newspaper, FileSearch } from 'lucide-react';
import { usePagination } from '../hooks/usePagination';
import { Pagination } from '../components/common/Pagination';

export function Dashboard() {
    const [selectedWeek, setSelectedWeek] = useState<string>();
    const { page: analysisPage, pageSize: analysisPageSize, offset: analysisOffset, setPage: setAnalysisPage } = usePagination(1, 5);

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['weekly-stats', selectedWeek],
        queryFn: () => apiService.getWeeklyStats(selectedWeek).then(res => res.data),
    });

    const { data: analyses, isLoading: analysesLoading } = useQuery({
        queryKey: ['weekly-analyses', selectedWeek, analysisOffset, analysisPageSize],
        queryFn: () => apiService.getWeeklyAnalyses(selectedWeek).then(res => res.data),
    });

    if (statsLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Weekly Overview</h2>
                    <p className="text-sm text-gray-500">Track and analyze tax regulation changes.</p>
                </div>
                <WeekSelector
                    selectedWeek={selectedWeek}
                    onWeekChange={setSelectedWeek}
                />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    title="New Documents"
                    value={stats?.totalDocuments || 0}
                    subtitle={`${stats?.newDocuments || 0} entirely new`}
                    icon={<FileText className="w-6 h-6" />}
                    color="blue"
                />

                <StatCard
                    title="High Priority"
                    value={stats?.highPriorityChanges || 0}
                    subtitle="Critical changes"
                    icon={<AlertCircle className="w-6 h-6" />}
                    color="red"
                />

                <StatCard
                    title="Total Changes"
                    value={stats?.totalChanges || 0}
                    subtitle="Across all docs"
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="green"
                />

                <StatCard
                    title="Industries"
                    value={stats?.affectedIndustries?.length || 0}
                    subtitle="Affected sectors"
                    icon={<BarChart className="w-6 h-6" />}
                    color="purple"
                />
            </div>

            {/* Main Content - 2 Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Analysis Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FileSearch className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-900">Recent Analyses</h3>
                    </div>
                    {analysesLoading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-40 bg-gray-200 rounded-xl"></div>
                            <div className="h-40 bg-gray-200 rounded-xl"></div>
                        </div>
                    ) : (
                        <>
                            <AnalysisFeed analyses={analyses?.slice(analysisOffset, analysisOffset + analysisPageSize) || []} />
                            {analyses && analyses.length > analysisPageSize && (
                                <Pagination
                                    currentPage={analysisPage}
                                    totalItems={analyses.length}
                                    pageSize={analysisPageSize}
                                    onPageChange={setAnalysisPage}
                                />
                            )}
                        </>
                    )}
                </div>

                {/* News Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Newspaper className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-bold text-gray-900">Latest News</h3>
                    </div>
                    <PaginatedNewsFeed />
                </div>
            </div>
        </div>
    );
}

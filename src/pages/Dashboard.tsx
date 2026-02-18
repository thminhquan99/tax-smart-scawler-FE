import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { StatCard } from '../components/dashboard/StatCard';
import { WeekSelector } from '../components/dashboard/WeekSelector';
import { AnalysisFeed } from '../components/analysis/AnalysisFeed';
import { PaginatedNewsFeed } from '../components/news/PaginatedNewsFeed';
import { FileText, AlertCircle, TrendingUp, BarChart, Newspaper, FileSearch, Compass } from 'lucide-react';
import { usePagination } from '../hooks/usePagination';
import { Pagination } from '../components/common/Pagination';
import { motion } from 'framer-motion';

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
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full mx-auto mb-4"
                        style={{
                            width: 40,
                            height: 40,
                            border: '3px solid var(--parchment-dark)',
                            borderTopColor: 'var(--gold)',
                        }}
                    />
                    <p className="font-display text-sm" style={{ color: 'var(--ink-faded)' }}>
                        Loading the archives...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center mb-8"
            >
                <div>
                    <h2
                        className="font-display text-2xl font-bold"
                        style={{ color: 'var(--ink-dark)' }}
                    >
                        Home Dashboard
                    </h2>
                    <p
                        className="font-body text-sm mt-1"
                        style={{ color: 'var(--ink-light)' }}
                    >
                        Track and analyze tax regulation changes.
                    </p>
                </div>
                <WeekSelector selectedWeek={selectedWeek} onWeekChange={setSelectedWeek} />
            </motion.div>
            {/* Recent Activity & Topics Compass Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-2 parchment-card p-6"
                >
                    <h3
                        className="font-display text-lg font-bold mb-4"
                        style={{ color: 'var(--ink-dark)' }}
                    >
                        Recent Activity
                    </h3>
                    <div
                        className="rounded p-4"
                        style={{
                            background: 'var(--paper-aged)',
                            border: '1px solid var(--parchment-dark)',
                            minHeight: 180,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Vintage chart grid */}
                        <svg width="100%" height="160" viewBox="0 0 400 160" preserveAspectRatio="none">
                            {/* Grid lines */}
                            {[0, 40, 80, 120, 160].map(y => (
                                <line key={y} x1="0" y1={y} x2="400" y2={y}
                                    stroke="var(--parchment-dark)" strokeWidth="0.5" strokeDasharray="4,4" />
                            ))}
                            {/* Chart line */}
                            <motion.path
                                d="M 0,120 Q 50,100 100,80 T 200,60 Q 250,40 300,70 T 400,50"
                                fill="none"
                                stroke="var(--gold-dark)"
                                strokeWidth="2.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: 'easeInOut' }}
                            />
                            {/* Area fill */}
                            <path
                                d="M 0,120 Q 50,100 100,80 T 200,60 Q 250,40 300,70 T 400,50 L 400,160 L 0,160 Z"
                                fill="url(#goldGradient)"
                                opacity="0.2"
                            />
                            <defs>
                                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--gold)" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* Y-axis labels */}
                        <div
                            className="absolute left-2 top-2 font-ui text-xs space-y-6"
                            style={{ color: 'var(--ink-faded)' }}
                        >
                            <div>75</div>
                            <div>50</div>
                            <div>25</div>
                            <div>0</div>
                        </div>
                    </div>
                </motion.div>

                {/* Topics Compass */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="parchment-card p-6 flex flex-col items-center justify-center"
                >
                    <h3
                        className="font-display text-lg font-bold mb-4"
                        style={{ color: 'var(--ink-dark)' }}
                    >
                        Topics Compass
                    </h3>
                    <div
                        className="relative animate-float"
                        style={{ width: 120, height: 120 }}
                    >
                        <svg viewBox="0 0 120 120" width="120" height="120">
                            {/* Compass circle */}
                            <circle cx="60" cy="60" r="55" fill="none" stroke="var(--gold-dark)" strokeWidth="2" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--gold)" strokeWidth="1" />
                            <circle cx="60" cy="60" r="8" fill="var(--gold-dark)" />
                            {/* Cardinal directions */}
                            <text x="60" y="18" textAnchor="middle" fill="var(--ink-dark)" fontSize="10" fontFamily="var(--font-display)">N</text>
                            <text x="60" y="108" textAnchor="middle" fill="var(--ink-dark)" fontSize="10" fontFamily="var(--font-display)">S</text>
                            <text x="108" y="64" textAnchor="middle" fill="var(--ink-dark)" fontSize="10" fontFamily="var(--font-display)">E</text>
                            <text x="12" y="64" textAnchor="middle" fill="var(--ink-dark)" fontSize="10" fontFamily="var(--font-display)">W</text>
                            {/* Needle */}
                            <motion.g
                                animate={{ rotate: [0, 10, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ transformOrigin: '60px 60px' }}
                            >
                                <polygon points="60,15 55,58 65,58" fill="var(--wax-red)" />
                                <polygon points="60,105 55,62 65,62" fill="var(--ink-light)" />
                            </motion.g>
                            {/* Tick marks */}
                            {Array.from({ length: 12 }, (_, i) => {
                                const angle = (i * 30) * Math.PI / 180;
                                const x1 = 60 + 45 * Math.sin(angle);
                                const y1 = 60 - 45 * Math.cos(angle);
                                const x2 = 60 + 50 * Math.sin(angle);
                                const y2 = 60 - 50 * Math.cos(angle);
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gold-dark)" strokeWidth="1.5" />;
                            })}
                        </svg>
                    </div>
                    <p className="font-ui text-xs mt-3" style={{ color: 'var(--ink-faded)' }}>
                        Navigate topics
                    </p>
                </motion.div>
            </div>

            {/* Main Content - 2 Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                {/* Analysis Section */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="parchment-card p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <FileSearch style={{ width: 18, height: 18, color: 'var(--navy-light)' }} />
                        <h3
                            className="font-display text-lg font-bold"
                            style={{ color: 'var(--ink-dark)' }}
                        >
                            Recent Analyses
                        </h3>
                    </div>
                    {analysesLoading ? (
                        <div className="space-y-4">
                            <div className="skeleton-parchment" style={{ height: 140 }} />
                            <div className="skeleton-parchment" style={{ height: 140 }} />
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
                </motion.div> */}

                {/* News Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="parchment-card p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Newspaper style={{ width: 18, height: 18, color: 'var(--forest)' }} />
                        <h3
                            className="font-display text-lg font-bold"
                            style={{ color: 'var(--ink-dark)' }}
                        >
                            Latest News
                        </h3>
                    </div>
                    <PaginatedNewsFeed />
                </motion.div>
            </div>
        </div>
    );
}

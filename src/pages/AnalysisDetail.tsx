import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { ArrowLeft, Clock, ExternalLink, ArrowRight, TrendingUp } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { motion } from 'framer-motion';

export function AnalysisDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: detail, isLoading, error } = useQuery({
        queryKey: ['analysis-detail', id],
        queryFn: () => {
            if (!id) throw new Error('No ID provided');
            return apiService.getAnalysisDetail(id).then(res => res.data);
        },
        enabled: !!id,
    });

    if (isLoading) {
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
                        Opening the manuscript...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !detail) {
        return (
            <div className="parchment-card p-12 text-center">
                <h2 className="font-display text-xl font-bold" style={{ color: 'var(--ink-dark)' }}>
                    Analysis not found
                </h2>
                <Link to="/" className="btn-parchment mt-4 inline-block">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Navigation */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6"
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-1 font-ui text-sm transition-colors"
                    style={{ color: 'var(--ink-light)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--wood)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-light)'; }}
                >
                    <ArrowLeft style={{ width: 16, height: 16 }} />
                    <span>Back to Dashboard</span>
                </Link>
            </motion.div>

            {/* Header Info */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="parchment-card p-8 mb-8"
            >
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <Badge variant="blue">Week {detail.weekNumber}</Badge>
                            {detail.newDocument.taxTypes.map(t => (
                                <Badge key={t} variant="gray">{t}</Badge>
                            ))}
                        </div>
                        <h1
                            className="font-display text-2xl font-bold mb-2"
                            style={{ color: 'var(--ink-dark)', lineHeight: 1.3 }}
                        >
                            {detail.newDocument.title}
                        </h1>
                        <div className="flex items-center gap-2 font-ui text-sm" style={{ color: 'var(--ink-faded)' }}>
                            <span
                                className="font-mono text-xs px-2 py-0.5 rounded"
                                style={{
                                    background: 'rgba(200, 169, 110, 0.15)',
                                    color: 'var(--ink-light)',
                                }}
                            >
                                {detail.newDocument.documentNumber}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Clock style={{ width: 12, height: 12 }} />
                                Analyzed on {new Date(detail.analyzedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <a
                        href={detail.newDocument.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-parchment inline-flex items-center gap-2 text-sm"
                    >
                        <ExternalLink style={{ width: 14, height: 14 }} />
                        View Original
                    </a>
                </div>

                <div
                    className="p-4 rounded"
                    style={{
                        background: 'rgba(58, 80, 128, 0.06)',
                        border: '1px solid rgba(58, 80, 128, 0.15)',
                    }}
                >
                    <h3
                        className="font-display text-xs font-bold mb-1"
                        style={{ color: 'var(--navy)', letterSpacing: '0.05em' }}
                    >
                        AI Summary
                    </h3>
                    <p className="font-body" style={{ color: 'var(--ink-medium)', lineHeight: 1.7 }}>
                        {detail.analysis.summary}
                    </p>
                </div>
            </motion.div>

            {/* Changes Feed */}
            <h2
                className="font-display text-xl font-bold mb-6 flex items-center gap-2"
                style={{ color: 'var(--ink-dark)' }}
            >
                <span
                    className="flex items-center justify-center font-ui text-xs font-bold rounded-full"
                    style={{
                        width: 28,
                        height: 28,
                        background: 'linear-gradient(135deg, var(--navy-light), var(--navy))',
                        color: 'var(--paper-cream)',
                    }}
                >
                    {detail.analysis.totalChanges}
                </span>
                Key Changes Detected
            </h2>

            <div className="space-y-6">
                {detail.analysis.changes.map((change, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * idx }}
                        className="parchment-card overflow-hidden"
                    >
                        {/* Change Header */}
                        <div
                            className="p-4 flex justify-between items-center"
                            style={{
                                borderBottom: '1px solid var(--parchment-dark)',
                                background: 'rgba(236, 219, 182, 0.3)',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <Badge variant={change.priority === 'HIGH' ? 'red' : change.priority === 'MEDIUM' ? 'yellow' : 'gray'}>
                                    {change.priority}
                                </Badge>
                                <span className="font-display text-sm font-bold" style={{ color: 'var(--ink-dark)' }}>
                                    {change.title}
                                </span>
                            </div>
                            <Badge variant="gray">{change.category}</Badge>
                        </div>

                        {/* Provisions */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {change.oldProvision && (
                                <div className="space-y-2">
                                    <h4 className="font-ui text-xs font-bold uppercase flex items-center gap-1"
                                        style={{ color: 'var(--ink-faded)', letterSpacing: '0.08em' }}>
                                        Old Provision
                                        {change.oldProvision.article && (
                                            <span
                                                className="normal-case px-1 rounded text-xs"
                                                style={{ background: 'rgba(200, 169, 110, 0.2)', color: 'var(--ink-light)' }}
                                            >
                                                {change.oldProvision.article}
                                            </span>
                                        )}
                                    </h4>
                                    <div
                                        className="p-4 rounded font-body text-sm"
                                        style={{
                                            background: 'rgba(139, 45, 58, 0.06)',
                                            border: '1px solid rgba(139, 45, 58, 0.15)',
                                            color: 'var(--ink-medium)',
                                            lineHeight: 1.7,
                                            minHeight: 100,
                                        }}
                                    >
                                        {change.oldProvision.text}
                                    </div>
                                </div>
                            )}

                            <div className={!change.oldProvision ? 'md:col-span-2 space-y-2' : 'space-y-2'}>
                                <h4 className="font-ui text-xs font-bold uppercase flex items-center gap-1"
                                    style={{ color: 'var(--ink-faded)', letterSpacing: '0.08em' }}>
                                    New Provision
                                    <span
                                        className="normal-case px-1 rounded text-xs"
                                        style={{ background: 'rgba(58, 80, 128, 0.15)', color: 'var(--navy)' }}
                                    >
                                        {change.newProvision.article}
                                    </span>
                                </h4>
                                <div
                                    className="p-4 rounded font-body text-sm"
                                    style={{
                                        background: 'rgba(58, 80, 128, 0.06)',
                                        border: '1px solid rgba(58, 80, 128, 0.15)',
                                        color: 'var(--ink-medium)',
                                        lineHeight: 1.7,
                                        minHeight: 100,
                                    }}
                                >
                                    {change.newProvision.text}
                                </div>
                            </div>
                        </div>

                        {/* Impact Analysis */}
                        <div
                            className="p-4"
                            style={{
                                borderTop: '1px solid var(--parchment-dark)',
                                background: 'rgba(236, 219, 182, 0.3)',
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="mt-1 p-1.5 rounded flex items-center justify-center"
                                    style={{
                                        background: change.impact.type === 'INCREASE'
                                            ? 'rgba(139, 45, 58, 0.15)'
                                            : change.impact.type === 'DECREASE'
                                                ? 'rgba(58, 122, 74, 0.15)'
                                                : 'rgba(200, 169, 110, 0.2)',
                                        color: change.impact.type === 'INCREASE'
                                            ? 'var(--burgundy)'
                                            : change.impact.type === 'DECREASE'
                                                ? 'var(--forest)'
                                                : 'var(--ink-light)',
                                    }}
                                >
                                    {change.impact.type === 'INCREASE'
                                        ? <TrendingUp style={{ width: 16, height: 16 }} />
                                        : <ArrowRight style={{ width: 16, height: 16 }} />
                                    }
                                </div>
                                <div>
                                    <h4 className="font-display text-sm font-bold" style={{ color: 'var(--ink-dark)' }}>
                                        Impact Analysis
                                    </h4>
                                    <p className="font-body text-sm mt-1" style={{ color: 'var(--ink-medium)' }}>
                                        {change.impact.description}
                                    </p>
                                    {change.impact.example && (
                                        <p
                                            className="font-body text-xs italic mt-2 inline-block p-2 rounded"
                                            style={{
                                                color: 'var(--ink-faded)',
                                                background: 'var(--paper-cream)',
                                                border: '1px solid var(--parchment-dark)',
                                            }}
                                        >
                                            Ex: {change.impact.example}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

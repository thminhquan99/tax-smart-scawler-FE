import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../common/Badge';
import { motion } from 'framer-motion';
import type { AnalysisSummary } from '../../services/api';

interface AnalysisCardProps {
    analysis: AnalysisSummary;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
    const priorityColor = analysis.highPriorityCount > 0 ? 'red' : 'yellow';

    return (
        <Link to={`/analysis/${analysis.id}`} className="block group">
            <motion.div
                whileHover={{ y: -3, boxShadow: '0 6px 20px var(--shadow-warm), 0 0 15px var(--glow-gold)' }}
                transition={{ duration: 0.3 }}
                className="parchment-card p-5"
                style={{
                    borderLeft: '4px solid var(--gold-dark)',
                    position: 'relative',
                }}
            >
                {/* Decorative seal */}
                <div
                    style={{
                        position: 'absolute',
                        top: -6,
                        right: 16,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: analysis.highPriorityCount > 0
                            ? 'var(--wax-red)'
                            : 'var(--gold)',
                        boxShadow: '0 2px 4px var(--shadow-warm)',
                    }}
                />

                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        {!analysis.userViewed && (
                            <Badge variant="blue">New</Badge>
                        )}
                        <Badge variant={priorityColor}>
                            {analysis.highPriorityCount > 0 ? 'High Priority' : 'Normal'}
                        </Badge>
                        <span
                            className="font-ui text-xs"
                            style={{
                                color: 'var(--ink-faded)',
                                fontFamily: 'monospace',
                                background: 'rgba(200, 169, 110, 0.15)',
                                padding: '2px 6px',
                                borderRadius: 3,
                            }}
                        >
                            {analysis.newDocument.documentNumber}
                        </span>
                    </div>
                    <div
                        className="group-hover:translate-x-1 transition-transform"
                        style={{ color: 'var(--gold-dark)' }}
                    >
                        <ArrowRight style={{ width: 18, height: 18 }} />
                    </div>
                </div>

                <h3
                    className="font-display text-base font-bold mb-2 line-clamp-2 group-hover:text-amber-800 transition-colors"
                    style={{ color: 'var(--ink-dark)', lineHeight: 1.3 }}
                >
                    {analysis.newDocument.title}
                </h3>

                <p
                    className="font-body text-sm mb-4 line-clamp-2"
                    style={{ color: 'var(--ink-light)', lineHeight: 1.6 }}
                >
                    {analysis.summary}
                </p>

                <div
                    className="flex items-center gap-4 font-ui text-xs pt-3"
                    style={{ borderTop: '1px solid var(--parchment-dark)', color: 'var(--ink-faded)' }}
                >
                    <div className="flex items-center gap-1">
                        <FileText style={{ width: 12, height: 12 }} />
                        <span>{analysis.totalChanges} changes detected</span>
                    </div>
                    {analysis.affectedIndustries?.length > 0 && (
                        <div>• Affected: {analysis.affectedIndustries.slice(0, 3).join(', ')}</div>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}

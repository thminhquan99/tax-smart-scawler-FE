import type { NewsArticle } from '../../types/news';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ExternalLink, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
    article: NewsArticle;
    index?: number;
}

export function NewsArticleCard({ article, index = 0 }: Props) {
    const priorityStyles = {
        HIGH: 'wax-seal-red',
        MEDIUM: 'wax-seal-amber',
        LOW: 'wax-seal-green',
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link to={`/news/${article.id}`} className="block group">
                <div
                    className="parchment-card p-0 flex overflow-hidden"
                    style={{ position: 'relative' }}
                >
                    {/* Thumbnail / Icon area */}
                    <div
                        className="flex-shrink-0 flex items-center justify-center"
                        style={{
                            width: 100,
                            minHeight: 120,
                            background: 'linear-gradient(135deg, var(--wood) 0%, var(--wood-dark) 100%)',
                            borderRight: '2px solid var(--gold-dark)',
                        }}
                    >
                        <BookOpen
                            style={{
                                width: 32,
                                height: 32,
                                color: 'var(--gold-light)',
                                opacity: 0.7,
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <span className={`wax-seal ${priorityStyles[article.priority]}`}>
                                {article.priority}
                            </span>
                            <span
                                className="font-ui text-xs"
                                style={{ color: 'var(--ink-faded)' }}
                            >
                                {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: vi })}
                            </span>
                        </div>

                        <h3
                            className="font-display text-base font-bold mb-2 line-clamp-2 group-hover:text-amber-800 transition-colors"
                            style={{ color: 'var(--ink-dark)', lineHeight: 1.3 }}
                        >
                            {article.title}
                        </h3>

                        <p
                            className="font-body text-sm mb-3 line-clamp-2"
                            style={{ color: 'var(--ink-light)', lineHeight: 1.6 }}
                        >
                            {article.summary}
                        </p>

                        <div className="flex items-center justify-between gap-2">
                            <span
                                className="font-ui text-xs"
                                style={{ color: 'var(--ink-faded)' }}
                            >
                                {article.sourceName}
                            </span>
                            <div className="flex items-center gap-3">
                                <a
                                    href={article.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-ui text-xs flex items-center gap-1 transition-colors"
                                    style={{ color: 'var(--ink-faded)' }}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--wood)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-faded)'; }}
                                >
                                    <ExternalLink style={{ width: 12, height: 12 }} />
                                    Gốc
                                </a>
                                <span
                                    className="font-ui text-xs font-semibold flex items-center gap-1 transition-colors"
                                    style={{ color: 'var(--wood)' }}
                                >
                                    Chi tiết
                                    <ArrowRight style={{ width: 12, height: 12 }} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </div>

                        {article.taxTypes && article.taxTypes.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                                {article.taxTypes.slice(0, 3).map(type => (
                                    <span
                                        key={type}
                                        className="font-ui text-xs px-2 py-0.5 rounded"
                                        style={{
                                            background: 'rgba(200, 169, 110, 0.2)',
                                            color: 'var(--wood-dark)',
                                            border: '1px solid var(--parchment-dark)',
                                        }}
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

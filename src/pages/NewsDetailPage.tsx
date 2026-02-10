import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { ArrowLeft, ExternalLink, Calendar, Building2, AlertCircle, Lightbulb, CheckSquare, TrendingUp, Feather, Bookmark } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { motion } from 'framer-motion';

export function NewsDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: article, isLoading } = useQuery({
        queryKey: ['news', id],
        queryFn: () => apiService.getNewsDetail(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="skeleton-parchment" style={{ height: 32, width: '30%' }} />
                <div className="skeleton-parchment" style={{ height: 400 }} />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="parchment-card p-12 text-center">
                    <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--ink-dark)' }}>
                        Không tìm thấy bài viết
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-parchment mt-4"
                    >
                        Quay lại Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const prioritySeals = {
        HIGH: 'wax-seal-red',
        MEDIUM: 'wax-seal-amber',
        LOW: 'wax-seal-green',
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 mb-6 font-ui text-sm transition-colors"
                style={{
                    color: 'var(--ink-light)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--wood)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-light)'; }}
            >
                <ArrowLeft style={{ width: 18, height: 18 }} />
                Quay lại Dashboard
            </motion.button>

            {/* ═══ Open Book Layout ═══ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                {/* Book Header */}
                <div
                    className="parchment-card p-6 mb-0"
                    style={{
                        borderBottom: 'none',
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                    }}
                >
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h1
                            className="font-display text-2xl font-bold flex-1"
                            style={{ color: 'var(--ink-dark)', lineHeight: 1.3 }}
                        >
                            {article.title}
                        </h1>
                        <span className={`wax-seal ${prioritySeals[article.priority]}`}>
                            {article.priority}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4 font-ui text-sm mb-4" style={{ color: 'var(--ink-light)' }}>
                        <div className="flex items-center gap-2">
                            <Building2 style={{ width: 14, height: 14 }} />
                            <span>{article.sourceName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar style={{ width: 14, height: 14 }} />
                            <span>{format(new Date(article.publishedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                        </div>
                    </div>

                    {article.taxTypes && article.taxTypes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {article.taxTypes.map(type => (
                                <span
                                    key={type}
                                    className="font-ui text-xs px-3 py-1 rounded"
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

                    <p className="font-body" style={{ color: 'var(--ink-medium)', lineHeight: 1.7 }}>
                        {article.summary}
                    </p>

                    <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 font-ui text-sm font-semibold transition-colors"
                        style={{ color: 'var(--wood)' }}
                    >
                        <ExternalLink style={{ width: 14, height: 14 }} />
                        Xem bài viết gốc
                    </a>
                </div>

                {/* ═══ Book Spread (Dual Page) ═══ */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-0"
                    style={{
                        background: 'linear-gradient(135deg, var(--paper-cream) 0%, var(--parchment-light) 100%)',
                        border: '1px solid var(--parchment-dark)',
                        borderTop: 'none',
                        boxShadow: '0 4px 16px var(--shadow-warm)',
                        position: 'relative',
                    }}
                >
                    {/* Left Page - Article Content */}
                    <div
                        className="lg:col-span-2 p-8"
                        style={{
                            borderRight: '1px solid var(--parchment-dark)',
                            position: 'relative',
                        }}
                    >
                        {/* Book binding shadow (center line) */}
                        <div
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: 20,
                                background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06))',
                                pointerEvents: 'none',
                            }}
                        />

                        <h2
                            className="font-display text-xl font-bold mb-6 flex items-center gap-2"
                            style={{ color: 'var(--ink-dark)' }}
                        >
                            <Feather style={{ width: 18, height: 18, color: 'var(--gold-dark)' }} />
                            Nội dung bài viết
                        </h2>

                        <div className="drop-cap">
                            <p
                                className="font-body text-base whitespace-pre-wrap"
                                style={{ color: 'var(--ink-medium)', lineHeight: 1.8 }}
                            >
                                {article.fullContent}
                            </p>
                        </div>
                    </div>

                    {/* Right Sidebar - Related Articles */}
                    <div className="p-6" style={{ background: 'rgba(236, 219, 182, 0.3)' }}>
                        <h3
                            className="font-display text-sm font-bold mb-4"
                            style={{ color: 'var(--ink-dark)', letterSpacing: '0.05em' }}
                        >
                            Related Articles
                        </h3>
                        {['Related Articles', 'Related Reading News', 'Related Articles', 'Related Articles'].map((label, idx) => (
                            <div
                                key={idx}
                                className="parchment-card p-3 mb-3 text-center font-ui text-xs"
                                style={{
                                    color: 'var(--ink-medium)',
                                    cursor: 'pointer',
                                }}
                            >
                                {label}
                            </div>
                        ))}

                        {/* Save Button */}
                        <button
                            className="w-full mt-6 flex items-center justify-center gap-2 btn-wood text-sm"
                        >
                            <Bookmark style={{ width: 14, height: 14 }} />
                            Save
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* ═══ Detailed Analysis ═══ */}
            {article.detailedAnalysis ? (
                <div className="space-y-6 mt-8">
                    {/* Signals Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="parchment-card p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="flex items-center justify-center rounded-full"
                                style={{
                                    width: 40,
                                    height: 40,
                                    background: 'linear-gradient(135deg, var(--amber), var(--amber-dark))',
                                    boxShadow: '0 2px 6px var(--shadow-warm)',
                                }}
                            >
                                <AlertCircle style={{ width: 20, height: 20, color: 'var(--paper-cream)' }} />
                            </div>
                            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--ink-dark)' }}>
                                Giải mã Tín hiệu
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-display text-base font-semibold mb-3" style={{ color: 'var(--ink-dark)' }}>
                                    📍 Điểm nóng pháp lý
                                </h3>
                                <p className="font-body whitespace-pre-wrap" style={{ color: 'var(--ink-medium)', lineHeight: 1.7 }}>
                                    {article.detailedAnalysis.signals.legalHotspots}
                                </p>
                            </div>
                            <div>
                                <h3 className="font-display text-base font-semibold mb-3" style={{ color: 'var(--ink-dark)' }}>
                                    🔍 Tác động ngầm
                                </h3>
                                <p className="font-body whitespace-pre-wrap" style={{ color: 'var(--ink-medium)', lineHeight: 1.7 }}>
                                    {article.detailedAnalysis.signals.hiddenImpacts}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Business Impact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="parchment-card p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="flex items-center justify-center rounded-full"
                                style={{
                                    width: 40,
                                    height: 40,
                                    background: 'linear-gradient(135deg, var(--navy-light), var(--navy))',
                                    boxShadow: '0 2px 6px var(--shadow-warm)',
                                }}
                            >
                                <TrendingUp style={{ width: 20, height: 20, color: 'var(--paper-cream)' }} />
                            </div>
                            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--ink-dark)' }}>
                                Phân tích Tác động Doanh nghiệp
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-display text-base font-semibold mb-3" style={{ color: 'var(--ink-dark)' }}>
                                    🏢 Đối tượng ảnh hưởng
                                </h3>
                                <ul className="space-y-2">
                                    {article.detailedAnalysis.businessImpact.affectedBusinessTypes.map((type, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span style={{ color: 'var(--navy-light)', marginTop: 4 }}>•</span>
                                            <span className="font-body" style={{ color: 'var(--ink-medium)' }}>{type}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-display text-base font-semibold mb-3" style={{ color: 'var(--ink-dark)' }}>
                                    ⚠️ Vùng rủi ro
                                </h3>
                                <ul className="space-y-2">
                                    {article.detailedAnalysis.businessImpact.riskAreas.map((risk, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span style={{ color: 'var(--wax-red)', marginTop: 4 }}>•</span>
                                            <span className="font-body" style={{ color: 'var(--ink-medium)' }}>{risk}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tax Concepts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="parchment-card p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="flex items-center justify-center rounded-full"
                                style={{
                                    width: 40,
                                    height: 40,
                                    background: 'linear-gradient(135deg, var(--forest-light), var(--forest))',
                                    boxShadow: '0 2px 6px var(--shadow-warm)',
                                }}
                            >
                                <Lightbulb style={{ width: 20, height: 20, color: 'var(--paper-cream)' }} />
                            </div>
                            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--ink-dark)' }}>
                                Concept Kế toán Thuế
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {article.detailedAnalysis.concepts.map((concept, idx) => (
                                <div
                                    key={idx}
                                    className="parchment-card p-6"
                                    style={{ borderLeft: '3px solid var(--forest)' }}
                                >
                                    <h3 className="font-display text-lg font-bold mb-3" style={{ color: 'var(--ink-dark)' }}>
                                        {idx + 1}. {concept.name}
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <span className="font-ui text-xs font-bold uppercase" style={{ color: 'var(--ink-faded)', letterSpacing: '0.08em' }}>
                                                Mục tiêu
                                            </span>
                                            <p className="font-body mt-1" style={{ color: 'var(--ink-medium)' }}>{concept.objective}</p>
                                        </div>

                                        <div>
                                            <span className="font-ui text-xs font-bold uppercase" style={{ color: 'var(--ink-faded)', letterSpacing: '0.08em' }}>
                                                Các bước thực hiện
                                            </span>
                                            <ol className="mt-2 space-y-2">
                                                {concept.steps.map((step, stepIdx) => (
                                                    <li key={stepIdx} className="flex items-start gap-3">
                                                        <span
                                                            className="flex-shrink-0 flex items-center justify-center font-ui text-xs font-bold rounded-full"
                                                            style={{
                                                                width: 24,
                                                                height: 24,
                                                                background: 'linear-gradient(135deg, var(--forest-light), var(--forest))',
                                                                color: 'var(--paper-cream)',
                                                            }}
                                                        >
                                                            {stepIdx + 1}
                                                        </span>
                                                        <span className="font-body flex-1" style={{ color: 'var(--ink-medium)' }}>{step}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>

                                        <div
                                            className="p-4 rounded"
                                            style={{
                                                background: 'rgba(58, 122, 74, 0.08)',
                                                border: '1px solid rgba(58, 122, 74, 0.2)',
                                            }}
                                        >
                                            <span className="font-ui text-xs font-bold uppercase" style={{ color: 'var(--forest)', letterSpacing: '0.08em' }}>
                                                Giá trị mang lại
                                            </span>
                                            <p className="font-body mt-1" style={{ color: 'var(--forest)' }}>{concept.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Action Checklist */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="parchment-card p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="flex items-center justify-center rounded-full"
                                style={{
                                    width: 40,
                                    height: 40,
                                    background: 'linear-gradient(135deg, var(--navy-light), var(--navy))',
                                    boxShadow: '0 2px 6px var(--shadow-warm)',
                                }}
                            >
                                <CheckSquare style={{ width: 20, height: 20, color: 'var(--paper-cream)' }} />
                            </div>
                            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--ink-dark)' }}>
                                Checklist Hành động Ngay
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {article.detailedAnalysis.actionChecklist.map((action, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 p-4 rounded"
                                    style={{
                                        background: 'rgba(58, 80, 128, 0.06)',
                                        border: '1px solid rgba(58, 80, 128, 0.15)',
                                    }}
                                >
                                    <CheckSquare style={{ width: 18, height: 18, color: 'var(--navy-light)', flexShrink: 0, marginTop: 2 }} />
                                    <span className="font-body" style={{ color: 'var(--ink-dark)' }}>{action}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div
                    className="parchment-card p-8 text-center mt-8"
                    style={{ border: '1px solid var(--amber)' }}
                >
                    <AlertCircle style={{ width: 40, height: 40, color: 'var(--amber-dark)', margin: '0 auto 12px' }} />
                    <p className="font-display font-semibold" style={{ color: 'var(--amber-dark)' }}>
                        Phân tích chi tiết đang được tạo...
                    </p>
                    <p className="font-body text-sm mt-2" style={{ color: 'var(--ink-faded)' }}>
                        Vui lòng quay lại sau vài phút
                    </p>
                </div>
            )}
        </div>
    );
}

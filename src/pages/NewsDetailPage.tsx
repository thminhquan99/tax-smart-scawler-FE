import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { ArrowLeft, ExternalLink, Calendar, Building2, AlertCircle, Lightbulb, CheckSquare, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

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
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />
                    <div className="bg-white rounded-xl p-8 space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy bài viết</h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-blue-600 hover:text-blue-700"
                    >
                        Quay lại Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const priorityColors = {
        HIGH: 'bg-red-100 text-red-800 border-red-200',
        MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        LOW: 'bg-green-100 text-green-800 border-green-200',
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {/* Header */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Quay lại Dashboard
                </button>

                {/* Article Header */}
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h1 className="text-3xl font-bold text-gray-900 flex-1">{article.title}</h1>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[article.priority]}`}>
                            {article.priority}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            <span>{article.sourceName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(article.publishedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                        </div>
                    </div>

                    {article.taxTypes && article.taxTypes.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {article.taxTypes.map(type => (
                                <span key={type} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                    {type}
                                </span>
                            ))}
                        </div>
                    )}

                    <p className="text-gray-700 leading-relaxed mb-6">{article.summary}</p>

                    <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Xem bài viết gốc
                    </a>
                </div>

                {/* Full Article Content */}
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">📄 Nội dung bài viết</h2>
                    <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {article.fullContent}
                        </p>
                    </div>
                </div>

                {/* Detailed Analysis */}
                {article.detailedAnalysis ? (
                    <div className="space-y-6">
                        {/* Signals Section */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <AlertCircle className="w-6 h-6 text-orange-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Giải mã Tín hiệu</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">📍 Điểm nóng pháp lý</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{article.detailedAnalysis.signals.legalHotspots}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🔍 Tác động ngầm</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{article.detailedAnalysis.signals.hiddenImpacts}</p>
                                </div>
                            </div>
                        </div>

                        {/* Business Impact */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-purple-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Phân tích Tác động Doanh nghiệp</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🏢 Đối tượng ảnh hưởng</h3>
                                    <ul className="space-y-2">
                                        {article.detailedAnalysis.businessImpact.affectedBusinessTypes.map((type, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-purple-600 mt-1">•</span>
                                                <span className="text-gray-700">{type}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Vùng rủi ro</h3>
                                    <ul className="space-y-2">
                                        {article.detailedAnalysis.businessImpact.riskAreas.map((risk, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-red-600 mt-1">•</span>
                                                <span className="text-gray-700">{risk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Tax Concepts */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Lightbulb className="w-6 h-6 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Concept Kế toán Thuế</h2>
                            </div>

                            <div className="space-y-6">
                                {article.detailedAnalysis.concepts.map((concept, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {idx + 1}. {concept.name}
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-sm font-semibold text-gray-600 uppercase">Mục tiêu</span>
                                                <p className="text-gray-700 mt-1">{concept.objective}</p>
                                            </div>

                                            <div>
                                                <span className="text-sm font-semibold text-gray-600 uppercase">Các bước thực hiện</span>
                                                <ol className="mt-2 space-y-2">
                                                    {concept.steps.map((step, stepIdx) => (
                                                        <li key={stepIdx} className="flex items-start gap-3">
                                                            <span className="shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-medium">
                                                                {stepIdx + 1}
                                                            </span>
                                                            <span className="text-gray-700 flex-1">{step}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>

                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                <span className="text-sm font-semibold text-green-800 uppercase">Giá trị mang lại</span>
                                                <p className="text-green-700 mt-1">{concept.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Checklist */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <CheckSquare className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Checklist Hành động Ngay</h2>
                            </div>

                            <div className="space-y-3">
                                {article.detailedAnalysis.actionChecklist.map((action, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <CheckSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                        <span className="text-gray-900">{action}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                        <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                        <p className="text-yellow-800 font-medium">Phân tích chi tiết đang được tạo...</p>
                        <p className="text-yellow-700 text-sm mt-2">Vui lòng quay lại sau vài phút</p>
                    </div>
                )}
            </div>
        </div>
    );
}

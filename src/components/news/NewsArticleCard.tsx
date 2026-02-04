import type { NewsArticle } from '../../types/news';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
    article: NewsArticle;
}

export function NewsArticleCard({ article }: Props) {
    const priorityColors = {
        HIGH: 'bg-red-100 text-red-800 border-red-200',
        MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        LOW: 'bg-green-100 text-green-800 border-green-200',
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${priorityColors[article.priority]}`}>
                    {article.priority}
                </span>
                <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true, locale: vi })}
                </span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.summary}</p>

            <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-gray-500">{article.sourceName}</span>
                <div className="flex items-center gap-2">
                    <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink className="w-3 h-3" />
                        Gốc
                    </a>
                    <Link
                        to={`/news/${article.id}`}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                        Chi tiết
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            {article.taxTypes && article.taxTypes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                    {article.taxTypes.slice(0, 3).map(type => (
                        <span key={type} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                            {type}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

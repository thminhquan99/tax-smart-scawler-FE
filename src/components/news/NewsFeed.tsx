import { NewsArticleCard } from './NewsArticleCard';
import { Newspaper } from 'lucide-react';
import type { NewsArticle } from '../../types/news';

interface NewsFeedProps {
    news: NewsArticle[];
}

export function NewsFeed({ news }: NewsFeedProps) {
    if (!news || news.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <Newspaper className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Chưa có tin tức mới</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {news.map(article => (
                <NewsArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}

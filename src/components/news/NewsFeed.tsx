import { NewsArticleCard } from './NewsArticleCard';
import type { NewsArticle } from '../../types/news';

interface NewsFeedProps {
    news: NewsArticle[];
}

export function NewsFeed({ news }: NewsFeedProps) {
    return (
        <div className="space-y-4">
            {news.map((article, index) => (
                <NewsArticleCard key={article.id} article={article} index={index} />
            ))}
        </div>
    );
}

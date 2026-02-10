import { useQuery } from '@tanstack/react-query';
import { apiService } from '../../services/api';
import { usePagination } from '../../hooks/usePagination';
import { NewsFeed } from './NewsFeed';
import { Pagination } from '../common/Pagination';
import { BookOpen } from 'lucide-react';

export function PaginatedNewsFeed() {
    const { page, pageSize, offset, setPage } = usePagination(1, 5);

    const { data, isLoading } = useQuery({
        queryKey: ['news', offset, pageSize],
        queryFn: () => apiService.getNews({ limit: pageSize, offset }),
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="skeleton-parchment" style={{ height: 120, borderRadius: 4 }} />
                ))}
            </div>
        );
    }

    const newsItems = data?.data?.items || [];
    const total = data?.data?.total || 0;

    if (newsItems.length === 0) {
        return (
            <div className="parchment-card p-12 text-center">
                <BookOpen style={{ width: 32, height: 32, color: 'var(--gold-dark)', margin: '0 auto 12px' }} />
                <p className="font-body" style={{ color: 'var(--ink-faded)' }}>Chưa có tin tức nào</p>
            </div>
        );
    }

    return (
        <div>
            <NewsFeed news={newsItems} />
            {total > pageSize && (
                <Pagination
                    currentPage={page}
                    totalItems={total}
                    pageSize={pageSize}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}

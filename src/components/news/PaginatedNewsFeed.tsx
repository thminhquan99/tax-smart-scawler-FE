import { useQuery } from '@tanstack/react-query';
import { apiService } from '../../services/api';
import { usePagination } from '../../hooks/usePagination';
import { NewsFeed } from './NewsFeed';
import { Pagination } from '../common/Pagination';

export function PaginatedNewsFeed() {
    const { page, pageSize, offset, setPage } = usePagination(1, 5);

    const { data, isLoading } = useQuery({
        queryKey: ['news', offset, pageSize],
        queryFn: () => apiService.getNews({ limit: pageSize, offset }),
    });

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
        );
    }

    const newsItems = data?.data?.items || [];
    const total = data?.data?.total || 0;

    if (newsItems.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Chưa có tin tức nào</p>
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

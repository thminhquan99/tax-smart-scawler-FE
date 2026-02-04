import { useState } from 'react';

export function usePagination(initialPage = 1, pageSize = 10) {
    const [page, setPage] = useState(initialPage);

    const offset = (page - 1) * pageSize;

    return {
        page,
        pageSize,
        offset,
        setPage,
        nextPage: () => setPage(p => p + 1),
        prevPage: () => setPage(p => Math.max(1, p - 1)),
        resetPage: () => setPage(1),
    };
}

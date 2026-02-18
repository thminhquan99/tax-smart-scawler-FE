import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalItems, pageSize, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages <= 1) return null;

    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
        <div
            className="flex flex-col sm:flex-row items-center justify-between pt-5 mt-6 gap-4 sm:gap-0"
            style={{ borderTop: '1px solid var(--parchment-dark)' }}
        >
            <div
                className="font-ui text-sm text-center sm:text-left w-full sm:w-auto"
                style={{ color: 'var(--ink-light)' }}
            >
                Showing <span className="font-semibold" style={{ color: 'var(--ink-dark)' }}>{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-semibold" style={{ color: 'var(--ink-dark)' }}>{Math.min(currentPage * pageSize, totalItems)}</span> of{' '}
                <span className="font-semibold" style={{ color: 'var(--ink-dark)' }}>{totalItems}</span> results
            </div>

            <div className="flex items-center justify-center w-full sm:w-auto gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={!canGoPrev}
                    className="btn-parchment inline-flex items-center gap-1 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ padding: '8px 14px' }}
                >
                    <ChevronLeft style={{ width: 16, height: 16 }} />
                    Previous
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className="font-display text-sm rounded transition-all"
                                style={{
                                    width: 36,
                                    height: 36,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    background: currentPage === pageNum
                                        ? 'linear-gradient(135deg, var(--wood) 0%, var(--wood-dark) 100%)'
                                        : 'var(--paper-cream)',
                                    color: currentPage === pageNum
                                        ? 'var(--gold-light)'
                                        : 'var(--ink-medium)',
                                    border: currentPage === pageNum
                                        ? '1px solid var(--gold-dark)'
                                        : '1px solid var(--parchment-dark)',
                                    boxShadow: currentPage === pageNum
                                        ? '0 2px 8px var(--shadow-warm), 0 0 10px var(--glow-gold)'
                                        : '0 1px 3px var(--shadow-warm)',
                                }}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!canGoNext}
                    className="btn-parchment inline-flex items-center gap-1 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ padding: '8px 14px' }}
                >
                    Next
                    <ChevronRight style={{ width: 16, height: 16 }} />
                </button>
            </div>
        </div>
    );
}

'use client';

import {useSearchParams} from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {APP_ROUTES} from '@/config/routes';
import {
    getLimitFromSearchParams,
    getPageFromSearchParams,
    createNewPageParams,
} from '@/utils/filters';

export interface EventsPaginationProps {
    total: number;
}

export function EventsPagination({total}: EventsPaginationProps) {
    const params = useSearchParams();

    const currPage = getPageFromSearchParams(params);
    const limit = getLimitFromSearchParams(params);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const getHref = (page: number) =>
        `${APP_ROUTES.events.base}?${createNewPageParams(page, limit, params)}`;

    const getPageNumbers = () => {
        const pages = [];

        for (let i = Math.max(1, currPage - 1); i <= Math.min(totalPages, currPage + 1); i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <Pagination>
            <PaginationContent className="flex items-center gap-2">
                {currPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href={getHref(currPage - 1)}
                            className="border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-indigo-500 transition-all duration-300 rounded-xl"
                        />
                    </PaginationItem>
                )}

                {currPage > 2 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href={getHref(1)}
                                className="border border-transparent text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-indigo-500 transition-all duration-300 rounded-xl min-w-10"
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {currPage > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis className="text-gray-500 dark:text-zinc-400" />
                            </PaginationItem>
                        )}
                    </>
                )}

                {pageNumbers.map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            isActive={page === currPage}
                            href={getHref(page)}
                            className={`border transition-all duration-300 rounded-xl min-w-10 ${
                                page === currPage
                                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                                    : 'border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-indigo-500'
                            }`}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {currPage < totalPages - 1 && (
                    <>
                        {currPage < totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis className="text-gray-500 dark:text-zinc-400" />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink
                                href={getHref(totalPages)}
                                className="border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-indigo-500 transition-all duration-300 rounded-xl min-w-10"
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                {currPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext
                            href={getHref(currPage + 1)}
                            className="border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-indigo-500 transition-all duration-300 rounded-xl"
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

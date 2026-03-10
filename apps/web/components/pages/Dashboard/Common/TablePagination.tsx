'use client';

import {usePathname, useSearchParams} from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {Fragment} from 'react/jsx-runtime';

interface TablePaginationProps {
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export function TablePagination(props: TablePaginationProps) {
    const {page, hasNextPage, hasPreviousPage} = props;

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageFromParams = Number(searchParams.get('page'));
    const currentPage =
        Number.isFinite(pageFromParams) && pageFromParams > 0 ? pageFromParams : page;

    const safeCurrentPage = currentPage > 0 ? currentPage : 1;
    const previousPage = safeCurrentPage - 1;
    const nextPage = safeCurrentPage + 1;

    const createPageHref = (targetPage: number) => {
        const params = new URLSearchParams(searchParams.toString());

        if (targetPage <= 1) {
            params.delete('page');
        } else {
            params.set('page', String(targetPage));
        }

        const queryString = params.toString();
        return queryString ? `${pathname}?${queryString}` : pathname;
    };

    return (
        <Pagination className="pt-10">
            <PaginationContent>
                {hasPreviousPage && (
                    <Fragment>
                        <PaginationItem>
                            <PaginationPrevious
                                href={
                                    hasPreviousPage
                                        ? createPageHref(previousPage)
                                        : createPageHref(safeCurrentPage)
                                }
                                aria-disabled={!hasPreviousPage}
                                className={!hasPreviousPage ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href={createPageHref(previousPage)}>
                                {previousPage}
                            </PaginationLink>
                        </PaginationItem>
                    </Fragment>
                )}

                <PaginationItem>
                    <PaginationLink href={createPageHref(safeCurrentPage)} isActive>
                        {safeCurrentPage}
                    </PaginationLink>
                </PaginationItem>

                {hasNextPage && (
                    <Fragment>
                        <PaginationItem>
                            <PaginationLink href={createPageHref(nextPage)}>
                                {nextPage}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href={
                                    hasNextPage
                                        ? createPageHref(nextPage)
                                        : createPageHref(safeCurrentPage)
                                }
                                aria-disabled={!hasNextPage}
                                className={!hasNextPage ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </Fragment>
                )}
            </PaginationContent>
        </Pagination>
    );
}

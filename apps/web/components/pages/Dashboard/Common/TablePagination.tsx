'use client';

import React from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import type {IPageResultData} from '@/types/utils';

type TablePaginationProps = Omit<IPageResultData, 'total'>;

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

        return `${pathname}?${params.toString()}`;
    };

    return (
        <Pagination className="pt-10">
            <PaginationContent>
                {hasPreviousPage && (
                    <React.Fragment>
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
                    </React.Fragment>
                )}

                <PaginationItem>
                    <PaginationLink href={createPageHref(safeCurrentPage)} isActive>
                        {safeCurrentPage}
                    </PaginationLink>
                </PaginationItem>

                {hasNextPage && (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
            </PaginationContent>
        </Pagination>
    );
}

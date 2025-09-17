'use client';

import {ReadonlyURLSearchParams, useSearchParams} from 'next/navigation';
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

export interface EventsPaginationProps {
    total: number;
}

function createNewPageParams(currPage: number, limit: number, prevParams: ReadonlyURLSearchParams) {
    const newParams = new URLSearchParams(prevParams.toString());
    newParams.set('page', `${currPage}`);
    newParams.set('limit', `${limit}`);
    return newParams;
}

export function EventsPagination({total}: EventsPaginationProps) {
    const params = useSearchParams();

    const currPage = parseInt(params.get('page') ?? '1', 10);
    const limit = parseInt(params.get('limit') ?? '6', 10);
    const totalPages = Math.max(1, Math.ceil(total / limit));

    const getHref = (page: number) =>
        `${APP_ROUTES.base}?${createNewPageParams(page, limit, params)}`;

    return (
        <Pagination>
            <PaginationContent>
                {currPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={getHref(currPage - 1)} />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink
                        isActive
                        href={getHref(currPage)}
                        className="border border-indigo-500"
                    >
                        {currPage}
                    </PaginationLink>
                </PaginationItem>
                {currPage < totalPages && (
                    <>
                        {currPage + 1 < totalPages && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationNext href={getHref(currPage + 1)} />
                        </PaginationItem>
                    </>
                )}
            </PaginationContent>
        </Pagination>
    );
}

'use client';

import {useState, useEffect} from 'react';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    createNewPageParams,
    getLimitFromSearchParams,
    getPageFromSearchParams,
} from '@/utils/filters';
import {ItemsPerPage} from './ItemsPerPage';

interface TablePaginationProps {
    total: number;
}

export function TablePagination({total}: TablePaginationProps) {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();

    const currPage = getPageFromSearchParams(params);
    const limit = getLimitFromSearchParams(params, '12');
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const [pageSize, setPageSize] = useState<string>('12');

    const getHref = (page: number) => `${pathname}?${createNewPageParams(page, limit, params)}`;

    useEffect(() => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set('limit', pageSize);
        router.replace(`${pathname}?${newParams.toString()}`);
    }, [pageSize]);

    return (
        <div className="flex">
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
            <ItemsPerPage
                value={pageSize}
                setValue={setPageSize}
            />
        </div>
    );
}

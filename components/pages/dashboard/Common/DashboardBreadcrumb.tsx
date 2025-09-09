'use client';

import {Fragment} from 'react';
import {usePathname} from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {DASHBOARD_PREFIX} from '@/config/constants';
import {removeEmptyStringsFromArray} from '@/utils/functions';
import {generateUniqueKey, getPathnameArray} from '@/utils/index';
import {splitCamelCase} from '@/utils/strings';

function DashboardBreadcrumb() {
    const pathname = usePathname();
    const currentPath = getPathnameArray(pathname).splice(1);
    const pathList = currentPath.reduce<string[]>((accumlated, currentValue, currentIndex) => {
        if (currentIndex === 0) return [`/${DASHBOARD_PREFIX}/${currentValue}`];

        const previousPath = accumlated[accumlated.length - 1];
        return [...accumlated, `${previousPath}/${currentValue}`];
    }, []);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathList.map((path, index) => {
                    const isLastIndex = currentPath.length === index + 1;
                    const currentPathList = removeEmptyStringsFromArray(path.split('/'));
                    const currentPathname = splitCamelCase(
                        currentPathList[currentPathList.length - 1],
                    );

                    if (isLastIndex) {
                        return (
                            <BreadcrumbItem key={generateUniqueKey()}>
                                <BreadcrumbPage className="text-2xl tracking-tight capitalize select-none">
                                    {currentPathname}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }

                    return (
                        <Fragment key={generateUniqueKey()}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    className="text-2xl tracking-tight capitalize"
                                    href={path}
                                >
                                    {currentPathname}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

DashboardBreadcrumb.displayName = 'DashboardBreadcrumb';
export {DashboardBreadcrumb};

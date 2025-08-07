import prisma from '@/lib/db/prisma';
import {columns} from './columns';
import {DataTable} from './data-table';

export default async function Page() {
    const events = await prisma.events.findMany({});

    return (
        <div className="mx-auto py-10">
            <DataTable
                columns={columns}
                data={events}
            />
        </div>
    );
}

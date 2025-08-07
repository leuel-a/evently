import {headers} from 'next/headers';
import {auth} from '@/lib/auth';
import prisma from '@/lib/db/prisma';
import {columns} from './columns';
import {DataTable} from './data-table';

export default async function Page() {
    const session = await auth.api.getSession({headers: await headers()});
    const events = await prisma.events.findMany({where: {userId: session?.user.id}});

    return (
        <div className="mx-auto py-10">
            <DataTable
                columns={columns}
                data={events}
            />
        </div>
    );
}

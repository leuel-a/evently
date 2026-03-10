'use client';

import {SearchTickets} from '../Common';

export function FilterTicketsTable() {
    return (
        <div className="flex gap-2 mb-2">
            <div>
                <SearchTickets />
            </div>
        </div>
    );
}

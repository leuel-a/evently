import {KPICard} from '@/components/pages/dashboard/Common';
import {getDashboardStatistics} from './actions';

export default async function Page() {
    const result = await getDashboardStatistics();

    if (!result?.success || !result.data) {
        return;
    }

    const {
        totalEvents,
        totalPastEvents,
        totalUpcommingEvents,
        totalUniqueEventCategories,
        averagePriceForTicket,
    } = result.data;

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <KPICard
                    title="Total Events"
                    value={totalEvents}
                    footer={`${totalUpcommingEvents} upcoming, ${totalPastEvents} past`}
                />
                <KPICard
                    title="Event Categories"
                    value={totalUniqueEventCategories}
                    footer="Unique categories"
                />
                <KPICard
                    title="Average Ticket Price"
                    value={`Br ${averagePriceForTicket}`}
                    footer="Average price"
                />
            </div>
        </div>
    );
}

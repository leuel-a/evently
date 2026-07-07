import {redirect} from 'next/navigation';
import type {Metadata} from 'next';
import {getEvent} from '../../actions';
import {CheckoutPage} from '@/components/pages/Public/Checkout/CheckoutPage';
import {EVENT_STATUS} from '@/types/events';
import {APP_ROUTES} from '@/config/routes';

interface PageProps {
    params: Promise<{id: string}>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const {id} = await props.params;
    const {success, data} = await getEvent(id);

    if (success && data?.data) {
        const event = data?.data;
        return {
            title: `Checkout - ${event.title}`,
        };
    }

    return {title: 'Checkout'};
}

export default async function Page(props: PageProps) {
    const {id} = await props.params;
    const {success, data} = await getEvent(id);

    if (success && data?.data) {
        if (data?.data.status !== EVENT_STATUS.ACTIVE) {
            return redirect(`${APP_ROUTES.events.base}/${data?.data.id}`);
        }
        return <CheckoutPage event={data?.data} />;
    }
    return <></>
}

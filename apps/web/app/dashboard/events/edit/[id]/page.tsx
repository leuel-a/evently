import {
    UpdateEventForm,
} from '@/components/pages/Dashboard/Events/UpdateEventForm';
import {getEditEventsPageData} from '../../actions';

interface PageProps {
    params: Promise<{id: string}>;
}

export default async function Page(props: PageProps) {
    const {id} = await props.params;
    const {data} = await getEditEventsPageData(id);

    if (data?.data) {
        return <UpdateEventForm defaultValues={data?.data} />;
    }

    return <></>;
}


import {IEventsCategory} from './eventsCategory';

export type SettingsApiResponse = {
    category: {
        all: IEventsCategory[];
        active: IEventsCategory[];
    },
    resources: Array<{
        id: string,
        name: string,
    }>,
};

export type SettingsApiResponse = {
    category: {
        all: {id: string; name: string}[];
        active: {id: string; name: string}[];
    },
    resources: Array<{
        id: string,
        name: string,
    }>,
};

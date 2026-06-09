export type SettingsApiResponse = {
    tickets: {priceRange: {min: number; max: number}};
    categories: Array<{name: string; id: string}>;
    resources: Array<{name: string; id: string}>;
};

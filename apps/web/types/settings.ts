interface GetCategorySettingsApiResponse {
    colors: string[],
    identifiers: Array<{ name: string; id: string }>;
}

export type GetDashboardSettingsApiResponse = {
    tickets: { priceRange: { min: number; max: number } };
    categories: GetCategorySettingsApiResponse;
    resources: Array<{ name: string; id: string }>;
};

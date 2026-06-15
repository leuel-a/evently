import worldCountries from 'world-countries';
import {splitCamelCase, capitalizeFirstLetters} from './strings';

export function getLabelForResource(resource: string): string {
    const resourceString = splitCamelCase(resource);
    const labelResource = capitalizeFirstLetters(resourceString);
    return labelResource.endsWith('s') ? labelResource.slice(0, -1) : labelResource;
}

export const countries = worldCountries.map((country) => ({
    value: country.cca3,
    label: country.name.common,
}));

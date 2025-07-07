import lodashUpperCase from 'lodash/upperCase';
import lodashCapitalize from 'lodash/capitalize';

export function splitCamelCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function capitalizeFirstLetters(str: string, delimiter: string = ' '): string {
    const strings = str.split(delimiter);
    return strings.map((s) => lodashCapitalize(s)).join(delimiter);
}

export function uppercaseFirstLetters(str: string, delimiter: string = ' ') {
    const strings = str.split(delimiter);
    return strings.map((s) => lodashUpperCase(s)).join(delimiter);
}

import lodashCapitalize from 'lodash/capitalize';
import lodashUpperCase from 'lodash/upperCase';

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

export function convertEnumStyleStringToNormalString(string: string) {
    const lowerCaseStrings = string.split('_').map((value) => value.toLowerCase());

    if (lowerCaseStrings.length === 0) {
        return '';
    }
    return [lodashCapitalize(lowerCaseStrings[0]), ...lowerCaseStrings.splice(1)].join(' ');
}

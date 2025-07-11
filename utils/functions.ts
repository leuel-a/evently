import lodashIsEmpty from 'lodash/isEmpty';

export function removeEmptyStringsFromArray<T>(array: Array<T>) {
    return array.filter((value) => !lodashIsEmpty(value));
}

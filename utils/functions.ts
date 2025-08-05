import lodashIsEmpty from 'lodash/isEmpty';

export function removeEmptyStringsFromArray<T>(array: Array<T>) {
    return array.filter((value) => !lodashIsEmpty(value));
}

export function checkIfRelativeLink(candidate: string) {
    return /^\/[^\s]*$/.test(candidate);
}

export function convertObjectToFormData(object: Object) {
    const formData = new FormData();
    Object.entries(object).forEach(([key, value]) => {
        formData.append(key, String(value));
    });
    return formData;
}

export function convertFormDataToObject(formData: FormData) {
    return Object.fromEntries(formData.entries());
}

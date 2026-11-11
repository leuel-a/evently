import { format, getDate, getYear } from 'date-fns';

export function formatDate(
    date: Date,
    formatString: string = 'EEE, MMM d, yyyy'
) {
    return format(new Date(date), formatString);
}

export function formatEventDate(date: Date | string | number) {
    const d = new Date(date);
    return {
        day: formatDate(d, 'EEE'),
        date: getDate(d),
        month: formatDate(d, 'MMM'),
        year: getYear(d),
        full: formatDate(d, 'EEEE, MMMM d, yyyy'),
    };
}


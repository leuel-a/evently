import {format, parse} from 'date-fns';

export function formatDate(date: Date) {
    return format(new Date(date), 'EEE, MMM d, yyyy');
}

export function formatTime(hms?: string) {
    if (!hms) return '';

    const time = parse(hms, 'HH:mm:ss', new Date());
    return format(time, 'p');
}

import dayjs from 'dayjs';

export const DATE_FORMATS = {
  DEFAULT: 'YYYY-MM-DD',
  FULL_DATE: 'MMMM D, YYYY',
  SHORT_DATE: 'MM/DD/YYYY',
  LONG_DATE: 'dddd, MMMM D, YYYY',
  DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  ISO_DATETIME_FORMAT: 'YYYY-MM-DDTHH:mm:ssZ',
  HUMAN_READABLE: 'MMM D, YYYY h:mm A',
} as const;

export const isValidISODate = (value: string) => {
  return dayjs(value, DATE_FORMATS.ISO_DATETIME_FORMAT, true).isValid();
};

export function formatDate(date: string, format: keyof typeof DATE_FORMATS = 'DEFAULT') {
  return dayjs(date).format(DATE_FORMATS[format]);
}

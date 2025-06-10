import dayjs from 'dayjs';

export const ISO_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ'

export const isValidISODate = (value: string) => {
  return dayjs(value).isValid();
};

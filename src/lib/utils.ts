import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date) 

}

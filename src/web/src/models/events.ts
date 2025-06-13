import type { RaRecord } from 'react-admin';

export interface Event extends RaRecord {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  location: string;
  isRemote: boolean;
}

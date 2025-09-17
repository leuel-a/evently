import type {EventSchemaType} from '@/lib/db/schema';
import type {Record} from './base';

export interface Events extends Record, EventSchemaType {}

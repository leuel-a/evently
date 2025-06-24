import {Types} from 'mongoose';
import {formatDate} from '@/utils/date';

export const removeMongoFields = <T>(obj: T): T => {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => removeMongoFields(item)) as unknown as T;
  }

  const result = {...obj} as Record<string, any>;

  // Handle ObjectId and Date conversion for all fields
  Object.keys(result).forEach((key) => {
    if (result[key] instanceof Types.ObjectId) {
      result[key] = result[key].toString();
    } else if (result[key] instanceof Date) {
      result[key] = formatDate(result[key].toString(), 'ISO_DATETIME_FORMAT');
    } else if (result[key] && typeof result[key] === 'object') {
      result[key] = removeMongoFields(result[key]);
    }
  });

  // Handle _id to id conversion
  if (result._id) {
    result.id = result._id.toString();
  }
  delete result._id;
  delete result.__v;

  return result as T;
};

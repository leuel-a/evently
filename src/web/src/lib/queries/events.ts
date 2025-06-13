import type { GetListResult } from 'react-admin';
import type { Event } from '@models/events';
import { useQuery } from '@tanstack/react-query';
import { makeCall } from '@utils/api';

const fetchEvents = async (): Promise<GetListResult<Event>> => {
  const response: GetListResult<Event> = await makeCall({ requireAuth: false, url: 'events' });
  return response;
};

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
};

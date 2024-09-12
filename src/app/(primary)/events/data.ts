import { Event } from '@/types/event';

export const sampleEvents: Event[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Annual Tech Conference',
    description:
      'Join us for the latest in tech innovations and networking opportunities.',
    location: 'Addis Ababa Convention Center',
    startTime: new Date('2024-10-15T09:00:00Z'),
    endTime: new Date('2024-10-17T18:00:00Z'),
    category: 'Technology',
    createdBy: 'user123',
    createdAt: new Date('2024-09-07T06:52:00Z'),
    updatedAt: new Date('2024-09-07T06:52:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Community Cleanup Day',
    description:
      'Help keep our city clean! Bring gloves and join us for a day of community service.',
    location: 'Meskel Square',
    startTime: new Date('2024-09-21T08:00:00Z'),
    endTime: new Date('2024-09-21T12:00:00Z'),
    category: 'Community',
    createdBy: 'user456',
    createdAt: new Date('2024-09-07T07:15:00Z'),
    updatedAt: new Date('2024-09-07T07:15:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Ethiopian Coffee Festival',
    description:
      'Experience the rich flavors and traditions of Ethiopian coffee culture.',
    location: 'National Museum of Ethiopia',
    startTime: new Date('2024-11-01T10:00:00Z'),
    endTime: new Date('2024-11-03T20:00:00Z'),
    category: 'Culture',
    createdBy: 'user789',
    createdAt: new Date('2024-09-07T08:30:00Z'),
    updatedAt: new Date('2024-09-07T08:30:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Startup Pitch Night',
    description: null,
    location: 'BlueMoon Ethiopia',
    startTime: new Date('2024-10-05T18:00:00Z'),
    endTime: new Date('2024-10-05T21:00:00Z'),
    category: 'Business',
    createdBy: 'user101',
    createdAt: new Date('2024-09-07T09:00:00Z'),
    updatedAt: new Date('2024-09-07T09:00:00Z'),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'Addis Ababa Marathon',
    description:
      'Run through the streets of Addis Ababa in this annual marathon event.',
    location: 'Meskel Square to Bole Road',
    startTime: new Date('2024-11-24T06:00:00Z'),
    endTime: new Date('2024-11-24T14:00:00Z'),
    category: 'Sports',
    createdBy: 'user202',
    createdAt: new Date('2024-09-07T09:30:00Z'),
    updatedAt: new Date('2024-09-07T09:30:00Z'),
  },
];

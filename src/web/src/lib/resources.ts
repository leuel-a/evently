import type {ComponentType} from 'react';
import EventIcon from '@mui/icons-material/Event';
import {EventList} from '@pages/Dashboard/Events';

export interface ResourceConfig {
  name: string;
  List: ComponentType;
  icon?: any;
}

const resources: ResourceConfig[] = [
  {
    name: 'events',
    List: EventList,
    icon: EventIcon,
  },
];

export default resources;

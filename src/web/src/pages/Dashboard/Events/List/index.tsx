import {Datagrid, DateField, NumberField, TextField} from 'react-admin';
import {List} from '@components/blocks/List';

export function EventList() {
  return (
    <List>
      <Datagrid>
        <TextField source="title" />
        <NumberField source="capacity" />
        <DateField source="startDate" />
        <DateField source="endDate" />
      </Datagrid>
    </List>
  );
}

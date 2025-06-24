import {List as RaList} from 'react-admin';
import type {ListProps as RaListProps} from 'react-admin';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListProps extends RaListProps {}

export function List({children, ...rest}: ListProps) {
  // TODO: allow exporters to be passed from the parent
  return (
    <RaList
      exporter={false}
      actions={false}
      {...rest}
    >
      {children}
    </RaList>
  );
}

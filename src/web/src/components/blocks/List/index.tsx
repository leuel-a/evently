import {List as RaList} from 'react-admin';
import type {ListProps as RaListProps} from 'react-admin';

export interface ListProps extends RaListProps {}

export function List({children, ...rest}: ListProps) {
  return <RaList {...rest}>{children}</RaList>;
}

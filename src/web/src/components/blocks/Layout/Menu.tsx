import clsx from 'clsx';
import lodashGet from 'lodash/get';
import type {ReactNode} from 'react';
import {CLOSED_DRAWER_WIDTH, DRAWER_WIDTH, useSidebarState, ResourceMenuItems} from 'react-admin';
import {MenuList} from '@mui/material';
import {styled, useThemeProps} from '@mui/material/styles';

export const Menu = (inProps: MenuProps) => {
  const props = useThemeProps({props: inProps, name: PREFIX});
  const {children} = props;
  const [open] = useSidebarState();

  return (
    <Root
      className={clsx({
        [MenuClasses.open]: open,
        [MenuClasses.closed]: !open,
      })}
    >
      {children ?? <ResourceMenuItems/>}
    </Root>
  );
};

const PREFIX = 'CustomMenu';
const MenuClasses = {
  open: `${PREFIX}-open`,
  closed: `${PREFIX}-closed`,
};

const Root = styled(MenuList, {name: PREFIX})(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  [theme.breakpoints.only('xs')]: {
    marginTop: 0,
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [`&.${MenuClasses.open}`]: {
    width: lodashGet(theme, 'sidebar.width', DRAWER_WIDTH),
  },
  [`&.${MenuClasses.closed}`]: {
    width: lodashGet(theme, 'sidebar.closedWidth', CLOSED_DRAWER_WIDTH),
  },
}));

export interface MenuProps {
  children?: ReactNode;
}

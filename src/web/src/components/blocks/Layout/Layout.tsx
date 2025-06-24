import {LayoutClasses, Layout as RaLayout} from 'react-admin';
import type {LayoutProps as RaLayoutProps} from 'react-admin';
import {styled} from '@mui/material/styles';
import {AppBar} from './AppBar';
import {Menu} from './Menu';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LayoutProps extends RaLayoutProps {}

export function Layout({children, ...props}: LayoutProps) {
  return (
    <StyledRaLayout
      appBarAlwaysOn={false}
      appBar={AppBar}
      menu={Menu}
      {...props}
    >
      {children}
    </StyledRaLayout>
  );
}

const StyledRaLayout = styled(RaLayout)(({theme}) => ({
  [`& .${LayoutClasses.appFrame}`]: {
    marginTop: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(9),
    },
  },
}));

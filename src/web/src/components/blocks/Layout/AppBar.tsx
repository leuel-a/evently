import {memo} from 'react';
import type {FC} from 'react';
import {UserMenu} from 'react-admin';
import type {AppBarProps} from 'react-admin';
import {AppBar as MuiAppBar, Toolbar, useMediaQuery} from '@mui/material';
import type {Theme} from '@mui/material';
import {styled, useThemeProps} from '@mui/material/styles';
import {HideOnScroll} from '@components/ui';
import {SidebarToggleButton} from './SidebarToggleButton';

export const AppBar: FC<AppBarProps> = memo((inProps) => {
  const props = useThemeProps({
    name: PREFIX,
    props: inProps,
  });

  const isXSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  const {
    userMenu = DefaultUserMenu,
    alwaysOn,
    className,
    container: Container = alwaysOn ? 'div' : HideOnScroll,
  } = props;

  return (
    <Container className={className}>
      <StyledAppBar>
        <Toolbar
          disableGutters
          variant={isXSmall ? 'regular' : 'dense'}
        >
          <SidebarToggleButton />
          {typeof userMenu === 'boolean' ? userMenu === true ? <UserMenu /> : null : userMenu}
        </Toolbar>
      </StyledAppBar>
    </Container>
  );
});

const DefaultUserMenu = <UserMenu />;

const StyledAppBar = styled(MuiAppBar)(({theme}) => ({
  boxShadow: theme.shadows[0],
  backgroundColor: theme.palette.custom.white,
}));

const PREFIX = 'RaAppBar';

import {useSidebarState, useTranslate} from 'react-admin';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {IconButton, Tooltip} from '@mui/material';
import {styled} from '@mui/material/styles';

export function SidebarToggleButton() {
  const [open, setOpen] = useSidebarState();
  const translate = useTranslate();

  return (
    <Tooltip
      title={translate(open ? 'ra.action.close_menu' : 'ra.action.open_menu')}
      enterDelay={500}
    >
      <StyledIconButton onClick={() => setOpen(!open)}>
        {open ? <CloseIcon /> : <MenuIcon />}
      </StyledIconButton>
    </Tooltip>
  );
}

const PREFIX = 'CustomSidebarToggleButton';

const StyledIconButton = styled(IconButton, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({theme}) => ({
  color: theme.palette.primary.main,
}));

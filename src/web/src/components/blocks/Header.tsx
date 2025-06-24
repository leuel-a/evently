import {Link} from 'react-router-dom';
import {Button, List, ListItem, styled, Typography, useTheme} from '@mui/material';
import {Flex} from '@components/ui';

export function Header() {
  const theme = useTheme();

  // TODO: show a different UI when the user is authenticated
  return (
    <StyledHeader>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{height: '100%', marginInline: 'auto', maxWidth: '100rem'}}
      >
        <Flex>
          <Typography
            color="white"
            fontSize={30}
          >
            Evently
          </Typography>
          <StyledNav>
            <List sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <ListItem>
                <Typography color="white">Home</Typography>
              </ListItem>
            </List>
          </StyledNav>
        </Flex>

        <Flex gap="20px">
          <Button
            component={Link}
            to="/signup"
            sx={{
              border: `1px solid ${theme.palette.custom.white}`,
              borderRadius: '8px',
              color: theme.palette.custom.white,
              width: '100px',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.custom.white,
                color: theme.palette.primary.main,
              },
            }}
          >
            <Typography textTransform="capitalize">Login</Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.main,
              border: `1px solid ${theme.palette.custom.white}`,
              borderRadius: '8px',
            }}
          >
            <Typography
              textTransform="capitalize"
              color="white"
            >
              Are you an Organizer?
            </Typography>
          </Button>
        </Flex>
      </Flex>
    </StyledHeader>
  );
}

const StyledHeader = styled('header')(({theme}) => ({
  height: '80px',
  backgroundColor: theme.palette.primary.main,
}));

const StyledNav = styled('nav')(({}) => ({}));

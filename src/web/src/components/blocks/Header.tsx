import { Box, Button, List, ListItem, styled, Typography } from '@mui/material';

export function Header() {
  return (
    <StyledHeader>
      <Box
        sx={{
          width: '100rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Typography
            color="white"
            fontSize={30}
          >
            Evently
          </Typography>
          <StyledNav>
            <List sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <ListItem>
                <Typography color="white">Home</Typography>
              </ListItem>
            </List>
          </StyledNav>
        </Box>

        <Box>
          <Button sx={{}}>
            <Typography
              textTransform="capitalize"
              color="white"
            >
              Login
            </Typography>
          </Button>
          <Button>
            <Typography
              textTransform="capitalize"
              color="white"
            >
              Are you an Organizer?
            </Typography>
          </Button>
        </Box>
      </Box>
    </StyledHeader>
  );
}

const StyledHeader = styled('header')(({ theme }) => ({
  height: '80px',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledNav = styled('nav')(({}) => ({}));

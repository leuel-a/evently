import { Header } from '@components/blocks';
import { useEvents } from '@lib/queries/events';
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { formatDate } from '@utils/date';

function App() {
  const { data, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // TODO: find better ways to handle errors
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading events. Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh'}}>
      <Header />
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          fontSize={30}
        >
          Upcoming Events
        </Typography>
        <Grid
          container
          spacing={3}
        >
          {data?.data?.map((event) => (
            <Grid>
              <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {event.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    📅 {formatDate(event.startDate)}
                  </Typography>
                  {/* TODO: add conditional logic to check if the event is a remote or in-person gathering */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    📍 {event.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default App;

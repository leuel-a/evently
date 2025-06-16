import {Box, Card, CardContent, CircularProgress, Typography} from '@mui/material';
import {Header} from '@components/blocks';
import {useEvents} from '@lib/queries/events';
import {formatDate} from '@utils/date';

function App() {
  const {data, isLoading, error} = useEvents();

  if (isLoading) {
    return (
      <Box
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}
      >
        <CircularProgress />
      </Box>
    );
  }

  // TODO: find better ways to handle errors
  if (error) {
    return (
      <Box sx={{p: 3}}>
        <Typography color="error">Error loading events. Please try again later.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{minHeight: '100vh'}}>
      <Header />
      <Box sx={{maxWidth: 'lg', mx: 'auto', px: 2}}>
        <Typography
          variant="h3"
          component="h1"
          fontSize={30}
        >
          Upcoming Events
        </Typography>
        {data?.data?.map((event) => (
          <Card sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flexGrow: 1}}>
              <Typography>{event.title}</Typography>
              <Typography>{event.description}</Typography>
              <Typography>{formatDate(event.startDate)}</Typography>
              <Typography>{event.location}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default App;

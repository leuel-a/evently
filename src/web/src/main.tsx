import './resets.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import Signup from '@pages/Signup/index';
import Login from '@pages/Login/index';

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif'
  },
  palette: {
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#f59e0b'
    },
    custom: {
      white: '#ffffff'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#6366f1'
          }
        }
      }
    }
  }
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);

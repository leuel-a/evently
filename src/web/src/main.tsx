import './resets.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {Admin, Resource, defaultTheme} from 'react-admin';
import type {RaThemeOptions} from 'react-admin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {dataProvider, authProvider} from '@lib/providers'

import {Layout} from '@components/blocks/Layout';
import resources from '@lib/resources';

const queryClient = new QueryClient();

const theme: RaThemeOptions = {
  breakpoints: defaultTheme.breakpoints,
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif'
  },
  palette: {
    background: {
      default: '#fafbff',
    },
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#e5e7eb'
    },
    custom: {
      white: '#fff',
      lightGray: '#e5e7eb',
      gray: '#d1d5db'
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
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Admin authProvider={authProvider} dataProvider={dataProvider} layout={Layout} theme={theme}>
        {resources.map(({name, List, icon}) => (
            <Resource name={name} list={List} icon={icon}/>
        ))}
      </Admin>
    </QueryClientProvider>
  </StrictMode>,
);

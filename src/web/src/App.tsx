import { Admin, ListGuesser, Resource } from 'react-admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <Admin
              dataProvider={null}
              basename="/dashboard"
            >
              <Resource
                name="posts"
                list={ListGuesser}
              />
              <ReactQueryDevtools initialIsOpen={false} />
            </Admin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

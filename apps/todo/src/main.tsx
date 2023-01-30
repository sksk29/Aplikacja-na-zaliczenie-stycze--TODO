import * as ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import App from './app';
import AuthProviderWithNavigation from './auth/auth-provider-with-navigation.component';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
      >
        <AuthProviderWithNavigation>
          <App />
        </AuthProviderWithNavigation>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

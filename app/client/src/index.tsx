import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './css/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />

      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

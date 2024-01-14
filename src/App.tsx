import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 60 * 1000,
            gcTime: 60 * 1000 * 5,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

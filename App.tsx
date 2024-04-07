import React from 'react';
import AppNavigation from '@navigation';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>
  );
};

export default App;

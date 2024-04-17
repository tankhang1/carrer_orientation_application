import React from 'react';
import AppNavigation from '@navigation';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {queryClient} from '@utils/constants';
import {Host} from 'react-native-portalize';
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Host>
        <AppNavigation />
      </Host>
    </QueryClientProvider>
  );
};

export default App;

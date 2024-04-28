import React from 'react';
import AppNavigation from '@navigation';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {queryClient} from '@utils/constants';
import {Host} from 'react-native-portalize';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';
import {storage} from '@store';
import {DevToolsBubble} from 'react-native-react-query-devtools';
const App = () => {
  if (__DEV__) {
    initializeMMKVFlipper({default: storage});
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Host>
        <AppNavigation />
      </Host>
      {__DEV__ && <DevToolsBubble />}
    </QueryClientProvider>
  );
};

export default App;

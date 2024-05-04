import React from 'react';
import AppNavigation from '@navigation';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {queryClient} from '@utils/constants';
import {Host} from 'react-native-portalize';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';
import {storage} from '@store';
import {DevToolsBubble} from 'react-native-react-query-devtools';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
  if (__DEV__) {
    initializeMMKVFlipper({default: storage});
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Host>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppNavigation />
        </GestureHandlerRootView>
      </Host>
      {/* {__DEV__ && <DevToolsBubble />} */}
    </QueryClientProvider>
  );
};

export default App;

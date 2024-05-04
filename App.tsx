import React, {useEffect, useState} from 'react';
import AppNavigation from '@navigation';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {queryClient} from '@utils/constants';
import {Host} from 'react-native-portalize';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';
import {storage} from '@store';
import {DevToolsBubble} from 'react-native-react-query-devtools';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {addEventListener, useNetInfo} from '@react-native-community/netinfo';
import {AppNoInternet} from '@components';
import {onlineManager} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
const App = () => {
  if (__DEV__) {
    initializeMMKVFlipper({default: storage});
  }
  const [isInternet, setIsInternet] = useState<boolean | null>(false);

  useEffect(() => {
    // Subscribe
    const unsubscribe = addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsInternet(state.isConnected);
    });
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Host>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppNavigation />
          {!isInternet && <AppNoInternet />}
        </GestureHandlerRootView>
      </Host>
      {/* {__DEV__ && <DevToolsBubble />} */}
    </QueryClientProvider>
  );
};

export default App;

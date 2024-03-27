import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {atom, useAtom} from 'jotai';
import {atomWithQuery} from 'jotai-tanstack-query';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@utils/config';
import AppNavigation from '@navigation';
import BootSplash from 'react-native-bootsplash';
import Result from '@screens/Result';

const App = () => {
  useEffect(() => {
    BootSplash.hide({fade: true});
  }, []);
  return <AppNavigation />;
};

export default App;

import {View, Text} from 'react-native';
import React from 'react';
import {atom, useAtom} from 'jotai';
import {atomWithQuery} from 'jotai-tanstack-query';
import {useFlipper} from '@react-navigation/devtools';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@utils/config';
import AppNavigation from '@navigation';

const App = () => {
  return <AppNavigation />;
};

export default App;

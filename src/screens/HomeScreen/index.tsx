import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import {AppButton, AppCard, AppTextInput} from '@components';
import {s} from '@utils/config';
import AppImage from '@components/AppImage';
import AppNoData from '@components/AppNoData';
import {Carousel} from './components';
type Props = NativeStackScreenProps<TRootStackNav, 'HomeScreen'>;
const HomeScreen = () => {
  return (
    <View
      style={{
        gap: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Text>Home Screen</Text>
      {/* <Carousel /> */}
      <AppCard
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCm4MjY9Hr8BBGrOMaDjZGCru4ge0Se0OAw&usqp=CAU"
        title="Nhiều trường đại học công bố phương thức tuyển sinh"
        subTitle="17/3/2024"
      />
      <AppCard
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCm4MjY9Hr8BBGrOMaDjZGCru4ge0Se0OAw&usqp=CAU"
        title="Nhiều trường đại học công bố phương thức tuyển sinh"
        subTitle="17/3/2024"
        type="large"
      />
    </View>
  );
};

export default HomeScreen;

import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
type Props = NativeStackScreenProps<TRootStackNav, 'SplashScreen'>;
const SplashScreen = ({navigation}: Props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={{
          paddingHorizontal: 40,
          paddingVertical: 20,
          backgroundColor: 'red',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 24,
          }}>
          Navigation to Home Screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import {AppButton, AppTextInput} from '@components';
import {s} from '@utils/config';
type Props = NativeStackScreenProps<TRootStackNav, 'HomeScreen'>;
const HomeScreen = () => {
  return (
    <View
      style={{
        gap: 30,
      }}>
      <TouchableOpacity
        onPress={() => navigationRef.navigate('ChatBox')}
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
          Navigation to ChatBox
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationRef.navigate('News')}
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
          Navigation to News
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationRef.navigate('ListResult')}
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
          Navigation to List Result
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationRef.navigate('ListExam')}
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
          Navigation to List Exam
        </Text>
      </TouchableOpacity>
      <AppButton label="AA" width={s(320)} />
      <AppTextInput />
    </View>
  );
};

export default HomeScreen;

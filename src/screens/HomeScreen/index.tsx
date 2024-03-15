import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
type Props = NativeStackScreenProps<TRootStackNav, 'HomeScreen'>;
const HomeScreen = ({navigation}: Props) => {
  return (
    <View
      style={{
        gap: 30,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatBox')}
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
        onPress={() => navigation.navigate('News')}
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
        onPress={() => navigation.navigate('ListResult')}
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
        onPress={() => navigation.navigate('ListExam')}
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
    </View>
  );
};

export default HomeScreen;

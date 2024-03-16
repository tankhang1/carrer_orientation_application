import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
type Props = NativeStackScreenProps<TRootStackNav, 'News'>;
const News = () => {
  return (
    <View
      style={{
        gap: 20,
      }}>
      <TouchableOpacity
        onPress={() => navigationRef.navigate('NewsDetail1')}
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
          Navigation to New Detail 1
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigationRef.navigate('NewsDetail2')}
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
          Navigation to New Detail 2
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default News;

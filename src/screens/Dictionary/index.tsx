import {Button, ListRenderItemInfo, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {AppHeader, AppView} from '@components';
import DictionaryItem from './components/DictionaryItem';
import {COLORS, vs} from '@utils';
import {TAppViewRef} from '@components/AppView';
const data = [
  'Ngành nghề khối A',
  'Ngành nghề khối A1',
  'Ngành nghề khối B',
  'Ngành nghề khối C',
  'Ngành nghề khối D',
  'Ngành nghề khối A',
  'Ngành nghề khối A1',
  'Ngành nghề khối B',
  'Ngành nghề khối C',
  'Ngành nghề khối D',
  'Ngành nghề khối A',
  'Ngành nghề khối A1',
  'Ngành nghề khối B',
  'Ngành nghề khối C',
  'Ngành nghề khối D',
  'Ngành nghề khối A',
  'Ngành nghề khối A1',
  'Ngành nghề khối B',
  'Ngành nghề khối C',
  'Ngành nghề khối D',
];
const Dictionary = () => {
  const ref = useRef<TAppViewRef>(null);
  console.log('ref', ref);
  const renderItem = ({item, index}: ListRenderItemInfo<any>) => {
    const scrollToItem = () => {
      console.log(index);
      ref?.current?.scrollToItem(index);
    };
    return <DictionaryItem key={index} scrollToItem={scrollToItem} />;
    //return <Button title="press" onPress={scrollToItem} />;
  };
  return (
    <AppView
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={<AppHeader title="Từ điển ngành nghề" />}
      contentContainerStyle={{gap: vs(10)}}
      showsVerticalScrollIndicator={false}
      ref={ref}
    />
  );
};
const styles = StyleSheet.create({
  container: {},
});
export default Dictionary;

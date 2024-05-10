import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {AppHeader, AppView} from '@components';
import DictionaryItem from './components/DictionaryItem';
import {height, vs} from '@utils';
import {FlatList} from 'react-native-gesture-handler';

const data = [
  'Ngành nghề khối A',
  'Ngành nghề khối A1',
  'Ngành nghề khối B',
  'Ngành nghề khối A',
];
const Dictionary = () => {
  const ref = useRef<FlatList>(null);
  const scrollToIndex = (index: number) => {
    setTimeout(() => {
      if (ref.current && data.length > 0)
        ref?.current?.scrollToIndex({animated: true, index, viewPosition: 0});
    }, 300);
  };
  const renderItem = ({item, index}: ListRenderItemInfo<any>) => {
    return (
      <DictionaryItem
        key={index}
        scrollToItem={() => scrollToIndex(index)}
        title={'Ngành nghề khối A'}
      />
    );
  };
  return (
    <AppView scrollEnabled={false}>
      <View>
        <AppHeader title="Từ điển ngành nghề" />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ref={ref}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </AppView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
  },
  content: {
    gap: vs(10),
    paddingBottom: vs(50),
  },
});
export default Dictionary;

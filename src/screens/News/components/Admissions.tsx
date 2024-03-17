import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import React, {memo} from 'react';
import {COLORS, FONT, s, vs} from '@utils/config';
import {NewsDataCategories, TNewsCategory} from '../mock';
import AppImage from '@components/AppImage';
import {navigationRef} from '@navigation';

const Admissions = () => {
  const renderCategory = ({item, index}: ListRenderItemInfo<TNewsCategory>) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.categoryItem}
        onPress={() =>
          navigationRef.navigate('NewsDetail2', {title: item.title})
        }>
        <AppImage source={item.image} style={styles.image} />
        <Text style={FONT.title.M}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      scrollEnabled={false}
      data={NewsDataCategories}
      renderItem={renderCategory}
      numColumns={2}
      columnWrapperStyle={{
        gap: s(10),
      }}
      contentContainerStyle={{gap: vs(10)}}
    />
  );
};

export default memo(Admissions);
const styles = StyleSheet.create({
  categoryItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    paddingVertical: vs(20),
  },
  image: {width: s(45), height: s(45)},
});

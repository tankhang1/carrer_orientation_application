import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import React, {lazy, memo, Suspense} from 'react';
import {COLORS, FONT, s, vs} from '@utils/config';
import {NewsDataCategories, TNewsCategory} from '../mock';
import AppImage from '@components/AppImage';
import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
const CategoryItem = lazy(() => import('./CategoryItem'));
const Admissions = () => {
  const renderCategory = ({item, index}: ListRenderItemInfo<TNewsCategory>) => {
    return (
      <Suspense fallback={<AppSkeleton width={'100%'} height={'100%'} />}>
        <CategoryItem item={item} key={index} />
      </Suspense>
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

import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {lazy, memo, Suspense, useCallback} from 'react';
import {FONT, s, vs} from '@utils/config';

import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
const AppCard = lazy(() => import('@components/AppCard'));
const card = {
  imageUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGn6vq0C1-MRqFGbUcBJ7M9pn20QAp4JYQnw&usqp=CAU',
  date: new Date().toLocaleDateString(),
  title: 'Đại học UEH công bố phương thức tuyển sinh',
};
type TCard = {
  imageUrl: string;
  date: string;
  title: string;
};
const CARDS: TCard[] = new Array(6).fill(card);
const NewsCard = () => {
  const renderCard = useCallback(
    ({item, index}: {item: TCard; index: number}) => {
      return (
        <Suspense
          fallback={<AppSkeleton width={100} height={150} radius={10} />}>
          <AppCard
            key={index}
            index={index}
            imageUrl={item.imageUrl}
            title={item.title}
            subTitle={item.date.toString()}
          />
        </Suspense>
      );
    },
    [],
  );
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={FONT.content.M.bold}>Tin tức mới nhất</Text>
        <TouchableOpacity onPress={() => navigationRef.navigate('News')}>
          <Text style={FONT.link}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={CARDS}
        renderItem={renderCard}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        alwaysBounceHorizontal
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: vs(10),
  },
  title: {
    paddingHorizontal: s(27),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listContainer: {
    paddingHorizontal: s(27),
    gap: s(20),
    marginVertical: s(17),
  },
});
export default memo(NewsCard);

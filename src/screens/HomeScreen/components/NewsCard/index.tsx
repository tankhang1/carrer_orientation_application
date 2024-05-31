import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {lazy, memo, Suspense, useCallback} from 'react';
import {FONT, s, vs} from '@utils/config';

import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
import Animated from 'react-native-reanimated';
import {DefaultError, useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '@utils/constants';
import {INew} from '@interfaces/DTO';
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
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
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const NewsCard = () => {
  const {isLoading, data, isError, status} = useQuery<
    unknown,
    DefaultError,
    INew[]
  >({
    queryKey: [QUERY_KEY.NEWS, QUERY_KEY.NEWS_NEWEST],
    queryFn: () => useAPI(ENDPOINTS_URL.NEWS.GET_NEWEST_NEWS, 'GET', {}),
  });

  const renderCard = useCallback(
    ({item, index}: {item: INew; index: number}) => {
      return (
        <Suspense
          fallback={<AppSkeleton width={100} height={150} radius={10} />}>
          <Animated.View>
            <AppCard
              key={index}
              index={index}
              imageUrl={item.image.shortImage}
              title={item.title}
              subTitle={''}
              containerStyle={{
                width: s(100),
                height: s(160),
              }}
              onPress={() =>
                navigationRef.navigate('NewsDetail1', {content: item.content})
              }
            />
          </Animated.View>
        </Suspense>
      );
    },
    [],
  );
  if (!data) return null;
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
        data={data?.reverse()}
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

import {
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Button,
  Text,
} from 'react-native';
import React, {Suspense, useCallback, useEffect, useMemo, useRef} from 'react';
import {COLORS, s, width} from '@utils/config';
import AppImage from '@components/AppImage';
import Indicator, {TIndicatorRef} from './Indicator';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {QUERY_KEY} from '@utils/constants';
import {DefaultError, useQuery} from '@tanstack/react-query';
import {INew} from '@interfaces/DTO';
import {ENDPOINTS_URL} from '@service';
import useAPI from '@service/api';

const Carousel = () => {
  const currentPosition = useRef<number>(0);
  const interval = React.useRef<NodeJS.Timeout>();
  const listRef = useRef<FlatList>(null);
  const autoScroll = useRef<boolean>(true);

  const indicatorValue = useSharedValue(0);
  const indicatorRef = useRef<TIndicatorRef>(null);
  const {
    isLoading,
    data: news,
    isError,
  } = useQuery<unknown, DefaultError, INew[]>({
    queryKey: [QUERY_KEY.NEWS, QUERY_KEY.NEWS_NEWEST],
    queryFn: () => useAPI(ENDPOINTS_URL.NEWS.GET_NEWEST_NEWS, 'GET', {}),
  });
  const banners = useMemo(
    () =>
      !news
        ? [
            'https://cdythadong.edu.vn/uploads/files/tuyen%20sinh/2024/thong%20bao%20ts/thumbnail%20hdmc.png',
          ]
        : news?.map(item => item.image.longImage),
    [news],
  );
  const newsLength = useMemo(() => news?.length ?? 1, [news?.length]);
  const listWidth = useMemo(() => newsLength * width, [newsLength]);
  useEffect(() => {
    if (newsLength > 0 && !isLoading) {
      interval.current = setInterval(() => {
        if (autoScroll.current) {
          currentPosition.current += 1;
          if (currentPosition.current > newsLength - 1) {
            currentPosition.current = 0;
          }
          listRef?.current?.scrollToIndex({
            index: currentPosition.current,
            animated: true,
          });
          indicatorRef?.current?.scrollToIndicator(currentPosition.current);
        }
      }, 2000);
    }

    return () => {
      if (interval.current !== null) {
        clearInterval(interval.current);
        interval.current = undefined;
      }
    };
  }, [newsLength]);
  const onScrollBeginDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (newsLength <= 0) return;
      //autoScroll.current = false;
    },
    [newsLength],
  );
  const onScrollEndDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (newsLength <= 0) return;
      autoScroll.current = true;
      currentPosition.current = Math.round(
        e.nativeEvent.contentOffset.x / listWidth,
      );
      indicatorRef?.current?.scrollToIndicator(currentPosition.current);
    },
    [listWidth, newsLength],
  );
  const onScroll = useAnimatedScrollHandler(e => {
    indicatorValue.value = e.contentOffset.x;
  }, []);
  const renderItem = useCallback(
    ({item, index}: {item?: string; index: number}) => {
      return (
        <View style={styles.cardContainer} key={index}>
          <AppImage
            source={{uri: item ?? ''}}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
      );
    },
    [news],
  );

  return (
    <View
      style={styles.container}
      //onLayout={e => console.log(e.nativeEvent.layout.height)}
    >
      <Animated.FlatList
        data={banners as any}
        ref={listRef}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal
        onScrollBeginDrag={onScrollBeginDrag}
        onMomentumScrollEnd={onScrollEndDrag}
        removeClippedSubviews
        overScrollMode={'auto'}
        //snapToInterval={width}
        onScroll={onScroll}
      />
      <Indicator
        animatedValue={indicatorValue}
        length={news?.length ?? 1}
        ref={indicatorRef}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
  },
  cardContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: COLORS.white,
    width: s(294),
  },
});
export default Carousel;

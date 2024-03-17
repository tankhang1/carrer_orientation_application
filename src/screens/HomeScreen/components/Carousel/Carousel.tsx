import {
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Button,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {COLORS, s, width} from '@utils/config';
import AppImage from '@components/AppImage';
import Indicator, {TIndicatorRef} from './Indicator';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
const data = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCm4MjY9Hr8BBGrOMaDjZGCru4ge0Se0OAw&usqp=CAU',
  'https://cdythadong.edu.vn/uploads/files/tuyen%20sinh/2024/thong%20bao%20ts/thumbnail%20hdmc.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGn6vq0C1-MRqFGbUcBJ7M9pn20QAp4JYQnw&usqp=CAU',
];
const Carousel = () => {
  const currentPosition = useRef<number>(0);
  const interval = React.useRef<NodeJS.Timeout>();
  const listRef = useRef<FlatList>(null);
  const autoScroll = useRef<boolean>(true);
  const listWidth = useMemo(() => data.length * width, [data.length]);
  const indicatorValue = useSharedValue(0);
  const indicatorRef = useRef<TIndicatorRef>(null);
  useEffect(() => {
    if (data?.length > 0) {
      interval.current = setInterval(() => {
        if (autoScroll.current) {
          currentPosition.current += 1;
          if (currentPosition.current > data.length - 1) {
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
  }, []);
  const onScrollBeginDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (data?.length <= 0) return;
      //autoScroll.current = false;
    },
    [],
  );
  const onScrollEndDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (data?.length <= 0) return;
      autoScroll.current = true;
      currentPosition.current = Math.round(
        e.nativeEvent.contentOffset.x / listWidth,
      );
      indicatorRef?.current?.scrollToIndicator(currentPosition.current);
    },
    [listWidth],
  );
  const onScroll = useAnimatedScrollHandler(e => {
    indicatorValue.value = e.contentOffset.x;
  }, []);
  const renderItem = useCallback(
    ({item, index}: {item: string; index: number}) => {
      return (
        <View style={styles.cardContainer} key={index}>
          <AppImage
            source={{uri: item}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      );
    },
    [data],
  );
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
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
        length={data.length}
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

import {ListRenderItemInfo} from 'react-native';
import React from 'react';
import Animated, {SharedValue, useSharedValue} from 'react-native-reanimated';
import CardCarouselItem from './components/CardCarouselItem';
import {width} from '@utils';
type TAppCardCarousel<TData> = {
  data: TData[];
  renderItem?: (
    info: ListRenderItemInfo<TData>,
  ) => React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null;
  animatedScroll: SharedValue<number>;
  snapToInterval?: number;
};
const AppCardCarousel = <TData,>({
  data,
  renderItem,
  animatedScroll,
  snapToInterval,
}: TAppCardCarousel<TData>) => {
  return (
    <Animated.FlatList
      data={data}
      horizontal
      renderItem={renderItem}
      pagingEnabled
      snapToInterval={snapToInterval}
      showsHorizontalScrollIndicator={false}
      onScroll={e => {
        animatedScroll.value = e.nativeEvent.contentOffset.x;
      }}
    />
  );
};

export default AppCardCarousel;

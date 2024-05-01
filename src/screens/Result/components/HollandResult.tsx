import {View, StyleSheet} from 'react-native';
import React from 'react';
import {vs, width} from '@utils/config';
import Chart from './Chart';
import Title from './Title';
import {IResult, TExam} from '@interfaces/DTO';
import Animated, {useSharedValue} from 'react-native-reanimated';
import HollandResultItem from './HollandResultItem';
export type TResults = {
  type: TExam;
  resultContents: IResult[];
};
type THollandResult = {
  answers: Record<TExam, string>;
  results: TResults[];
};
const HollandResult = ({answers, results}: THollandResult) => {
  const animatedScroll = useSharedValue(0);
  const renderItem = ({
    item: result,
    index,
  }: {
    item: TResults;
    index: number;
  }) => {
    if (result?.type !== 'IQ' && result?.type !== 'EQ') {
      return (
        <HollandResultItem
          index={index}
          result={result}
          animatedScroll={animatedScroll}
        />
      );
    }

    return null;
  };
  return (
    <View style={styles.container}>
      <Title title="Holland" />
      <View style={{overflow: 'hidden'}}>
        <Chart answes={answers} />
      </View>
      <Animated.FlatList
        data={results}
        horizontal
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={width * 0.8}
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          animatedScroll.value = e.nativeEvent.contentOffset.x;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: vs(10),
  },
});
export default HollandResult;

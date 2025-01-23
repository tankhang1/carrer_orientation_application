import AppCardCarousel from '@components/AppCardCarousel';
import CardCarouseltItem from '@components/AppCardCarousel/components/CardCarouselItem';
import { FONT, height, s } from '@utils/config';
import { TSchoolScoreResult } from '@utils/types/metaTypes';
import React from 'react';
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
interface TScoreResult {
  scoreResults: TSchoolScoreResult[];
}
const ScoreResult = ({ scoreResults }: TScoreResult) => {
  const animatedScroll = useSharedValue(0);
  const renderItem = ({ item: result, index }: ListRenderItemInfo<any>) => {
    return (
      <CardCarouseltItem
        key={index}
        index={index}
        animatedScroll={animatedScroll}
        length={scoreResults?.length}
        h={height * 0.7}
        children={
          <>
            <Text style={FONT.content.M.bold}>- Khối {result.title}</Text>
            <Text style={FONT.content.M.regular}>{result.description}</Text>
          </>
        }
      />
    );
  };
  return (
    <View>
      <Text style={styles.text}>Với số điểm mà bạn cung cấp. Bạn có thể phù hợp với các khối nghành như:</Text>
      <AppCardCarousel data={scoreResults} animatedScroll={animatedScroll} renderItem={renderItem} />
    </View>
  );
};

export default ScoreResult;
const styles = StyleSheet.create({
  text: {
    ...FONT.content.M.bold,
    paddingHorizontal: s(27),
  },
});

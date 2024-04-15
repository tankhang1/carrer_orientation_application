import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useMemo} from 'react';
import {COLORS, FONT, s, vs, width} from '@utils/config';
import AppImage from '@components/AppImage';
import RenderHTML, {HTMLSource} from 'react-native-render-html';
import Chart from './Chart';
import Title from './Title';
import {IResult, TExam} from '@interfaces/DTO';
import {navigationRef} from '@navigation';
type TResults = {
  type: TExam;
  resultContents: IResult[];
};
type THollandResult = {
  answers: Record<TExam, string>;
  results: TResults[];
};
const SPACING = (width - width * 0.8) / 2;
const HollandResult = ({answers, results}: THollandResult) => {
  const renderItem = ({
    item: result,
    index,
  }: {
    item: TResults;
    index: number;
  }) => {
    if (result?.type !== 'IQ' && result?.type !== 'EQ')
      return (
        <View
          style={{
            marginLeft: index === 0 ? SPACING : 0,
            marginRight: index === 5 ? SPACING : 0,
            height: 'auto',
            width: width * 0.8,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.card}
            key={index}
            onPress={() => {
              navigationRef.navigate('ResultDetail', {
                url: result.resultContents[0].detail!,
              });
            }}>
            <View style={styles.imageContainer}>
              <AppImage
                source={{uri: result.resultContents[0].image}}
                style={styles.image}
              />
            </View>
            {result?.resultContents[0] && (
              <View>
                <RenderHTML
                  source={{
                    html: result?.resultContents[0]
                      .content as unknown as HTMLSource,
                  }}
                  contentWidth={200}
                  enableExperimentalMarginCollapsing={true}
                  tagsStyles={{
                    article: {color: COLORS.black},
                  }}
                />
                <Text>{index}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      );
    return null;
  };
  return (
    <View style={styles.container}>
      <Title title="Holland" />
      <View style={{overflow: 'hidden'}}>
        <Chart answes={answers} />
      </View>
      <FlatList
        data={results}
        horizontal
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={width * 0.8}
        showsHorizontalScrollIndicator
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: vs(10),
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    padding: s(10),
    gap: s(5),
    alignItems: 'center',
    width: width * 0.72,
  },
  image: {
    width: s(80),
    height: s(80),
  },
  imageContainer: {
    gap: vs(5),
    alignItems: 'center',
  },
  name: {
    ...FONT.content.M.bold,
    textAlign: 'center',
  },
});
export default HollandResult;

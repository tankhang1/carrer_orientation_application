import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import {COLORS, FONT, s, vs, width} from '@utils/config';
import AppImage from '@components/AppImage';
import {HOLLAND_RESULT} from '../mock';
import RenderHTML, {HTMLSource} from 'react-native-render-html';
import Chart from './Chart';
import Title from './Title';
import {useQuery} from '@tanstack/react-query';
import {IResult, TExam} from '@interfaces/DTO';
import WebView from 'react-native-webview';
type THollandResult = {
  answers: Record<TExam, string>;
  results: {
    type: TExam;
    resultContents: IResult[];
  }[];
};
const HollandResult = ({answers, results}: THollandResult) => {
  return (
    <View style={styles.container}>
      <Title title="Holland" />
      <View style={{overflow: 'hidden'}}>
        <Chart answes={answers} />
      </View>
      {results.map((result, index) => {
        if (result?.type !== 'IQ' && result?.type !== 'EQ')
          return (
            <TouchableOpacity
              style={styles.card}
              key={index}
              onLongPress={() => {}}>
              <View style={styles.imageContainer}>
                <AppImage
                  source={{uri: result.resultContents[0].image}}
                  style={styles.image}
                />
                {/* <Text style={styles.name}>{group.name}</Text> */}
              </View>
              {result?.resultContents[0] && (
                <View>
                  <RenderHTML
                    //source={group.source as HTMLSource}
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
                </View>
              )}
            </TouchableOpacity>
          );
      })}
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
    width: width - s(54),
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

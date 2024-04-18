import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {FONT, s, vs} from '@utils/config';
import {TSchoolScoreResult} from '@utils/types/metaTypes';
interface TScoreResult {
  scoreResults: TSchoolScoreResult[];
}
const ScoreResult = ({scoreResults}: TScoreResult) => {
  return (
    <View style={styles.overall}>
      <Text style={FONT.content.M.bold}>
        Với số điểm mà bạn cung cấp. Bạn có thể phù hợp với các khối nghành như:
      </Text>
      <View style={styles.bodyContainer}>
        <ScrollView
          horizontal
          style={{flex: 1}}
          contentContainerStyle={{gap: s(10)}}>
          {scoreResults.map((result, index) => (
            <View key={index} style={styles.item}>
              <Text style={FONT.content.M.bold}>- Khối {result.title}</Text>
              <Text style={FONT.content.M.regular}>{result.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ScoreResult;
const styles = StyleSheet.create({
  overall: {
    paddingHorizontal: s(20),
    width: '100%',
  },
  bodyContainer: {
    paddingHorizontal: 12,
    gap: vs(20),
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: s(10),
    padding: s(10),
    width: 300,

    flex: 1,
    height: 'auto',
  },
});

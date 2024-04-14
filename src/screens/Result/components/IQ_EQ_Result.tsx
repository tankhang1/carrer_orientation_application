import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import Title from './Title';
import {COLORS, FONT, s, vs, width} from '@utils/config';
import AppImage from '@components/AppImage';
import {IResult, TExam} from '@interfaces/DTO';
import RenderHTML, {HTMLSource} from 'react-native-render-html';
type Props = {
  answers: Record<TExam, string>;
  results: {
    type: TExam;
    resultContents: IResult[];
  }[];
};
const IQ_EQ_Result = ({answers, results}: Props) => {
  const IQ_Result = useMemo(() => {
    const resultContents = results.find(r => r.type === 'IQ')?.resultContents;
    const score = answers?.IQ?.split('/')[0];
    const evaluation = resultContents?.find(
      item =>
        item?.score &&
        parseInt(score) >= item!.score[0]! &&
        parseInt(score) <= item?.score[1]!,
    );
    return evaluation?.content;
  }, [results, answers]);

  const EQ_Result = useMemo(() => {
    const resultContents = results.find(r => r.type === 'EQ')?.resultContents;
    const score = answers?.EQ?.split('/')[0];
    const evaluation = resultContents?.find(
      item =>
        item?.score &&
        parseInt(score) >= item!.score[0]! &&
        parseInt(score) <= item?.score[1]!,
    );
    return evaluation?.content;
  }, [results, answers]);
  return (
    <View style={styles.container}>
      <Title title="Kiểm tra trí tuệ" />
      <AppImage
        source={require('@assets/images/IQImage.png')}
        style={styles.image}
      />
      <Text style={styles.score}>
        {answers?.IQ}: {IQ_Result}
      </Text>
      <Title title="Kiểm tra cảm xúc" />
      <AppImage
        source={require('@assets/images/EQResult.png')}
        style={styles.image}
      />
      <Text style={styles.score}>{answers?.EQ}</Text>
      <Text style={styles.content}>{EQ_Result}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: vs(10),
  },
  image: {
    width: width * 0.8,
    height: 200,
  },
  score: {
    ...FONT.content.L,
  },
  content: {
    ...FONT.content.M.medium,
    padding: s(27),
  },
});
export default IQ_EQ_Result;

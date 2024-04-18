import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import AppView from '@components/AppView';
import AppHeader from '@components/AppHeader';
import {Chart, HollandResult, IQ_EQ_Result, Title} from './components';
import {FONT, s, vs, width} from '@utils/config';
import {navigationRef} from '@navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {TAnswer} from '@utils/types/metaTypes';
import AppImage from '@components/AppImage';
import {QueryClient} from '@tanstack/query-core';
import {QUERY_KEY, queryClient} from '@utils/constants';
import {IExamResponse, IResult, TExam} from '@interfaces/DTO';
import {KEY_STORE, storage} from '@store';
import ScoreResult from './components/ScoreResult';

type Props = NativeStackScreenProps<TRootStackNav, 'Result'>;

export type TUserAnswers = Record<TExam, string>;
const Result = ({navigation, route}: Props) => {
  const answers = route?.params?.userAnswers;
  const scoreResults = route?.params?.schoolScoreResults;

  const data: IExamResponse | undefined = queryClient.getQueryData([
    QUERY_KEY.EXAMS,
  ]);
  const results = useMemo(() => {
    return data?.data?.map(item => ({
      type: item.type,
      resultContents: item.results ?? [],
    }));
  }, [data]);

  return (
    <AppView>
      <AppHeader title="Kết quả" onPress={() => navigation.pop(2)} />
      <ImageBackground
        source={require('@assets/images/background.jpg')}
        style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={FONT.title.M}>
            Trắc nghiệm nghề nghiệp cho học sinh THPT
          </Text>
          <Text style={FONT.content.M.regular}>Số bài thực hiện: 5</Text>
        </View>
        <View style={{gap: vs(10), padding: s(10)}}>
          <Text style={FONT.content.M.regular}>Kết quả</Text>
          <Text style={FONT.content.M.bold}>Nhóm thân thiện</Text>
        </View>
      </ImageBackground>

      <View style={{gap: vs(20)}}>
        {answers && <HollandResult answers={answers!} results={results!} />}
        {scoreResults && <ScoreResult scoreResults={scoreResults} />}
        {answers && <IQ_EQ_Result answers={answers!} results={results!} />}
      </View>
    </AppView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: vs(10),
    marginTop: vs(10),
    paddingHorizontal: s(27),
    marginBottom: vs(20),
  },
  header: {
    height: vs(100),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerContainer: {flex: 1, gap: vs(10), padding: s(10)},
  imageIQContainer: {
    width: '100%',
    height: 200,
    marginTop: vs(10),
  },
  eqQuestionContainer: {
    width: 100,
    height: 50,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: s(10),
  },
});
export default Result;

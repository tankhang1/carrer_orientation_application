import {View, StyleSheet, Text, Button, ActivityIndicator} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import {AppHeader, AppView} from '@components';
import {vs} from '@utils/config';
import {BottomButton} from './components';
import {IQQuestion, EQQuestion} from './components';
import HollandQuestion from './components/HollandQuestion/HollandQuestion';
import SchoolScore from './components/SchoolScore/SchoolScore';
import {DefaultError, useQuery} from '@tanstack/react-query';
type Props = NativeStackScreenProps<TRootStackNav, 'ExamQuestion'>;
const HollandType = ['R', 'I', 'A', 'S', 'E', 'C'];
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
import {IExam, IExamResponse, IResponse} from '@interfaces/DTO';
const ExamQuestion = () => {
  const {isPending, error, data, isLoading} = useQuery<
    unknown,
    DefaultError,
    IExamResponse
  >({
    queryKey: ['exam'],
    //queryFn: () => useAPI(ENDPOINTS_URL.EXAM.GET_EXAM, {method: 'GET'}),
    queryFn: () => useAPI(ENDPOINTS_URL.EXAM.GET_EXAM, 'GET', {}),
  });
  //console.log('data', data?.data);
  const [questionNumber, setQuestionNumber] = useState(0);

  const IQ = useMemo(
    () => data?.data?.find(exam => exam.type === 'IQ')?.questions || [],
    [data?.data],
  );
  const EQ = useMemo(
    () => data?.data?.find(exam => exam.type === 'EQ')?.questions || [],
    [data?.data],
  );
  const HOLLAND = useMemo(
    () =>
      data?.data?.filter(exam => exam.type !== 'IQ' && exam.type !== 'EQ') ||
      [],
    [data?.data],
  );
  const totalExams = useMemo(
    () => IQ?.length + EQ?.length + HOLLAND?.length,
    [data?.data],
  );
  const onNext = useCallback(() => {
    if (questionNumber <= totalExams) {
      setQuestionNumber(questionNumber + 1);
    }
    if (questionNumber > totalExams) navigationRef.navigate('Result');
  }, [data?.data, questionNumber, totalExams]);
  const onPrev = useCallback(() => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
    }
  }, [data?.data, questionNumber]);

  const headerTitle = useMemo(() => {
    if (questionNumber < IQ?.length) {
      return 'IQ';
    }
    if (questionNumber < IQ?.length + EQ?.length) {
      return 'EQ';
    }
    if (questionNumber < totalExams) {
      return 'Holland';
    }
    return 'Điểm trung bình';
  }, [questionNumber]);
  return (
    <>
      <AppView>
        <AppHeader title={headerTitle} />
        {isLoading || !data?.data ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <View style={styles.container}>
            {questionNumber < IQ?.length ? (
              <IQQuestion question={IQ[questionNumber]} />
            ) : questionNumber < IQ?.length + EQ?.length ? (
              <EQQuestion
                question={EQ[questionNumber - IQ?.length]}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
              />
            ) : questionNumber < totalExams ? (
              <HollandQuestion
                question={
                  HOLLAND[questionNumber - (IQ?.length + EQ?.length)]
                    .questions[0]
                }
              />
            ) : (
              <SchoolScore />
            )}
          </View>
        )}
      </AppView>
      <BottomButton onNext={onNext} onPrev={onPrev} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: vs(10),
    marginTop: vs(10),
    marginBottom: vs(100),
  },
});
export default ExamQuestion;

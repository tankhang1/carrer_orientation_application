import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import {AppHeader, AppModal, AppView} from '@components';
import {vs} from '@utils/config';
import {Question, SchoolScore, BottomButton} from './components';
import {DefaultError, useQuery} from '@tanstack/react-query';
type Props = NativeStackScreenProps<TRootStackNav, 'ExamQuestion'>;
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
import {IExam, IExamResponse, IResponse, TExam} from '@interfaces/DTO';
import {QUERY_KEY} from '@utils/constants';
export type TAnswer = Map<TExam, number[] | Record<string, number>>;
type TExamInfo = {
  headerTitle: string;
  examType: TExam;
};
const ExamQuestion = () => {
  const {isPending, error, data, isLoading} = useQuery<
    unknown,
    DefaultError,
    IExamResponse
  >({
    queryKey: [QUERY_KEY.EXAMS],
    queryFn: () => useAPI(ENDPOINTS_URL.EXAM.GET_EXAM, 'GET', {}),
  });
  const [questionNumber, setQuestionNumber] = useState(0);
  const [openModalNext, setOpenModalNext] = useState(false);
  //const [answers, setAnswers] = useState()
  const answers: TAnswer = new Map();
  const isContinue = useRef(false);
  const IQ = useMemo(
    () => data?.data?.find(exam => exam.type === 'IQ')?.questions || [],
    [data?.data],
  );
  const EQ = useMemo(
    () => data?.data?.find(exam => exam.type === 'EQ')?.questions || [],
    [data?.data],
  );
  const IQ_EQ_List = useMemo(() => [...IQ, ...EQ], [data?.data]);
  const HOLLAND = useMemo(
    () =>
      data?.data?.filter(exam => exam.type !== 'IQ' && exam.type !== 'EQ') ||
      [],
    [data?.data],
  );
  const totalExams = useMemo(() => data?.data?.length ?? 0, [data?.data]);
  const onNext = useCallback(() => {
    if (questionNumber <= totalExams) {
      setQuestionNumber(questionNumber + 1);
    }
    if (questionNumber > totalExams) navigationRef.navigate('Result');
    console.log('answer', answers);
  }, [data?.data, questionNumber, totalExams]);

  const onPrev = useCallback(() => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
    }
  }, [data?.data, questionNumber]);

  const examInfo: TExamInfo = useMemo(() => {
    if (questionNumber < HOLLAND?.length) {
      return {
        headerTitle: 'Holland',
        examType: HOLLAND[questionNumber].type,
      };
    }
    if (questionNumber < HOLLAND?.length + IQ?.length) {
      return {headerTitle: 'Kiểm tra trí tuệ', examType: 'IQ'};
    }
    if (questionNumber < totalExams) {
      return {headerTitle: 'Kiểm tra cảm xúc', examType: 'EQ'};
    }
    return {headerTitle: 'Điểm trung bình', examType: 'SchoolScore'};
  }, [questionNumber]);
  useEffect(() => {
    if (
      questionNumber === HOLLAND?.length &&
      !isContinue?.current &&
      data?.data
    ) {
      setOpenModalNext(true);
      isContinue.current = true;
    }
  }, [questionNumber, isContinue?.current, data]);

  return (
    <>
      <AppView>
        <AppHeader title={examInfo.headerTitle} />
        {isLoading || !data?.data ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <View style={styles.container}>
            {questionNumber < totalExams ? (
              <Question
                question={
                  questionNumber < HOLLAND?.length
                    ? HOLLAND[questionNumber].questions[0]
                    : IQ_EQ_List[questionNumber - HOLLAND?.length]
                }
                questionNumber={questionNumber}
                type={examInfo.examType}
                answers={answers}
                questionIndex={questionNumber - HOLLAND?.length + 1}
              />
            ) : (
              <SchoolScore />
            )}
          </View>
        )}
      </AppView>
      <BottomButton onNext={onNext} onPrev={onPrev} />
      <AppModal
        disableBackDrop={true}
        visible={openModalNext}
        setVisible={setOpenModalNext}
        title={`Bạn có muốn tiếp tục làm bài kiểm tra trí tuệ và cảm xúc ?\n\nBài kiểm tra có thể mất 30 phút nhưng sẽ giúp định hướng nghề nghiệp chính xác hơn.`}
        onAccept={() => setOpenModalNext(false)}
        onCancel={() => {
          navigationRef.navigate('Result');
          setOpenModalNext(false);
        }}
      />
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

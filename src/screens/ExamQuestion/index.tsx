import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import {AppHeader, AppModal, AppView} from '@components';
import {vs} from '@utils/config';
import {Question, SchoolScore, BottomButton} from './components';
import {DefaultError, useMutation, useQuery} from '@tanstack/react-query';
type Props = NativeStackScreenProps<TRootStackNav, 'ExamQuestion'>;
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
import {IExamResponse, TExam} from '@interfaces/DTO';
import {QUERY_KEY} from '@utils/constants';
import {TAnswer, TSchoolScoreResult} from '@utils/types/metaTypes';
import {initialSubjects, TSubject} from './components/SchoolScore/constant';
import {KEY_STORE, storage} from '@store';

type TExamInfo = {
  headerTitle: string;
  examType: TExam;
};
const initialAnswers: TAnswer = new Map([
  ['R', []],
  ['I', []],
  ['A', []],
  ['S', []],
  ['E', []],
  ['C', []],
  ['IQ', []],
  ['EQ', []],
]);
const ExamQuestion = () => {
  const {isPending, error, data, isLoading} = useQuery<
    unknown,
    DefaultError,
    IExamResponse
  >({
    queryKey: [QUERY_KEY.EXAMS],
    queryFn: () => useAPI(ENDPOINTS_URL.EXAM.GET_EXAM, 'GET', {}),
  });
  const postSchoolScore = useMutation({
    mutationKey: [QUERY_KEY.CACULATE_SCHOOL_SCORE],
    mutationFn: (variables: Record<string, TSubject>) => {
      console.log('convert', variables);
      return useAPI(
        ENDPOINTS_URL.SCHOOL_SUBJECTS.CACULATE_SCHOOL_SCORE,
        'POST',
        {
          data: {
            scores: variables,
          },
        },
      );
    },
    onSuccess: (data: any, variables, context) => {
      const userAnswers = calculateUserAnswer();
      const storedUserAnswers = {
        date: new Date().getTime(),
        userAnswers,
      };
      const currentListResult = storage.getString(KEY_STORE.LIST_RESULT) ?? [];
      storage.set(
        KEY_STORE.LIST_RESULT,
        JSON.stringify([storedUserAnswers, ...currentListResult]),
      );
      navigationRef.navigate('Result', {
        userAnswers,
        schoolScoreResults: data.data,
      });
    },
  });
  const [questionNumber, setQuestionNumber] = useState(0);
  const [openModalNext, setOpenModalNext] = useState(false);
  const [answers, setAnswers] = useState<TAnswer>(initialAnswers);
  const [selections, setSelections] = useState<number[]>([]);
  const [errorNotAnswer, setErrorNotAnswer] = useState(false);
  const [subjects, setSubjects] =
    useState<Record<string, TSubject>>(initialSubjects);
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
  const totalExams = useMemo(
    () => HOLLAND?.length + IQ_EQ_List?.length || 1,
    [data?.data],
  );
  const questionIndex = useMemo(
    () => questionNumber - HOLLAND?.length,
    [questionNumber, HOLLAND?.length],
  );
  const onUpdateAnswer = () => {
    const currentAnswer = answers;
    if (examInfo.examType === 'EQ' || examInfo.examType === 'IQ') {
      let tmp = currentAnswer.get(examInfo.examType)!;
      tmp[questionIndex] = selections[0];
      currentAnswer.set(examInfo.examType, tmp);
      setAnswers(currentAnswer);
      return;
    }
    currentAnswer.set(examInfo.examType, selections);
    setAnswers(currentAnswer);
  };
  const caculateSchoolScore = async () => {
    const data: Record<string, TSubject> = {
      Biology: {
        ...subjects['Biology'],
        value: !!subjects['Biology']?.value ? +subjects['Biology'].value : 0,
      },
      Chemistry: {
        ...subjects['Chemistry'],
        value: !!subjects['Chemistry']?.value
          ? +subjects['Chemistry'].value
          : 0,
      },
      English: {
        ...subjects['English'],
        value: !!subjects['English']?.value ? +subjects['English'].value : 0,
      },
      Geography: {
        ...subjects['Geography'],
        value: !!subjects['Geography']?.value
          ? +subjects['Geography'].value
          : 0,
      },
      History: {
        ...subjects['History'],
        value: !!subjects['History']?.value ? +subjects['History'].value : 0,
      },
      Informatics: {
        ...subjects['Informatics'],
        value: !!subjects['Informatics']?.value
          ? +subjects['Informatics'].value
          : 0,
      },
      Literature: {
        ...subjects['Literature'],
        value: !!subjects['Literature']?.value
          ? +subjects['Literature'].value
          : 0,
      },
      Math: {
        ...subjects['Math'],
        value: !!subjects['Math']?.value ? +subjects['Math'].value : 0,
      },
      Physics: {
        ...subjects['Physics'],
        value: !!subjects['Physics']?.value ? +subjects['Physics'].value : 0,
      },
      CivicEducation: {
        ...subjects['CivicEducation'],
        value: !!subjects['CivicEducation']?.value
          ? +subjects['CivicEducation'].value
          : 0,
      },
    };
    postSchoolScore.mutate(data);
  };
  const onNext = useCallback(() => {
    if (questionNumber === totalExams) {
      // const userAnswers = calculateUserAnswer();

      // const schoolScoreResult =
      caculateSchoolScore();
      // console.log('schoolScoreResult', schoolScoreResult);
      // navigationRef.navigate('Result', {userAnswers});
    }

    if (selections?.length === 0 || selections[0] === -1) {
      setErrorNotAnswer(true);
      return;
    }
    if (errorNotAnswer) {
      setErrorNotAnswer(false);
    }
    if (questionNumber < totalExams) {
      setQuestionNumber(questionNumber + 1);
      onUpdateAnswer();
    }
  }, [data?.data, questionNumber, totalExams, selections]);

  //console.log('totalExams', totalExams);
  const onPrev = useCallback(() => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
      onUpdateAnswer();
    }
  }, [data?.data, questionNumber, selections]);
  const examInfo: TExamInfo = useMemo(() => {
    if (questionNumber < HOLLAND?.length || questionNumber === 0) {
      return {
        headerTitle: 'Holland',
        examType: HOLLAND[questionNumber]?.type || 'R',
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

  const calculateUserAnswer = () => {
    const userAnswers = {};
    let IQ_Score = 0;
    answers.get('IQ')?.forEach((answer, index) => {
      if (IQ[index]?.options[answer]?.isResult) {
        IQ_Score += 1;
      }
    });
    let EQ_Score = 0;
    answers.get('EQ')?.forEach((answer, index) => {
      if (EQ[index]?.options[answer]?.isResult) {
        EQ_Score += 1;
      }
    });
    answers?.forEach((value, key) => {
      if (key !== 'EQ' && key !== 'IQ') {
        Object.assign(userAnswers, {
          [key]: `${value.length}/10`,
        });
      }
    });
    Object.assign(userAnswers, {
      IQ: `${IQ_Score}/${IQ?.length}`,
      EQ: `${EQ_Score}/${EQ?.length}`,
    });
    return userAnswers;
  };
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
                    : IQ_EQ_List[questionIndex]
                }
                questionNumber={questionNumber}
                type={examInfo.examType}
                questionIndex={questionIndex}
                selections={selections}
                setSelections={setSelections}
                answers={answers}
                error={errorNotAnswer}
              />
            ) : (
              <SchoolScore subjects={subjects} setSubjects={setSubjects} />
            )}
            {/* <SchoolScore /> */}
          </View>
        )}
      </AppView>
      <BottomButton
        onNext={onNext}
        onPrev={onPrev}
        maxValue={totalExams}
        currentValue={questionNumber}
      />
      <AppModal
        disableBackDrop={true}
        visible={openModalNext}
        setVisible={setOpenModalNext}
        title={`Bạn có muốn tiếp tục làm bài kiểm tra trí tuệ và cảm xúc ?\n\nBài kiểm tra có thể mất 30 phút nhưng sẽ giúp định hướng nghề nghiệp chính xác hơn.`}
        onAccept={() => setOpenModalNext(false)}
        onCancel={() => {
          setQuestionNumber(totalExams);
          //navigationRef.navigate('Result');
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

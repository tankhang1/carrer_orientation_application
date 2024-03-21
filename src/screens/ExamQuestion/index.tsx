import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import {AppProgressBar} from '@components';
import AppHeader from '@components/AppHeader';
import AppView from '@components/AppView';
import {vs} from '@utils/config';
import {BottomButton} from './components';
import AppImage from '@components/AppImage';
import {IQQuestion, EQQuestion} from './components';
import HollandQuestion from './components/HollandQuestion/HollandQuestion';
import SchoolScore from './components/SchoolScore/SchoolScore';
type Props = NativeStackScreenProps<TRootStackNav, 'ExamQuestion'>;
const HollandType = ['R', 'I', 'A', 'S', 'E', 'C'];
import {SAMPLE_EXAM} from './mock';
const ExamQuestion = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const IQ = useMemo(() => SAMPLE_EXAM[0].questions, []);
  const EQ = useMemo(() => SAMPLE_EXAM[1].questions, []);
  const HOLLAND = useMemo(() => SAMPLE_EXAM[2].questions, []);
  const onNext = useCallback(() => {
    if (questionNumber < SAMPLE_EXAM?.length - 1) {
      setQuestionNumber(questionNumber + 1);
    }
  }, [SAMPLE_EXAM, questionNumber]);
  const onPrev = useCallback(() => {
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
    }
  }, [SAMPLE_EXAM, questionNumber]);

  const headerTitle = useMemo(() => {
    if (questionNumber < IQ?.length) {
      return 'IQ';
    }
    if (questionNumber < IQ?.length + EQ?.length) {
      return 'EQ';
    }
    if (questionNumber < IQ?.length + EQ?.length + HOLLAND?.length) {
      return 'Holland';
    }
    return 'Điểm trung bình';
  }, [questionNumber]);

  return (
    <>
      <AppView>
        <AppHeader title={headerTitle} />
        <View style={styles.container}>
          {questionNumber < IQ?.length ? (
            <IQQuestion question={IQ[questionNumber]} />
          ) : questionNumber < IQ?.length + EQ?.length ? (
            <EQQuestion
              question={EQ[IQ?.length - questionNumber]}
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
            />
          ) : questionNumber < IQ?.length + EQ?.length + HOLLAND?.length ? (
            <HollandQuestion
              question={HOLLAND[IQ?.length + EQ?.length - questionNumber]}
            />
          ) : (
            <SchoolScore />
          )}
        </View>
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

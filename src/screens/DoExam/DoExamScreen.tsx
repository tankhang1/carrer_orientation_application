import { AppHeader, AppModal, AppView } from '@components';
import { IExamDetailResponse } from '@interfaces/DTO';
import { navigationRef } from '@navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomButton } from '@screens/ExamQuestion/components';
import { ENDPOINTS_URL } from '@service';
import api from '@service/api';
import { DefaultError, useQuery } from '@tanstack/react-query';
import { COLORS, QUERY_KEY, s } from '@utils';
import { TRootStackNav } from '@utils/types/RootStackNav';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import DoExamQuestion from './components/DoExamQuestion';
type Props = NativeStackScreenProps<TRootStackNav, 'DoExam'>;
const DoExamScreen = ({ route }: Props) => {
  // STATES
  const [openContinueModal, setOpenContinueModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // APIS
  const { data: exam, isLoading } = useQuery<unknown, DefaultError, IExamDetailResponse>({
    queryKey: [QUERY_KEY.DESIGN_EXAM],
    queryFn: () =>
      api(ENDPOINTS_URL.EXAM.DETAIL, 'GET', {
        params: { id: route?.params?.examId },
      }),
    enabled: !!route?.params?.examId,
  });

  // METHODS
  const onNext = () => {
    if (currentQuestion < (exam?.data?.questions?.length || 0)) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const onPrev = () => {
    if (currentQuestion >= 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <React.Fragment>
      <AppView>
        <AppHeader title='Làm bài kiểm tra' onPress={() => setOpenContinueModal(true)} />
        {isLoading ? (
          <ActivityIndicator size={'large'} color={COLORS.green} />
        ) : (
          <View style={styles.container}>
            <DoExamQuestion question={exam?.data?.questions[currentQuestion]} />
          </View>
        )}
      </AppView>

      <BottomButton
        onNext={onNext}
        onPrev={onPrev}
        maxValue={exam?.data?.questions?.length || 1}
        currentValue={currentQuestion + 1}
      />
      <AppModal
        visible={openContinueModal}
        cancelText='Thoát'
        confirmText='Tiếp tục'
        title='Nếu thoát bài kiểm tra, kết quả sẽ không được lưu! Bạn có muốn tiếp tục?'
        onAccept={() => setOpenContinueModal(false)}
        onCancel={() => navigationRef?.goBack()}
        setVisible={setOpenContinueModal}
      />
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(27),
  },
});
export default DoExamScreen;

import { AppHeader, AppModal, AppView } from '@components';
import { IExamDetailResponse } from '@interfaces/DTO';
import { IDoExam, IMyAnswers } from '@interfaces/DTO/DoExam/do-exam';
import { navigationRef } from '@navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomButton } from '@screens/ExamQuestion/components';
import { ENDPOINTS_URL } from '@service';
import api from '@service/api';
import { DefaultError, useMutation, useQuery } from '@tanstack/react-query';
import { COLORS, QUERY_KEY, s, vs } from '@utils';
import { EQuestionType } from '@utils/enum/exam.enum';
import { TRootStackNav } from '@utils/types/RootStackNav';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import DoExamQuestion from './components/DoExamQuestion';
type Props = NativeStackScreenProps<TRootStackNav, 'DoExam'>;
const DoExamScreen = ({ route }: Props) => {
  // STATES
  const [openContinueModal, setOpenContinueModal] = useState(false);
  const [openSubmitExamModal, setOpenSubmitExamModal] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [myAnswers, setMyAnswers] = useState<IMyAnswers[]>([]);
  const [error, setError] = useState(false);

  // APIS
  const { data: exam, isLoading } = useQuery<unknown, DefaultError, IExamDetailResponse>({
    queryKey: [QUERY_KEY.DESIGN_EXAM],
    queryFn: () =>
      api(ENDPOINTS_URL.EXAM.DETAIL, 'GET', {
        params: { id: route?.params?.examId },
      }),
    enabled: !!route?.params?.examId,
  });

  const { mutate: addDoExamApi, isPending: isAddingDoExam } = useMutation({
    mutationFn: () =>
      api<any, IDoExam>(ENDPOINTS_URL.DO_EXAM, 'POST', {
        data: {
          examId: route?.params?.examId as string,
          groupId: route?.params?.groupId as string,
          myAnswers: myAnswers,
        },
      }),
    onSuccess: () => {
      setOpenSubmitExamModal(false);
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Nộp bài kiểm tra thành công!',
      });
      navigationRef.goBack();
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Cảnh báo',
        text2: 'Có lỗi xảy ra, vui lòng thử lại!',
      });
    },
  });

  // METHODS
  const onNext = () => {
    const question = exam?.data?.questions[currentQuestion];
    const answer = myAnswers?.find((item) => item?.questionId === question?._id);
    if (question?.questionType === EQuestionType.SHORT_ANSWER) {
      if (!answer?.shortAnswer) {
        setError(true);
        return;
      }
    }

    if (question?.questionType === EQuestionType.MULTIPLE_CHOICE || question?.questionType === EQuestionType.TICK_BOX) {
      if (answer?.answers?.length === 0) {
        setError(true);
        return;
      }
    }

    setError(false);

    const max = (exam?.data?.questions?.length || 1) - 1;

    if (currentQuestion < max) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setOpenSubmitExamModal(true);
      console.log('my Answer', myAnswers);
    }
  };

  const onPrev = () => {
    if (currentQuestion >= 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // EFFECTS
  useEffect(() => {
    if (exam?.data?.questions?.length !== 0) {
      const answers: IMyAnswers[] =
        exam?.data?.questions?.map((item) => ({
          questionId: item._id,
          answers: [],
        })) || [];
      setMyAnswers(answers);
    }
  }, [exam?.data?.questions]);

  return (
    <React.Fragment>
      <AppView style={{ marginBottom: vs(44) }} showsVerticalScrollIndicator={false}>
        <AppHeader title='Làm bài kiểm tra' onPress={() => setOpenContinueModal(true)} />
        {isLoading ? (
          <ActivityIndicator size={'large'} color={COLORS.green} />
        ) : (
          <View style={styles.container}>
            <DoExamQuestion
              question={exam?.data?.questions[currentQuestion]}
              myAnswers={myAnswers}
              setMyAnswers={setMyAnswers}
              error={error}
            />
          </View>
        )}
      </AppView>

      {exam?.data?.questions?.length && (
        <BottomButton
          onNext={onNext}
          onPrev={onPrev}
          maxValue={exam?.data?.questions?.length || 1}
          currentValue={currentQuestion + 1}
        />
      )}

      <AppModal
        visible={openContinueModal}
        cancelText='Thoát'
        confirmText='Tiếp tục'
        title='Nếu thoát bài kiểm tra, kết quả sẽ không được lưu! Bạn có muốn tiếp tục?'
        onAccept={() => setOpenContinueModal(false)}
        onCancel={() => navigationRef?.goBack()}
        setVisible={setOpenContinueModal}
      />

      <AppModal
        visible={openSubmitExamModal}
        setVisible={setOpenSubmitExamModal}
        confirmText='Nộp'
        cancelText='Huỷ'
        //onCancel={() => {}}
        onAccept={() => {
          addDoExamApi();
        }}
        title='Bạn có chắc chắn muốn nộp bài?'
        loading={isAddingDoExam}
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

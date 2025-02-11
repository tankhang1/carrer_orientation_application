import { IConclusionResponse, TExam } from '@interfaces/DTO';
import { navigationRef } from '@navigation';
import { ENDPOINTS_URL } from '@service';
import api from '@service/api';
import { DefaultError, useQuery } from '@tanstack/react-query';
import { COLORS, FONT, s, vs } from '@utils/config';
import { QUERY_KEY } from '@utils/constants';
import { TResults, TSchoolScoreResult } from '@utils/types/metaTypes';
import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Title from './Title';
type TConclusion = {
  answers: Record<TExam, string>;
  results: TResults[];
  scoreResults: TSchoolScoreResult[];
};
const Conclusion = ({ answers, results, scoreResults }: TConclusion) => {
  const IQ_Result = useMemo(() => {
    const resultContents = results.find((r) => r.type === 'IQ')?.resultContents;
    const score = answers?.IQ?.split('/')[0];
    const evaluation = resultContents?.find((item) => item?.score && +score >= item!.score[0]! && +score <= item?.score[1]!);
    if (evaluation) {
      return `${evaluation?.score![0]} - ${evaluation?.score![1]}`;
    }
    return '-';
  }, [results, answers]);
  const EQ_Result = useMemo(() => {
    const resultContents = results.find((r) => r.type === 'EQ')?.resultContents;
    const score = answers?.EQ?.split('/')[0];
    const evaluation = resultContents?.find((item) => item?.score && +score >= item!.score[0]! && +score <= item?.score[1]!);
    if (evaluation) {
      return `${evaluation?.score![0]} - ${evaluation?.score![1]}`;
    }
    return '-';
  }, [results, answers]);

  const schoolResult = useMemo(() => {
    if (scoreResults?.length === 0) return 'A';
    return scoreResults[0]?.title;
  }, [scoreResults]);

  const HollandResult = useMemo(() => {
    return Object.keys(answers)
      .filter((key) => key !== 'IQ' && key !== 'EQ')
      .reduce(
        (maxKey, key) =>
          Number(answers[key as TExam].split('/')[0]) > Number(answers[maxKey as TExam]!.split('/')[0]) ? key : maxKey,
        'R',
      );
  }, [results, answers]);
  const { isLoading, data } = useQuery<unknown, DefaultError, IConclusionResponse>({
    queryKey: [QUERY_KEY.CONCLUSION],
    queryFn: () =>
      api(ENDPOINTS_URL.CONCLUSION.GET_CONCLUSION, 'POST', {
        data: {
          IQ: IQ_Result,
          EQ: EQ_Result,
          SchoolScore: schoolResult,
          Holland: HollandResult,
          IQScore: answers?.IQ?.split('/')?.[0] || 0,
          EQScore: answers?.EQ?.split('/')?.[0] || 0,
        },
      }),
    enabled: !!IQ_Result && !!EQ_Result && !!HollandResult && !!schoolResult,
  });
  const onSchoolScreen = () => {
    navigationRef.navigate('School');
  };
  console.log({
    IQ: IQ_Result,
    EQ: EQ_Result,
    SchoolScore: schoolResult,
    Holland: HollandResult,
    IQScore: answers?.IQ?.split('/')?.[0] || 0,
    EQScore: answers?.EQ?.split('/')?.[0] || 0,
  });

  const conclusions = useMemo(() => data?.data, [data?.data]);

  if (isLoading) return <ActivityIndicator color={COLORS.green} size={'small'} />;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Title title='Kết luận' />
        <TouchableOpacity hitSlop={10} onPress={onSchoolScreen} style={{ marginRight: 18 }}>
          <Entypo name='chevron-right' size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.subTitle}>
          • Lĩnh vực:
          <Text style={styles.content}> {conclusions?.Field}</Text>
        </Text>
        <View style={styles.rows}>
          <Text style={styles.subTitle}>• Ngành nghề phù hợp:</Text>
          {/* <TouchableOpacity hitSlop={10} onPress={onSchoolScreen}>
            <AntDesign name='arrowright' size={24} color={COLORS.black} />
          </TouchableOpacity> */}
        </View>
        <Text style={styles.content}>{conclusions?.Jobs}</Text>

        <Text style={styles.subTitle}>• Trường Đại học, cao đẳng đào tạo:</Text>
        <Text style={[styles.content]}>{conclusions?.Schools}</Text>

        <Text style={styles.subTitle}>• Kết luận chung:</Text>
        <Text style={[styles.content]}>{conclusions?.Conclusion}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    //paddingHorizontal: s(27),
    gap: vs(10),
  },
  wrapper: {
    paddingHorizontal: s(27),
    alignSelf: 'flex-start',
  },
  subTitle: {
    ...FONT.title.M,
  },
  content: {
    ...FONT.content.M.regular,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default Conclusion;

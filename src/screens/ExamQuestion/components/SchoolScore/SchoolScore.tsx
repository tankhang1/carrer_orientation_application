import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {COLORS, FONT, s, vs} from '@utils/config';
import {AppTextInput} from '@components';
import {
  DefaultError,
  QueryCache,
  QueryClient,
  useQuery,
} from '@tanstack/react-query';
import {QUERY_KEY} from '@utils/constants';
import {IExamResponse} from '@interfaces/DTO';
import {TSubject, initialSubjects} from './constant';
import {ISchoolSubjectsResponse} from '@interfaces/DTO/SchoolSubject/schoolSubject';
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';

const SchoolScore = () => {
  const queryCache = new QueryCache({
    onError: error => {
      console.log(error);
    },
    onSuccess: data => {
      console.log('data', data);
    },
    onSettled: (data, error) => {
      console.log(data, error);
    },
  });
  // const query = queryCache.findAll(QUERY_KEY.EXAMS);
  // console.log('query', query);
  const {isLoading, data, isError} = useQuery<
    unknown,
    DefaultError,
    ISchoolSubjectsResponse
  >({
    queryKey: [QUERY_KEY.SCHOOL_SUBJECTS],
    queryFn: () =>
      useAPI(ENDPOINTS_URL.SCHOOL_SUBJECTS.GET_SUBJECTS, 'GET', {}),
  });
  const [subjects, setSubjects] =
    useState<Record<string, TSubject>>(initialSubjects);
  useEffect(() => {
    if (data) {
      const newData = new Map();
      data?.data?.forEach(d => {
        newData.set(d.name, {...d, value: ''});
      });
      setSubjects(Object.fromEntries(newData));
    }
  }, [data]);

  const onValueChange = (key: string, value: string, vnName: string) => {
    setSubjects(preValue => ({
      ...preValue,
      [key]: {
        vnName,
        value,
      },
    }));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Vui lòng nhập điểm trung bình của từng môn nhé!
      </Text>
      {Object.entries(subjects)?.map(([key, subject], index) => {
        return (
          <AppTextInput
            key={index}
            label={subject.vnName}
            containerStyle={{backgroundColor: COLORS.white}}
            value={subject.value}
            onChangeText={text => onValueChange(key, text, subject.vnName)}
            keyboardType="numeric"
          />
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(27),
    gap: vs(10),
  },
  title: {
    ...FONT.content.M.semiBold,
  },
});
export default SchoolScore;

import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONT, s, vs} from '@utils/config';
import {AppTextInput} from '@components';
import {QueryCache, QueryClient} from '@tanstack/react-query';
import {QUERY_KEY} from '@utils/constants';
import {IExamResponse} from '@interfaces/DTO';
import {TSubject, initialSubjects} from './constant';

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
  const [subjects, setSubjects] =
    useState<Record<string, TSubject>>(initialSubjects);
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
          />
        );
      })}
      {/* <AppTextInput
        label="Toán"
        containerStyle={{backgroundColor: COLORS.white}}
      />
      <AppTextInput
        label="Văn"
        containerStyle={{backgroundColor: COLORS.white}}
      />
      <AppTextInput
        label="Anh"
        containerStyle={{backgroundColor: COLORS.white}}
      /> */}
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

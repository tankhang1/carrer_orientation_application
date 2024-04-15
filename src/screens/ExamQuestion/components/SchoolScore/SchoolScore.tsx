import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {COLORS, FONT, s, vs} from '@utils/config';
import {AppTextInput} from '@components';
import {
  DefaultError,
  QueryCache,
  QueryClient,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {QUERY_KEY} from '@utils/constants';
import {IExamResponse} from '@interfaces/DTO';
import {TSubject, initialSubjects} from './constant';
import {ISchoolSubjectsResponse} from '@interfaces/DTO/SchoolSubject/schoolSubject';
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
interface TSchoolScore {
  subjects: Record<string, TSubject>;
  setSubjects: (subjects: Record<string, TSubject>) => void;
}
const SchoolScore = ({subjects, setSubjects}: TSchoolScore) => {
  const {isLoading, data, isError} = useQuery<
    unknown,
    DefaultError,
    ISchoolSubjectsResponse
  >({
    queryKey: [QUERY_KEY.SCHOOL_SUBJECTS],
    queryFn: () =>
      useAPI(ENDPOINTS_URL.SCHOOL_SUBJECTS.GET_SUBJECTS, 'GET', {}),
  });

  // const postSchoolScore = useMutation({
  //   mutationKey: [QUERY_KEY.CACULATE_SCHOOL_SCORE],
  //   mutationFn: (variables: Record<string, TSubject>) => {
  //     console.log('convert', variables);
  //     return useAPI(
  //       ENDPOINTS_URL.SCHOOL_SUBJECTS.CACULATE_SCHOOL_SCORE,
  //       'POST',
  //       {
  //         data: {
  //           scores: variables,
  //         },
  //       },
  //     );
  //   },
  // });
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
    if (+value >= 0 && +value <= 10) {
      setSubjects({
        ...subjects,
        [key]: {
          vnName,
          value,
        },
      });
    }
  };
  console.log(subjects);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Vui lòng nhập điểm trung bình của từng môn nhé!
      </Text>
      {/* <TouchableOpacity
        onPress={() => {
          const data: Record<string, TSubject> = {
            Biology: {
              ...subjects['Biology'],
              value: !!subjects['Biology'].value
                ? +subjects['Biology'].value
                : 0,
            },
            Chemistry: {
              ...subjects['Chemistry'],
              value: !!subjects['Chemistry'].value
                ? +subjects['Chemistry'].value
                : 0,
            },
            English: {
              ...subjects['English'],
              value: !!subjects['English'].value
                ? +subjects['English'].value
                : 0,
            },
            Geography: {
              ...subjects['Geography'],
              value: !!subjects['Geography'].value
                ? +subjects['Geography'].value
                : 0,
            },
            History: {
              ...subjects['History'],
              value: !!subjects['History'].value
                ? +subjects['History'].value
                : 0,
            },
            Informatics: {
              ...subjects['Informatics'],
              value: !!subjects['Informatics'].value
                ? +subjects['Informatics'].value
                : 0,
            },
            Literature: {
              ...subjects['Literature'],
              value: !!subjects['Literature'].value
                ? +subjects['Literature'].value
                : 0,
            },
            Math: {
              ...subjects['Math'],
              value: !!subjects['Math'].value ? +subjects['Math'].value : 0,
            },
            Physics: {
              ...subjects['Physics'],
              value: !!subjects['Physics'].value
                ? +subjects['Physics'].value
                : 0,
            },
            CivicEducation: {
              ...subjects['CivicEducation'],
              value: !!subjects['CivicEducation'].value
                ? +subjects['CivicEducation'].value
                : 0,
            },
          };
          console.log('data', data);
          postSchoolScore.mutate(data);
        }}>
        <Text style={{color: 'black'}}>POST SCORES</Text>
      </TouchableOpacity> */}
      {Object.entries(subjects)?.map(([key, subject], index) => {
        console.log(key, subject);
        return (
          <AppTextInput
            key={index}
            label={subject.vnName}
            containerStyle={{backgroundColor: COLORS.white}}
            value={subject.value.toString()}
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

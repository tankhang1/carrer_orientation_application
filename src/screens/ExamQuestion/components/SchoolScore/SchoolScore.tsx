import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {COLORS, FONT, s, vs} from '@utils/config';
import {AppImagePicker, AppTextInput} from '@components';
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
import AppImage from '@components/AppImage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
const {TextRecognitionModule} = NativeModules;
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
  useEffect(() => {
    if (data) {
      const newData = new Map();
      data?.data?.forEach(d => {
        newData.set(d.name, {...d, value: ''});
      });
      setSubjects(Object.fromEntries(newData));
    }
  }, [data]);
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const onLaunchCamera = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        //console.log(image.path);
        setImageUrl(image.path);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const onLibrary = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImageUrl(image.path);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
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
  useEffect(() => {
    if (imageUrl) {
      convertImageToText(imageUrl);
    }
  }, [imageUrl]);
  const convertImageToText = async (url: string) => {
    try {
      const result = await TextRecognitionModule.regconizeImage(url);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Vui lòng nhập điểm trung bình của từng môn nhé!
      </Text>
      <View style={styles.scanContainer}>
        <TouchableOpacity onPress={() => setOpenImagePicker(true)}>
          <AntDesign name="scan1" size={s(33)} color={COLORS.green} />
        </TouchableOpacity>
        <View style={{marginLeft: s(10)}}>
          <Text style={FONT.content.M.semiBold}>Tính năng thử nghiệm</Text>
          <Text style={FONT.content.S}>Thử chụp ảnh học bạ của bạn nhé!</Text>
        </View>
      </View>
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
      <AppImagePicker
        openImagePicker={openImagePicker}
        setOpenImagePicker={setOpenImagePicker}
        onLaunchCamera={onLaunchCamera}
        onLibrary={onLibrary}
      />
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
  scanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default SchoolScore;

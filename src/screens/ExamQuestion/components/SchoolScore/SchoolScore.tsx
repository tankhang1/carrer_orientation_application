import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  ActivityIndicator,
  Button,
  Keyboard,
} from 'react-native';
import React, {RefObject, useEffect, useMemo, useRef, useState} from 'react';
import {AppImagePicker, AppTextInput} from '@components';
import {DefaultError, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, TSubject, COLORS, FONT, s, vs} from '@utils';
import {ISchoolSubjectsResponse} from '@interfaces/DTO/SchoolSubject/schoolSubject';
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
import ImagePicker from 'react-native-image-crop-picker';
import {TextInput} from 'react-native-gesture-handler';
const {TextRecognitionModule} = NativeModules;
interface TSchoolScore {
  subjects: Record<string, TSubject>;
  setSubjects: (subjects: Record<string, TSubject>) => void;
}
const SchoolScore = ({subjects, setSubjects}: TSchoolScore) => {
  // const textInputRefs = useRef(
  //   Array.from({length: 5}, a => React.createRef<TextInput>()),
  // );
  const textInputRefs = useRef<React.RefObject<TextInput>[]>([]);
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
        newData.set(d.name, {...d, value: 0});
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
      //console.log(key, value, vnName);
      setSubjects({
        ...subjects,
        [key]: {
          vnName,
          value: +value,
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
  const onNextFocus = (index: number) => {
    console.log(index);
    if (
      index >= 0 &&
      index < Object.keys(subjects)?.length - 1 &&
      textInputRefs.current[index + 1]
    ) {
      textInputRefs.current[index + 1]?.current?.focus();
    }
    if (index === Object.keys(subjects)?.length - 1) {
      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
      }
    }
  };
  if (Object.keys(subjects)?.length < 4)
    return <ActivityIndicator size="small" color={COLORS.green} />;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Vui lòng nhập điểm trung bình của từng môn nhé!
      </Text>
      {/* <View style={styles.scanContainer}>
        <TouchableOpacity onPress={() => setOpenImagePicker(true)}>
          <AntDesign name="scan1" size={s(33)} color={COLORS.green} />
        </TouchableOpacity>
        <View style={{marginLeft: s(10)}}>
          <Text style={FONT.content.M.semiBold}>Tính năng thử nghiệm</Text>
          <Text style={FONT.content.S}>Thử chụp ảnh học bạ của bạn nhé!</Text>
        </View>
      </View> */}
      {Object.entries(subjects)?.map(([key, subject], index) => {
        textInputRefs.current[index] =
          textInputRefs.current[index] || React.createRef<TextInput>();
        return (
          <AppTextInput
            key={index}
            label={subject.vnName}
            containerStyle={{backgroundColor: COLORS.white}}
            value={!!subject.value ? subject.value.toString() : ''}
            onChangeText={text => onValueChange(key, text, subject.vnName)}
            keyboardType="numeric"
            onSubmitEditing={() => {
              onNextFocus(index);
            }}
            returnKeyType="done"
            ref={textInputRefs.current[index]}
            blurOnSubmit={false}
            autoFocus={index === 0}
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

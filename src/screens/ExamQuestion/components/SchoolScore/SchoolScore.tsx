import {
  View,
  Text,
  StyleSheet,
  NativeModules,
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {AppBackDrop, AppImagePicker, AppTextInput} from '@components';
import {DefaultError, useMutation, useQuery} from '@tanstack/react-query';
import {QUERY_KEY, TSubject, COLORS, FONT, s, vs} from '@utils';
import {ISchoolSubjectsResponse} from '@interfaces/DTO/SchoolSubject/schoolSubject';
import useAPI, {uploadImage} from '@service/api';
import {ENDPOINTS_URL} from '@service';
import ImagePicker from 'react-native-image-crop-picker';
import {TextInput} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppImage from '@components/AppImage';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {IResponse} from '@interfaces/DTO';
const {TextRecognitionModule} = NativeModules;
interface TSchoolScore {
  subjects: Record<string, TSubject>;
  setSubjects: (subjects: Record<string, TSubject>) => void;
}
const SchoolScore = ({subjects, setSubjects}: TSchoolScore) => {
  const textInputRefs = useRef<React.RefObject<TextInput>[]>([]);
  const animatedValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {rotate: `${interpolate(animatedValue.value, [0, 1], [0, 360])}deg`},
    ],
  }));
  const {isLoading, data, isError} = useQuery<
    unknown,
    DefaultError,
    ISchoolSubjectsResponse
  >({
    queryKey: [QUERY_KEY.SCHOOL_SUBJECTS],
    queryFn: () =>
      useAPI(ENDPOINTS_URL.SCHOOL_SUBJECTS.GET_SUBJECTS, 'GET', {}),
  });
  const convertImageToText = useMutation({
    mutationKey: [QUERY_KEY.OCR],
    mutationFn: async (image: any) => {
      console.log('image', image);
      if (!image) return;
      return await uploadImage(image?.path, image?.mime);
    },
    onSuccess: async (data: IResponse | any) => {
      console.log('data', data);
    },
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
  useEffect(() => {
    if (convertImageToText.isPending) {
      animatedValue.value = withRepeat(withTiming(1, {duration: 1000}), -1);
    } else {
      animatedValue.value = withTiming(0);
    }
  }, [convertImageToText.isPending]);
  const [openImagePicker, setOpenImagePicker] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const onLaunchCamera = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        setOpenImagePicker(false);
        setImageUrl(image.path);
        convertImageToText.mutate(image);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
  console.log('subjects', subjects);
  const onLibrary = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        setOpenImagePicker(false);
        setImageUrl(image.path);
        convertImageToText.mutate(image);
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
  const onNextFocus = (index: number) => {
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
      <AppBackDrop
        open={openImagePicker || convertImageToText.isPending}
        setOpen={setOpenImagePicker}
        disabled={convertImageToText.isPending}>
        {convertImageToText.isPending ? (
          <Animated.View style={animatedStyle}>
            <AppImage
              source={require('@assets/images/bookmark.png')}
              style={styles.loadingImage}
              resizeMode="contain"
            />
          </Animated.View>
        ) : (
          <AppImagePicker
            openImagePicker={openImagePicker}
            setOpenImagePicker={setOpenImagePicker}
            onLaunchCamera={onLaunchCamera}
            onLibrary={onLibrary}
          />
        )}
      </AppBackDrop>
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
  loadingImage: {
    width: s(50),
    height: s(50),
    alignSelf: 'center',
  },
});
export default SchoolScore;

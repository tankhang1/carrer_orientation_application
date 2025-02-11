import { AppCard, AppHeader } from '@components';
import { ISchoolDictionaryDetailResponse, ISchoolDictionaryMajor } from '@interfaces/School/school';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ENDPOINTS_URL } from '@service';
import api from '@service/api';
import { DefaultError, useQuery } from '@tanstack/react-query';
import { COLORS, FONT, QUERY_KEY, s, vs } from '@utils';
import { TRootStackNav } from '@utils/types/RootStackNav';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

type Props = NativeStackScreenProps<TRootStackNav, 'SchoolMajorDetail'>;

const SchoolMajorDetail = ({ route }: Props) => {
  const { _id } = route?.params;
  // API
  const { data: schoolDetail, isFetching } = useQuery<unknown, DefaultError, ISchoolDictionaryDetailResponse>({
    queryKey: [QUERY_KEY.SCHOOL_DICTIONARY, _id],
    queryFn: async () =>
      api(ENDPOINTS_URL.SCHOOL.GET_DETAIL, 'GET', {
        params: { schoolId: _id },
      }),
  });

  const renderItem = ({ item, index }: ListRenderItemInfo<ISchoolDictionaryMajor>) => (
    <View key={index}>
      <AppCard type='large' containerStyle={styles.cardContainer}>
        <View style={styles.bookMark}>
          <FontAwesome name='bookmark' size={24} color={'#00bf63'} />
        </View>
        <View style={styles.content}>
          <AntDesign name='pushpino' color={COLORS.red} size={12} />
          <Text style={styles.title}>Ngành: {item.majorName}</Text>
        </View>
        <View style={styles.content}>
          <Octicons name='paper-airplane' size={12} />
          <Text style={styles.title}>Mã ngành: {item.majorCode}</Text>
        </View>

        <View style={styles.content}>
          <Octicons name='paper-airplane' size={12} />
          <Text style={styles.title}>Điểm chuẩn: {item.entryScore}</Text>
        </View>

        <View style={styles.content}>
          <Octicons name='paper-airplane' size={12} />
          <Text style={styles.title}>Thời gian đào tạo: {item.duration}</Text>
        </View>

        <View style={styles.content}>
          <Octicons name='paper-airplane' size={12} />
          <Text style={styles.title}>Học phí: {item.fee}</Text>
        </View>
      </AppCard>
    </View>
  );
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground source={require('@assets/images/background_1.png')} resizeMode='cover' style={styles.wrapper}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppHeader
            title='Nhóm ngành đào tạo'
            style={{
              marginBottom: 10,
            }}
          />
          {isFetching ? (
            <ActivityIndicator />
          ) : (
            <React.Fragment>
              <Text style={{ ...FONT.content.M.semiBold, color: COLORS.darkGrey, marginHorizontal: s(20) }}>
                {schoolDetail?.data?.name || ''}
              </Text>

              <FlatList
                data={schoolDetail?.data?.majors || []}
                renderItem={renderItem}
                contentContainerStyle={{ marginHorizontal: s(20), gap: vs(20) }}
                style={{ marginVertical: vs(20) }}
              />
            </React.Fragment>
          )}
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    flex: 1,
  },
  cardContainer: {
    borderLeftWidth: 10,
    borderLeftColor: '#00bf63',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  bookMark: {
    position: 'absolute',
    top: -4,
    right: 10,
  },
  title: {
    ...FONT.content.S,
    color: COLORS.darkGrey,
  },
  content: {
    flexDirection: 'row',
    gap: s(4),
    alignItems: 'center',
  },
});
export default SchoolMajorDetail;

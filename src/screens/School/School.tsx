import { AppButton, AppTextInput } from '@components';
import AppCollapse from '@components/AppCollapse';
import AppHeader from '@components/AppHeader';
import AppSkeleton from '@components/AppSkeleton';
import BottomSheet from '@gorhom/bottom-sheet';
import { ISchoolDictionary, ISchoolDictionaryResponse } from '@interfaces/School/school';
import { navigationRef } from '@navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ENDPOINTS_URL } from '@service';
import api from '@service/api';
import { DefaultError, InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY, queryClient } from '@utils';
import { COLORS, FONT, s, vs } from '@utils/config';
import { TRootStackNav } from '@utils/types/RootStackNav';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SchoolFilter, { TSchoolFilterREQ } from './components/SchoolFilter';

type Props = NativeStackScreenProps<TRootStackNav, 'School'>;

const School = ({ route }: Props) => {
  const [category, setCategory] = useState('Công lập');
  const [searchInfo, setSearchInfo] = useState('');
  const onCategoryPress = (category: string) => {
    setCategory(category);
  };
  const [filter, setFilter] = useState<TSchoolFilterREQ>();

  // REF
  const bottomSheetRef = useRef<BottomSheet>(null);

  // API
  const {
    data: schools,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<ISchoolDictionaryResponse, DefaultError, InfiniteData<ISchoolDictionaryResponse>>({
    queryKey: [QUERY_KEY.SCHOOL_DICTIONARY, category, searchInfo, filter],
    queryFn: async ({ pageParam }) =>
      api(ENDPOINTS_URL.SCHOOL.GET_LIST, 'GET', {
        params: {
          page: pageParam ?? 1,
          category: category,
          search: searchInfo || undefined,
          provinces: filter?.provinces?.join(',') || undefined,
          minScore: filter?.minScore || undefined,
        },
      } as const) as Promise<ISchoolDictionaryResponse>,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.data?.length === 0) {
        return undefined;
      }
      return allPages?.length + 1;
    },
  });

  // METHOD
  const onRefresh = () => {
    if (isFetchingNextPage) return;
    queryClient.fetchInfiniteQuery({
      queryKey: [QUERY_KEY.SCHOOL_DICTIONARY],
      initialPageParam: 1,
    });
  };

  // EFFECT
  useEffect(() => {
    if (route?.params?.search) {
      setSearchInfo(route?.params?.search);
    }
  }, [route?.params?.search]);

  const renderItem = ({ item, index }: ListRenderItemInfo<ISchoolDictionary>) => (
    <Suspense fallback={<AppSkeleton width={'100%'} height={200} />}>
      <Animated.View entering={FadeIn.delay(index * 50)}>
        <AppCollapse key={index} title={item.name} style={{ marginHorizontal: s(20) }}>
          <View style={styles.collapseContainer}>
            {item?.address?.map((address, i) => (
              <View style={styles.collapseContent} key={i}>
                <Feather name='map-pin' color={COLORS.red} size={16} style={{ marginTop: vs(4) }} />
                <Text style={styles.collapseTitle}>{address}</Text>
              </View>
            ))}

            {!!item.website && (
              <View style={styles.collapseContent}>
                <MaterialCommunityIcons name='web' color={COLORS.blue} size={16} style={{ marginTop: vs(4) }} />
                <TouchableOpacity onPress={() => navigationRef.navigate('ResultDetail', { url: item.website! })}>
                  <Text style={[styles.collapseTitle, styles.link]}>{item.website}</Text>
                </TouchableOpacity>
              </View>
            )}

            {!!item.email && (
              <View style={styles.collapseContent}>
                <Entypo name='email' color={COLORS.green} size={16} style={{ marginTop: vs(4) }} />
                <Text style={styles.collapseTitle}>{item.email}</Text>
              </View>
            )}

            {!!item.phone && (
              <View style={styles.collapseContent}>
                <Feather name='phone' color={COLORS.black} size={16} style={{ marginTop: vs(4) }} />
                <Text style={styles.collapseTitle}>{item.phone}</Text>
              </View>
            )}

            {!!item.addmissions && (
              <View style={styles.collapseContent}>
                <Entypo name='link' color={COLORS.purple} size={18} style={{ marginTop: vs(4) }} />
                <TouchableOpacity onPress={() => navigationRef.navigate('ResultDetail', { url: item.addmissions! })}>
                  <Text style={[styles.collapseTitle, styles.link]}>{item.addmissions}</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.collapseContent}>
              <MaterialIcons name='work' color={COLORS.darkGrey} size={18} style={{ marginTop: vs(2) }} />
              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: s(4) }}
                onPress={() => navigationRef.navigate('SchoolMajorDetail', { _id: item._id })}>
                <Text style={styles.collapseTitle}>Nhóm ngành đào tạo</Text>
                <Entypo name='chevron-with-circle-right' color={COLORS.darkGrey} size={20} style={{ marginTop: vs(2) }} />
              </TouchableOpacity>
            </View>

            {/* <AppButton buttonContainerStyle={{ marginTop: vs(10) }} label='Chi tiết nhóm ngành' size='S' /> */}
          </View>
        </AppCollapse>
      </Animated.View>
    </Suspense>
  );
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground source={require('@assets/images/background_1.png')} resizeMode='cover' style={styles.wrapper}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppHeader
            title='Danh sách trường học'
            style={{
              marginBottom: 10,
            }}
          />
          <FlatList
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
            scrollEventThrottle={16}
            data={(schools?.pages.flatMap((page) => page?.data) as unknown as ISchoolDictionary[]) || []}
            contentContainerStyle={{ gap: vs(16), marginBottom: vs(16) }}
            style={{ marginBottom: vs(6) }}
            ListHeaderComponent={
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: s(20), gap: s(8) }}>
                  <AppTextInput
                    width={'100%'}
                    value={searchInfo}
                    onChangeText={setSearchInfo}
                    containerStyle={{
                      backgroundColor: COLORS.white,
                      borderWidth: 0,
                    }}
                    outStyle={{ flex: 1 }}
                    placeholder='Tìm kiếm trường học'
                    placeholderTextColor={COLORS.grey}
                    trailing={<AntDesign name='search1' size={s(25)} color={COLORS.grey} />}
                  />
                  <AppButton
                    type='outline'
                    buttonStyle={{ borderWidth: 1, borderRadius: 8, borderColor: COLORS.white, padding: s(12) }}
                    size='S'
                    onPress={() => {
                      if (!bottomSheetRef?.current) return;
                      bottomSheetRef?.current?.expand();
                    }}>
                    <FontAwesome6 name='sliders' size={20} />
                  </AppButton>
                </View>

                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    gap: s(10),
                    paddingHorizontal: s(20),
                  }}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginVertical: vs(10),
                  }}>
                  {['Công lập', 'Tư thục'].map((item, index) => (
                    <AppButton
                      key={index}
                      label={item}
                      labelStyle={[
                        FONT.content.M.semiBold,
                        {
                          marginHorizontal: 0,
                        },
                        category === item ? { color: COLORS.white } : { color: COLORS.black },
                      ]}
                      buttonStyle={[
                        styles.categoryBtn,
                        category === item && {
                          backgroundColor: COLORS.green,
                        },
                      ]}
                      onPress={() => onCategoryPress(item)}
                    />
                  ))}
                </ScrollView>
              </View>
            }
            renderItem={renderItem}
            onEndReachedThreshold={0.2}
            keyboardDismissMode='on-drag'
            renderToHardwareTextureAndroid
            maxToRenderPerBatch={10}
            onEndReached={() => {
              if (!hasNextPage || isFetchingNextPage) return;
              fetchNextPage();
            }}
          />
          <SchoolFilter
            ref={bottomSheetRef}
            filter={filter}
            onSave={(value) => {
              setFilter(value);
              if (!bottomSheetRef?.current) return;
              bottomSheetRef?.current?.close();
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default School;
const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    flex: 1,
  },
  header: {
    marginBottom: vs(10),
  },
  categoryBtn: {
    paddingVertical: s(15),
    borderWidth: s(2),
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
  },
  placeHolderContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  placeHolderText: {
    ...FONT.content.L,
    color: COLORS.grey,
    textAlign: 'center',
  },
  collapseContainer: {
    paddingHorizontal: s(24),
    paddingVertical: vs(12),
  },
  collapseTitle: {
    ...FONT.content.S,
    color: COLORS.darkGrey,
  },
  collapseContent: {
    flexDirection: 'row',
    gap: s(4),
    marginVertical: vs(4),
  },
  link: {
    textDecorationLine: 'underline',
    //color: COLORS.darkBlue,
  },
});

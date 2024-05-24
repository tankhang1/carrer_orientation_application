import {
  View,
  StyleSheet,
  ScrollView,
  ListRenderItemInfo,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import React, {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import AppView from '@components/AppView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONT, s, vs} from '@utils/config';
import {AppTextInput, AppButton} from '@components';
import NewsJobs from './components/NewsJobs';
import AppHeader from '@components/AppHeader';
import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import {QUERY_KEY} from '@utils/constants';
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
import {INew, INewsResponse} from '@interfaces/DTO';
import {queryClient} from '@utils/constants';
const News = () => {
  const {data: Categories, isLoading} = useQuery<
    unknown,
    DefaultError,
    {_id: string; categoryName: string}[]
  >({
    queryKey: [QUERY_KEY.NEWS, QUERY_KEY.NEWS_CATEGORIES],
    queryFn: () => useAPI(ENDPOINTS_URL.NEWS.GET_ALL_CATEGORIES, 'GET', {}),
  });

  const [categoryId, setCategoryId] = useState(Categories?.[0]._id);
  const [searchInfo, setSearchInfo] = useState('');
  const deferSearchInfo = useDeferredValue(searchInfo);
  const onCategoryPress = (id: string) => {
    if (categoryId !== id) {
      startTransition(() => {
        setCategoryId(id);
        setSearchInfo('');
      });
    }
  };
  useEffect(() => {
    setCategoryId(Categories?.[0]._id);
  }, [Categories]);
  const {data, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useInfiniteQuery<INewsResponse, DefaultError, InfiniteData<INewsResponse>>({
      queryKey: [QUERY_KEY.NEWS, categoryId],
      queryFn: async ({pageParam}) =>
        useAPI(ENDPOINTS_URL.NEWS.GET_NEWS, 'GET', {
          params: {id: categoryId, page: pageParam ?? 1},
        } as const) as Promise<INewsResponse>,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.data?.length === 0) {
          return undefined;
        }
        return allPages.length + 1;
      },
      //staleTime: 5 * 60 * 1000,
    });
  const onRefresh = () => {
    if (isFetchingNextPage) return;
    queryClient.fetchInfiniteQuery({
      queryKey: [QUERY_KEY.NEWS, categoryId],
      initialPageParam: 1,
    });
  };
  const renderItem = ({item, index}: ListRenderItemInfo<INew>) => (
    <NewsJobs index={index} item={item} deferSearchInfo={deferSearchInfo} />
  );
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <AppView
        refreshControl={
          <RefreshControl
            refreshing={isFetchingNextPage}
            onRefresh={onRefresh}
          />
        }
        scrollEventThrottle={16}
        data={
          (data?.pages.flatMap(page => page?.data) as unknown as INew[]) || []
        }
        ListHeaderComponent={
          <View>
            <AppHeader
              title="Tin tức"
              style={{
                marginBottom: 10,
              }}
            />
            <View style={{paddingHorizontal: s(20)}}>
              <AppTextInput
                width={'100%'}
                value={searchInfo}
                onChangeText={setSearchInfo}
                containerStyle={{backgroundColor: COLORS.white, borderWidth: 0}}
                placeholder="Tìm kiếm tin tức"
                placeholderTextColor={COLORS.grey}
                trailing={
                  <AntDesign name="search1" size={s(25)} color={COLORS.grey} />
                }
              />
              <ScrollView
                horizontal
                contentContainerStyle={{gap: s(10)}}
                showsHorizontalScrollIndicator={false}
                style={{
                  marginVertical: vs(10),
                }}>
                {Categories?.map((category, index) => (
                  <AppButton
                    key={index}
                    label={category.categoryName}
                    labelStyle={[
                      FONT.content.M.semiBold,
                      {
                        marginHorizontal: 0,
                      },
                      categoryId === category._id
                        ? {color: COLORS.white}
                        : {color: COLORS.black},
                    ]}
                    buttonStyle={[
                      styles.categoryBtn,
                      categoryId === category._id && {
                        backgroundColor: COLORS.green,
                      },
                    ]}
                    onPress={() => onCategoryPress(category._id)}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        }
        renderItem={renderItem}
        onEndReached={() => {
          if (!hasNextPage || isFetchingNextPage) return;
          fetchNextPage();
        }}
        onEndReachedThreshold={0.2}
        keyboardDismissMode="on-drag"
        renderToHardwareTextureAndroid
        maxToRenderPerBatch={10}
      />
    </KeyboardAvoidingView>
  );
};

export default News;
const styles = StyleSheet.create({
  header: {
    marginBottom: vs(10),
  },
  categoryBtn: {
    paddingVertical: s(15),
    borderWidth: s(2),
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
  },
});

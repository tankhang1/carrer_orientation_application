import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import React, {lazy, memo, Suspense} from 'react';
import {NewsData, TNewsData} from '../mock';
import {vs} from '@utils/config';
import dayjs from 'dayjs';
import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
import {DefaultError, useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '@utils/constants';
import {INew} from '@interfaces/DTO';
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
const AppCard = lazy(() => import('@components/AppCard'));
type TNewsJobsProps = {
  deferSearchInfo: string;
};
const NewsJobs = ({deferSearchInfo}: TNewsJobsProps) => {
  const {isLoading, data, isError} = useQuery<unknown, DefaultError, INew[]>({
    queryKey: [QUERY_KEY.NEWS, QUERY_KEY.NEWS_NEWS],
    queryFn: () => useAPI(ENDPOINTS_URL.NEWS.GET_ALL_NEWS_DETAIL, 'GET', {}),
  });
  const renderCard = ({item, index}: ListRenderItemInfo<INew>) => {
    const searchPattern = new RegExp(deferSearchInfo, 'i');
    if (searchPattern.test(item.content))
      return (
        <Suspense fallback={<AppSkeleton width={'100%'} height={200} />}>
          <AppCard
            index={index}
            key={index}
            imageUrl={item.image.shortImage}
            subTitle={dayjs(item.createdAt).format('DD/MM/YYYY')}
            title={item.title}
            type="large"
            onPress={() =>
              navigationRef.navigate('NewsDetail1', {content: item.content})
            }
          />
        </Suspense>
      );
    return null;
  };
  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      renderItem={renderCard}
      contentContainerStyle={{gap: vs(10)}}
    />
  );
};

export default memo(NewsJobs);

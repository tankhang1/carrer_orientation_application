import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import React, {lazy, memo, Suspense} from 'react';
import {NewsData, TNewsData} from '../mock';
import {vs} from '@utils/config';
import dayjs from 'dayjs';
import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
const AppCard = lazy(() => import('@components/AppCard'));
type TNewsJobsProps = {
  deferSearchInfo: string;
};
const NewsJobs = ({deferSearchInfo}: TNewsJobsProps) => {
  const renderCard = ({item, index}: ListRenderItemInfo<TNewsData>) => {
    const searchPattern = new RegExp(deferSearchInfo, 'i');
    if (searchPattern.test(item.content))
      return (
        <Suspense fallback={<AppSkeleton width={'100%'} height={200} />}>
          <AppCard
            index={index}
            key={index}
            imageUrl={item.image}
            subTitle={dayjs(item.createdAt).format('DD/MM/YYYY')}
            title={item.content}
            type="large"
            onPress={() => navigationRef.navigate('NewsDetail1')}
          />
        </Suspense>
      );
    return null;
  };
  return (
    <FlatList
      scrollEnabled={false}
      data={NewsData}
      renderItem={renderCard}
      contentContainerStyle={{gap: vs(10)}}
    />
  );
};

export default memo(NewsJobs);

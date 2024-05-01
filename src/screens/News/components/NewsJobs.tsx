import {FlatList, ListRenderItemInfo} from 'react-native';
import React, {lazy, memo, Suspense} from 'react';
import {vs} from '@utils/config';
import dayjs from 'dayjs';
import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
import {INew} from '@interfaces/DTO';
const AppCard = lazy(() => import('@components/AppCard'));
type TNewsJobsProps = {
  deferSearchInfo: string;
  id?: string;
  news: INew[];
};
const NewsJobs = ({deferSearchInfo, id, news}: TNewsJobsProps) => {
  const renderCard = ({item, index}: ListRenderItemInfo<INew>) => {
    const searchPattern = new RegExp(deferSearchInfo.toLowerCase(), 'i');
    if (searchPattern.test(item?.title?.toLowerCase()))
      return (
        <Suspense fallback={<AppSkeleton width={'100%'} height={200} />}>
          <AppCard
            index={index}
            key={index}
            imageUrl={item?.image?.shortImage}
            subTitle={dayjs(item?.createdAt).format('DD/MM/YYYY')}
            title={item?.title}
            type="large"
            onPress={() =>
              navigationRef.navigate('NewsDetail1', {content: item?.content})
            }
            containerStyle={{marginVertical: vs(5)}}
          />
        </Suspense>
      );
    return null;
  };
  return (
    <FlatList
      scrollEnabled={false}
      data={news}
      //data={data?.data as unknown as INew[]}
      renderItem={renderCard}
      extraData={id}
      //contentContainerStyle={{gap: vs(10)}}
    />
  );
};

export default memo(NewsJobs);

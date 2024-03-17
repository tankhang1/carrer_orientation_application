import {View, Text, FlatList, ListRenderItemInfo} from 'react-native';
import React, {memo} from 'react';
import {NewsData, TNewsData} from '../mock';
import {vs} from '@utils/config';
import {AppCard} from '@components';
import dayjs from 'dayjs';
import {navigationRef} from '@navigation';
type TNewsJobsProps = {
  deferSearchInfo: string;
};
const NewsJobs = ({deferSearchInfo}: TNewsJobsProps) => {
  const renderCard = ({item, index}: ListRenderItemInfo<TNewsData>) => {
    const searchPattern = new RegExp(deferSearchInfo, 'i');
    if (searchPattern.test(item.content))
      return (
        <AppCard
          key={index}
          imageUrl={item.image}
          subTitle={dayjs(item.createdAt).format('DD/MM/YYYY')}
          title={item.content}
          type="large"
          onPress={() => navigationRef.navigate('NewsDetail1')}
        />
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

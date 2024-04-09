import {
  View,
  Text,
  ListRenderItemInfo,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {lazy, Suspense} from 'react';
import AppView from '@components/AppView';
import {COLORS, FONT, s, vs, width} from '@utils/config';
const AppHistoryCard = lazy(
  () => import('@components/AppHistoryCard/AppHistoryCard'),
);
import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
import AppHeader from '@components/AppHeader';

const ListResult = () => {
  const renderCard = ({item, index}: ListRenderItemInfo<any>) => {
    return (
      <Suspense
        fallback={<AppSkeleton width={width * 0.9} height={300} radius={10} />}>
        <AppHistoryCard key={index} isExpand={true} index={index} />
      </Suspense>
    );
  };
  return (
    <AppView
      data={Array.from({length: 10})}
      renderItem={renderCard}
      contentContainerStyle={styles.containerStyle}
      ListHeaderComponent={<AppHeader title="Kết quả kiểm tra" />}
      renderToHardwareTextureAndroid
      removeClippedSubviews
    />
  );
};

export default ListResult;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(10),
    gap: s(10),
  },
  containerStyle: {
    gap: vs(10),
    alignSelf: 'center',
  },
});

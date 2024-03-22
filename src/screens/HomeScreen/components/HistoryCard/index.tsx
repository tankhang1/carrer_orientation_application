import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {lazy, Suspense} from 'react';
import {FONT, s, vs} from '@utils/config';
import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
const Card = lazy(() => import('./Card'));
const HistoryCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={FONT.content.M.bold}>Kết quả kiểm tra</Text>
        <TouchableOpacity onPress={() => navigationRef.navigate('ListResult')}>
          <Text style={FONT.link}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <Suspense
        fallback={<AppSkeleton width={'100%'} height={200} radius={10} />}>
        <Card />
      </Suspense>
      <Suspense
        fallback={<AppSkeleton width={'100%'} height={200} radius={10} />}>
        <Card />
      </Suspense>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(27),
    gap: vs(10),
    marginBottom: vs(10),
  },
  title: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default HistoryCard;

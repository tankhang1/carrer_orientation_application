import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {lazy, Suspense, useMemo} from 'react';
import {FONT, s, vs} from '@utils/config';
import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
import {KEY_STORE, storage} from '@store';
const AppHistoryCard = lazy(
  () => import('@components/AppHistoryCard/AppHistoryCard'),
);
const HistoryCard = () => {
  // useFocusEffect(() => {
  //   console.log('focus screen');
  //   React.useCallback(() => {
  //     const unsubscribe ={
  //       const results = JSON.parse(
  //         storage.getString(KEY_STORE.LIST_RESULT) ?? 'null',
  //       ) as any[];
  //     };

  //     return () => unsubscribe();
  //   }, [])
  // });
  const results = useMemo(
    () =>
      JSON.parse(storage.getString(KEY_STORE.LIST_RESULT) ?? 'null') as any[],
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={FONT.content.M.bold}>Kết quả kiểm tra</Text>
        <TouchableOpacity onPress={() => navigationRef.navigate('ListResult')}>
          <Text style={FONT.link}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      {results?.map((result, index) => (
        <Suspense
          fallback={<AppSkeleton width={'100%'} height={200} radius={10} />}
          key={index}>
          <AppHistoryCard result={result} />
        </Suspense>
      ))}
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

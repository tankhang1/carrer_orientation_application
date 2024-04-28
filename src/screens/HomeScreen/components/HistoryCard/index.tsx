import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {lazy, Suspense} from 'react';
import {FONT, s, vs} from '@utils/config';
import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
import {storage} from '@store';
import {TSubject} from '@screens/ExamQuestion/components/SchoolScore/constant';
const AppHistoryCard = lazy(
  () => import('@components/AppHistoryCard/AppHistoryCard'),
);
const HistoryCard = () => {
  const results = JSON.parse(storage.getString('LIST_RESULT') ?? '[]') as any[];
  //const results = [];
  //console.log('results', results);
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

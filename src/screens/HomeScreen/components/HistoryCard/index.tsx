import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {FONT, s, vs} from '@utils/config';
import Card from './Card';
import {navigationRef} from '@navigation';
const HistoryCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={FONT.content.M.bold}>Kết quả kiểm tra</Text>
        <TouchableOpacity onPress={() => navigationRef.navigate('ListResult')}>
          <Text style={FONT.link}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <Card />
      <Card />
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

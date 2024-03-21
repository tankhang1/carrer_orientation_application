import {View, StyleSheet} from 'react-native';
import React from 'react';
import AppView from '@components/AppView';
import AppHeader from '@components/AppHeader';
import {Chart, HollandResult} from './components';
import {s, vs} from '@utils/config';

const Result = () => {
  return (
    <AppView>
      <AppHeader title="Kết quả" />
      <View style={styles.container}>
        <View style={{overflow: 'hidden'}}>
          <Chart />
        </View>
        <HollandResult />
      </View>
    </AppView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: vs(10),
    marginTop: vs(10),
    paddingHorizontal: s(27),
    marginBottom: vs(20),
  },
});
export default Result;

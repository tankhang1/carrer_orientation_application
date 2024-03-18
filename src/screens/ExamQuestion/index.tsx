import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import {AppProgressBar} from '@components';
import AppHeader from '@components/AppHeader';
import AppView from '@components/AppView';
import {vs} from '@utils/config';
import {BottomButton} from './components';
import AppImage from '@components/AppImage';
import {IQQuestion, EQQuestion} from './components';
import HollandQuestion from './components/HollandQuestion/HollandQuestion';
import SchoolScore from './components/SchoolScore/SchoolScore';
type Props = NativeStackScreenProps<TRootStackNav, 'ExamQuestion'>;

const ExamQuestion = () => {
  return (
    <>
      <AppView>
        <AppHeader title="IQ" />
        <View style={styles.container}>
          {/* <IQQuestion /> */}
          {/* <EQQuestion /> */}
          {/* <HollandQuestion /> */}
          <SchoolScore />
        </View>
      </AppView>
      <BottomButton />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: vs(10),
    marginTop: vs(10),
    marginBottom: vs(100),
  },
});
export default ExamQuestion;

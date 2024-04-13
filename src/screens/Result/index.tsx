import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import React from 'react';
import AppView from '@components/AppView';
import AppHeader from '@components/AppHeader';
import {Chart, HollandResult} from './components';
import {FONT, s, vs} from '@utils/config';
import {navigationRef} from '@navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
type Props = NativeStackScreenProps<TRootStackNav, 'Result'>;
const Result = ({navigation}: Props) => {
  return (
    <AppView>
      <AppHeader title="Kết quả" onPress={() => navigation.pop(2)} />
      <ImageBackground
        source={require('@assets/images/background.jpg')}
        style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={FONT.title.M}>
            Trắc nghiệm nghề nghiệp cho học sinh THPT
          </Text>
          <Text style={FONT.content.M.regular}>Số bài thực hiện: 5</Text>
        </View>
        {/* <View style={{gap: vs(10), padding: s(10)}}>
          <Text style={FONT.content.M.regular}>Kết quả</Text>
          <Text style={FONT.content.M.bold}>Nhóm thân thiện</Text>
        </View> */}
      </ImageBackground>
      <Text style={[FONT.content.M.regular, {paddingHorizontal: s(10)}]}>
        <Text style={FONT.content.M.bold}>Tổng kết:</Text> Bạn thuộc tiếp người
        thông minh nhất thế giới. Trong đó có một vài ví dụ cụ thể như: Elon
        musk. Bạn thuộc tiếp người thông minh nhất thế giới. Trong đó có một vài
        ví dụ cụ thể như: Elon musk. Bạn thuộc tiếp người thông minh nhất thế
        giới. Trong đó có một vài ví dụ cụ thể như: Elon musk.
      </Text>

      <ImageBackground
        source={require('@assets/images/IQImage.png')}
        style={styles.imageIQContainer}>
        <Text style={[FONT.content.L, {top: 100, left: s(20)}]}>IQ: 106</Text>
      </ImageBackground>
      <Text style={[FONT.content.M.regular, {paddingHorizontal: s(10)}]}>
        Bạn thuộc tiếp người thông minh nhất thế giới. Trong đó có một vài ví dụ
        cụ thể như: Elon musk
      </Text>
      <ImageBackground
        source={require('@assets/images/EQResult.png')}
        style={styles.imageIQContainer}
        resizeMode="contain">
        <View style={styles.eqQuestionContainer}>
          <Text style={FONT.content.L}>999</Text>
        </View>
      </ImageBackground>
      <Text style={[FONT.content.M.regular, {paddingHorizontal: s(10)}]}>
        Bạn thuộc tiếp người thông minh nhất thế giới. Trong đó có một vài ví dụ
        cụ thể như: Elon musk
      </Text>
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
  header: {
    height: vs(100),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerContainer: {flex: 1, gap: vs(10), padding: s(10)},
  imageIQContainer: {
    width: '100%',
    height: 200,
    marginTop: vs(10),
  },
  eqQuestionContainer: {
    width: 100,
    height: 50,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: s(10),
  },
});
export default Result;

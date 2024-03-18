import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import AppView from '@components/AppView';
import {COLORS, FONT, s, vs} from '@utils/config';
import AppHeader from '@components/AppHeader';
import AppImage from '@components/AppImage';
import ExamCard from './components/ExamCard';
import {AppButton, AppCard} from '@components';
import {BlurView} from '@react-native-community/blur';
type Props = NativeStackScreenProps<TRootStackNav, 'ListExam'>;

const ListExam = () => {
  return (
    <>
      <AppView>
        <AppHeader title="Danh sách bài kiểm tra" />
        <View style={styles.container}>
          <ExamCard
            name="IQ"
            image={require('@assets/images/IQ_background.jpg')}
            onPress={() => {}}
          />
          <ExamCard
            name="EQ"
            image={require('@assets/images/EQ_background.jpg')}
            onPress={() => {}}
            namePosition="right"
          />
          <TouchableOpacity style={styles.card}>
            <Text style={[FONT.title.XL]}>{`Tính cách \n Holland`}</Text>
            <AppImage
              source={require('@assets/images/Holland_background.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <ExamCard
            name="Điểm trung bình"
            image={require('@assets/images/school.jpg')}
            onPress={() => {}}
            namePosition="right"
            titleStyle={{fontSize: s(30), color: COLORS.red}}
          />
        </View>
      </AppView>
      <View style={styles.bottomSheet}>
        {/* <BlurView
          style={styles.blurView}
          overlayColor="transparent"
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="transparent"
        /> */}
        <AppButton
          label="Bắt đầu kiểm tra"
          buttonStyle={{width: s(307)}}
          onPress={() => navigationRef.navigate('ExamQuestion')}
        />
      </View>
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
  card: {
    width: s(307),
    height: vs(136),
    borderRadius: s(10),
    backgroundColor: COLORS.white,
    paddingHorizontal: s(30),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    width: s(135),
    height: vs(106),
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingVertical: vs(20),
  },
  blurView: {
    //backgroundColor: 'rgba(255,255,255,0.6)',
    ...StyleSheet.absoluteFillObject,
  },
});
export default ListExam;

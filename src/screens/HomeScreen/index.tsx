import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONT, s, vs} from '@utils/config';
import {Carousel, ButtonFunction, NewsCard, HistoryCard} from './components';
import AppView from '@components/AppView';
import {AppButton} from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppRoundedButton from '@components/AppRoundedButton';
type Props = NativeStackScreenProps<TRootStackNav, 'HomeScreen'>;

const HomeScreen = () => {
  const BUTTONS = [
    {icon: 'pencil', title: 'Kiểm tra', onPress: () => {}},
    {
      icon: 'history',
      title: 'Lịch sử',
      onPress: () => {
        navigationRef.navigate('ListResult');
      },
    },
    {
      icon: 'newspaper-o',
      title: 'Tin tức',
      onPress: () => navigationRef.navigate('News'),
    },
  ];
  return (
    <>
      <AppView>
        <View style={{gap: vs(10)}}>
          <Text style={styles.title}>
            Tư vấn hướng nghiệp và chọn ngành cho học sinh THPT
          </Text>
          <Carousel />
          <ButtonFunction buttons={BUTTONS} />
          <NewsCard />
          <HistoryCard />
        </View>
      </AppView>
      <View style={styles.floatingBtnContainer}>
        <AppRoundedButton
          type="fill"
          style={styles.floatingBtn}
          shadow={true}
          onPress={() => navigationRef.navigate('ChatBox')}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            color={COLORS.white}
            size={s(20)}
          />
        </AppRoundedButton>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  title: {
    textAlign: 'center',
    paddingHorizontal: s(27),
    ...FONT.content.M.bold,
    marginTop: s(10),
  },
  floatingBtnContainer: {
    position: 'absolute',
    zIndex: 999,
    right: s(30),
    bottom: vs(20),
  },
  floatingBtn: {
    width: s(60),
    height: s(60),
  },
});
export default HomeScreen;

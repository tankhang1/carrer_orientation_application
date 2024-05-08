import {View, Text, StyleSheet} from 'react-native';
import React, {lazy, Suspense} from 'react';
import {navigationRef} from '@navigation';
import {COLORS, FONT, s, vs} from '@utils/config';
import {ButtonFunction, NewsCard, HistoryCard} from './components';
import AppView from '@components/AppView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppRoundedButton from '@components/AppRoundedButton';
import AppSkeleton from '@components/AppSkeleton';
const Carousel = lazy(() => import('./components/Carousel/Carousel'));

const HomeScreen = () => {
  return (
    <>
      <AppView>
        <View style={{gap: vs(10)}}>
          <Text style={styles.title}>
            Tư vấn hướng nghiệp và chọn ngành cho học sinh THPT
          </Text>
          <Suspense fallback={<AppSkeleton width={'100%'} height={238} />}>
            <Carousel />
          </Suspense>
          <ButtonFunction />
          <NewsCard />

          <HistoryCard />
        </View>
      </AppView>
      <View style={styles.floatingBtnContainer}>
        <AppRoundedButton
          type="fill"
          style={styles.floatingBtn}
          shadow={true}
          onPress={() => navigationRef.navigate('ChatBot')}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            color={COLORS.white}
            size={s(24)}
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

import AppRoundedButton from '@components/AppRoundedButton';
import AppSkeleton from '@components/AppSkeleton';
import AppView from '@components/AppView';
import { navigationRef } from '@navigation';
import { KEY_STORE, storage } from '@store';
import { COLORS, FONT, s, vs } from '@utils/config';
import React, { lazy, Suspense, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonFunction, HistoryCard, NewsCard } from './components';

const Carousel = lazy(() => import('./components/Carousel/Carousel'));
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-7671392847069245/2923533772';
const HomeScreen = () => {
  const bannerRef = useRef<BannerAd>(null);
  console.log(storage.getString(KEY_STORE.ANNONYMOUS_TOKEN));

  return (
    <>
      <AppView style={{ gap: vs(10), marginBottom: vs(25) }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Career App - Tư vấn hướng nghiệp và chọn ngành cho học sinh THPT</Text>
        <Suspense fallback={<AppSkeleton width={'100%'} height={238} />}>
          <Carousel />
        </Suspense>
        <ButtonFunction />
        <NewsCard />
        <HistoryCard />
        <View style={styles.spacing} />
      </AppView>
      <View style={styles.footer}>
        <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        <View style={styles.floatingBtnContainer}>
          <AppRoundedButton
            type='fill'
            style={styles.floatingBtn}
            shadow={true}
            onPress={() => navigationRef.navigate('ChatBot')}>
            <Ionicons name='chatbubble-ellipses-outline' color={COLORS.white} size={s(24)} />
          </AppRoundedButton>
        </View>
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
    marginVertical: s(10),
  },
  floatingBtnContainer: {
    position: 'absolute',
    zIndex: 999,
    right: s(16),
    bottom: vs(50),
  },
  floatingBtn: {
    width: s(60),
    height: s(60),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  },
  spacing: {
    height: 30,
  },
});
export default HomeScreen;

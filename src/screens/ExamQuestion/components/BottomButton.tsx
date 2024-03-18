import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, s, vs} from '@utils/config';
import {BlurView} from '@react-native-community/blur';
import AppRoundedButton from '@components/AppRoundedButton';
import Entypo from 'react-native-vector-icons/Entypo';
import {AppProgressBar} from '@components';
import {navigationRef} from '@navigation';
const BottomButton = () => {
  return (
    <View style={styles.container}>
      {/* <BlurView
        style={styles.blurView}
        overlayColor="transparent"
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="transparent"
      /> */}
      <AppRoundedButton type="fill">
        <Entypo name="chevron-left" size={s(20)} color={COLORS.white} />
      </AppRoundedButton>
      <AppProgressBar />
      <AppRoundedButton
        type="fill"
        onPress={() => navigationRef.navigate('Result')}>
        <Entypo name="chevron-right" size={s(20)} color={COLORS.white} />
      </AppRoundedButton>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingVertical: vs(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: s(10),
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
  },
  blurView: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    ...StyleSheet.absoluteFillObject,
  },
});
export default BottomButton;

import {View, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, s, vs} from '@utils/config';
import AppRoundedButton from '@components/AppRoundedButton';
import Entypo from 'react-native-vector-icons/Entypo';
import {AppProgressBar} from '@components';
import {navigationRef} from '@navigation';
type TBottomButton = {
  onNext?: () => void;
  onPrev?: () => void;
};
const BottomButton = ({onNext, onPrev}: TBottomButton) => {
  return (
    <View style={styles.container}>
      <AppRoundedButton type="fill" onPress={onPrev}>
        <Entypo name="chevron-left" size={s(20)} color={COLORS.white} />
      </AppRoundedButton>
      <AppProgressBar />
      <AppRoundedButton
        type="fill"
        //onPress={() => navigationRef.navigate('Result')}
        onPress={onNext}>
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
});
export default BottomButton;

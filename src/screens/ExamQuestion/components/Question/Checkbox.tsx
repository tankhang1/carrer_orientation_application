import {StyleSheet, Pressable, View, ViewStyle, StyleProp} from 'react-native';
import React, {memo} from 'react';
import {COLORS, s} from '@utils/config';
import Entypo from 'react-native-vector-icons/Entypo';
type Props = {
  isCheck?: boolean;
  onPress?: () => void;
  checkedColor?: string;
  label?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
const Checkbox = ({isCheck = false, onPress = () => {}, checkedColor = COLORS.blue, style, label}: Props) => {
  return (
    <Pressable onPress={onPress} hitSlop={10} style={[styles.cont, style]}>
      <View
        style={[
          styles.box,
          {
            backgroundColor: isCheck ? checkedColor : COLORS.white,
            borderWidth: isCheck ? 0 : 1,
          },
        ]}>
        {isCheck && <Entypo name="check" color={COLORS.white} size={s(16)} />}
      </View>
      {label && label}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  box: {
    width: s(25),
    height: s(25),
    backgroundColor: COLORS.white,
    borderWidth: s(1),
    borderColor: COLORS.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: s(5),
  },
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(5),
  },
});
export default memo(Checkbox);

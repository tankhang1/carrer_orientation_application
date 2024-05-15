import {StyleSheet, Pressable} from 'react-native';
import React, {memo} from 'react';
import {COLORS, s} from '@utils/config';
import Entypo from 'react-native-vector-icons/Entypo';
type Props = {
  isCheck?: boolean;
  onPress?: () => void;
};
const Checkbox = ({isCheck = false, onPress = () => {}}: Props) => {
  return (
    <Pressable
      style={[
        styles.box,
        {
          backgroundColor: isCheck ? COLORS.blue : COLORS.white,
          borderWidth: isCheck ? 0 : 1,
        },
      ]}
      onPress={onPress}
      hitSlop={10}>
      {isCheck && <Entypo name="check" color={COLORS.white} size={s(16)} />}
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
});
export default memo(Checkbox);

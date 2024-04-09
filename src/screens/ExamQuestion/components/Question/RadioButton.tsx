import {View, StyleSheet, Pressable} from 'react-native';
import React, {memo} from 'react';
import {COLORS, s} from '@utils/config';
type Props = {
  selected?: boolean;
  onPress?: () => void;
};
const RadioButton = ({selected = true, onPress}: Props) => {
  return (
    <Pressable style={styles.outerCircle} onPress={onPress}>
      {selected && <View style={styles.innerCircle}></View>}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  outerCircle: {
    width: s(25),
    height: s(25),
    borderRadius: s(25),
    backgroundColor: COLORS.white,
    borderWidth: s(1),
    borderColor: COLORS.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: s(16),
    height: s(16),
    borderRadius: s(25),
    backgroundColor: COLORS.blue,
  },
});
export default memo(RadioButton);

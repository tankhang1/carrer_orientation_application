import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONT, s, vs, WIDTH} from '@utils';
import {AppButton} from '@components';
import AppImage from '@components/AppImage';

const LoginWithGoogle = () => {
  return (
    <View style={styles.container}>
      <AppButton
        label="Đăng nhập với Google"
        buttonStyle={styles.buttonCont}
        labelStyle={styles.label}
        size="S"
        leading={<AppImage source={require('@assets/images/google.webp')} style={styles.image} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: vs(20),
  },
  w: {
    width: WIDTH * 0.85,
  },
  buttonCont: {
    backgroundColor: COLORS.white,
    width: WIDTH * 0.85,
    borderColor: COLORS.grey,
    borderWidth: 1,
    padding: vs(1),
  },
  label: {
    ...FONT.button.M.semiBold,
    color: '#4a4653',
    marginLeft: s(5),
  },
  image: {
    width: s(40),
    height: s(40),
    resizeMode: 'contain',
  },
});
export default LoginWithGoogle;

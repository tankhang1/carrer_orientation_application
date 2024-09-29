import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, FONT, s, vs, WIDTH} from '@utils';
import {AppButton} from '@components';
import AppImage from '@components/AppImage';
import {statusCodes, isErrorWithCode, GoogleSignin, isSuccessResponse} from '@react-native-google-signin/google-signin';

const LoginWithGoogle = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '276591717037-10s611vbh4s4tkv6rf1ke60d0va208d0.apps.googleusercontent.com',
      iosClientId: '276591717037-h09igdv54rs47safjmqsjbhbt8oan3qf.apps.googleusercontent.com',
    });
  }, []);
  const signInWithGoogle = async () => {
    console.log('sign in with gg');
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        console.log('response', response);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      console.log('error', error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  return (
    <View style={styles.container}>
      <AppButton
        label="Đăng nhập với Google"
        buttonStyle={styles.buttonCont}
        labelStyle={styles.label}
        size="S"
        leading={<AppImage source={require('@assets/images/google.webp')} style={styles.image} />}
        onPress={signInWithGoogle}
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
    color: COLORS.dark,
    marginLeft: s(5),
  },
  image: {
    width: s(40),
    height: s(40),
    resizeMode: 'contain',
  },
});
export default LoginWithGoogle;

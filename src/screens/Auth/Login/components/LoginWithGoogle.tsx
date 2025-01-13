import { AppButton } from '@components';
import AppImage from '@components/AppImage';
import { ILoginResponse } from '@interfaces/DTO/Auth/auth';
import { navigationRef } from '@navigation';
import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { ENDPOINTS_URL } from '@service';
import api from '@service/api';
import { KEY_STORE, storage } from '@store';
import { useAuthStore } from '@store/auth.store';
import { setLocalAccessToken } from '@store/local-storage.store';
import { useMutation } from '@tanstack/react-query';
import { COLORS, FONT, s, vs, WIDTH } from '@utils';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
type SocialLoginInput = {
  email: string;
  name: string | null;
};
const LoginWithGoogle = () => {
  const authStore = useAuthStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '276591717037-10s611vbh4s4tkv6rf1ke60d0va208d0.apps.googleusercontent.com',
      iosClientId: '276591717037-h09igdv54rs47safjmqsjbhbt8oan3qf.apps.googleusercontent.com',
    });
  }, []);
  const {
    isPending,
    mutate: postLogin,
    error,
  } = useMutation<ILoginResponse, Error, SocialLoginInput>({
    mutationFn: (variables: SocialLoginInput) => {
      return api(ENDPOINTS_URL.AUTH.LOGIN_WITH_SOCIAL, 'POST', {
        data: variables,
      }) as Promise<ILoginResponse>; // Type assertion
    },
    onSuccess: (data: ILoginResponse) => {
      storage.set(KEY_STORE.ANNONYMOUS_TOKEN, data.data.accessToken);

      const { accessToken, ...userInfo } = data?.data;
      authStore?.setAuthStore({ ...userInfo });
      setLocalAccessToken(accessToken);
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Đăng nhập thành công!',
      });
      navigationRef.navigate('GroupList');
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Cảnh báo',
        text2: 'Đăng nhập thất bại!',
      });
    },
  });

  const signInWithGoogle = async () => {
    console.log('sign in with gg');
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        postLogin({
          email: response.data.user.email,
          name: response.data.user.name,
        });
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
        label='Đăng nhập với Google'
        buttonStyle={styles.buttonCont}
        labelStyle={styles.label}
        size='S'
        leading={<AppImage source={require('@assets/images/google.webp')} style={styles.image} />}
        onPress={signInWithGoogle}
        loading={isPending}
      />
      {error?.message && <Text style={styles.error}>* {error?.message}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: vs(20),
  },
  error: { fontSize: 14, color: 'red', marginTop: 10 },

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

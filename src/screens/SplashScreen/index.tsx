import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TRootStackNav} from '@utils/types/RootStackNav';
import {navigationRef} from '@navigation';
import {Skottie} from 'react-native-skottie';
import clover from '@assets/images/clover.json';
import {COLORS, width} from '@utils/config';
type Props = NativeStackScreenProps<TRootStackNav, 'SplashScreen'>;
const SplashScreen = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigationRef.navigate('HomeScreen');
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <View style={styles.container}>
      <Skottie
        style={styles.skottieImage}
        source={clover}
        autoPlay={true}
        loop={true}
        speed={1}
        resizeMode="cover"
      />
      <Image
        source={require('@assets/images/slogan.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skottieImage: {
    width: width,
    height: width,
  },
  image: {
    width: width * 0.7,
    height: 100,
  },
});
export default SplashScreen;

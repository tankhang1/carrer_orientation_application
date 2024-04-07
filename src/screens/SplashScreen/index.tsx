import {View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, width} from '@utils/config';
import LottieView from 'lottie-react-native';
import {navigationRef} from '@navigation';
import {useQuery} from '@tanstack/react-query';
const SplashScreen = () => {
  // const {isPending, error, data} = useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: () =>
  //     fetch('https://api.github.com/repos/TanStack/query').then(res =>
  //       res.json(),
  //     ),
  // });
  //console.log(data);
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigationRef.navigate('HomeScreen');
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/images/clover.json')}
        autoPlay
        loop
        style={styles.lottie}
        resizeMode="contain"
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
  lottie: {
    width: width,
    height: width,
  },
  image: {
    width: width * 0.7,
    height: 100,
  },
});
export default SplashScreen;

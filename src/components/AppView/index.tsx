import {ImageBackground, StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '@utils/config';
type TAppView = {
  children?: React.ReactNode;
};
const AppView = ({children}: TAppView) => {
  return (
    <ImageBackground
      source={require('@assets/images/background.png')}
      resizeMode="cover"
      style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>{children && children}</View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
export default AppView;
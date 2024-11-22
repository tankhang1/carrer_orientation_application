import {View, Text, StyleSheet, Linking} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppRoundedButton from '@components/AppRoundedButton';
import {COLORS, FONT, s, WIDTH, width} from '@utils/config';
import {navigationRef} from '@navigation';
type TButton = {
  icon?: string;
  title?: string;
  onPress?: () => void;
};
const BUTTONS: TButton[] = [
  {
    icon: 'pencil',
    title: 'Kiểm tra',
    onPress: () => {
      navigationRef.navigate('ListExam');
    },
  },
  {
    icon: 'history',
    title: 'Lịch sử',
    onPress: () => {
      navigationRef.navigate('ListResult');
    },
  },
  {
    icon: 'newspaper-o',
    title: 'Tin tức',
    onPress: () => navigationRef.navigate('News'),
  },
  {
    icon: 'book',
    title: 'Từ điển',
    onPress: () => navigationRef.navigate('Dictionary'),
  },
  {
    icon: 'users',
    title: 'Tài khoản',
    onPress: () => navigationRef.navigate('Login'),
  },
  {
    icon: 'envelope-o',
    title: 'Liên hệ',
    onPress: () => Linking.openURL('mailto:mydaily203@gmail.com'),
  },
];
const ButtonFunction = () => {
  return (
    <View style={styles.container}>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
      <View style={styles.buttonCont}>
        {BUTTONS?.map((button: TButton, index: number) => {
          return (
            <View key={index} style={styles.button}>
              <AppRoundedButton onPress={button.onPress}>
                <FontAwesome name={button.icon as string} color={COLORS.green} size={s(20)} />
              </AppRoundedButton>
              <Text style={FONT.content.M.medium}>{button.title}</Text>
            </View>
          );
        })}
      </View>
      {/* </ScrollView> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    alignItems: 'center',
    paddingVertical: s(15),
    width: WIDTH / 3,
    gap: s(5),
  },
});
export default ButtonFunction;

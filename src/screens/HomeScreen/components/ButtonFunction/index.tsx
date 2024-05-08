import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppRoundedButton from '@components/AppRoundedButton';
import {COLORS, FONT, s, vs, width} from '@utils/config';
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
];
const ButtonFunction = () => {
  return (
    <View style={styles.container}>
      {BUTTONS?.map((button: TButton, index: number) => {
        return (
          <View key={index} style={styles.button}>
            <AppRoundedButton onPress={button.onPress}>
              <FontAwesome
                name={button.icon as string}
                color={COLORS.green}
                size={s(20)}
              />
            </AppRoundedButton>
            <Text style={FONT.content.M.medium}>{button.title}</Text>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'space-between',
    paddingHorizontal: s(27),

    flexDirection: 'row',
  },
  button: {
    gap: vs(5),
    alignItems: 'center',
  },
});
export default ButtonFunction;

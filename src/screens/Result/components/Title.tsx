import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {FONT, s} from '@utils/config';
import AppImage from '@components/AppImage';
type Props = {
  title: string;
};
const Title = ({title}: Props) => {
  return (
    <View style={styles.wrapper}>
      <AppImage
        source={require('@assets/images/bookmark.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: s(27),
    gap: s(10),
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  image: {
    width: s(20),
    height: s(20),
  },
  title: {
    ...FONT.title.XL,
    textAlign: 'left',
  },
});
export default Title;

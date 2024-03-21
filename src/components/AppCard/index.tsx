import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {memo} from 'react';
import {COLORS, FONT, s, width} from '@utils/config';
import AppImage from '@components/AppImage';
type TAppCard = {
  imageUrl: string;
  title?: string;
  subTitle?: string;
  type?: 'small' | 'large';
  containerStyle?: StyleProp<ViewStyle>;
  shadow?: boolean;
  imageStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
};
const CARD_BASE_TYPE = {
  small: {
    flexDirection: 'column',
    padding: s(6),
    width: s(100),
  },
  large: {
    flexDirection: 'row',
    padding: s(15),
    width: '100%',
  },
};
const CARD_FONT = {
  small: {
    title: FONT.content.XXS.semiBold,
    subTitle: FONT.content.XXXS.regular,
  },
  large: {
    title: FONT.content.M.semiBold,
    subTitle: FONT.content.XS.medium,
  },
};
const AppCard = ({
  imageUrl,
  title,
  subTitle,
  type = 'small',
  containerStyle,
  shadow = false,
  titleStyle,
  subTitleStyle,
  onPress,
}: TAppCard) => {
  const initStyle = StyleSheet.flatten([
    styles.container,
    containerStyle,
    CARD_BASE_TYPE[type],
    shadow && styles.shadow,
  ]) as ViewStyle;
  return (
    <TouchableOpacity style={initStyle} onPress={onPress}>
      <AppImage source={{uri: imageUrl}} style={[styles.image]} />
      <View style={type === 'large' && styles.largeTitle}>
        <Text
          style={[
            CARD_FONT[type].subTitle,
            {color: COLORS.grey},
            subTitleStyle,
          ]}>
          {subTitle}
        </Text>
        <Text style={[CARD_FONT[type].title, titleStyle]} numberOfLines={4}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
    maxWidth: width,
  },
  image: {
    width: s(80),
    height: s(80),
    borderRadius: s(10),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  largeTitle: {
    width: '70%',
    marginLeft: s(10),
    justifyContent: 'space-between',
  },
});
export default memo(AppCard);

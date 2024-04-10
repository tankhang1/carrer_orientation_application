import {
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import React from 'react';
import {COLORS, FONT, s, vs, width} from '@utils/config';
import AppImage from '@components/AppImage';
import {Source} from 'react-native-fast-image';
import AppButton from '@components/AppButton';
import Animated, {SlideInDown} from 'react-native-reanimated';
type TAppModal = {
  title?: string;
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
  image?: ImageSourcePropType & (number | Source);
  onCancel?: () => void;
  onAccept?: () => void;
  disableBackDrop?: boolean;
};
const AppModal = ({
  title = '',
  image = require('@assets/images/question.jpeg'),
  onAccept = () => {},
  onCancel = () => {},
  visible = false,
  setVisible = () => {},
  disableBackDrop = false,
}: TAppModal) => {
  if (!visible) return;
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Pressable
        disabled={disableBackDrop}
        style={styles.backdrop}
        onPress={() => setVisible(false)}
      />
      <Animated.View style={styles.card} entering={SlideInDown.delay(100)}>
        {title && <Text style={styles.title}>{title}</Text>}
        <AppImage source={image} style={styles.image} resizeMode="contain" />
        <View style={styles.buttonContainer}>
          <AppButton
            label="Bỏ qua"
            type="outline"
            buttonStyle={{paddingVertical: vs(8)}}
            labelStyle={FONT.content.M.semiBold}
            onPress={onCancel}
          />
          <AppButton
            label="Tiếp tục"
            buttonStyle={{paddingVertical: vs(10)}}
            labelStyle={[FONT.content.M.bold, {color: COLORS.white}]}
            onPress={onAccept}
          />
        </View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.backdrop,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    width: width * 0.85,
    padding: s(30),
    alignItems: 'center',
  },
  title: {
    ...FONT.title.M,
    textAlign: 'justify',
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: s(10),
  },
});
export default AppModal;

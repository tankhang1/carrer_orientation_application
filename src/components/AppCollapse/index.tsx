import { COLORS, FONT, s, vs } from '@utils';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AppCollapseProps = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  children?: React.ReactNode;
};

const AppCollapse = ({ style, title, children }: AppCollapseProps) => {
  // STATE
  const [open, setOpen] = useState(false);
  const rotateDeg = useSharedValue<number>(0);

  // METHOD
  const handlePress = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'spring', springDamping: 0.4 },
      delete: { type: 'easeInEaseOut', property: 'opacity' },
    });
    rotateDeg.value = open ? withTiming(0) : withTiming(180);
    setOpen((prev) => !prev);
  };

  const rotateAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateDeg.value}deg` }],
  }));

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={rotateAnimatedStyle}>
          <Entypo name='chevron-down' size={20} />
        </Animated.View>
      </TouchableOpacity>
      {open && <View style={styles.divider} />}
      {open && !!children && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    //paddingVertical: vs(8),
    paddingHorizontal: s(12),
    borderRadius: 6,
  },
  divider: {
    height: 1,
    width: '95%',
    backgroundColor: COLORS.lightGrey,
    alignSelf: 'center',
  },
  option: {
    paddingVertical: vs(8),
    paddingHorizontal: s(12),
    borderColor: COLORS.darkGrey,
  },
  title: {
    ...FONT.content.M.medium,
    marginVertical: vs(10),
    width: '90%',
  },
});

export default AppCollapse;

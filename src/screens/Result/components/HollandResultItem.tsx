import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {COLORS, FONT, height, s, vs, width} from '@utils/config';
import {navigationRef} from '@navigation';
import {TResults} from './HollandResult';
import AppImage from '@components/AppImage';
import RenderHTML from 'react-native-render-html';
type Props = {
  index: number;
  result: TResults;
  animatedScroll: SharedValue<number>;
};
const ITEM_SIZE = width * 0.8;
const SPACING = (width - ITEM_SIZE) / 2;
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const HollandResultItem = ({index, result, animatedScroll}: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            animatedScroll.value,
            [
              ITEM_SIZE * (index - 1),
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1),
            ],
            [1, 1.1, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, []);
  return (
    <Animated.View
      style={{
        marginLeft: index === 0 ? SPACING : 0,
        marginRight: index === 5 ? SPACING : 0,
        height: 'auto',
        width: width * 0.8,
        alignItems: 'center',
        paddingVertical: vs(30),
      }}>
      <Animated.View style={animatedStyle}>
        <AnimatedTouchableOpacity
          style={[styles.card]}
          key={index}
          onPress={() => {
            navigationRef.navigate('ResultDetail', {
              url: result.resultContents[0].detail!,
            });
          }}>
          <View style={styles.imageContainer}>
            <AppImage
              source={{uri: result.resultContents[0].image}}
              style={styles.image}
            />
          </View>
          {result?.resultContents[0] && (
            <View>
              <RenderHTML
                source={{
                  html: result?.resultContents[0].content as unknown as string,
                }}
                contentWidth={200}
                enableExperimentalMarginCollapsing={true}
                tagsStyles={{
                  article: {color: COLORS.black},
                  h3: {alignSelf: 'center'},
                }}
              />
            </View>
          )}
          <Text style={styles.bottomText}>{index}</Text>
        </AnimatedTouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    padding: s(10),
    gap: s(5),
    alignItems: 'center',
    width: width * 0.72,
    height: height * 0.5,
  },
  imageContainer: {
    gap: vs(5),
    alignItems: 'center',
  },
  image: {
    width: s(80),
    height: s(80),
  },
  bottomText: {
    ...FONT.content.XXS.medium,
    position: 'absolute',
    bottom: 5,
  },
});
export default HollandResultItem;

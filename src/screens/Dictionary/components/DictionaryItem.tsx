import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  UIManager,
  ListRenderItemInfo,
} from 'react-native';
import React from 'react';
import {COLORS, FONT, height, s, vs, width} from '@utils';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import AppCardCarousel from '@components/AppCardCarousel';
import CardFlipltItem from '@components/AppCardCarousel/components/CardFlipItem';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const CARD_HEIGHT = height * 0.9;
const data = [
  {
    name: 'Kỹ thuật điện tử',
    pros: `Nhu cầu Cao: Kỹ sư điện tử luôn được tìm kiếm do vai trò quan trọng của điện tử trong mọi lĩnh vực của cuộc sống hiện đại, từ điện tử tiêu dùng đến các hệ thống cơ sở hạ tầng quan trọng.
    \nCơ hội Sáng tạo: Lĩnh vực này cung cấp nhiều cơ hội lớn cho sự sáng tạo trong việc phát triển các thiết bị và ứng dụng mới, góp phần vào sự tiến bộ công nghệ.
    \nCơ hội Nghề nghiệp Lương cao: Kỹ sư điện tử thường được trả lương tốt, ngay cả ở các vị trí mới bắt đầu do các kỹ năng và kiến thức chuyên môn đặc biệt cần thiết.
    \nĐa dạng Lộ trình Nghề nghiệp: Các chuyên gia có thể làm việc trong nhiều lĩnh vực khác nhau, bao gồm viễn thông, robot học, máy tính, hàng không vũ trụ và chăm sóc sức khỏe, cung cấp nhiều lộ trình nghề nghiệp và cơ hội.`,
    cons: `Thay đổi Công nghệ nhanh chóng: Sự phát triển nhanh chóng của công nghệ đòi hỏi học hỏi và thích nghi liên tục, điều này có thể gây áp lực và căng thẳng cho một số người.
    \nÁp lực và Thời hạn Công việc cao: Kỹ sư thường phải đối mặt với thời hạn dự án chặt chẽ và kỳ vọng cao về độ chính xác và độ tin cậy, tạo ra môi trường làm việc áp lực cao.
    \nRủi ro cho Sức khỏe: Tiếp xúc lâu dài với màn hình máy tính, hóa chất trong quá trình sản xuất và nguy cơ từ thiết bị điện có thể gây ra các rủi ro cho sức khỏe.
    \nVấn đề Bảo mật việc làm: Khi tự động hóa và việc giao việc ra nước ngoài trở nên phổ biến hơn, một số vai trò truyền thống trong lĩnh vực kỹ thuật điện tử có thể gặp nguy cơ, có thể ảnh hưởng đến bảo mật việc làm.`,
  },
  {},
  {},
  {},
  {},
];
type TDictionaryItem = {
  title?: string;
  scrollToItem?: () => void;
};
const DictionaryItem = ({title, scrollToItem}: TDictionaryItem) => {
  const offset = useSharedValue(0);
  const startY = useSharedValue(0);
  const animValue = useDerivedValue(() =>
    interpolate(offset.value, [0, CARD_HEIGHT], [-1, 1]),
  );
  const animatedScroll = useSharedValue(0);
  const onPress = () => {
    offset.value = offset.value === 0 ? withTiming(CARD_HEIGHT) : withTiming(0);
    if (offset.value === 0) {
      scrollToItem!();
    }
  };

  const leftIconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {rotate: `${interpolate(animValue.value, [-1, 1], [0, -180])}deg`},
    ],
  }));
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animValue.value,
      [-1, 1],
      [COLORS.white, 'rgba(255, 255, 255, 0.2)'],
    ),
    height: interpolate(animValue.value, [-1, 1], [42, CARD_HEIGHT]),
    width: interpolate(animValue.value, [-1, 1], [width * 0.8, width]),
  }));

  const gesture = Gesture.Pan()
    .onStart(() => {
      startY.value = offset.value;
    })
    .onUpdate(e => {
      if (offset.value < CARD_HEIGHT) {
        offset.value = e.translationY + startY.value;
      }
    })
    .onEnd(() => {
      if (startY.value === 0) {
        offset.value = withSpring(CARD_HEIGHT);
        runOnJS(scrollToItem!)();
      } else {
        offset.value = withTiming(0);
      }
    });

  const renderItem = ({item, index}: ListRenderItemInfo<any>) => {
    return (
      <CardFlipltItem
        index={index}
        key={index}
        animatedScroll={animatedScroll}
        h={height * 0.55}
        length={data?.length}
        children={
          <View>
            <Text>AA</Text>
          </View>
        }
      />
    );
  };
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={styles.overall}>
        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          <Pressable style={styles.title} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
            <Animated.View style={leftIconAnimatedStyle}>
              <Feather name="chevron-down" color={COLORS.grey} size={s(20)} />
            </Animated.View>
          </Pressable>
          <View>
            <View style={styles.divider} />
            <View style={styles.cardContainer}>
              <AppCardCarousel
                data={data}
                renderItem={renderItem}
                animatedScroll={animatedScroll}
                snapToInterval={width * 0.7}
              />
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};
const styles = StyleSheet.create({
  overall: {
    overflow: 'hidden',
  },
  title: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: s(20),
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  card: {
    borderRadius: s(10),
    borderColor: COLORS.green,
    paddingVertical: s(10),
    alignSelf: 'center',
  },
  text: {
    ...FONT.content.M.medium,
  },
  divider: {
    height: vs(1),
    backgroundColor: COLORS.grey,
    borderRadius: s(10),
    marginVertical: vs(10),
    marginHorizontal: s(20),
  },
});
export default DictionaryItem;

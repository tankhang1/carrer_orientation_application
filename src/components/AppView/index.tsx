import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  StyleProp,
  ViewStyle,
  FlatList,
  ListRenderItemInfo,
  FlatListProps,
} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type TAppView<TData> = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  data?: TData[];
  renderItem?: (
    info: ListRenderItemInfo<TData>,
  ) => React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null;
} & Partial<FlatListProps<TData>>;
export type TAppViewRef = {
  scrollToItem: (index: number) => void;
};
const AppView = forwardRef<TAppViewRef, TAppView<any>>(
  <TData,>(
    {children, style, data = [], renderItem, ...FlatlistProps}: TAppView<TData>,
    ref: React.ForwardedRef<TAppViewRef>,
  ) => {
    const flatlistRef = useRef<FlatList>(null);
    useImperativeHandle(ref, () => {
      return {
        scrollToItem(index) {
          // flatlistRef?.current?.scrollToIndex({
          //   index,
          //   animated: true,
          //   viewPosition: 0.5,
          // });
          console.log('aaaa', index);
          flatlistRef?.current?.scrollToEnd();
        },
      };
    });
    return (
      <ImageBackground
        source={require('@assets/images/background.png')}
        resizeMode="cover"
        style={styles.wrapper}>
        <SafeAreaView style={[styles.container, style]}>
          <GestureHandlerRootView>
            {data?.length === 0 ? (
              <ScrollView
                removeClippedSubviews
                renderToHardwareTextureAndroid
                {...FlatlistProps}>
                <View>{children && children}</View>
              </ScrollView>
            ) : (
              <FlatList
                data={data}
                renderItem={renderItem}
                {...FlatlistProps}
                ref={flatlistRef}
              />
            )}
          </GestureHandlerRootView>
        </SafeAreaView>
      </ImageBackground>
    );
  },
);
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

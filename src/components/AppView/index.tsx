import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  StyleProp,
  ViewStyle,
  ListRenderItemInfo,
  FlatListProps,
  FlatList,
} from 'react-native';
import React, {forwardRef} from 'react';
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
    return (
      <ImageBackground
        source={require('@assets/images/background_1.png')}
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

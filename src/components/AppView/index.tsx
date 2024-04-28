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
import React from 'react';
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
const AppView = <TData,>({
  children,
  style,
  data = [],
  renderItem,
  ...FlatlistProps
}: TAppView<TData>) => {
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
            <FlatList data={data} renderItem={renderItem} {...FlatlistProps} />
          )}
        </GestureHandlerRootView>
      </SafeAreaView>
    </ImageBackground>
  );
};
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

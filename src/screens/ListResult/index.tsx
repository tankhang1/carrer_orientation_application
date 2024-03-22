import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {lazy, Suspense} from 'react';
import AppView from '@components/AppView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONT, s, vs, width} from '@utils/config';
import {SafeAreaView} from 'react-native-safe-area-context';
const Card = lazy(
  () => import('@screens/HomeScreen/components/HistoryCard/Card'),
);
import {navigationRef} from '@navigation';
import AppSkeleton from '@components/AppSkeleton';
const AppListResultHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigationRef.goBack()}>
        <AntDesign name="arrowleft" size={s(25)} color={COLORS.black} />
      </TouchableOpacity>
      <Text style={FONT.title.XXL.bold}>Kết quả kiểm tra</Text>
    </View>
  );
};
const ListResult = () => {
  const renderCard = ({item, index}: ListRenderItemInfo<any>) => {
    return (
      <Suspense
        fallback={<AppSkeleton width={width * 0.9} height={300} radius={10} />}>
        <Card key={index} isExpand={true} index={index} />
      </Suspense>
    );
  };
  return (
    <ImageBackground
      source={require('@assets/images/background.png')}
      resizeMode="cover"
      style={{
        flex: 1,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <AppView
          data={Array.from({length: 10})}
          renderItem={renderCard}
          contentContainerStyle={{
            gap: vs(10),
            alignSelf: 'center',
          }}
          ListHeaderComponent={<AppListResultHeader />}
          renderToHardwareTextureAndroid
          removeClippedSubviews
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ListResult;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(10),
    gap: s(10),
  },
});

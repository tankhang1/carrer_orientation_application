import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import AppView from '@components/AppView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONT, s, vs} from '@utils/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '@screens/HomeScreen/components/HistoryCard/Card';
import {navigationRef} from '@navigation';
const ListResult = () => {
  const renderCard = ({item, index}: ListRenderItemInfo<any>) => {
    return <Card key={index} isExpand={true} />;
  };
  return (
    <ImageBackground
      source={require('@assets/images/background.png')}
      resizeMode="cover"
      style={{
        flex: 1,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigationRef.goBack()}>
            <AntDesign name="arrowleft" size={s(25)} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={FONT.title.XXL.bold}>Kết quả kiểm tra</Text>
        </View>

        <View
          style={{
            marginTop: vs(10),
            flex: 1,
          }}>
          <FlatList
            data={Array.from({length: 10})}
            renderItem={renderCard}
            contentContainerStyle={{
              gap: vs(10),
              alignSelf: 'center',
            }}
          />
        </View>
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

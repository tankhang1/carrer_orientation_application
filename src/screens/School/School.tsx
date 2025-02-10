import { AppButton, AppTextInput } from '@components';
import AppHeader from '@components/AppHeader';
import { INew } from '@interfaces/DTO';
import { COLORS, FONT, s, vs } from '@utils/config';
import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, ListRenderItemInfo, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
const School = () => {
  const [category, setCategory] = useState('');
  const [searchInfo, setSearchInfo] = useState('');
  const onCategoryPress = (category: string) => {
    setCategory(category);
    setSearchInfo('');
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<INew>) => (
    <View>
      <Text></Text>
    </View>
  );
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground source={require('@assets/images/background_1.png')} resizeMode='cover' style={styles.wrapper}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppHeader
            title='Danh sách trường học'
            style={{
              marginBottom: 10,
            }}
          />
          <FlatList
            scrollEventThrottle={16}
            data={[]}
            ListHeaderComponent={
              <View>
                <AppTextInput
                  width={'100%'}
                  value={searchInfo}
                  onChangeText={setSearchInfo}
                  containerStyle={{
                    backgroundColor: COLORS.white,
                    borderWidth: 0,
                  }}
                  outStyle={{ marginHorizontal: s(20) }}
                  placeholder='Tìm kiếm trường học'
                  placeholderTextColor={COLORS.grey}
                  trailing={<AntDesign name='search1' size={s(25)} color={COLORS.grey} />}
                />

                <ScrollView
                  horizontal
                  contentContainerStyle={{
                    gap: s(10),
                    paddingHorizontal: s(20),
                  }}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    marginVertical: vs(10),
                  }}>
                  {['Tư thục', 'Công lập'].map((item, index) => (
                    <AppButton
                      key={index}
                      label={item}
                      labelStyle={[
                        FONT.content.M.semiBold,
                        {
                          marginHorizontal: 0,
                        },
                        category === item ? { color: COLORS.white } : { color: COLORS.black },
                      ]}
                      buttonStyle={[
                        styles.categoryBtn,
                        category === item && {
                          backgroundColor: COLORS.green,
                        },
                      ]}
                      onPress={() => onCategoryPress(item)}
                    />
                  ))}
                </ScrollView>
              </View>
            }
            renderItem={renderItem}
            onEndReachedThreshold={0.2}
            keyboardDismissMode='on-drag'
            renderToHardwareTextureAndroid
            maxToRenderPerBatch={10}
          />
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default School;
const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    flex: 1,
  },
  header: {
    marginBottom: vs(10),
  },
  categoryBtn: {
    paddingVertical: s(15),
    borderWidth: s(2),
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
  },
  placeHolderContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  placeHolderText: {
    ...FONT.content.L,
    color: COLORS.grey,
    textAlign: 'center',
  },
});

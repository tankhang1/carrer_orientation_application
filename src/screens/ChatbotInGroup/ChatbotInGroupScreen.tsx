import { AppHeader } from '@components';
import AppImage from '@components/AppImage';
import { IChat } from '@interfaces/DTO';
import { COLORS, FONT, s, vs } from '@utils';
import React from 'react';
import { FlatList, ImageBackground, KeyboardAvoidingView, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SAMPLE_LIST = [
  {
    isBot: true,
    message: 'Hello',
  },
  {
    isBot: false,
    message: 'Hi',
  },
];

const ChatbotInGroupScreen = () => {
  const renderChat = ({ item, index }: ListRenderItemInfo<IChat>) => {
    return (
      <View
        key={index}
        style={[
          {
            flexDirection: item.isBot ? 'row' : 'row-reverse',
          },
          styles.chatRowWrapper,
        ]}>
        <AppImage
          source={{
            uri: item.isBot
              ? 'https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg'
              : 'https://static.vecteezy.com/system/resources/previews/021/770/056/non_2x/avatar-of-a-student-character-free-vector.jpg',
          }}
          style={[styles.avatar, { borderRadius: s(100) }]}
          resizeMode='contain'
        />
        <View style={styles.chatCard}>
          <Text style={FONT.content.S}>{item.message}</Text>
        </View>
      </View>
    );
  };
  return (
    <ImageBackground source={require('@assets/images/background_1.png')} resizeMode='cover' style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <SafeAreaView style={[styles.wrapper]}>
          <AppHeader style={{ marginHorizontal: -s(27), marginBottom: vs(16) }} title='Chat cùng giáo viên' />

          <View style={{ flex: 1 }}>
            <FlatList data={SAMPLE_LIST} renderItem={renderChat} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: vs(10),
    paddingHorizontal: s(27),
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatRowWrapper: {
    alignItems: 'flex-end',
    gap: s(10),
    flex: 1,
  },
  avatar: {
    width: s(30),
    height: s(30),
  },
  chatCard: {
    padding: s(10),
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    maxWidth: '80%',
  },
});
export default ChatbotInGroupScreen;

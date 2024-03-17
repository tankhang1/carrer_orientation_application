import {
  View,
  Text,
  ListRenderItemInfo,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  ImageBackground,
  Platform,
} from 'react-native';
import React from 'react';
import {TNewsCategory} from '@screens/News/mock';
import AppImage from '@components/AppImage';
import {COLORS, FONT, height, s, vs} from '@utils/config';
import AppView from '@components/AppView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppTextInput} from '@components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Chats, TChat} from './mock';
import {navigationRef} from '@navigation';
const Chatbox = () => {
  const botId = 'bot';
  const renderChat = ({item, index}: ListRenderItemInfo<TChat>) => {
    return (
      <View
        key={item.id}
        style={{
          flexDirection: item.userId === botId ? 'row' : 'row-reverse',
          alignItems: 'flex-end',
          gap: s(10),
          flex: 1,
        }}>
        <AppImage
          source={{uri: item.avatar}}
          style={{
            width: s(45),
            height: s(45),
            borderRadius: s(45),
          }}
        />
        <View
          style={{
            padding: s(10),
            backgroundColor: COLORS.white,
            borderRadius: s(10),
            maxWidth: '80%',
          }}>
          <Text style={FONT.content.S}>{item.message}</Text>
        </View>
      </View>
    );
  };
  return (
    <ImageBackground
      source={require('@assets/images/background.png')}
      resizeMode="cover"
      style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <SafeAreaView style={[styles.container, {padding: s(10)}]}>
          <TouchableOpacity onPress={() => navigationRef.goBack()}>
            <AntDesign name="arrowleft" size={s(25)} color={COLORS.black} />
          </TouchableOpacity>
          <View style={styles.container}>
            <FlatList
              data={Chats}
              renderItem={renderChat}
              contentContainerStyle={{gap: vs(10)}}
            />
          </View>
          <AppTextInput
            outStyle={styles.chatInput}
            containerStyle={{
              borderWidth: 0,
            }}
            trailing={
              <Ionicons name="send-outline" size={s(25)} color={COLORS.grey} />
            }
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Chatbox;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatInput: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    elevation: 4,
    marginBottom: vs(20),
    marginTop: vs(10),
  },
});

import {
  View,
  Text,
  ListRenderItemInfo,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Keyboard,
  InteractionManager,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppImage from '@components/AppImage';
import {COLORS, FONT, s, vs} from '@utils/config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppTextInput} from '@components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigationRef} from '@navigation';
import {useMutation} from '@tanstack/react-query';
import {IChat, IResponse} from '@interfaces/DTO';
import useAPI from '@service/api';
import {ENDPOINTS_URL} from '@service';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Chatbot = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [message, setMessage] = useState('');
  const scrollRef = useRef<FlatList>(null);
  const animatedValue = useSharedValue(0);
  const getChat = useMutation({
    mutationFn: async (message: string) => {
      if (!message) return;
      return await useAPI(ENDPOINTS_URL.CHAT_BOT.GET_CHAT, 'POST', {
        data: {prompt: message},
      });
    },
    onSuccess: async (data: IResponse | any) => {
      InteractionManager.runAfterInteractions(() => {
        if (data?.code === 200) {
          setChats([
            ...chats,
            {
              isBot: true,
              message: data?.data,
            },
          ]);
        }
      });
    },
    onSettled: () => {
      console.log('settle');
    },
    onError: async e => {
      console.log('err', e);
    },
  });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {rotate: `${interpolate(animatedValue.value, [0, 1], [0, 360])}deg`},
    ],
  }));
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (chats?.length !== 0) {
        scrollRef?.current?.scrollToEnd();
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [chats?.length]);
  const renderChat = ({item, index}: ListRenderItemInfo<IChat>) => {
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
          source={
            item.isBot
              ? require('@assets/images/clover.png')
              : require('@assets/images/avatar.jpeg')
          }
          style={[styles.avatar, {borderRadius: item.isBot ? 0 : s(100)}]}
          resizeMode="contain"
        />
        <View style={styles.chatCard}>
          <Text style={FONT.content.S}>{item.message}</Text>
        </View>
      </View>
    );
  };
  const onSubmit = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    if (!message.trim()) return;
    const newMessage = {
      isBot: false,
      message,
    };
    if (chats?.length === 0) {
      setChats([newMessage]);
    }
    setChats([...chats, newMessage]);
    setMessage('');
    getChat.mutate(message.trim());
  };
  useEffect(() => {
    if (getChat.isPending) {
      animatedValue.value = withRepeat(withTiming(1, {duration: 1000}), -1);
    } else {
      animatedValue.value = withTiming(0);
    }
  }, [getChat.isPending]);

  return (
    <ImageBackground
      source={require('@assets/images/background.png')}
      resizeMode="cover"
      style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <SafeAreaView style={[styles.container, styles.wrapper]}>
          <TouchableOpacity onPress={() => navigationRef.goBack()}>
            <AntDesign name="arrowleft" size={s(25)} color={COLORS.black} />
          </TouchableOpacity>
          <View style={styles.container}>
            <FlatList
              data={chats}
              renderItem={renderChat}
              contentContainerStyle={{gap: vs(10)}}
              showsVerticalScrollIndicator={false}
              onMomentumScrollEnd={() => {
                if (Keyboard.isVisible()) {
                  Keyboard.dismiss();
                }
              }}
              ref={scrollRef}
            />
          </View>
          <AppTextInput
            outStyle={styles.chatInput}
            containerStyle={{
              borderWidth: 0,
            }}
            value={message}
            onChangeText={setMessage}
            placeholder="Nhập câu hỏi..."
            trailing={
              !getChat?.isPending ? (
                <Ionicons
                  name="send-outline"
                  size={s(25)}
                  color={COLORS.grey}
                  onPress={onSubmit}
                  //   onPress={() => {
                  //     scrollRef?.current?.scrollToEnd();
                  //   }}
                  //onPress={() => getChat.mutate('hello')}
                />
              ) : (
                <Animated.View style={animatedStyle}>
                  <AppImage
                    source={require('@assets/images/bookmark.png')}
                    style={styles.trailing}
                    resizeMode="contain"
                  />
                </Animated.View>
              )
            }
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Chatbot;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: vs(10),
    paddingHorizontal: s(27),
  },
  chatInput: {
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    elevation: 4,
    marginBottom: vs(20),
    marginTop: vs(10),
  },
  avatar: {
    width: s(30),
    height: s(30),
    //borderRadius: s(45),
  },
  chatRowWrapper: {
    alignItems: 'flex-end',
    gap: s(10),
    flex: 1,
  },
  chatCard: {
    padding: s(10),
    backgroundColor: COLORS.white,
    borderRadius: s(10),
    maxWidth: '80%',
  },
  trailing: {
    width: s(20),
    height: s(20),
  },
});

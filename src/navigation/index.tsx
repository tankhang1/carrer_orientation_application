import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '@screens/SplashScreen';
import HomeScreen from '@screens/HomeScreen';
import ListResult from '@screens/ListResult';
import ListExam from '@screens/ListExam';
import ExamQuestion from '@screens/ExamQuestion';
import UploadResult from '@screens/UploadResult';
import Result from '@screens/Result';
import NewsDetail1 from '@screens/NewsDetail1';
import Chatbox from '@screens/Chatbox';
import {TRootStackNav} from '@utils/types/RootStackNav';
import News from '@screens/News';
import NewsDetail2 from '@screens/NewsDetail2';
import {createNavigationContainerRef} from '@react-navigation/native';
const Stack = createNativeStackNavigator<TRootStackNav>();
export const navigationRef = createNavigationContainerRef<TRootStackNav>();
const AppNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarColor: 'transparent',
          statusBarStyle: 'dark',
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}></Stack.Screen>
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="ListResult" component={ListResult}></Stack.Screen>
        <Stack.Screen name="ListExam" component={ListExam}></Stack.Screen>
        <Stack.Screen
          name="ExamQuestion"
          component={ExamQuestion}></Stack.Screen>
        <Stack.Screen
          name="UploadResult"
          component={UploadResult}></Stack.Screen>
        <Stack.Screen name="Result" component={Result}></Stack.Screen>
        <Stack.Screen name="News" component={News}></Stack.Screen>
        <Stack.Screen name="NewsDetail1" component={NewsDetail1}></Stack.Screen>
        <Stack.Screen name="NewsDetail2" component={NewsDetail2}></Stack.Screen>

        <Stack.Screen name="ChatBox" component={Chatbox}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

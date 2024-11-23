import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListResult from '@screens/ListResult';
import ListExam from '@screens/ListExam';
import ExamQuestion from '@screens/ExamQuestion';
import UploadResult from '@screens/UploadResult';
import Result from '@screens/Result';
import NewsDetail1 from '@screens/NewsDetail1';
import Chatbot from '@screens/Chatbot';
import {TRootStackNav} from '@utils/types/RootStackNav';
import News from '@screens/News';
import HomeScreen from '@screens/HomeScreen';
import {createNavigationContainerRef} from '@react-navigation/native';
import SplashScreen from '@screens/SplashScreen';
import ResultDetail from '@screens/ResultDetail/ResultDetail';
import Dictionary from '@screens/Dictionary';
import DictonaryDetail from '@screens/DictionaryDetail';
import SignUp from '@screens/Auth/SignUp';
import Login from '@screens/Auth/Login';
import ForgotPassword from '@screens/Auth/ForgotPassword';
import GroupListScreen from '@screens/GroupListScreen/GroupListScreen';
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
          statusBarTranslucent: true,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ListResult" component={ListResult} />
        <Stack.Screen name="ListExam" component={ListExam} />
        <Stack.Screen name="ExamQuestion" component={ExamQuestion} />
        <Stack.Screen name="UploadResult" component={UploadResult} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="ResultDetail" component={ResultDetail} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="NewsDetail1" component={NewsDetail1} />
        <Stack.Screen name="ChatBot" component={Chatbot} />
        <Stack.Screen name="Dictionary" component={Dictionary} />
        <Stack.Screen name="DictionaryDetail" component={DictonaryDetail} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="GroupList" component={GroupListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

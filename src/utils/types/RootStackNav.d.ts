import {TExam} from '@interfaces/DTO';
import {TAnswer} from './metaTypes';

export type TRootStackNav = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  ListResult: undefined;
  ListExam: undefined;
  ExamQuestion: undefined;
  UploadResult: undefined;
  Result: {
    userAnswers: Record<string, string>;
  };
  News: undefined;
  NewsDetail1: {
    content: string;
  };

  ChatBot: undefined;
  ResultDetail: {
    url: string;
  };
};

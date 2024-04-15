import {TExam} from '@interfaces/DTO';
import {TAnswer, TSchoolScoreResult} from './metaTypes';

export type TRootStackNav = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  ListResult: undefined;
  ListExam: undefined;
  ExamQuestion: undefined;
  UploadResult: undefined;
  //Result: undefined;
  Result: {
    userAnswers: Record<string, string>;
    schoolScoreResults: TSchoolScoreResult[];
  };
  News: undefined;
  NewsDetail1: {
    content: string;
  };

  ChatBox: undefined;
};

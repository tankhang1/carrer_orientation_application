import {TExam} from '@interfaces/DTO';
import {TAnswer, TGroup, TSchoolScoreResult} from './metaTypes';
import {IMajor} from '@interfaces/DTO/Dictionary/dictionary';

export type TRootStackNav = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  ListResult: undefined;
  ListExam: undefined;
  ExamQuestion: undefined;
  UploadResult: undefined;
  Result: {
    userAnswers: Record<string, string>;
    schoolScoreResults: TSchoolScoreResult[];
  };
  News: undefined;
  NewsDetail1: {
    content: string;
  };

  ChatBot: undefined;
  ResultDetail: {
    url: string;
  };
  Dictionary: undefined;
  DictionaryDetail: {
    group: TGroup;
    name: string;
    image: string;
    content: {
      pros: string;
      cons: string;
    };
  };
};

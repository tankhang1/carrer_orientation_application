import {IResult, TExam} from '@interfaces/DTO';

export type TAnswer = Map<TExam, number[]>;
export type TSchoolScoreResult = {title: string; description: string};
export type TSubject = {
  vnName: string;
  value: string | number;
};
export type TResultInStore = {
  date: string;
  userAnswers: {
    [key in TExam]?: string;
  };
  schoolScore: {
    scores: Record<string, TSubject>;
  };
};

export type TResults = {
  type: TExam;
  resultContents: IResult[];
};

export type TGroup = 'A0' | 'A1' | 'B' | 'C' | 'D1' | 'D7';

import {IResponse} from '..';

export type TExam =
  | 'R'
  | 'I'
  | 'A'
  | 'S'
  | 'E'
  | 'C'
  | 'IQ'
  | 'EQ'
  | 'SchoolScore';
export interface IOption {
  image?: string;
  content: string;
  isResult?: boolean;
  standardScore?: number;
}
export interface IQuestion {
  questionTitle: string;
  image?: string;
  options: IOption[];
  answer?: number | number[];
}
export interface IResult {
  score?: null | number[];
  content: string;
  image?: string;
  detail?: string;
}
export interface IExam {
  type: TExam;
  questions: IQuestion[];
  results: IResult[];
}
export interface IExamResponse extends IResponse {
  data: IExam[];
}

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
  | 'Holland'
  | 'SchoolScore';
export interface IOption {
  image?: string;
  content: string;
  isResult?: boolean;
}
export interface IQuestion {
  questionTitle: string;
  image?: string;
  options?: IOption[];
}
export interface IExam {
  type: TExam;
  questions: IQuestion[];
}
export interface IExamResponse extends IResponse {
  data: IExam[];
}
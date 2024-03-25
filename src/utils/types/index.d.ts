declare type TExam =
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
declare interface IOption {
  image?: string;
  content: string;
  isResult?: boolean;
}
declare interface IQuestion {
  questionTitle: string;
  image?: string;
  options?: IOption[];
}
declare interface IExam {
  type: TExam;
  questions: IQuestion[];
}

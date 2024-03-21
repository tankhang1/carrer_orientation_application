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
declare interface IAnswer {
  image?: string;
  content: string;
  isResult?: boolean;
}
declare interface IQuestion {
  questionTitle: string;
  image?: string;
  answers?: IAnswer[];
}
declare interface IExam {
  type: TExam;
  questions: IQuestion[];
}

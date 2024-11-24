export interface IMyAnswers {
  questionId: string;
  answers?: string[];
  shortAnswer?: string;
}
export interface IDoExam {
  examId: string;
  groupId: string;
  myAnswers: string;
}

export type user = {
  isUser?: boolean;
  email: string;
  isLoading?: boolean;
  fullName: string;
};

export type Project = {
  upid: number;
  name: string;
};

export type Quiz = {
  id: number;
  title: string;
  description: string;
};

export type quizzes = {
  quizzes: Quiz[];
};

export type Question = {
  Id: number;
  Text: string;
  QuizId: number;
  Options: {
    Id: number;
    Text: string;
    IsCorrect: boolean;
    QuestionId: number;
  }[];
};

export type Answer = {
  questionId: number;
  optionId: number;
};

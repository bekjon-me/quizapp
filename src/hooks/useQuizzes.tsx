import { useAppSelector } from '../app/hooks';
import { selectQuizzes } from '../app/QuizzesSlice';

export const useQuizzes = () => {
  const { quizzes } = useAppSelector(selectQuizzes);

  return { quizzes };
};

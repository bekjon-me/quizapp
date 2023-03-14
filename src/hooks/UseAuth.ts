import { selectAuth } from '../app/AuthSlice';
import { useAppSelector } from '../app/hooks';

export const useAuth = () => {
  const { isUser, email, fullName, isLoading } = useAppSelector(selectAuth);

  return { isUser, email, fullName, isLoading };
};

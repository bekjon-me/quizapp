import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Main, Profile, Quiz } from '../pages';
import { MAIN, PROFILE, QUIZ } from './utils';

export const privateRouter = createBrowserRouter([
  {
    path: MAIN,
    element: <Main />,
  },
  {
    path: PROFILE,
    element: <Profile />,
  },
  {
    path: QUIZ,
    element: <Quiz />,
  },
  {
    path: '*',
    element: <Navigate replace to={MAIN} />,
  },
]);

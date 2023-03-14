import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Main, Profile } from '../pages';
import { MAIN, PROFILE } from './utils';

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
    path: '*',
    element: <Navigate replace to={MAIN} />,
  },
]);

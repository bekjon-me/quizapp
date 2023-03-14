import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import { MAIN, REGISTER } from './utils';

export const publicRouter = createBrowserRouter([
  {
    path: MAIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
]);

import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createUser, setIsloading } from '../app/AuthSlice';
import { useAppDispatch } from '../app/hooks';
import { nonTokenInstance } from '../axios/axios';
import { useAuth } from '../hooks/UseAuth';
import { REFRESH_USER } from '../utils/urls';
import { privateRouter } from './PrivateRoutes';
import { publicRouter } from './PublicRoutes';

export default function AppRouter() {
  const { isUser } = useAuth();
  const dispatch = useAppDispatch();
  async function getUser() {
    dispatch(setIsloading(true));
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens') as string);
      const payload = {
        token: tokens.access_token,
        refreshToken: tokens.refresh_token,
      };
      const response = await nonTokenInstance.post(REFRESH_USER, payload);
      const newTokens = {
        access_token: response.data.token,
        refresh_token: response.data.refreshToken,
      };
      const user = {
        email: response.data.email,
        fullName: response.data.fullName,
      };
      dispatch(createUser(user));
      localStorage.setItem('tokens', JSON.stringify(newTokens));
    } catch (error) {
      console.log(error);
    }
    dispatch(setIsloading(false));
  }

  useEffect(() => {
    if (localStorage.getItem('tokens')) {
      getUser();
    }
  }, []);

  return isUser ? (
    <RouterProvider router={privateRouter} />
  ) : (
    <RouterProvider router={publicRouter} />
  );
}

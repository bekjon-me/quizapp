import { toast } from 'react-toastify';
import { nonTokenInstance } from '../axios/axios';
import { createUser, setIsloading } from '../app/AuthSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { LOGIN_USER_URL } from '../utils/urls';
import jwt_decode from 'jwt-decode';

export const handleLogin = (values: any, dispatch: Dispatch) => {
  dispatch(setIsloading(true));

  nonTokenInstance
    .post(LOGIN_USER_URL, values)
    .then((res) => {
      const parsedResponse = JSON.parse(res.data);
      const tokens = {
        access_token: parsedResponse.Token,
        refresh_token: parsedResponse.RefreshToken,
      };

      const user = {
        email: parsedResponse.Email,
        fullName: parsedResponse.FullName,
      };

      localStorage.setItem('tokens', JSON.stringify(tokens));
      localStorage.setItem('id', parsedResponse.UserId);
      dispatch(createUser(user));
      toast.success('You have successfully logged in');
    })
    .catch((err) => {
      if (err.message === 'Network Error') {
        toast.error('It seems you are not connected to the Internet');
      }
      if (err.response?.data) {
        toast.error(err.response.data);
      }
    })
    .finally(() => {
      dispatch(setIsloading(false));
    });
};
